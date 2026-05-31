<?php
/* Nama File: be/api/tamu.php | Fungsi: API data tamu KostKu | Author: PPL-UAS */

// Memuat header CORS dan JSON.
require __DIR__ . '/../config/cors.php';

// Memuat helper database, request, dan response.
require __DIR__ . '/../lib/Database.php';
require __DIR__ . '/../lib/Request.php';
require __DIR__ . '/../lib/Response.php';

try {
    // Membaca metode HTTP request.
    $method = Request::method();

    // Membuat koneksi PDO.
    $db = Database::connection();

    // Operasi READ: mengambil semua data tamu.
    if ($method === 'GET') {
        $stmt = $db->query('SELECT * FROM tamu ORDER BY nama_lengkap ASC');
        Response::json(['success' => true, 'data' => $stmt->fetchAll()]);
    }

    // Operasi CREATE: menambah tamu baru.
    if ($method === 'POST') {
        $input = Request::input();

        // Validasi field wajib tamu.
        foreach (['nama_lengkap', 'nik', 'no_telp', 'alamat_asal'] as $field) {
            if (!isset($input[$field]) || trim((string) $input[$field]) === '') {
                Response::error("Field {$field} wajib diisi", 422);
            }
        }

        // Query insert tamu menggunakan prepared statement.
        $stmt = $db->prepare('INSERT INTO tamu (nama_lengkap, nik, no_telp, email, alamat_asal) VALUES (:nama_lengkap, :nik, :no_telp, :email, :alamat_asal)');
        $stmt->execute([
            'nama_lengkap' => $input['nama_lengkap'],
            'nik' => $input['nik'],
            'no_telp' => $input['no_telp'],
            'email' => $input['email'] ?? null,
            'alamat_asal' => $input['alamat_asal'],
        ]);

        // Mengirim response sukses dengan ID tamu baru.
        Response::json(['success' => true, 'message' => 'Tamu berhasil ditambahkan', 'id' => $db->lastInsertId()], 201);
    }

    // Menolak method yang belum tersedia.
    Response::error('Method belum didukung pada endpoint tamu', 405);
} catch (Throwable $error) {
    // Mengirim error server jika operasi gagal.
    Response::error('Terjadi kesalahan backend: ' . $error->getMessage(), 500);
}
