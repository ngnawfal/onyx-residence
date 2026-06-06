<?php
/* Nama File: be/api/reservasi.php | Fungsi: API reservasi KostKu | Author: PPL-UAS */

// Memuat header CORS dan JSON.
require __DIR__ . '/../config/cors.php';

// Memuat helper database, request, dan response.
require __DIR__ . '/../lib/Database.php';
require __DIR__ . '/../lib/Request.php';
require __DIR__ . '/../lib/Response.php';
require __DIR__ . '/../lib/Auth.php';

try {
    // Membaca metode request.
    $method = Request::method();
    Auth::requireAdmin();
    if ($method !== 'GET') Auth::requireCsrf();

    // Membuat koneksi database.
    $db = Database::connection();

    // Operasi READ: mengambil reservasi lengkap dengan data tamu dan kamar.
    if ($method === 'GET') {
        $stmt = $db->query('SELECT r.*, t.nama_lengkap, k.no_kamar, k.nama_kamar FROM reservasi r JOIN tamu t ON t.id_tamu = r.id_tamu JOIN kamar k ON k.id_kamar = r.id_kamar ORDER BY r.created_at DESC');
        Response::json(['success' => true, 'data' => $stmt->fetchAll()]);
    }

    // Operasi CREATE: membuat booking baru.
    if ($method === 'POST') {
        $input = Request::input();

        // Validasi field wajib reservasi.
        foreach (['kode_booking', 'id_tamu', 'id_kamar', 'tgl_checkin', 'tgl_checkout', 'total_harga', 'status'] as $field) {
            if (!isset($input[$field]) || trim((string) $input[$field]) === '') {
                Response::error("Field {$field} wajib diisi", 422);
            }
        }

        // Query insert reservasi menggunakan prepared statement.
        $stmt = $db->prepare('INSERT INTO reservasi (kode_booking, id_tamu, id_kamar, tgl_checkin, tgl_checkout, total_harga, status, keterangan) VALUES (:kode_booking, :id_tamu, :id_kamar, :tgl_checkin, :tgl_checkout, :total_harga, :status, :keterangan)');
        $stmt->execute([
            'kode_booking' => $input['kode_booking'],
            'id_tamu' => $input['id_tamu'],
            'id_kamar' => $input['id_kamar'],
            'tgl_checkin' => $input['tgl_checkin'],
            'tgl_checkout' => $input['tgl_checkout'],
            'total_harga' => $input['total_harga'],
            'status' => $input['status'],
            'keterangan' => $input['keterangan'] ?? null,
        ]);

        // Mengirim response sukses dengan ID reservasi baru.
        Response::json(['success' => true, 'message' => 'Reservasi berhasil dibuat', 'id' => $db->lastInsertId()], 201);
    }

    // Menolak method yang belum tersedia.
    Response::error('Method belum didukung pada endpoint reservasi', 405);
} catch (Throwable $error) {
    // Mengirim error server jika terjadi exception.
    Response::error('Terjadi kesalahan backend: ' . $error->getMessage(), 500);
}
