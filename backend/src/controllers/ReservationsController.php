<?php

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/AuthController.php';

class ReservationsController
{
    private PDO $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    public function listForUser(): void
    {
        $user = AuthController::requireAuth($this->db);
        if (!$user) {
            return;
        }

        $stmt = $this->db->prepare('SELECT * FROM reservations WHERE user_id = :uid ORDER BY created_at DESC');
        $stmt->execute([':uid' => $user['sub']]);

        echo json_encode($stmt->fetchAll());
    }

    public function create(): void
    {
        $user = AuthController::requireAuth($this->db);
        if (!$user) {
            return;
        }

        $data = json_decode(file_get_contents('php://input'), true) ?? [];

        $stmt = $this->db->prepare('INSERT INTO reservations 
            (user_id, check_in_date, check_out_date, room_id, breakfast, parking, pets, status) 
            VALUES (:uid, :cin, :cout, :rid, :b, :p, :pets, :status)');

        $stmt->execute([
            ':uid' => $user['sub'],
            ':cin' => $data['check_in_date'] ?? null,
            ':cout' => $data['check_out_date'] ?? null,
            ':rid' => $data['room_id'] ?? null,
            ':b' => !empty($data['breakfast']) ? 1 : 0,
            ':p' => !empty($data['parking']) ? 1 : 0,
            ':pets' => !empty($data['pets']) ? 1 : 0,
            ':status' => 'neu',
        ]);

        http_response_code(201);
        echo json_encode(['message' => 'Reservierung angelegt']);
    }

    public function listAll(): void
    {
        $user = AuthController::requireAuth($this->db, 'admin');
        if (!$user) {
            return;
        }

        $stmt = $this->db->query('SELECT * FROM reservations ORDER BY created_at DESC');
        echo json_encode($stmt->fetchAll());
    }
}

