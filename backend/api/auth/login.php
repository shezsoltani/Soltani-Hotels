<?php

require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../src/config.php';
require_once __DIR__ . '/../../src/Jwt.php';
require_once __DIR__ . '/../../src/controllers/AuthController.php';

$db = get_pdo();
(new AuthController($db))->login();

