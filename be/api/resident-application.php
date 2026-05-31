<?php
/* Nama File: be/api/resident-application.php | Fungsi: API pendaftaran resident Onyx berbasis MySQL | Author: PPL-UAS */

declare(strict_types=1);

// Memuat CORS, parser request, response JSON, koneksi database, dan mapper format frontend.
require __DIR__ . '/../config/cors.php';
require __DIR__ . '/../lib/Request.php';
require __DIR__ . '/../lib/Response.php';
require __DIR__ . '/../lib/Database.php';
require __DIR__ . '/../lib/ApplicationMapper.php';

// Membuat cookie auth dari backend setelah registrasi berhasil.
function issueResidentAuthCookie(): void
{
    $isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || (($_SERVER['SERVER_PORT'] ?? '') === '443');
    setcookie('onyx-resident-auth', 'true', [
        'expires' => time() + 86400,
        'path' => '/',
        'secure' => $isHttps,
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
}

// Endpoint ini dipakai form booking/register untuk menyimpan aplikasi resident.
$db = Database::connection();
$method = Request::method();

// GET membaca satu aplikasi berdasarkan id atau seluruh aplikasi untuk admin-state.
if ($method === 'GET') {
    $id = trim((string) ($_GET['id'] ?? ''));
    if ($id !== '') {
        $stmt = $db->prepare('SELECT * FROM resident_applications WHERE id = :id');
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch();
        if (!$row) Response::error('Aplikasi tidak ditemukan', 404);
        Response::json(['success' => true, 'data' => ApplicationMapper::toApi($row)]);
    }
    $rows = $db->query('SELECT * FROM resident_applications ORDER BY created_at ASC')->fetchAll();
    Response::json(['success' => true, 'data' => array_map([ApplicationMapper::class, 'toApi'], $rows)]);
}

// Selain GET, endpoint hanya menerima POST/PATCH untuk create/update aplikasi.
if ($method !== 'POST' && $method !== 'PATCH') {
    Response::error('Method tidak diizinkan', 405);
}

// Membaca body JSON, membuat ID aplikasi jika belum ada, lalu hash password.
$input = Request::input();
$id = (string) ($input['id'] ?? $input['application_id'] ?? ('APP-' . date('YmdHis') . '-' . random_int(100, 999)));
$password = (string) ($input['password'] ?? '');
$passwordHash = $password !== '' ? password_hash($password, PASSWORD_DEFAULT) : null;
$columns = array_column($db->query('DESCRIBE resident_applications')->fetchAll(), 'Field');
$budgetColumn = in_array('monthly_budget', $columns, true) ? 'monthly_budget' : 'meter_monthly_budget';

// Query upsert: aplikasi baru dibuat, aplikasi lama dengan id sama diperbarui.
$sql = "INSERT INTO resident_applications (
    id, name, phone, email, nik, address, occupation, room, lease_type, duration, start_date, end_date,
    {$budgetColumn}, deposit, emergency_contact, refund_bank, refund_account, refund_account_name,
    notes, password_hash, application_status, administration_status
) VALUES (
    :id, :name, :phone, :email, :nik, :address, :occupation, :room, :lease_type, :duration, :start_date, :end_date,
    :monthly_budget, :deposit, :emergency_contact, :refund_bank, :refund_account, :refund_account_name,
    :notes, :password_hash, :application_status, :administration_status
) ON DUPLICATE KEY UPDATE
    name = VALUES(name), phone = VALUES(phone), email = VALUES(email), nik = VALUES(nik), address = VALUES(address),
    occupation = VALUES(occupation), room = VALUES(room), lease_type = VALUES(lease_type), duration = VALUES(duration),
    start_date = VALUES(start_date), end_date = VALUES(end_date), {$budgetColumn} = VALUES({$budgetColumn}),
    deposit = VALUES(deposit), emergency_contact = VALUES(emergency_contact), refund_bank = VALUES(refund_bank),
    refund_account = VALUES(refund_account), refund_account_name = VALUES(refund_account_name), notes = VALUES(notes),
    password_hash = COALESCE(VALUES(password_hash), password_hash), application_status = VALUES(application_status),
    administration_status = VALUES(administration_status)";

$stmt = $db->prepare($sql);

// Mapping field frontend camelCase ke kolom database snake_case.
$stmt->execute([
    'id' => $id,
    'name' => trim((string) ($input['name'] ?? '')),
    'phone' => trim((string) ($input['phone'] ?? '')),
    'email' => trim((string) ($input['email'] ?? '')),
    'nik' => trim((string) ($input['nik'] ?? '')),
    'address' => trim((string) ($input['address'] ?? '')),
    'occupation' => trim((string) ($input['occupation'] ?? '')),
    'room' => trim((string) ($input['room'] ?? '')),
    'lease_type' => trim((string) ($input['leaseType'] ?? $input['lease_type'] ?? 'Bulanan')),
    'duration' => (int) ($input['duration'] ?? 1),
    'start_date' => ($input['startDate'] ?? $input['start_date'] ?? null) ?: null,
    'end_date' => ($input['endDate'] ?? $input['end_date'] ?? null) ?: null,
    'monthly_budget' => (float) ($input['monthlyBudget'] ?? $input['monthly_budget'] ?? 0),
    'deposit' => (float) ($input['deposit'] ?? 0),
    'emergency_contact' => trim((string) ($input['emergencyContact'] ?? $input['emergency_contact'] ?? '')),
    'refund_bank' => trim((string) ($input['refundBank'] ?? $input['refund_bank'] ?? '')),
    'refund_account' => trim((string) ($input['refundAccount'] ?? $input['refund_account'] ?? '')),
    'refund_account_name' => trim((string) ($input['refundAccountName'] ?? $input['refund_account_name'] ?? '')),
    'notes' => trim((string) ($input['notes'] ?? '')),
    'password_hash' => $passwordHash,
    'application_status' => (string) ($input['applicationStatus'] ?? $input['application_status'] ?? 'Menunggu Review'),
    'administration_status' => (string) ($input['administrationStatus'] ?? $input['administration_status'] ?? 'Belum Dibayar'),
]);

// Ambil ulang data tersimpan agar frontend mendapat format terbaru dari database.
$stmt = $db->prepare('SELECT * FROM resident_applications WHERE id = :id');
$stmt->execute(['id' => $id]);
$savedRow = $stmt->fetch();
$savedData = $savedRow ? ApplicationMapper::toApi($savedRow) : [
    'id' => $id,
    'name' => trim((string) ($input['name'] ?? '')),
    'phone' => trim((string) ($input['phone'] ?? '')),
    'email' => trim((string) ($input['email'] ?? '')),
    'nik' => trim((string) ($input['nik'] ?? '')),
    'address' => trim((string) ($input['address'] ?? '')),
    'occupation' => trim((string) ($input['occupation'] ?? '')),
    'room' => trim((string) ($input['room'] ?? '')),
    'leaseType' => trim((string) ($input['leaseType'] ?? $input['lease_type'] ?? 'Bulanan')),
    'duration' => (string) ($input['duration'] ?? '1'),
    'startDate' => (string) ($input['startDate'] ?? $input['start_date'] ?? ''),
    'endDate' => (string) ($input['endDate'] ?? $input['end_date'] ?? ''),
    'monthlyBudget' => (string) ($input['monthlyBudget'] ?? $input['monthly_budget'] ?? '0'),
    'deposit' => (string) ($input['deposit'] ?? '0'),
    'emergencyContact' => trim((string) ($input['emergencyContact'] ?? $input['emergency_contact'] ?? '')),
    'refundBank' => trim((string) ($input['refundBank'] ?? $input['refund_bank'] ?? '')),
    'refundAccount' => trim((string) ($input['refundAccount'] ?? $input['refund_account'] ?? '')),
    'refundAccountName' => trim((string) ($input['refundAccountName'] ?? $input['refund_account_name'] ?? '')),
    'notes' => trim((string) ($input['notes'] ?? '')),
    'applicationStatus' => (string) ($input['applicationStatus'] ?? $input['application_status'] ?? 'Menunggu Review'),
    'administrationStatus' => (string) ($input['administrationStatus'] ?? $input['administration_status'] ?? 'Belum Dibayar'),
];

// Jika pendaftaran membawa password, resident langsung diberi cookie session HttpOnly.
if ($password !== '') {
    issueResidentAuthCookie();
}

Response::json(['success' => true, 'data' => $savedData]);
