# Endpoint Implementation Plan – GET /api/info

## Purpose
- Expose static API metadata so clients can identify the application and current phase.

## Request
- Method & path: `GET /api/info`
- Parameters: none
- Authentication: none

## Response
- Content type: `application/json`
- Body:
  - `name` (string) — `"AI Assistant"`
  - `phase` (string) — `"phase-2"`
  - `status` (string) — `"backend baseline active"`
- Status codes:
  - `200` on success

## Backend steps (high level)
- Touchpoints:
  - `backend/server.js`
  - `docs/openapi.yaml`
- Logic:
  - Register `GET /api/info` route in Express
  - Return the static JSON object exactly as defined
  - No side effects, no state, no auth

## Validation
- Manual test:
  - `curl http://localhost:3000/api/info`
- Expected result:
  - HTTP `200`
  - JSON body matching the OpenAPI spec (keys and values only, order irrelevant)

## Out of scope
- Any dynamic data
- Authentication or authorization
- Database access or persistence
- Additional fields or status codes

## Constraints
- Documentation only
- No code changes
- No edits to existing files
