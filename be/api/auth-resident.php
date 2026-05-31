<?php
/* Nama File: be/api/auth-resident.php | Fungsi: Login resident memakai email/WhatsApp dan password hash | Author: PPL-UAS */

// strict_types membantu validasi tipe data PHP lebih konsisten.
declare(strict_types=1);

// Memuat CORS, request parser, response JSON, koneksi database, dan mapper data aplikasi.
require __DIR__ . '/../config/cors.php';
require __DIR__ . '/../lib/Request.php';
require __DIR__ . '/../lib/Response.php';
require __DIR__ . '/../lib/Database.php';
require __DIR__ . '/../lib/ApplicationMapper.php';

// Membuat cookie auth dari backend agar browser bisa menyimpannya sebagai HttpOnly.
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

// Login hanya boleh lewat POST agar username/password dikirim lewat body request.
if (Request::method() !== 'POST') Response::error('Method tidak diizinkan', 405);

// Membaca input JSON dari frontend login form.
$input = Request::input();
$username = trim((string) ($input['username'] ?? ''));
$password = (string) ($input['password'] ?? '');
if ($username === '' || $password === '') Response::error('Username dan password wajib diisi', 422);

// Membuka koneksi database untuk mencari akun resident.
$db = Database::connection();

// Username boleh berupa email atau nomor WhatsApp, maka query memakai dua kolom.
$stmt = $db->prepare('SELECT * FROM resident_applications WHERE email = :email OR phone = :phone ORDER BY created_at DESC LIMIT 1');
$stmt->execute(['email' => $username, 'phone' => $username]);
$row = $stmt->fetch();

// password_verify membandingkan password input dengan hash yang tersimpan di database.
if (!$row || !password_verify($password, (string) ($row['password_hash'] ?? ''))) Response::error('Email/WhatsApp atau password salah', 401);

// Cookie HttpOnly tidak bisa dibaca JavaScript sehingga lebih aman dari pencurian token lewat XSS.
issueResidentAuthCookie();

// Jika valid, data resident dikembalikan dalam format API frontend.
Response::json(['success' => true, 'data' => ApplicationMapper::toApi($row)]);
