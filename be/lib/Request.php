<?php
/* Nama File: be/lib/Request.php | Fungsi: Helper membaca input request JSON | Author: PPL-UAS */

// Mengaktifkan strict type untuk request helper.
declare(strict_types=1);

/**
 * Class Request menyediakan helper input HTTP.
 */
final class Request
{
    /**
     * Membaca body JSON atau form-urlencoded menjadi array.
     */
    public static function input(): array
    {
        // Membaca raw body dari php://input.
        $raw = file_get_contents('php://input') ?: '';

        // Decode JSON jika body tidak kosong.
        $json = $raw !== '' ? json_decode($raw, true) : null;

        // Mengembalikan JSON array jika valid.
        if (is_array($json)) {
            return $json;
        }

        // Fallback ke POST untuk form biasa.
        return $_POST;
    }

    /**
     * Mengambil metode HTTP request saat ini.
     */
    public static function method(): string
    {
        // Mengembalikan request method dalam uppercase.
        return strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');
    }
}
