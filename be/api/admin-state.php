<?php
/* Nama File: be/api/admin-state.php | Fungsi: Aggregasi state admin dari MySQL | Author: PPL-UAS */

declare(strict_types=1);

require __DIR__ . '/../config/cors.php';
require __DIR__ . '/../lib/Response.php';
require __DIR__ . '/../lib/Database.php';
require __DIR__ . '/../lib/ApplicationMapper.php';
require __DIR__ . '/../lib/Auth.php';

Auth::requireAdmin();

$db = Database::connection();
$apps = $db->query('SELECT * FROM resident_applications ORDER BY created_at ASC')->fetchAll();
$proofs = $db->query('SELECT * FROM payment_proofs ORDER BY created_at ASC')->fetchAll();
$utilities = $db->query('SELECT * FROM utility_meters ORDER BY meter_month DESC, created_at DESC')->fetchAll();

$tickets = [];
try {
    $tickets = $db->query('SELECT * FROM service_tickets ORDER BY created_at DESC')->fetchAll();
} catch (Throwable $error) {
    $tickets = [];
}

Response::json([
    'success' => true,
    'data' => [
        'applications' => array_map([ApplicationMapper::class, 'toApi'], $apps),
        'payment_proofs' => array_map([ApplicationMapper::class, 'proofToApi'], $proofs),
        'utility_meters' => array_map([ApplicationMapper::class, 'utilityToApi'], $utilities),
        'service_tickets' => $tickets,
    ],
]);
