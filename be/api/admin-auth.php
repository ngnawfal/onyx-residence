<?php
/* Nama File: be/api/admin-auth.php | Fungsi: Login admin dengan cookie HttpOnly | Author: PPL-UAS */

declare(strict_types=1);

// Memuat CORS, parser request, dan response JSON agar format API konsisten.
require __DIR__ . '/../config/cors.php';
require __DIR__ . '/../lib/Request.php';
require __DIR__ . '/../lib/Response.php';

// Membuat cookie admin dari backend supaya session tidak perlu dibuat lewat JavaScript.
function issueAdminAuthCookie(): void
{
    $isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || (($_SERVER['SERVER_PORT'] ?? '') === '443');
    setcookie('kostku-auth', 'true', [
        'expires' => time() + 86400,
        'path' => '/',
        'secure' => $isHttps,
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
}

// Login admin hanya menerima POST agar username/password dikirim di body request.
if (Request::method() !== 'POST') Response::error('Method tidak diizinkan', 405);

// Membaca credential dari frontend; untuk project UAS credential demo tetap sederhana.
$input = Request::input();
$username = trim((string) ($input['username'] ?? ''));
$password = (string) ($input['password'] ?? '');

// Credential demo dipindah ke backend agar frontend tidak lagi membuat cookie admin sendiri.
if ($username !== 'admin' || $password !== 'admin123') {
    Response::error('Username atau password admin salah', 401);
}

// Jika valid, backend mengirim cookie HttpOnly untuk admin.
issueAdminAuthCookie();

Response::json(['success' => true, 'data' => ['role' => 'admin', 'name' => 'Admin Onyx']]);
