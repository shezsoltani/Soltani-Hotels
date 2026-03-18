# Soltani Hotels

Eine kleine Full-Stack Webanwendung rund um Hotelzimmer & Reservierungen – mit getrenntem Frontend (React) und Backend (PHP API) sowie MySQL als Datenbank.

## Schnellstart (Docker)

```bash
cp .env.example .env
docker compose up -d --build
```

| Dienst | Adresse |
|---|---|
| Frontend | `http://localhost:8080` |
| Backend API | `http://localhost:8081/api` |
| phpMyAdmin | `http://localhost:8082` |

Demo-Zugang (Admin):

- User: `admin`
- Passwort: `admin`

## Was kann die App?

- **Gäste**: registrieren/anmelden, Zimmer ansehen, Reservierungen anlegen, eigene Reservierungen sehen, Passwort ändern
- **Admins**: Benutzerübersicht, Reservierungsübersicht (Admin-Dashboard)

## Tech-Stack

- **Frontend**: React, Vite, React Router, Axios, Bootstrap
- **Backend**: PHP 8.2 + Apache, PDO
- **Datenbank**: MySQL 8.0
- **Auth**: JWT (Bearer Token)

## API (Kurzüberblick)

Base URL: `http://localhost:8081/api`

- `POST /auth/login.php`
- `POST /auth/register.php`
- `GET /rooms/index.php`
- `GET|POST /reservations/index.php` (Token nötig)
- `POST /profile/password.php` (Token nötig)
- `GET /admin/users.php` (Admin)
- `GET /admin/reservations.php` (Admin)

## Projektstruktur

```text
.
├─ backend/
│  ├─ api/            # HTTP Endpunkte (PHP Dateien)
│  ├─ config/         # CORS/Headers
│  └─ src/            # DB/JWT/Controller (Shared Logic)
├─ frontend/          # React UI (Vite)
├─ doc/               # Zusatzdokumentation
├─ docker-compose.yml
└─ init.sql
```

## Lokale Entwicklung ohne Docker (optional)

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Backend/DB:

- PHP/Apache lokal bereitstellen
- MySQL lokal starten und Schema aus `init.sql` importieren

## Nützliche Befehle

- Logs: `docker compose logs -f backend` / `docker compose logs -f frontend`
- DB Reset (löscht Daten!): `docker compose down -v`

## Doku

- Architektur: `doc/ARCHITECTURE.md`
- Datenbank: `doc/DATABASE.md`
