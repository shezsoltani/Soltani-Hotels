## Datenbank

Die Datenbank wird über `init.sql` erstellt und enthält folgende Tabellen:

### `users`

- `id` (PK)
- `username`
- `password`
- `role` (`admin` | `user`)
- `status` (`active` | `inactive`)

### `rooms`

- `id` (PK)
- `room_number`
- `room_type`
- `price`
- `available_from`
- `available_to`

### `reservations`

- `id` (PK)
- `user_id` (FK → `users.id`)
- `check_in_date`, `check_out_date`
- `room_id`
- `breakfast`, `parking`, `pets`
- `created_at`
- `status`

