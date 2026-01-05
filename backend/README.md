# Backend — Phase 2 (work in progress)

Ce dossier démarre officiellement la Phase 2 avec un backend minimal et volontairement explicite.

## Rôle
- Serveur Express simple, sans authentification ni base de données.
- Aucune persistance, aucune logique métier.
- Un seul endpoint de test : `GET /health` renvoie `{ "status": "ok", "phase": "phase-2" }`.
- Base technique uniquement, destinée aux itérations futures.

## Usage
- Installer les dépendances dans `backend/`.
- Lancer le serveur : `npm start` (port 3000).
