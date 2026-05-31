<?php
/* Nama File: be/api/auth-logout.php | Fungsi: Logout admin/resident dengan menghapus cookie HttpOnly | Author: PPL-UAS */

declare(strict_types=1);

// Memuat CORS, parser request, dan response JSON.
require __DIR__ . '/../config/cors.php';
require __DIR__ . '/../lib/Request.php';
require __DIR__ . '/../lib/Response.php';

// Menghapus cookie dengan opsi sama seperti saat dibuat agar browser benar-benar menggantinya.
function clearAuthCookie(string $name): void
{
    $isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || (($_SERVER['SERVER_PORT'] ?? '') === '443');
    setcookie($name, '', [
        'expires' => time() - 3600,
        'path' => '/',
        'secure' => $isHttps,
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
}

// Logout hanya menerima POST supaya tidak terpanggil tidak sengaja dari link GET.
if (Request::method() !== 'POST') Response::error('Method tidak diizinkan', 405);

// Hapus dua cookie auth yang dipakai portal admin dan resident.
clearAuthCookie('kostku-auth');
clearAuthCookie('onyx-resident-auth');

Response::json(['success' => true]);
