<?php

header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once __DIR__ . '/../../src/config.php';
require_once __DIR__ . '/../../src/Jwt.php';
require_once __DIR__ . '/../../src/controllers/AuthController.php';
require_once __DIR__ . '/../../src/controllers/RoomsController.php';
require_once __DIR__ . '/../../src/controllers/ReservationsController.php';
require_once __DIR__ . '/../../src/controllers/UsersController.php';

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = str_replace('/api', '', $uri);
$method = $_SERVER['REQUEST_METHOD'];

$db = get_pdo();

switch (true) {
    case $uri === '/login' && $method === 'POST':
        (new AuthController($db))->login();
        break;
    case $uri === '/register' && $method === 'POST':
        (new AuthController($db))->register();
        break;
    case $uri === '/rooms' && $method === 'GET':
        (new RoomsController($db))->list();
        break;
    case $uri === '/reservations' && $method === 'GET':
        (new ReservationsController($db))->listForUser();
        break;
    case $uri === '/reservations' && $method === 'POST':
        (new ReservationsController($db))->create();
        break;
    case $uri === '/admin/reservations' && $method === 'GET':
        (new ReservationsController($db))->listAll();
        break;
    case $uri === '/admin/users' && $method === 'GET':
        (new UsersController($db))->listAll();
        break;
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Not found', 'path' => $uri]);
}

