<?php
/* Nama File: be/api/payment-proof.php | Fungsi: API upload/review bukti transfer manual berbasis MySQL | Author: PPL-UAS */

declare(strict_types=1);

require __DIR__ . '/../config/cors.php';
require __DIR__ . '/../lib/Request.php';
require __DIR__ . '/../lib/Response.php';
require __DIR__ . '/../lib/Database.php';
require __DIR__ . '/../lib/ApplicationMapper.php';

$db = Database::connection();
$method = Request::method();

if ($method === 'GET') {
    $applicationId = trim((string) ($_GET['application_id'] ?? ''));
    if ($applicationId !== '') {
        $stmt = $db->prepare('SELECT * FROM payment_proofs WHERE application_id = :application_id ORDER BY created_at ASC');
        $stmt->execute(['application_id' => $applicationId]);
    } else {
        $stmt = $db->query('SELECT * FROM payment_proofs ORDER BY created_at ASC');
    }
    Response::json(['success' => true, 'data' => array_map([ApplicationMapper::class, 'proofToApi'], $stmt->fetchAll())]);
}

if ($method !== 'POST' && $method !== 'PATCH') {
    Response::error('Method tidak diizinkan', 405);
}

$input = Request::input();
if (!empty($_FILES['proofFile']) && is_uploaded_file($_FILES['proofFile']['tmp_name'])) {
    $uploadDir = __DIR__ . '/../storage/uploads';
    if (!is_dir($uploadDir)) mkdir($uploadDir, 0775, true);
    $originalName = basename((string) $_FILES['proofFile']['name']);
    $extension = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
    if (!in_array($extension, ['jpg', 'jpeg', 'png', 'webp', 'gif', 'pdf'], true)) Response::error('Format bukti harus gambar atau PDF', 422);
    $safeName = preg_replace('/[^a-zA-Z0-9._-]+/', '-', pathinfo($originalName, PATHINFO_FILENAME));
    $storedName = 'proof-' . date('YmdHis') . '-' . random_int(100, 999) . '-' . $safeName . '.' . $extension;
    if (!move_uploaded_file($_FILES['proofFile']['tmp_name'], $uploadDir . '/' . $storedName)) Response::error('Gagal menyimpan file bukti', 500);
    $input['fileName'] = $originalName;
    $input['filePath'] = 'storage/uploads/' . $storedName;
    $input['fileUrl'] = '../storage/uploads/' . $storedName;
    $input['mimeType'] = (string) ($_FILES['proofFile']['type'] ?? '');
    $input['fileSize'] = (int) ($_FILES['proofFile']['size'] ?? 0);
}

$action = (string) ($input['action'] ?? 'upload');
$applicationId = (string) ($input['application_id'] ?? '');
if ($applicationId === '') Response::error('application_id wajib diisi', 422);
$columns = array_column($db->query('DESCRIBE resident_applications')->fetchAll(), 'Field');
$budgetColumn = in_array('monthly_budget', $columns, true) ? 'monthly_budget' : 'meter_monthly_budget';

$appStmt = $db->prepare('SELECT id FROM resident_applications WHERE id = :id');
$appStmt->execute(['id' => $applicationId]);
if (!$appStmt->fetch()) {
    $fallbackStmt = $db->prepare("INSERT IGNORE INTO resident_applications (
        id, name, phone, email, nik, address, occupation, room, lease_type, duration, start_date, end_date,
        {$budgetColumn}, deposit, emergency_contact, refund_bank, refund_account, refund_account_name,
        notes, password_hash, application_status, administration_status
    ) VALUES (
        :id, :name, :phone, :email, :nik, :address, :occupation, :room, :lease_type, :duration, :start_date, :end_date,
        :monthly_budget, :deposit, :emergency_contact, :refund_bank, :refund_account, :refund_account_name,
        :notes, NULL, :application_status, :administration_status
    )");
    $amount = (float) ($input['amount'] ?? 0);
    $fallbackStmt->execute([
        'id' => $applicationId,
        'name' => trim((string) ($input['residentName'] ?? $input['resident_name'] ?? 'Calon penghuni')),
        'phone' => trim((string) ($input['phone'] ?? '')),
        'email' => trim((string) ($input['email'] ?? '')),
        'nik' => trim((string) ($input['nik'] ?? '')),
        'address' => trim((string) ($input['address'] ?? '')),
        'occupation' => trim((string) ($input['occupation'] ?? '')),
        'room' => trim((string) ($input['room'] ?? '')),
        'lease_type' => trim((string) ($input['leaseType'] ?? $input['lease_type'] ?? 'Bulanan')),
        'duration' => (int) ($input['duration'] ?? 1),
        'start_date' => ($input['startDate'] ?? $input['start_date'] ?? date('Y-m-d')) ?: date('Y-m-d'),
        'end_date' => ($input['endDate'] ?? $input['end_date'] ?? null) ?: null,
        'monthly_budget' => max(0, $amount),
        'deposit' => 0,
        'emergency_contact' => trim((string) ($input['emergencyContact'] ?? $input['emergency_contact'] ?? '')),
        'refund_bank' => trim((string) ($input['refundBank'] ?? $input['refund_bank'] ?? '')),
        'refund_account' => trim((string) ($input['refundAccount'] ?? $input['refund_account'] ?? '')),
        'refund_account_name' => trim((string) ($input['refundAccountName'] ?? $input['refund_account_name'] ?? '')),
        'notes' => trim((string) ($input['notes'] ?? 'Dibuat otomatis dari upload bukti pembayaran.')),
        'application_status' => (string) ($input['applicationStatus'] ?? $input['application_status'] ?? 'Menunggu Review'),
        'administration_status' => 'Menunggu Konfirmasi Admin',
    ]);
}

