<?php
/* Nama File: be/api/payment-webhook.php | Fungsi: Callback webhook BAYAR GG | Author: PPL-UAS */

declare(strict_types=1);

require __DIR__ . '/../config/cors.php';
require __DIR__ . '/../lib/Response.php';
require __DIR__ . '/../lib/Database.php';
require __DIR__ . '/../lib/RateLimit.php';
require __DIR__ . '/../lib/Auth.php';

RateLimit::check('payment-webhook', 120, 60);

$config = require __DIR__ . '/../config/bayar.php';
$rawBody = file_get_contents('php://input') ?: '';

if (trim($rawBody) === '') {
    Response::error('Payload webhook wajib diisi', 400);
}

$payload = json_decode($rawBody, true);

if (json_last_error() !== JSON_ERROR_NONE || !is_array($payload)) {
    Response::error('Payload webhook tidak valid', 400);
}

$invoiceId = trim((string) ($payload['invoice_id'] ?? $payload['id'] ?? ''));
$status = trim((string) ($payload['status'] ?? ''));

if ($invoiceId === '' || $status === '') {
    Response::error('invoice_id/id dan status wajib diisi', 422);
}

$secret = (string) ($config['webhook_secret'] ?? '');
$signature = $_SERVER['HTTP_X_WEBHOOK_SIGNATURE'] ?? '';
$timestamp = $_SERVER['HTTP_X_WEBHOOK_TIMESTAMP'] ?? '';

if (Auth::env('ONYX_PRODUCTION') === 'true' && $secret === '') {
    Response::error('Webhook secret belum dikonfigurasi', 500);
}

if ($secret !== '') {
    if ($signature === '' || $timestamp === '' || !array_key_exists('final_amount', $payload)) {
        Response::error('Header signature, timestamp, dan final_amount wajib untuk webhook signed', 422);
    }
    $signatureData = ($payload['invoice_id'] ?? '') . '|' . ($payload['status'] ?? '') . '|' . ($payload['final_amount'] ?? '') . '|' . $timestamp;
    $expected = hash_hmac('sha256', $signatureData, $secret);
    if (!hash_equals($expected, $signature)) {
        Response::error('Invalid webhook signature', 401);
    }
}

try {
    $db = Database::connection();
    $stmt = $db->prepare('UPDATE payment_invoices SET status = :status, raw_response = :raw_response WHERE provider_invoice_id = :invoice_id OR id = :invoice_id');
    $stmt->execute(['status' => $status, 'raw_response' => json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), 'invoice_id' => $invoiceId]);
} catch (Throwable $error) {
    $payload['db_warning'] = $error->getMessage();
}
Response::json(['success' => true, 'message' => 'Webhook diterima', 'status' => $payload['status'] ?? null]);
