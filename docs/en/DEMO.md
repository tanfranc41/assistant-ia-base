# DEMO

## What the demo shows
- Single frontend interface with language selector and user card.
- Switch between guest/demo and display logged-in/logged-out state.
- Static messages to illustrate notices and titles.

## What is simulated
- Language change fully on the frontend, no network or persistence.
- Username and a fake token kept in memory.
- Logout simply clears the local state.

## Out of scope
- Real authentication, account management, or token validation.
- Backend, API, database, or persistent storage.
- Production-grade security, observability, and performance.

## This is not a product
- Frozen demo: no frontend/backend evolution until scope is validated.
- Do not use in production or with real data.
- Behavior may change or be removed with no backward-compatibility guarantee.
