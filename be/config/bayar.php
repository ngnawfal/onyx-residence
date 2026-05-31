<?php
/* Nama File: be/config/bayar.php | Fungsi: Konfigurasi BAYAR GG payment gateway | Author: PPL-UAS */

declare(strict_types=1);

return [
    'base_url' => getenv('BAYAR_GG_BASE_URL') ?: 'https://www.bayar.gg/api',
    'api_key' => getenv('BAYAR_GG_API_KEY') ?: 'API-b9a7cbc2873ce521a2cdfdae7ba989cc271c86365dd603e3',
    'webhook_secret' => getenv('BAYAR_GG_WEBHOOK_SECRET') ?: '',
    'default_method' => getenv('BAYAR_GG_PAYMENT_METHOD') ?: 'qris',
    'qris_admin_max_amount' => (int) (getenv('BAYAR_GG_QRIS_ADMIN_MAX_AMOUNT') ?: 500000),
];
