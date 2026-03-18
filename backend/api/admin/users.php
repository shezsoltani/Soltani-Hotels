<?php

require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../src/config.php';
require_once __DIR__ . '/../../src/Jwt.php';
require_once __DIR__ . '/../../src/controllers/UsersController.php';

$db = get_pdo();

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if ($method !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

(new UsersController($db))->listAll();

