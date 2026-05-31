<?php
/* Nama File: be/lib/Database.php | Fungsi: Helper koneksi PDO MySQL | Author: PPL-UAS */

// Mengaktifkan strict type agar kode backend lebih konsisten.
declare(strict_types=1);

/**
 * Class Database menyediakan koneksi PDO singleton sederhana.
 */
final class Database
{
    // Menyimpan instance PDO agar koneksi tidak dibuat berulang pada satu request.
    private static ?PDO $connection = null;

    /**
     * Membuat atau mengembalikan koneksi PDO aktif.
     */
    public static function connection(): PDO
    {
        // Mengembalikan koneksi lama jika sudah tersedia.
        if (self::$connection instanceof PDO) {
            return self::$connection;
        }

        // Memuat konfigurasi database dari file config.
        $config = require __DIR__ . '/../config/database.php';

        // Menyusun DSN MySQL menggunakan host, port, database, dan charset.
        $dsn = sprintf(
            'mysql:host=%s;port=%s;dbname=%s;charset=%s',
            $config['host'],
            $config['port'],
            $config['database'],
            $config['charset']
        );

        // Membuat koneksi PDO dengan mode error exception dan fetch associative.
        self::$connection = new PDO($dsn, $config['username'], $config['password'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);

        // Mengembalikan koneksi PDO siap pakai.
        return self::$connection;
    }
}
