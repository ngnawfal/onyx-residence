<?php
/* Nama File: be/config/cors.php | Fungsi: Header CORS untuk frontend Vite | Author: PPL-UAS */

// Mengizinkan frontend Vite lokal dan XAMPP mengakses API saat development.
$allowedOrigins = [
    'http://127.0.0.1:5173',
    'http://localhost:5173',
    'http://localhost',
    'http://127.0.0.1',
    'https://onyx.nawf.dev',
];

// Membaca origin request dari browser.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

// Mengirim header Access-Control-Allow-Origin hanya untuk origin yang dikenal.
if (in_array($origin, $allowedOrigins, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Credentials: true');
}

// Mengizinkan metode HTTP yang dipakai CRUD.
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');

// Mengizinkan header request umum dari fetch API.
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, X-CSRF-Token, X-IOT-Token, X-Test-Token, X-Webhook-Signature, X-Webhook-Timestamp');

// Memberi tahu browser bahwa API mengembalikan JSON.
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('Referrer-Policy: strict-origin-when-cross-origin');

// Mengakhiri preflight OPTIONS tanpa menjalankan logic endpoint.
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
    http_response_code(204);
    exit;
}
