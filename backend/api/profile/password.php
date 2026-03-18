<?php

require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../src/config.php';
require_once __DIR__ . '/../../src/Jwt.php';
require_once __DIR__ . '/../../src/controllers/AuthController.php';

$db = get_pdo();
$user = AuthController::requireAuth($db);
if (!$user) {
    exit;
}

$data = json_decode(file_get_contents('php://input'), true) ?? [];
$old = $data['old_password'] ?? '';
$new = $data['new_password'] ?? '';

if ($old === '' || $new === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Altes und neues Passwort sind erforderlich']);
    exit;
}

$stmt = $db->prepare('SELECT password FROM users WHERE id = :id LIMIT 1');
$stmt->execute([':id' => $user['sub']]);
$stored = (string)($stmt->fetchColumn() ?: '');

$isBcrypt = str_starts_with($stored, '$2y$');
$ok = $isBcrypt ? password_verify($old, $stored) : hash_equals($stored, $old);
if (!$ok) {
    http_response_code(401);
    echo json_encode(['error' => 'Altes Passwort ist falsch']);
    exit;
}

$hash = password_hash($new, PASSWORD_BCRYPT);
$upd = $db->prepare('UPDATE users SET password = :p WHERE id = :id');
$upd->execute([':p' => $hash, ':id' => $user['sub']]);

echo json_encode(['message' => 'Passwort erfolgreich aktualisiert!']);

