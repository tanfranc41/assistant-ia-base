# Backend — Phase 2 (work in progress)

Ce dossier démarre officiellement la Phase 2 avec un backend minimal et volontairement explicite.

## Rôle
- Serveur Express simple, sans base de données.
- Aucune persistance, aucune logique métier.
- Un seul endpoint de test : `GET /health` renvoie `{ "status": "ok", "phase": "phase-2" }`.
- Endpoint d'info statique : `GET /api/info` renvoie `{ "name": "AI Assistant", "phase": "phase-2", "status": "backend baseline active" }`.
- Endpoint de version statique : `GET /api/version` renvoie `{ "version": "0.1.0", "phase": "phase-2" }`.
- Base technique uniquement, destinée aux itérations futures.

## Authentification (middleware)
- Middleware `middleware/auth.js` prêt pour les routes protégées (aucune route publique actuelle ne l'utilise).
- Attend un header `Authorization: Bearer <token>`.
- Valide uniquement la structure : toute chaîne non vide après `Bearer` est acceptée (pas de déchiffrement, pas de JWT, pas de secret).
- En cas d'absence ou de format invalide : 401 JSON `{ "error": "unauthorized", "message": "Authentication required" }`. Le code 403 est réservé mais non utilisé.
- Ce mécanisme est une validation « structure only » et **n'est pas une sécurité réelle**.

## Comportement d'erreur
- Toute route inconnue retourne un JSON 404 : `{ "error": "not_found", "message": "Endpoint not found" }`.
- Les erreurs serveur inattendues retournent un JSON 500 : `{ "error": "internal_error", "message": "Internal server error" }`.

## Usage
- Installer les dépendances dans `backend/`.
- Lancer le serveur : `npm start` (port 3000).
