<?php
/* Nama File: be/api/iot-ingest.php | Fungsi: API ingestion telemetry IoT Wokwi per kamar | Author: PPL-UAS */

declare(strict_types=1);

require __DIR__ . '/../config/cors.php';
require __DIR__ . '/../lib/Request.php';
require __DIR__ . '/../lib/Response.php';
require __DIR__ . '/../lib/Database.php';
require __DIR__ . '/../lib/Auth.php';

$db = Database::connection();
$method = Request::method();

// Mapper ini mengubah nama kolom MySQL snake_case menjadi format camelCase yang dipakai frontend JS.
function iotRowToApi(array $row): array
{
    return [
        'id' => (int) ($row['id'] ?? 0),
        'roomCode' => $row['room_code'] ?? '',
        'temperature' => (float) ($row['temperature'] ?? 0),
        'humidity' => (float) ($row['humidity'] ?? 0),
        'powerWatt' => (float) ($row['power_watt'] ?? 0),
        'energyKwh' => (float) ($row['energy_kwh'] ?? 0),
        'waterM3' => (float) ($row['water_m3'] ?? 0),
        'acOn' => (bool) ($row['ac_on'] ?? false),
        'lightOn' => (bool) ($row['light_on'] ?? false),
        'waterOn' => (bool) ($row['water_on'] ?? false),
        'created_at' => $row['created_at'] ?? null,
    ];
}

// GET dipakai admin/resident untuk mengambil telemetry terbaru per kamar atau semua kamar.
if ($method === 'GET') {
    if (!Auth::user()) Response::error('Unauthorized telemetry access', 401);
    $roomCode = trim((string) ($_GET['room_code'] ?? $_GET['room'] ?? ''));
    if ($roomCode !== '') {
        $stmt = $db->prepare('SELECT * FROM iot_room_telemetry WHERE room_code = :room_code ORDER BY created_at DESC, id DESC LIMIT 1');
        $stmt->execute(['room_code' => $roomCode]);
        $row = $stmt->fetch();
        Response::json(['success' => true, 'data' => $row ? iotRowToApi($row) : null]);
    }

    $rows = $db->query('SELECT t.* FROM iot_room_telemetry t INNER JOIN (SELECT room_code, MAX(id) latest_id FROM iot_room_telemetry GROUP BY room_code) x ON x.latest_id = t.id ORDER BY t.room_code ASC')->fetchAll();
    Response::json(['success' => true, 'data' => array_map('iotRowToApi', $rows)]);
}

// POST dipakai ESP32/Wokwi untuk mengirim telemetry sensor ke backend.
if ($method !== 'POST') Response::error('Method tidak diizinkan', 405);

$iotToken = Auth::env('ONYX_IOT_TOKEN');
if ($iotToken !== '') {
    $providedToken = $_SERVER['HTTP_X_IOT_TOKEN'] ?? '';
    if (!hash_equals($iotToken, $providedToken)) Response::error('Invalid IoT token', 401);
} else {
    Auth::requireAdmin();
    Auth::requireCsrf();
}

// Membaca payload JSON dari ESP32 lalu validasi roomCode agar aman untuk query/filter.
$input = Request::input();
$roomCode = strtoupper(trim((string) ($input['roomCode'] ?? $input['room_code'] ?? $input['room'] ?? '')));
if ($roomCode === '') Response::error('roomCode wajib diisi', 422);
if (!preg_match('/^[A-Z0-9_-]{1,20}$/', $roomCode)) Response::error('roomCode tidak valid', 422);

$temperature = max(-20, min(80, (float) ($input['temperature'] ?? 0)));
$humidity = max(0, min(100, (float) ($input['humidity'] ?? 0)));
$powerWatt = max(0, min(10000, (float) ($input['powerWatt'] ?? $input['power_watt'] ?? 0)));
$energyKwh = max(0, min(100000, (float) ($input['energyKwh'] ?? $input['energy_kwh'] ?? 0)));
$waterM3 = max(0, min(100000, (float) ($input['waterM3'] ?? $input['water_m3'] ?? 0)));
$acOn = !empty($input['acOn']) || !empty($input['ac_on']);
$lightOn = !empty($input['lightOn']) || !empty($input['light_on']);
$waterOn = !array_key_exists('waterOn', $input) && !array_key_exists('water_on', $input) ? true : (!empty($input['waterOn']) || !empty($input['water_on']));

// Insert telemetry mentah dan nilai sensor terukur ke tabel iot_room_telemetry.
$stmt = $db->prepare('INSERT INTO iot_room_telemetry (room_code, temperature, humidity, power_watt, energy_kwh, water_m3, ac_on, light_on, water_on, raw_payload) VALUES (:room_code, :temperature, :humidity, :power_watt, :energy_kwh, :water_m3, :ac_on, :light_on, :water_on, :raw_payload)');
$stmt->execute([
    'room_code' => $roomCode,
    'temperature' => $temperature,
    'humidity' => $humidity,
    'power_watt' => $powerWatt,
    'energy_kwh' => $energyKwh,
    'water_m3' => $waterM3,
    'ac_on' => $acOn ? 1 : 0,
    'light_on' => $lightOn ? 1 : 0,
    'water_on' => $waterOn ? 1 : 0,
    'raw_payload' => json_encode($input, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
]);

// Mengambil ulang telemetry yang baru masuk supaya response berisi data final dari database.
$stmt = $db->prepare('SELECT * FROM iot_room_telemetry WHERE id = :id');
$stmt->execute(['id' => $db->lastInsertId()]);
Response::json(['success' => true, 'data' => iotRowToApi($stmt->fetch())], 201);
