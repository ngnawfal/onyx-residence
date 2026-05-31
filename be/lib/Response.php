<?php
/* Nama File: be/lib/Response.php | Fungsi: Helper response JSON API | Author: PPL-UAS */

// Mengaktifkan strict type untuk response helper.
declare(strict_types=1);

/**
 * Class Response memusatkan format JSON API.
 */
final class Response
{
    /**
     * Mengirim response sukses atau error dalam format JSON.
     */
    public static function json(array $payload, int $status = 200): void
    {
        // Menetapkan HTTP status code sesuai hasil operasi.
        http_response_code($status);

        // Mengubah array payload menjadi JSON dan mengakhiri request.
        echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }

    /**
     * Mengirim response error standar.
     */
    public static function error(string $message, int $status = 400, array $errors = []): void
    {
        // Mengirim payload error dengan pesan dan detail validasi opsional.
        self::json([
            'success' => false,
            'message' => $message,
            'errors' => $errors,
        ], $status);
    }
}
