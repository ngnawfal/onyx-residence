<?php
/* Nama File: be/config/database.php | Fungsi: Konfigurasi koneksi database KostKu | Author: PPL-UAS */

// Mengaktifkan strict type agar parameter dan return value PHP lebih aman.
declare(strict_types=1);

// Menyimpan konfigurasi database lokal XAMPP atau Laragon.
return [
    // Host database MySQL lokal.
    'host' => getenv('DB_HOST') ?: '127.0.0.1',
    // Port default MySQL.
    'port' => getenv('DB_PORT') ?: '3306',
    // Nama database aplikasi KostKu.
    'database' => getenv('DB_DATABASE') ?: 'kostku',
    // Username default XAMPP.
    'username' => getenv('DB_USERNAME') ?: 'root',
    // Password default XAMPP biasanya kosong.
    'password' => getenv('DB_PASSWORD') ?: '',
    // Charset koneksi agar teks Indonesia aman.
    'charset' => 'utf8mb4',
];