$id = (string) ($input['id'] ?? ('PRF-' . date('YmdHis') . '-' . random_int(100, 999)));
$status = $action === 'approve' ? 'approved' : ($action === 'reject' ? 'rejected' : 'uploaded');
$reviewedAt = in_array($action, ['approve', 'reject'], true) ? date('Y-m-d H:i:s') : null;

$stmt = $db->prepare('INSERT INTO payment_proofs (
    id, application_id, invoice, resident_name, room, sender_bank, sender_name, amount,
    file_name, file_path, file_url, mime_type, file_size, status, reviewed_at
) VALUES (
    :id, :application_id, :invoice, :resident_name, :room, :sender_bank, :sender_name, :amount,
    :file_name, :file_path, :file_url, :mime_type, :file_size, :status, :reviewed_at
) ON DUPLICATE KEY UPDATE
    invoice = VALUES(invoice), resident_name = VALUES(resident_name), room = VALUES(room), sender_bank = VALUES(sender_bank),
    sender_name = VALUES(sender_name), amount = VALUES(amount), file_name = COALESCE(VALUES(file_name), file_name),
    file_path = COALESCE(VALUES(file_path), file_path), file_url = COALESCE(VALUES(file_url), file_url),
    mime_type = COALESCE(VALUES(mime_type), mime_type), file_size = COALESCE(VALUES(file_size), file_size),
    status = VALUES(status), reviewed_at = VALUES(reviewed_at)');

$stmt->execute([
    'id' => $id,
    'application_id' => $applicationId,
    'invoice' => (string) ($input['invoice'] ?? ''),
    'resident_name' => (string) ($input['residentName'] ?? $input['resident_name'] ?? ''),
    'room' => (string) ($input['room'] ?? ''),
    'sender_bank' => (string) ($input['senderBank'] ?? $input['sender_bank'] ?? ''),
    'sender_name' => (string) ($input['senderName'] ?? $input['sender_name'] ?? ''),
    'amount' => (float) ($input['amount'] ?? 0),
    'file_name' => (string) ($input['fileName'] ?? $input['file_name'] ?? ''),
    'file_path' => (string) ($input['filePath'] ?? $input['file_path'] ?? ''),
    'file_url' => (string) ($input['fileUrl'] ?? $input['file_url'] ?? ''),
    'mime_type' => (string) ($input['mimeType'] ?? $input['mime_type'] ?? ''),
    'file_size' => (int) ($input['fileSize'] ?? $input['file_size'] ?? 0),
    'status' => $status,
    'reviewed_at' => $reviewedAt,
]);

if ($action === 'approve') {
    $db->prepare("UPDATE resident_applications SET administration_status = 'Dikonfirmasi Admin', application_status = 'Approved' WHERE id = :id")->execute(['id' => $applicationId]);
} elseif ($action === 'reject') {
    $db->prepare("UPDATE resident_applications SET administration_status = 'Bukti Ditolak', application_status = 'Menunggu Review' WHERE id = :id")->execute(['id' => $applicationId]);
} else {
    $db->prepare("UPDATE resident_applications SET administration_status = 'Menunggu Konfirmasi Admin' WHERE id = :id")->execute(['id' => $applicationId]);
}

$stmt = $db->prepare('SELECT * FROM payment_proofs WHERE id = :id');
$stmt->execute(['id' => $id]);
$app = $db->prepare('SELECT * FROM resident_applications WHERE id = :id');
$app->execute(['id' => $applicationId]);
Response::json(['success' => true, 'data' => ApplicationMapper::proofToApi($stmt->fetch()), 'application' => ApplicationMapper::toApi($app->fetch())]);
