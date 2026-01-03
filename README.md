# Assistant IA Base

Minimal Node.js backend authentication service with in-memory users and JWT.

## Development

```bash
JWT_SECRET=dev-secret npm install
JWT_SECRET=dev-secret npm start
```

Environment:
- `PORT` (optional) to change the port (defaults to `3000`)
- `JWT_SECRET` (required) secret used to sign tokens
- Users are stored in memory and reset every time the server restarts.

## API

- `POST /api/auth/register` with `{ "username": "...", "password": "..." }`
- `POST /api/auth/login` with `{ "username": "...", "password": "..." }`

Responses:
- Register: `201 { "message": "User registered" }`
- Login: `200 { "token": "<jwt>" }`

Passwords must be at least 8 characters and include upper, lower, numeric, and special characters. Usernames allow letters, numbers, and underscores.
