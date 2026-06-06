<?php
/* Nama File: be/api/payment-create.php | Fungsi: Membuat invoice pembayaran via BAYAR GG | Author: PPL-UAS */

declare(strict_types=1);

require __DIR__ . '/../config/cors.php';
require __DIR__ . '/../lib/Request.php';
require __DIR__ . '/../lib/Response.php';
require __DIR__ . '/../lib/BayarGG.php';
require __DIR__ . '/../lib/Database.php';
require __DIR__ . '/../lib/Auth.php';

if (Request::method() !== 'POST') {
    Response::error('Method tidak diizinkan', 405);
}

$input = Request::input();
$applicationId = trim((string) ($input['application_id'] ?? ''));
if ($applicationId !== '') {
    Auth::requireApplicationAccess($applicationId);
} else {
    Auth::requireAdmin();
}
Auth::requireCsrf();
$amount = (int) ($input['amount'] ?? 0);

if ($amount < 1000) {
    Response::error('Nominal pembayaran minimal Rp 1.000', 422);
}

$config = require __DIR__ . '/../config/bayar.php';
$client = new BayarGG($config);
$requestedMethod = trim((string) ($input['payment_method'] ?? ''));
$paymentMethod = $requestedMethod !== '' ? $requestedMethod : $config['default_method'];
$qrisAdminMaxAmount = (int) ($config['qris_admin_max_amount'] ?? 500000);

if ($paymentMethod === 'qris' && $amount > $qrisAdminMaxAmount) {
    Response::json([
        'success' => false,
        'message' => 'Nominal invoice melebihi limit QRIS Admin BAYAR GG. Saat ini metode yang aktif untuk API key ini hanya QRIS Admin maksimal Rp 500.000. Aktifkan Premium/grant QRIS BAYAR GG, BRI QRIS, GoPay QRIS, atau OVO di dashboard BAYAR GG untuk tagihan kost bulanan di atas limit.',
        'code' => 'PAYMENT_METHOD_LIMIT',
        'available_action' => 'Aktifkan metode pembayaran tanpa limit / buat split payment / gunakan nominal <= Rp 500.000 untuk pengujian QRIS.',
        'method' => $paymentMethod,
        'max_amount' => $qrisAdminMaxAmount,
    ], 422);
}

$payload = [
    'amount' => $amount,
    'description' => $input['description'] ?? 'Pembayaran Kost Onyx Residence',
    'customer_name' => $input['customer_name'] ?? '',
    'customer_email' => $input['customer_email'] ?? '',
    'customer_phone' => $input['customer_phone'] ?? '',
    'payment_method' => $paymentMethod,
    'callback_url' => $input['callback_url'] ?? '',
    'redirect_url' => $input['redirect_url'] ?? '',
];

$result = $client->createPayment($payload);
$payment = $result['data'] ?? $result;
$invoiceId = (string) ($payment['invoice_id'] ?? $payment['id'] ?? ('PAY-' . date('YmdHis') . '-' . random_int(100, 999)));

try {
    $db = Database::connection();
    $stmt = $db->prepare('INSERT INTO payment_invoices (id, application_id, provider_invoice_id, payment_url, description, amount, method, status, raw_response) VALUES (:id,:application_id,:provider_invoice_id,:payment_url,:description,:amount,:method,:status,:raw_response) ON DUPLICATE KEY UPDATE payment_url=VALUES(payment_url), status=VALUES(status), raw_response=VALUES(raw_response)');
    $stmt->execute([
        'id' => $invoiceId,
        'application_id' => $applicationId !== '' ? $applicationId : null,
        'provider_invoice_id' => $invoiceId,
        'payment_url' => (string) ($payment['payment_url'] ?? ''),
        'description' => (string) $payload['description'],
        'amount' => $amount,
        'method' => $paymentMethod,
        'status' => (string) ($payment['status'] ?? 'created'),
        'raw_response' => json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
    ]);
} catch (Throwable $error) {
    $result['db_warning'] = $error->getMessage();
}

Response::json($result);
