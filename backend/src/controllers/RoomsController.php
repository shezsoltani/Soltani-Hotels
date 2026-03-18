<?php

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/AuthController.php';

class RoomsController
{
    private PDO $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    public function list(): void
    {
        $from = $_GET['from'] ?? null;
        $to = $_GET['to'] ?? null;

        $sql = 'SELECT * FROM rooms';
        $params = [];

        if ($from && $to) {
            $sql .= ' WHERE available_from <= :from AND available_to >= :to';
            $params[':from'] = $from;
            $params[':to'] = $to;
        }

        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);

        echo json_encode($stmt->fetchAll());
    }
}

