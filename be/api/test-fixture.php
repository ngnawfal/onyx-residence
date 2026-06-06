<?php
/* Nama File: be/api/test-fixture.php | Fungsi: Fixture aman untuk automated API tests | Author: PPL-UAS */

declare(strict_types=1);

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../lib/Request.php';
require_once __DIR__ . '/../lib/Response.php';
require_once __DIR__ . '/../lib/Database.php';
require_once __DIR__ . '/../lib/Auth.php';

if (!defined('ONYX_FIXTURE_AUTHORIZED')) {
    $fixtureToken = Auth::env('ONYX_TEST_TOKEN');
    $providedToken = (string) ($_GET['token'] ?? ($_SERVER['HTTP_X_TEST_TOKEN'] ?? ''));
    if ($fixtureToken !== '') {
        if (!hash_equals($fixtureToken, $providedToken) && !Auth::isAdmin()) Response::error('Invalid fixture token', 401);
    } elseif (!Auth::isAdmin()) {
        Response::error('Unauthorized fixture access', 401);
    }
}

if (!in_array(Request::method(), ['GET', 'POST'], true)) {
    Response::error('Method tidak diizinkan', 405);
}

$db = Database::connection();
$applicationId = 'APP-ONYX-API-TEST';
$roomCode = 'A01';
$roomLabel = 'A01 - Aurora Compact';

$columns = array_column($db->query('DESCRIBE resident_applications')->fetchAll(), 'Field');
$budgetColumn = in_array('monthly_budget', $columns, true) ? 'monthly_budget' : 'meter_monthly_budget';

$stmt = $db->prepare("INSERT INTO resident_applications (
    id, name, phone, email, nik, address, occupation, room, lease_type, duration, start_date, end_date,
    {$budgetColumn}, deposit, emergency_contact, refund_bank, refund_account, refund_account_name,
    notes, password_hash, application_status, administration_status
) VALUES (
    :id, :name, :phone, :email, :nik, :address, :occupation, :room, :lease_type, :duration, :start_date, :end_date,
    :monthly_budget, :deposit, :emergency_contact, :refund_bank, :refund_account, :refund_account_name,
    :notes, :password_hash, :application_status, :administration_status
) ON DUPLICATE KEY UPDATE
    name=VALUES(name), phone=VALUES(phone), email=VALUES(email), room=VALUES(room), application_status=VALUES(application_status), administration_status=VALUES(administration_status)");

$stmt->execute([
    'id' => $applicationId,
    'name' => 'API Test Resident',
    'phone' => '6280000000001',
    'email' => 'api-test@onyx.local',
    'nik' => '0000000000000001',
    'address' => 'Automated API test fixture',
    'occupation' => 'Tester',
    'room' => $roomLabel,
    'lease_type' => 'Bulanan',
    'duration' => 1,
    'start_date' => date('Y-m-d'),
    'end_date' => date('Y-m-d', strtotime('+1 month')),
    'monthly_budget' => 900000,
    'deposit' => 270000,
    'emergency_contact' => '6280000000002',
    'refund_bank' => 'BCA',
    'refund_account' => '0000000001',
    'refund_account_name' => 'API Test Resident',
    'notes' => 'Created by test-fixture.php',
    'password_hash' => password_hash('resident123', PASSWORD_DEFAULT),
    'application_status' => 'Approved',
    'administration_status' => 'Dikonfirmasi Admin',
]);

$db->prepare('INSERT INTO access_states (application_id, locked, guest_pass, valid_until) VALUES (:id, :locked, :guest_pass, :valid_until) ON DUPLICATE KEY UPDATE locked=VALUES(locked), guest_pass=VALUES(guest_pass), valid_until=VALUES(valid_until)')->execute([
    'id' => $applicationId,
    'locked' => 1,
    'guest_pass' => 'QR-ONYX-TEST',
    'valid_until' => '22:00',
]);

$db->prepare('INSERT INTO access_logs (id, application_id, action, detail, status) VALUES (:id, :application_id, :action, :detail, :status) ON DUPLICATE KEY UPDATE status=VALUES(status)')->execute([
    'id' => 'ACL-ONYX-API-TEST',
    'application_id' => $applicationId,
    'action' => 'Fixture initialized',
    'detail' => 'Automated API testing fixture',
    'status' => 'ready',
]);

Response::json([
    'success' => true,
    'data' => [
        'application_id' => $applicationId,
        'access_application_id' => $applicationId,
        'resident_login' => [
            'username' => 'api-test@onyx.local',
            'password' => 'resident123',
        ],
        'room_code' => $roomCode,
        'room' => $roomLabel,
        'guest_pass' => 'QR-ONYX-TEST',
        'invoice' => 'INV-ONYX-API-TEST',
    ],
]);
