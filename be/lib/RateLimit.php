<?php
/* Nama File: be/lib/RateLimit.php | Fungsi: Rate limiter sederhana berbasis file | Author: PPL-UAS */

declare(strict_types=1);

require_once __DIR__ . '/Response.php';

final class RateLimit
{
    public static function check(string $bucket, int $limit = 10, int $windowSeconds = 600): void
    {
        $ip = self::clientIp();
        $dir = __DIR__ . '/../storage/rate-limit';
        if (!is_dir($dir)) mkdir($dir, 0775, true);
        $key = hash('sha256', $bucket . '|' . $ip);
        $file = $dir . '/' . $key . '.json';
        $now = time();
        $data = ['reset' => $now + $windowSeconds, 'count' => 0];

        if (is_file($file)) {
            $decoded = json_decode((string) file_get_contents($file), true);
            if (is_array($decoded)) $data = $decoded;
        }

        if ((int) ($data['reset'] ?? 0) <= $now) {
            $data = ['reset' => $now + $windowSeconds, 'count' => 0];
        }

        $data['count'] = (int) ($data['count'] ?? 0) + 1;
        file_put_contents($file, json_encode($data), LOCK_EX);

        if ($data['count'] > $limit) {
            http_response_code(429);
            header('Retry-After: ' . max(1, (int) $data['reset'] - $now));
            Response::error('Terlalu banyak request. Coba lagi nanti.', 429);
        }
    }

    private static function clientIp(): string
    {
        $forwarded = (string) ($_SERVER['HTTP_X_FORWARDED_FOR'] ?? '');
        if ($forwarded !== '') return trim(explode(',', $forwarded)[0]);
        return (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
    }
}
