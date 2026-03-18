<?php

require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../src/config.php';
require_once __DIR__ . '/../../src/Jwt.php';
require_once __DIR__ . '/../../src/controllers/ReservationsController.php';

$db = get_pdo();
$controller = new ReservationsController($db);

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if ($method === 'GET') {
    $controller->listForUser();
    exit;
}
if ($method === 'POST') {
    $controller->create();
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);

