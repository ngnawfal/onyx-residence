<?php
/* Nama File: be/api/auth-logout.php | Fungsi: Logout admin/resident dengan menghapus cookie HttpOnly | Author: PPL-UAS */

declare(strict_types=1);

// Memuat CORS, parser request, dan response JSON.
require __DIR__ . '/../config/cors.php';
require __DIR__ . '/../lib/Request.php';
require __DIR__ . '/../lib/Response.php';
require __DIR__ . '/../lib/Auth.php';

// Logout hanya menerima POST supaya tidak terpanggil tidak sengaja dari link GET.
if (Request::method() !== 'POST') Response::error('Method tidak diizinkan', 405);

// Hapus dua cookie auth yang dipakai portal admin dan resident.
Auth::clearCookie('admin');
Auth::clearCookie('resident');

Response::json(['success' => true]);
