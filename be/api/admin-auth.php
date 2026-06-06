<?php
/* Nama File: be/api/admin-auth.php | Fungsi: Login admin dengan cookie HttpOnly | Author: PPL-UAS */

declare(strict_types=1);

// Memuat CORS, parser request, dan response JSON agar format API konsisten.
require __DIR__ . '/../config/cors.php';
require __DIR__ . '/../lib/Request.php';
require __DIR__ . '/../lib/Response.php';
require __DIR__ . '/../lib/Auth.php';
require __DIR__ . '/../lib/RateLimit.php';

// Login admin hanya menerima POST agar username/password dikirim di body request.
if (Request::method() !== 'POST') Response::error('Method tidak diizinkan', 405);
RateLimit::check('admin-auth', 8, 600);

// Membaca credential dari frontend; untuk project UAS credential demo tetap sederhana.
$input = Request::input();
$username = trim((string) ($input['username'] ?? ''));
$password = (string) ($input['password'] ?? '');

$production = Auth::env('ONYX_PRODUCTION') === 'true';
$adminUsername = Auth::env('ONYX_ADMIN_USERNAME', $production ? '' : 'admin');
$adminPasswordHash = Auth::env('ONYX_ADMIN_PASSWORD_HASH', $production ? '' : password_hash('admin123', PASSWORD_DEFAULT));

if ($adminUsername === '' || $adminPasswordHash === '') {
    Response::error('Admin credential belum dikonfigurasi', 500);
}

if ($username !== $adminUsername || !password_verify($password, $adminPasswordHash)) {
    Response::error('Username atau password admin salah', 401);
}

// Jika valid, backend mengirim signed HttpOnly cookie untuk admin.
Auth::issueCookie('admin', $username);

Response::json(['success' => true, 'data' => ['role' => 'admin', 'name' => 'Admin Onyx']]);
