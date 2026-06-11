<?php
/* Nama File: be/lib/Auth.php | Fungsi: Signed-cookie auth dan guard API | Author: PPL-UAS */

declare(strict_types=1);

require_once __DIR__ . '/Response.php';

final class Auth
{
    private const ADMIN_COOKIE = 'kostku-auth';
    private const RESIDENT_COOKIE = 'onyx-resident-auth';
    private const CSRF_COOKIE = 'onyx-csrf';

    public static function env(string $key, string $default = ''): string
    {
        static $secrets = null;
        if ($secrets === null) {
            $path = __DIR__ . '/../config/secrets.php';
            $loaded = is_file($path) ? require $path : [];
            $secrets = is_array($loaded) ? $loaded : [];
        }
        $value = $secrets[$key] ?? $_SERVER[$key] ?? $_ENV[$key] ?? getenv($key);
        return is_string($value) && $value !== '' ? $value : $default;
    }

    private static function secret(): string
    {
        $secret = self::env('ONYX_AUTH_SECRET');
        if ($secret === '' && self::env('ONYX_PRODUCTION') === 'true') {
            Response::error('Auth secret belum dikonfigurasi', 500);
        }
        return $secret !== '' ? $secret : 'onyx-dev-only-change-this-secret';
    }

    private static function base64UrlEncode(string $value): string
    {
        return rtrim(strtr(base64_encode($value), '+/', '-_'), '=');
    }

    private static function base64UrlDecode(string $value): string
    {
        $padded = str_pad(strtr($value, '-_', '+/'), strlen($value) % 4 === 0 ? strlen($value) : strlen($value) + 4 - strlen($value) % 4, '=', STR_PAD_RIGHT);
        return base64_decode($padded) ?: '';
    }

    public static function issueCookie(string $role, string $subject, int $ttl = 86400): void
    {
        $payload = [
            'role' => $role,
            'sub' => $subject,
            'exp' => time() + $ttl,
        ];
        $encodedPayload = self::base64UrlEncode(json_encode($payload, JSON_UNESCAPED_SLASHES));
        $signature = hash_hmac('sha256', $encodedPayload, self::secret());
        $token = $encodedPayload . '.' . $signature;
        $isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || (($_SERVER['SERVER_PORT'] ?? '') === '443');
        setcookie($role === 'admin' ? self::ADMIN_COOKIE : self::RESIDENT_COOKIE, $token, [
            'expires' => $payload['exp'],
            'path' => '/',
            'secure' => $isHttps,
            'httponly' => true,
            'samesite' => 'Strict',
        ]);
        setcookie(self::CSRF_COOKIE, self::csrfForToken($token), [
            'expires' => $payload['exp'],
            'path' => '/',
            'secure' => $isHttps,
            'httponly' => false,
            'samesite' => 'Strict',
        ]);
    }

    public static function clearCookie(string $role): void
    {
        $isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || (($_SERVER['SERVER_PORT'] ?? '') === '443');
        setcookie($role === 'admin' ? self::ADMIN_COOKIE : self::RESIDENT_COOKIE, '', [
            'expires' => time() - 3600,
            'path' => '/',
            'secure' => $isHttps,
            'httponly' => true,
            'samesite' => 'Strict',
        ]);
        setcookie(self::CSRF_COOKIE, '', [
            'expires' => time() - 3600,
            'path' => '/',
            'secure' => $isHttps,
            'httponly' => false,
            'samesite' => 'Strict',
        ]);
    }

    public static function user(): ?array
    {
        $admin = self::verifyToken($_COOKIE[self::ADMIN_COOKIE] ?? '', 'admin');
        if ($admin) return $admin;
        $resident = self::verifyToken($_COOKIE[self::RESIDENT_COOKIE] ?? '', 'resident');
        if ($resident) return $resident;
        return self::basicAdminUser();
    }

    public static function isAdmin(): bool
    {
        return (self::user()['role'] ?? '') === 'admin';
    }

    public static function residentId(): string
    {
        $user = self::user();
        return ($user['role'] ?? '') === 'resident' ? (string) ($user['sub'] ?? '') : '';
    }

