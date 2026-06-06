<?php
/* Nama File: be/api/access.php | Fungsi: API smart access untuk lock, QR tamu, dan log akses resident | Author: PPL-UAS */

// strict_types membuat PHP lebih ketat membaca tipe data scalar.
declare(strict_types=1);

// Memuat CORS, helper request JSON, helper response JSON, dan koneksi database.
require __DIR__ . '/../config/cors.php';
require __DIR__ . '/../lib/Request.php';
require __DIR__ . '/../lib/Response.php';
require __DIR__ . '/../lib/Database.php';
require __DIR__ . '/../lib/Auth.php';

// Membuka koneksi database dan membaca method HTTP.
$db = Database::connection();
$method = Request::method();

// GET dipakai resident portal untuk membaca status pintu dan histori akses.
if ($method === 'GET') {
    // application_id wajib karena state akses selalu terikat ke aplikasi/resident tertentu.
    $appId = trim((string) ($_GET['application_id'] ?? ''));
    if ($appId === '') Response::error('application_id wajib diisi', 422);
    Auth::requireApplicationAccess($appId);

    // Query state pintu terakhir: locked, guest_pass, valid_until.
    $state = $db->prepare('SELECT * FROM access_states WHERE application_id = :id');
    $state->execute(['id' => $appId]);

    // Query 20 log akses terbaru untuk ditampilkan di dashboard resident.
    $logs = $db->prepare('SELECT * FROM access_logs WHERE application_id = :id ORDER BY created_at DESC LIMIT 20');
    $logs->execute(['id' => $appId]);

    // Response menggabungkan state akses dan log aktivitas.
    Response::json(['success' => true, 'data' => ['state' => $state->fetch() ?: null, 'logs' => $logs->fetchAll()]]);
}

// Selain GET, endpoint hanya menerima POST/PATCH untuk update state akses.
if ($method !== 'POST' && $method !== 'PATCH') Response::error('Method tidak diizinkan', 405);

// Membaca body JSON dari frontend.
$input = Request::input();
$appId = (string) ($input['application_id'] ?? '');
if ($appId === '') Response::error('application_id wajib diisi', 422);
Auth::requireApplicationAccess($appId);
Auth::requireCsrf();

// Normalisasi data akses dari frontend.
$locked = !empty($input['locked']) ? 1 : 0;
$guestPass = (string) ($input['guestPass'] ?? $input['guest_pass'] ?? ('QR-ONYX-' . random_int(1000, 9999)));
$validUntil = (string) ($input['validUntil'] ?? $input['valid_until'] ?? '22:00');

// Upsert access_states: jika data sudah ada maka diupdate, jika belum maka dibuat baru.
$db->prepare('INSERT INTO access_states (application_id, locked, guest_pass, valid_until) VALUES (:id,:locked,:guest_pass,:valid_until) ON DUPLICATE KEY UPDATE locked=VALUES(locked), guest_pass=VALUES(guest_pass), valid_until=VALUES(valid_until)')->execute(['id'=>$appId,'locked'=>$locked,'guest_pass'=>$guestPass,'valid_until'=>$validUntil]);

// Insert access_logs untuk menyimpan jejak aktivitas smart access.
$db->prepare('INSERT INTO access_logs (id, application_id, action, detail, status) VALUES (:id,:application_id,:action,:detail,:status)')->execute(['id'=>'ACL-' . date('YmdHis') . '-' . random_int(100,999),'application_id'=>$appId,'action'=>(string)($input['action'] ?? 'Access updated'),'detail'=>(string)($input['detail'] ?? ''),'status'=>(string)($input['status'] ?? 'logged')]);

// Ambil ulang state terbaru sebagai response final.
$stmt = $db->prepare('SELECT * FROM access_states WHERE application_id = :id');
$stmt->execute(['id' => $appId]);
Response::json(['success' => true, 'data' => $stmt->fetch()]);
