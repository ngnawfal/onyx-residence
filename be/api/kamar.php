<?php
/* Nama File: be/api/kamar.php | Fungsi: API CRUD kamar KostKu | Author: PPL-UAS */

// Memuat header CORS dan JSON.
require __DIR__ . '/../config/cors.php';

// Memuat helper database, request, dan response.
require __DIR__ . '/../lib/Database.php';
require __DIR__ . '/../lib/Request.php';
require __DIR__ . '/../lib/Response.php';
require __DIR__ . '/../lib/Auth.php';

// Menjalankan endpoint di dalam try-catch agar error database aman ditangani.
try {
    // Membaca metode HTTP untuk menentukan operasi CRUD.
    $method = Request::method();

    if ($method !== 'GET') {
        Auth::requireAdmin();
        Auth::requireCsrf();
    }

    // Membuat koneksi database PDO.
    $db = Database::connection();

    // Operasi READ: mengambil daftar kamar dengan filter opsional.
    if ($method === 'GET') {
        // Membaca query string filter dari URL.
        $keyword = trim($_GET['q'] ?? '');
        $status = trim($_GET['status'] ?? '');
        $tipe = trim($_GET['tipe'] ?? '');

        // Menyiapkan klausa WHERE dinamis.
        $where = [];
        $params = [];

        // Filter keyword berdasarkan nomor kamar atau nama kamar.
        if ($keyword !== '') {
            $where[] = '(k.no_kamar LIKE :keyword OR k.nama_kamar LIKE :keyword)';
            $params['keyword'] = '%' . $keyword . '%';
        }

        // Filter status kamar.
        if ($status !== '') {
            $where[] = 'k.status = :status';
            $params['status'] = $status;
        }

        // Filter tipe kategori kamar.
        if ($tipe !== '') {
            $where[] = 'kk.nama_kategori = :tipe';
            $params['tipe'] = $tipe;
        }

        // Query mengambil kamar dan kategori dengan LEFT JOIN.
        $sql = 'SELECT k.*, kk.nama_kategori FROM kamar k LEFT JOIN kategori_kamar kk ON kk.id_kategori = k.id_kategori';

        // Menambahkan WHERE jika filter tersedia.
        if ($where !== []) {
            $sql .= ' WHERE ' . implode(' AND ', $where);
        }

        // Mengurutkan kamar berdasarkan nomor kamar.
        $sql .= ' ORDER BY k.no_kamar ASC';

        // Menjalankan prepared statement.
        $stmt = $db->prepare($sql);
        $stmt->execute($params);

        // Mengirim data kamar dalam JSON.
        Response::json(['success' => true, 'data' => $stmt->fetchAll()]);
    }

    // Operasi CREATE: menambah kamar baru.
    if ($method === 'POST') {
        // Membaca input JSON dari frontend.
        $input = Request::input();

        // Validasi field wajib.
        foreach (['no_kamar', 'id_kategori', 'nama_kamar', 'harga_per_bulan', 'status'] as $field) {
            if (!isset($input[$field]) || trim((string) $input[$field]) === '') {
                Response::error("Field {$field} wajib diisi", 422);
            }
        }

        // Query insert kamar menggunakan prepared statement.
        $stmt = $db->prepare('INSERT INTO kamar (no_kamar, id_kategori, nama_kamar, harga_per_bulan, fasilitas, status) VALUES (:no_kamar, :id_kategori, :nama_kamar, :harga_per_bulan, :fasilitas, :status)');
        $stmt->execute([
            'no_kamar' => $input['no_kamar'],
            'id_kategori' => $input['id_kategori'],
            'nama_kamar' => $input['nama_kamar'],
            'harga_per_bulan' => $input['harga_per_bulan'],
            'fasilitas' => $input['fasilitas'] ?? null,
            'status' => $input['status'],
        ]);

        // Mengirim response sukses dengan ID baru.
        Response::json(['success' => true, 'message' => 'Kamar berhasil ditambahkan', 'id' => $db->lastInsertId()], 201);
    }

    if ($method === 'PATCH' || $method === 'PUT') {
        $input = Request::input();
        $id = (int) ($input['id_kamar'] ?? $input['id'] ?? 0);
        if ($id <= 0) Response::error('id_kamar wajib diisi', 422);
        $stmt = $db->prepare('UPDATE kamar SET no_kamar=:no_kamar, id_kategori=:id_kategori, nama_kamar=:nama_kamar, harga_per_bulan=:harga_per_bulan, fasilitas=:fasilitas, status=:status WHERE id_kamar=:id');
        $stmt->execute([
            'id' => $id,
            'no_kamar' => $input['no_kamar'],
            'id_kategori' => $input['id_kategori'],
            'nama_kamar' => $input['nama_kamar'],
            'harga_per_bulan' => $input['harga_per_bulan'],
            'fasilitas' => $input['fasilitas'] ?? null,
            'status' => $input['status'],
        ]);
        Response::json(['success' => true, 'message' => 'Kamar berhasil diupdate']);
    }

    if ($method === 'DELETE') {
        $input = Request::input();
        $id = (int) ($_GET['id'] ?? $input['id_kamar'] ?? $input['id'] ?? 0);
        if ($id <= 0) Response::error('id_kamar wajib diisi', 422);
        $stmt = $db->prepare('DELETE FROM kamar WHERE id_kamar = :id');
        $stmt->execute(['id' => $id]);
        Response::json(['success' => true, 'message' => 'Kamar berhasil dihapus']);
    }

    // Operasi selain GET/POST/PATCH/DELETE belum diaktifkan.
    Response::error('Method belum didukung pada endpoint kamar', 405);
} catch (Throwable $error) {
    // Mengirim error server jika terjadi exception.
    Response::error('Terjadi kesalahan backend: ' . $error->getMessage(), 500);
}
