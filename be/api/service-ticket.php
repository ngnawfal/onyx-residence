<?php
/* Nama File: be/api/service-ticket.php | Fungsi: API tiket service/keluhan resident | Author: PPL-UAS */

// strict_types menjaga tipe data PHP lebih konsisten.
declare(strict_types=1);

// Memuat CORS, helper request/response, dan koneksi database.
require __DIR__ . '/../config/cors.php';
require __DIR__ . '/../lib/Request.php';
require __DIR__ . '/../lib/Response.php';
require __DIR__ . '/../lib/Database.php';

// Membuka koneksi database dan membaca HTTP method.
$db = Database::connection();
$method = Request::method();

// GET digunakan untuk membaca tiket resident tertentu atau semua tiket admin.
if ($method === 'GET') {
    $appId = trim((string) ($_GET['application_id'] ?? ''));
    // Jika application_id ada, ambil tiket milik resident tersebut.
    if ($appId !== '') {
        $stmt = $db->prepare('SELECT * FROM service_tickets WHERE application_id = :id ORDER BY created_at DESC');
        $stmt->execute(['id' => $appId]);
    } else {
        // Jika tidak ada filter, admin melihat semua tiket service.
        $stmt = $db->query('SELECT * FROM service_tickets ORDER BY created_at DESC');
    }
    Response::json(['success' => true, 'data' => $stmt->fetchAll()]);
}

// POST/PATCH dipakai untuk membuat atau mengupdate tiket.
if ($method !== 'POST' && $method !== 'PATCH') Response::error('Method tidak diizinkan', 405);

// Membaca body JSON dan membuat ID tiket jika belum dikirim frontend.
$input = Request::input();
$id = (string) ($input['id'] ?? ('TKT-' . date('YmdHis') . '-' . random_int(100, 999)));

// Upsert tiket agar submit ulang dengan ID sama tidak membuat duplikasi.
$stmt = $db->prepare('INSERT INTO service_tickets (id, application_id, category, priority, issue, status) VALUES (:id,:application_id,:category,:priority,:issue,:status) ON DUPLICATE KEY UPDATE category=VALUES(category), priority=VALUES(priority), issue=VALUES(issue), status=VALUES(status)');
$stmt->execute([
    'id' => $id,
    'application_id' => (string) ($input['application_id'] ?? ''),
    'category' => (string) ($input['category'] ?? 'Service'),
    'priority' => (string) ($input['priority'] ?? 'Normal'),
    'issue' => (string) ($input['issue'] ?? ''),
    'status' => (string) ($input['status'] ?? 'open'),
]);

// Ambil ulang tiket yang tersimpan sebagai response final.
$stmt = $db->prepare('SELECT * FROM service_tickets WHERE id = :id');
$stmt->execute(['id' => $id]);
Response::json(['success' => true, 'data' => $stmt->fetch()]);
