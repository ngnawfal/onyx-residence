<?php
/* Nama File: be/api/chat.php | Fungsi: API chat grup penghuni + admin | Author: PPL-UAS */

declare(strict_types=1);

require __DIR__ . '/../config/cors.php';
require __DIR__ . '/../lib/Request.php';
require __DIR__ . '/../lib/Response.php';
require __DIR__ . '/../lib/Database.php';
require __DIR__ . '/../lib/Auth.php';

$db = Database::connection();
$method = Request::method();

// Buat tabel jika belum ada
$db->exec("CREATE TABLE IF NOT EXISTS group_chat (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_role VARCHAR(16) NOT NULL DEFAULT 'resident',
    sender_name VARCHAR(128) NOT NULL DEFAULT '',
    sender_id VARCHAR(64) NOT NULL DEFAULT '',
    message TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

// GET: ambil pesan
if ($method === 'GET') {
    Auth::requireGroupChat();

    $limit = min(100, max(1, (int) ($_GET['limit'] ?? 50)));
    $before = (int) ($_GET['before'] ?? 0);

    if ($before > 0) {
        $stmt = $db->prepare('SELECT id, sender_role, sender_name, sender_id, message, UNIX_TIMESTAMP(created_at) as timestamp FROM group_chat WHERE id < :before ORDER BY id DESC LIMIT :limit');
        $stmt->bindValue('before', $before, PDO::PARAM_INT);
        $stmt->bindValue('limit', $limit, PDO::PARAM_INT);
    } else {
        $stmt = $db->prepare('SELECT id, sender_role, sender_name, sender_id, message, UNIX_TIMESTAMP(created_at) as timestamp FROM group_chat ORDER BY id DESC LIMIT :limit');
        $stmt->bindValue('limit', $limit, PDO::PARAM_INT);
    }
    $stmt->execute();
    $messages = array_reverse($stmt->fetchAll());

    Response::json(['success' => true, 'data' => $messages]);
}

if ($method !== 'POST') {
    Response::error('Method tidak diizinkan', 405);
}

// POST: kirim pesan
Auth::requireGroupChat();
Auth::requireCsrf();

$input = Request::input();
$message = trim((string) ($input['message'] ?? ''));
if ($message === '') Response::error('Pesan tidak boleh kosong', 422);
if (mb_strlen($message) > 2000) Response::error('Pesan maksimal 2000 karakter', 422);

$isAdmin = !empty($_COOKIE['kostku-auth']);

if ($isAdmin) {
    $senderRole = 'admin';
    $payload = Auth::verifySignedPayload($_COOKIE['kostku-auth'] ?? '');
    $senderName = $payload['subject'] ?? 'Admin';
    $senderId = $payload['subject'] ?? 'admin';
} else {
    $senderRole = 'resident';
    $payload = Auth::verifySignedPayload($_COOKIE['onyx-resident-auth'] ?? '');
    $senderName = $input['senderName'] ?? $payload['subject'] ?? '';
    $senderId = $input['sender_id'] ?? $payload['subject'] ?? '';
}

$stmt = $db->prepare('INSERT INTO group_chat (sender_role, sender_name, sender_id, message) VALUES (:role, :name, :sender_id, :message)');
$stmt->execute([
    'role' => $senderRole,
    'name' => $senderName,
    'sender_id' => $senderId,
    'message' => $message,
]);

$id = (int) $db->lastInsertId();
Response::json(['success' => true, 'data' => [
    'id' => $id,
    'sender_role' => $senderRole,
    'sender_name' => $senderName,
    'sender_id' => $senderId,
    'message' => $message,
    'timestamp' => time(),
]]);
