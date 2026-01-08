# Backend — Phase 2 (work in progress)

Ce dossier démarre officiellement la Phase 2 avec un backend minimal et volontairement explicite.

## Rôle
- Serveur Express simple, sans base de données.
- Aucune persistance, aucune logique métier.
- Un seul endpoint de test : `GET /health` renvoie `{ "status": "ok", "phase": "phase-2" }`.
- Endpoint d'info statique : `GET /api/info` renvoie `{ "name": "AI Assistant", "phase": "phase-2", "status": "backend baseline active" }`.
- Endpoint de version statique : `GET /api/version` renvoie `{ "version": "0.1.0", "phase": "phase-2" }`.
- Endpoint de test d'authentification **temporaire, non sécurisé et structure-only** : `GET /api/auth/test` (protégé uniquement par le middleware existant) renvoie `{ "status": "ok", "auth": "passed", "phase": "phase-2" }` quand le header contient un jeton base64-JSON valide (voir section Authentification).
- Base technique uniquement, destinée aux itérations futures.

## Authentification (middleware)
- Middleware `middleware/auth.js` prêt pour les routes protégées (aucune route publique actuelle ne l'utilise).
- Attend un header `Authorization: Bearer <token>`.
- Le `<token>` est un **base64 d'un JSON** contenant trois champs obligatoires : `user_id` (string), `scopes` (array de strings) et `exp` (number). Aucune cryptographie, aucun secret, aucune validation métier : c'est purement une vérification de structure (**structure-only**, **non sécurisé**, **temporaire**).
- Si le header est manquant, mal formé, si le base64 échoue, si le JSON est invalide ou si un champ requis manque/mal typé : 401 JSON `{ "error": "unauthorized", "message": "Authentication required" }`. Le code 403 est réservé mais non utilisé.
- Exemple (token valide) : `echo -n '{"user_id":"demo","scopes":["test"],"exp":123}' | base64` produit un jeton que l'on peut envoyer via `curl -H "Authorization: Bearer <jeton>" http://localhost:3000/api/auth/test` → 200.

## Comportement d'erreur
- Toute route inconnue retourne un JSON 404 : `{ "error": "not_found", "message": "Endpoint not found" }`.
- Les erreurs serveur inattendues retournent un JSON 500 : `{ "error": "internal_error", "message": "Internal server error" }`.

## Usage
- Installer les dépendances dans `backend/`.
- Lancer le serveur : `npm start` (port 3000).
