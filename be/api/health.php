<?php
/* Nama File: be/api/health.php | Fungsi: Endpoint health check backend KostKu | Author: PPL-UAS */

// Memuat header CORS dan JSON.
require __DIR__ . '/../config/cors.php';

// Memuat helper response JSON.
require __DIR__ . '/../lib/Response.php';

// Mengirim status backend aktif.
Response::json([
    'success' => true,
    'message' => 'KostKu backend aktif',
    'data' => [
        'service' => 'kostku-api',
        'version' => '1.0.0',
        'time' => date(DATE_ATOM),
    ],
]);
