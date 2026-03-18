<?php

require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../src/config.php';
require_once __DIR__ . '/../../src/controllers/RoomsController.php';

$db = get_pdo();
(new RoomsController($db))->list();

