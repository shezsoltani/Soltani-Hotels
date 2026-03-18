## Architektur-Überblick

Dieses Projekt besteht aus drei Komponenten:

- **Frontend** (`frontend/`): React App (Vite), kommuniziert per HTTP mit der API.
- **Backend** (`backend/`): PHP API (Apache), stellt Endpunkte unter `/api/...` bereit.
- **Datenbank**: MySQL, wird beim ersten Start über `init.sql` initialisiert.

### Request Flow (Kurz)

1. Frontend sendet Requests an `http://localhost:8081/api/...`
2. Das Backend verarbeitet die Anfrage:
   - Public Endpoints (z.B. Zimmerliste) ohne Token
   - Geschützte Endpoints erwarten `Authorization: Bearer <JWT>`
3. Datenzugriff erfolgt über PDO auf MySQL.

### Authentifizierung

- Login liefert einen JWT-Token.
- Der Token wird im Frontend im `localStorage` gespeichert und bei Requests automatisch als `Authorization` Header gesendet.

