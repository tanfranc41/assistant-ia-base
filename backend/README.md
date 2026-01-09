# Backend — Phase 2 (work in progress)

Ce dossier démarre officiellement la Phase 2 avec un backend minimal et volontairement explicite.

## Rôle
- Serveur Express simple, sans base de données.
- Aucune persistance, aucune logique métier.
- Base technique uniquement, destinée aux itérations futures.
- Autorisation par scopes (Phase 3) appliquée côté serveur sur les endpoints protégés.

### Endpoints publics
- `GET /health` → `{ "status": "ok", "phase": "phase-2" }`
- `GET /api/info` → `{ "name": "AI Assistant", "phase": "phase-2", "status": "backend baseline active" }`
- `GET /api/version` → `{ "version": "0.1.0", "phase": "phase-2" }`

### Endpoints protégés (middleware appliqué au groupe `/api`)
- `GET /api/user/profile` → scopes requis : `read:profile`
- `PUT /api/user/profile` → scopes requis : `write:profile`
- `GET /api/conversations` → scopes requis : `read:conversations`
- `POST /api/conversations` → scopes requis : `write:conversations`
- `GET /api/admin/stats` → scopes requis : `admin:read`
- `GET /api/auth/test` → scopes requis : `auth:test` (endpoint de test, temporaire)

## Authentification (middleware)
**Phase 2 gelée : aucun changement du middleware ou de son comportement sans ouverture explicite de phase.**
- Middleware `middleware/auth.js` appliqué aux routes protégées.
- Attend un header `Authorization: Bearer <token>`.
- Le `<token>` est un **base64 d'un JSON** contenant trois champs obligatoires : `user_id` (string), `scopes` (array de strings) et `exp` (number). Aucune cryptographie, aucun secret, aucune validation métier : c'est purement une vérification de structure (**structure-only**, **non sécurisé**, **temporaire**).
- Si le header est manquant, mal formé, si le base64 échoue, si le JSON est invalide ou si un champ requis manque/mal typé : 401 JSON `{ "error": "unauthorized", "message": "Authentication required" }`.
- Si les scopes requis par un endpoint protégé sont absents : 403 JSON `{ "error": "forbidden", "message": "Insufficient scope" }`.
- Exemple (token valide) : `echo -n '{"user_id":"demo","scopes":["read:profile","auth:test"],"exp":123}' | base64` produit un jeton que l'on peut envoyer via `curl -H "Authorization: Bearer <jeton>" http://localhost:3000/api/auth/test` → 200 (les autres endpoints nécessitent le scope correspondant).

## Comportement d'erreur
- Toute route inconnue retourne un JSON 404 : `{ "error": "not_found", "message": "Endpoint not found" }`.
- Les erreurs serveur inattendues retournent un JSON 500 : `{ "error": "internal_error", "message": "Internal server error" }`.

## Usage
- Installer les dépendances dans `backend/`.
- Lancer le serveur : `npm start` (port 3000).