    public static function requireAdmin(): void
    {
        if (!self::isAdmin()) Response::error('Unauthorized admin access', 401);
    }

    public static function requireResident(): string
    {
        $residentId = self::residentId();
        if ($residentId === '') Response::error('Unauthorized resident access', 401);
        return $residentId;
    }

    public static function canAccessApplication(string $applicationId): bool
    {
        if ($applicationId === '') return false;
        if (self::isAdmin()) return true;
        return self::residentId() === $applicationId;
    }

    public static function requireApplicationAccess(string $applicationId): void
    {
        if (!self::canAccessApplication($applicationId)) Response::error('Unauthorized application access', 401);
    }

    public static function requireCsrf(): void
    {
        if (self::basicAdminUser()) return;
        $token = $_COOKIE[self::ADMIN_COOKIE] ?? $_COOKIE[self::RESIDENT_COOKIE] ?? '';
        if ($token === '') Response::error('CSRF auth cookie tidak ditemukan', 403);
        $provided = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
        $expected = self::csrfForToken($token);
        if ($provided === '' || !hash_equals($expected, $provided)) {
            Response::error('CSRF token tidak valid', 403);
        }
    }

    public static function requireGroupChat(): void
    {
        if (!empty($_COOKIE[self::ADMIN_COOKIE])) {
            $payload = self::verifySignedPayload($_COOKIE[self::ADMIN_COOKIE]);
            if (!$payload) Response::error('Sesi admin tidak valid', 401);
            return;
        }
        if (!empty($_COOKIE[self::RESIDENT_COOKIE])) {
            $payload = self::verifySignedPayload($_COOKIE[self::RESIDENT_COOKIE]);
            if (!$payload) Response::error('Sesi resident tidak valid', 401);
            return;
        }
        if (self::basicAdminUser()) return;
        Response::error('Harus login untuk mengakses chat', 401);
    }

    public static function verifySignedPayload(string $cookieValue): ?array
    {
        if ($cookieValue === '' || !str_contains($cookieValue, '.')) return null;
        [$encodedPayload, $signature] = explode('.', $cookieValue, 2);
        $expected = hash_hmac('sha256', $encodedPayload, self::secret());
        if (!hash_equals($expected, $signature)) return null;
        $payload = json_decode(self::base64UrlDecode($encodedPayload), true);
        return is_array($payload) ? $payload : null;
    }

    private static function csrfForToken(string $token): string
    {
        return hash_hmac('sha256', $token, self::secret());
    }

    private static function verifyToken(string $token, string $expectedRole): ?array
    {
        if ($token === '' || !str_contains($token, '.')) return null;
        [$encodedPayload, $signature] = explode('.', $token, 2);
        $expected = hash_hmac('sha256', $encodedPayload, self::secret());
        if (!hash_equals($expected, $signature)) return null;
        $payload = json_decode(self::base64UrlDecode($encodedPayload), true);
        if (!is_array($payload)) return null;
        if (($payload['role'] ?? '') !== $expectedRole) return null;
        if ((int) ($payload['exp'] ?? 0) < time()) return null;
        return $payload;
    }

    private static function basicAdminUser(): ?array
    {
        $header = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
        if (!str_starts_with($header, 'Basic ')) return null;
        $decoded = base64_decode(substr($header, 6), true);
        if (!is_string($decoded) || !str_contains($decoded, ':')) return null;
        [$username, $password] = explode(':', $decoded, 2);
        $production = self::env('ONYX_PRODUCTION') === 'true';
        $adminUsername = self::env('ONYX_ADMIN_USERNAME', $production ? '' : 'admin');
        $adminPasswordHash = self::env('ONYX_ADMIN_PASSWORD_HASH', $production ? '' : password_hash('admin123', PASSWORD_DEFAULT));
        if ($adminUsername === '' || $adminPasswordHash === '') return null;
        if ($username === $adminUsername && password_verify($password, $adminPasswordHash)) {
            return ['role' => 'admin', 'sub' => $username, 'exp' => time() + 3600];
        }
        return null;
    }
}
