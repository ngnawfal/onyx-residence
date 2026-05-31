<?php
/* Nama File: be/api/payment-check.php | Fungsi: Cek status invoice BAYAR GG | Author: PPL-UAS */

declare(strict_types=1);

require __DIR__ . '/../config/cors.php';
require __DIR__ . '/../lib/Response.php';
require __DIR__ . '/../lib/BayarGG.php';
require __DIR__ . '/../lib/Database.php';

$invoice = trim((string) ($_GET['invoice'] ?? ''));

if ($invoice === '') {
    Response::error('Invoice wajib diisi', 422);
}

$config = require __DIR__ . '/../config/bayar.php';
$client = new BayarGG($config);

$result = $client->checkPayment($invoice);
$payment = $result['data'] ?? $result;
try {
    $db = Database::connection();
    $stmt = $db->prepare('UPDATE payment_invoices SET status = :status, raw_response = :raw_response WHERE provider_invoice_id = :invoice OR id = :invoice');
    $stmt->execute([
        'status' => (string) ($payment['status'] ?? 'checked'),
        'raw_response' => json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
        'invoice' => $invoice,
    ]);
} catch (Throwable $error) {
    $result['db_warning'] = $error->getMessage();
}
Response::json($result);
