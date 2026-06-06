<?php
/* Nama File: be/config/bayar.php | Fungsi: Konfigurasi BAYAR GG payment gateway | Author: PPL-UAS */

declare(strict_types=1);

$secretsPath = __DIR__ . '/secrets.php';
$secrets = is_file($secretsPath) ? require $secretsPath : [];
if (!is_array($secrets)) $secrets = [];
$env = static fn (string $key, string $default = ''): string => (string) ($secrets[$key] ?? $_SERVER[$key] ?? $_ENV[$key] ?? getenv($key) ?: $default);

return [
    'base_url' => $env('BAYAR_GG_BASE_URL', 'https://www.bayar.gg/api'),
    'api_key' => $env('BAYAR_GG_API_KEY'),
    'webhook_secret' => $env('BAYAR_GG_WEBHOOK_SECRET'),
    'default_method' => $env('BAYAR_GG_PAYMENT_METHOD', 'qris'),
    'qris_admin_max_amount' => (int) $env('BAYAR_GG_QRIS_ADMIN_MAX_AMOUNT', '500000'),
];
