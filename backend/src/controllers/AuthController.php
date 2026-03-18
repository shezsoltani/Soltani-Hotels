<?php

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../Jwt.php';

class AuthController
{
    private PDO $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    public function login(): void
    {
        $data = json_decode(file_get_contents('php://input'), true) ?? [];
        $username = $data['username'] ?? '';
        $password = $data['password'] ?? '';

        $stmt = $this->db->prepare('SELECT * FROM users WHERE username = :u LIMIT 1');
        $stmt->execute([':u' => $username]);
        $user = $stmt->fetch();

        $stored = $user['password'] ?? '';
        $isBcrypt = is_string($stored) && str_starts_with($stored, '$2y$');
        $ok = $isBcrypt ? password_verify($password, $stored) : hash_equals((string)$stored, (string)$password);

        if (!$user || !$ok) {
            http_response_code(401);
            echo json_encode(['error' => 'Ungültige Zugangsdaten']);
            return;
        }

        $payload = [
            'sub' => $user['id'],
            'username' => $user['username'],
            'role' => $user['role'],
        ];

        $token = Jwt::encode($payload, get_jwt_secret(), 3600 * 4);

        echo json_encode([
            'token' => $token,
            'user' => [
                'id' => $user['id'],
                'username' => $user['username'],
                'role' => $user['role'],
            ],
        ]);
    }

    public function register(): void
    {
        $data = json_decode(file_get_contents('php://input'), true) ?? [];
        $username = trim($data['username'] ?? '');
        $password = $data['password'] ?? '';

        if ($username === '' || $password === '') {
            http_response_code(400);
            echo json_encode(['error' => 'Benutzername und Passwort sind erforderlich']);
            return;
        }

        $stmt = $this->db->prepare('SELECT id FROM users WHERE username = :u LIMIT 1');
        $stmt->execute([':u' => $username]);
        if ($stmt->fetch()) {
            http_response_code(409);
            echo json_encode(['error' => 'Benutzername bereits vergeben']);
            return;
        }

        $hash = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $this->db->prepare('INSERT INTO users (username, password, role, status) VALUES (:u, :p, :r, :s)');
        $stmt->execute([
            ':u' => $username,
            ':p' => $hash,
            ':r' => 'user',
            ':s' => 'active',
        ]);

        http_response_code(201);
        echo json_encode(['message' => 'Registrierung erfolgreich']);
    }

    public static function requireAuth(PDO $db, ?string $role = null): ?array
    {
        $headers = getallheaders();
        $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';

        if (!str_starts_with($authHeader, 'Bearer ')) {
            http_response_code(401);
            echo json_encode(['error' => 'Kein Token']);
            return null;
        }

        $token = substr($authHeader, 7);
        $payload = Jwt::decode($token, get_jwt_secret());

        if (!$payload) {
            http_response_code(401);
            echo json_encode(['error' => 'Ungültiger Token']);
            return null;
        }

        if ($role && ($payload['role'] ?? null) !== $role) {
            http_response_code(403);
            echo json_encode(['error' => 'Keine Berechtigung']);
            return null;
        }

        return $payload;
    }
}

