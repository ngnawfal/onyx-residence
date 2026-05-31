<?php
/* Nama File: be/api/payment-webhook.php | Fungsi: Callback webhook BAYAR GG | Author: PPL-UAS */

declare(strict_types=1);

require __DIR__ . '/../config/cors.php';
require __DIR__ . '/../lib/Response.php';
require __DIR__ . '/../lib/Database.php';

$config = require __DIR__ . '/../config/bayar.php';
$payload = json_decode(file_get_contents('php://input') ?: '{}', true);

if (!is_array($payload)) {
    Response::error('Payload webhook tidak valid', 400);
}

$secret = (string) ($config['webhook_secret'] ?? '');
$signature = $_SERVER['HTTP_X_WEBHOOK_SIGNATURE'] ?? '';
$timestamp = $_SERVER['HTTP_X_WEBHOOK_TIMESTAMP'] ?? '';

if ($secret !== '') {
    $signatureData = ($payload['invoice_id'] ?? '') . '|' . ($payload['status'] ?? '') . '|' . ($payload['final_amount'] ?? '') . '|' . $timestamp;
    $expected = hash_hmac('sha256', $signatureData, $secret);
    if (!hash_equals($expected, $signature)) {
        Response::error('Invalid webhook signature', 401);
    }
}

$invoiceId = (string) ($payload['invoice_id'] ?? $payload['id'] ?? '');
$status = (string) ($payload['status'] ?? '');
if ($invoiceId !== '') {
    $db = Database::connection();
    $stmt = $db->prepare('UPDATE payment_invoices SET status = :status, raw_response = :raw_response WHERE provider_invoice_id = :invoice_id OR id = :invoice_id');
    $stmt->execute(['status' => $status, 'raw_response' => json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), 'invoice_id' => $invoiceId]);
}
Response::json(['success' => true, 'message' => 'Webhook diterima', 'status' => $payload['status'] ?? null]);
