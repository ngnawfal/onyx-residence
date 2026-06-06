<?php
/* Nama File: be/api/fixture.php | Fungsi: Fixture aman untuk automated API tests | Author: PPL-UAS */

require __DIR__ . '/../config/cors.php';
require __DIR__ . '/../lib/Response.php';
require __DIR__ . '/../lib/Auth.php';

$fixtureToken = Auth::env('ONYX_TEST_TOKEN');
$providedToken = (string) ($_GET['token'] ?? ($_SERVER['HTTP_X_TEST_TOKEN'] ?? ''));

if ($fixtureToken !== '') {
    if (!hash_equals($fixtureToken, $providedToken) && !Auth::isAdmin()) Response::error('Invalid fixture token', 401);
} elseif (!Auth::isAdmin()) {
    Response::error('Unauthorized fixture access', 401);
}

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST') {
    Auth::requireCsrf();
}

define('ONYX_FIXTURE_AUTHORIZED', true);
require __DIR__ . '/test-fixture.php';
