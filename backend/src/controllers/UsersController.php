<?php

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/AuthController.php';

class UsersController
{
    private PDO $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    public function listAll(): void
    {
        $user = AuthController::requireAuth($this->db, 'admin');
        if (!$user) {
            return;
        }

        $stmt = $this->db->query('SELECT id, username, role, status FROM users ORDER BY id ASC');
        echo json_encode($stmt->fetchAll());
    }
}

