# Endpoint Implementation Plan – GET /health

## Purpose
- Expose a simple liveness check so clients and infrastructure can verify the backend is running and identify the current phase.

## Request
- **Method & path:** `GET /health`
- Parameters: none (no path, query, or body fields)
- Authentication: none

## Response
- Content type: `application/json`
- Body shape:
  - `status` (string) — e.g., `"ok"`
  - `phase` (string) — e.g., `"phase-2"`
- Status codes:
  - `200` on success with the JSON payload above

## Backend steps (high level)
- Touchpoints:
  - `backend/server.js` (Express server entry point)
  - `docs/openapi.yaml` (contract reference to align response keys/values)
- Logic to implement:
  - Register an Express `GET /health` route.
  - Respond with the static JSON object `{ status: 'ok', phase: 'phase-2' }`.
  - Ensure the response is sent with default JSON headers (`res.json(...)` handles content-type and serialization).
  - Keep behavior stateless and side-effect free.

## Validation
- Manual check: start backend (`cd backend && npm install && npm start`), then run `curl -i http://localhost:3000/health`.
- Expected result: HTTP `200` with body `{"status":"ok","phase":"phase-2"}` (ordering may vary but keys and values must match).
- Confirm no extra fields are present and no authentication is required.

## Out of scope
- Adding new endpoints, parameters, or headers.
- Introducing authentication, persistence, metrics, or health subchecks.
- Returning additional status codes or modifying the JSON schema defined in `docs/openapi.yaml`.
