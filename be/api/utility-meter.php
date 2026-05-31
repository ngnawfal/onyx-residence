<?php
/* Nama File: be/api/utility-meter.php | Fungsi: API setting meter listrik dan air per kamar berbasis MySQL | Author: PPL-UAS */

declare(strict_types=1);

// Memuat CORS, request parser, response JSON, database, dan mapper utility.
require __DIR__ . '/../config/cors.php';
require __DIR__ . '/../lib/Request.php';
require __DIR__ . '/../lib/Response.php';
require __DIR__ . '/../lib/Database.php';
require __DIR__ . '/../lib/ApplicationMapper.php';

// Endpoint ini dipakai admin Detail Kamar untuk input meter dan resident untuk melihat tagihan utility.
$db = Database::connection();
$method = Request::method();

// GET membaca histori meter berdasarkan application_id, room, atau semua data.
if ($method === 'GET') {
    $room = trim((string) ($_GET['room'] ?? ''));
    $applicationId = trim((string) ($_GET['application_id'] ?? ''));
    if ($applicationId !== '') {
        $stmt = $db->prepare('SELECT * FROM utility_meters WHERE application_id = :application_id ORDER BY meter_month DESC, created_at DESC');
        $stmt->execute(['application_id' => $applicationId]);
    } elseif ($room !== '') {
        $stmt = $db->prepare('SELECT * FROM utility_meters WHERE room = :room ORDER BY meter_month DESC, created_at DESC');
        $stmt->execute(['room' => $room]);
    } else {
        $stmt = $db->query('SELECT * FROM utility_meters ORDER BY meter_month DESC, created_at DESC');
    }
    Response::json(['success' => true, 'data' => array_map([ApplicationMapper::class, 'utilityToApi'], $stmt->fetchAll())]);
}

// POST/PATCH digunakan untuk membuat atau memperbarui meter bulanan.
if ($method !== 'POST' && $method !== 'PATCH') Response::error('Method tidak diizinkan', 405);

// Membaca input JSON dari form meter di Detail Kamar.
$input = Request::input();
$room = trim((string) ($input['room'] ?? ''));
if ($room === '') Response::error('room wajib diisi', 422);

// Normalisasi nilai meter dan tarif agar tidak negatif.
$month = trim((string) ($input['month'] ?? date('Y-m')));
$id = (string) ($input['id'] ?? ($room . '-' . $month));
$electricKwh = max(0, (float) ($input['electricKwh'] ?? $input['electric_kwh'] ?? 0));
$waterM3 = max(0, (float) ($input['waterM3'] ?? $input['water_m3'] ?? 0));
$electricRate = max(0, (float) ($input['electricRate'] ?? $input['electric_rate'] ?? 1500));
$waterRate = max(0, (float) ($input['waterRate'] ?? $input['water_rate'] ?? 8000));
$fixedFee = max(0, (float) ($input['fixedFee'] ?? $input['fixed_fee'] ?? 0));
$electricAmount = (int) round($electricKwh * $electricRate);
$waterAmount = (int) round($waterM3 * $waterRate);
$totalAmount = (int) round($electricAmount + $waterAmount + $fixedFee);

// Upsert meter: kombinasi id room-bulan bisa diupdate tanpa duplikasi baris.
$stmt = $db->prepare('INSERT INTO utility_meters (
    id, application_id, resident_name, room, meter_month, electric_kwh, water_m3, electric_rate, water_rate,
    fixed_fee, electric_amount, water_amount, total_amount, status
) VALUES (
    :id, :application_id, :resident_name, :room, :meter_month, :electric_kwh, :water_m3, :electric_rate, :water_rate,
    :fixed_fee, :electric_amount, :water_amount, :total_amount, :status
) ON DUPLICATE KEY UPDATE
    application_id = VALUES(application_id), resident_name = VALUES(resident_name), room = VALUES(room), meter_month = VALUES(meter_month),
    electric_kwh = VALUES(electric_kwh), water_m3 = VALUES(water_m3), electric_rate = VALUES(electric_rate),
    water_rate = VALUES(water_rate), fixed_fee = VALUES(fixed_fee), electric_amount = VALUES(electric_amount),
    water_amount = VALUES(water_amount), total_amount = VALUES(total_amount), status = VALUES(status)');

$stmt->execute([
    'id' => $id,
    'application_id' => ($input['application_id'] ?? '') ?: null,
    'resident_name' => (string) ($input['residentName'] ?? $input['resident_name'] ?? ''),
    'room' => $room,
    'meter_month' => $month,
    'electric_kwh' => $electricKwh,
    'water_m3' => $waterM3,
    'electric_rate' => $electricRate,
    'water_rate' => $waterRate,
    'fixed_fee' => $fixedFee,
    'electric_amount' => $electricAmount,
    'water_amount' => $waterAmount,
    'total_amount' => $totalAmount,
    'status' => (string) ($input['status'] ?? 'Pending'),
]);

// Mengembalikan data meter terbaru dalam format API frontend.
$stmt = $db->prepare('SELECT * FROM utility_meters WHERE id = :id');
$stmt->execute(['id' => $id]);
Response::json(['success' => true, 'data' => ApplicationMapper::utilityToApi($stmt->fetch())]);
