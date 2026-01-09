# Backend — Phase 3 (authorization)

Ce dossier démarre officiellement la Phase 3 avec un backend minimal et volontairement explicite.

## Rôle
- Serveur Express simple, sans base de données.
- Aucune persistance, aucune logique métier.
- Base technique uniquement, destinée aux itérations futures.

### Endpoints publics
- `GET /health` → `{ "status": "ok", "phase": "phase-3" }`
- `GET /api/info` → `{ "name": "AI Assistant", "phase": "phase-3", "status": "backend authorization active" }`
- `GET /api/version` → `{ "version": "0.1.0", "phase": "phase-3" }`

### Endpoints protégés (middleware Auth + contrôle de scopes appliqués au groupe `/api`)
- `GET /api/user/profile` → scopes requis : `read:profile`
- `PUT /api/user/profile` → scopes requis : `write:profile`
- `GET /api/user/preferences` → scopes requis : `read:preferences`
- `PUT /api/user/preferences` → scopes requis : `write:preferences`
- `GET /api/conversations` → scopes requis : `read:conversations`
- `POST /api/conversations` → scopes requis : `write:conversations`
- `GET /api/conversations/:id` → scopes requis : `read:conversations`
- `DELETE /api/conversations/:id` → scopes requis : `write:conversations`
- `GET /api/conversations/:id/messages` → scopes requis : `read:messages`
- `POST /api/conversations/:id/messages` → scopes requis : `write:messages`
- `GET /api/admin/users` → scopes requis : `admin:users`
- `GET /api/admin/stats` → scopes requis : `admin:read`
- `PUT /api/admin/users/:id/status` → scopes requis : `admin:users`

## Authentification (middleware)
**Phase 2 gelée : aucun changement du middleware ou de son comportement sans ouverture explicite de phase.**
- Middleware `middleware/auth.js` appliqué aux routes protégées.
- Attend un header `Authorization: Bearer <token>`.
- Le `<token>` est un **base64 d'un JSON** contenant trois champs obligatoires : `user_id` (string), `scopes` (array de strings) et `exp` (number). Aucune cryptographie, aucun secret, aucune validation métier : c'est purement une vérification de structure (**structure-only**, **non sécurisé**, **temporaire**).
- Si le header est manquant, mal formé, si le base64 échoue, si le JSON est invalide ou si un champ requis manque/mal typé : 401 JSON `{ "error": "unauthorized", "message": "Authentication required" }`.
- Exemple (token valide) : `echo -n '{"user_id":"demo","scopes":["read:profile"],"exp":123}' | base64` produit un jeton que l'on peut envoyer via `curl -H "Authorization: Bearer <jeton>" http://localhost:3000/api/user/profile` → 200.

## Autorisation (Phase 3)
- Les scopes requis sont déclarés sur chaque endpoint protégé via un middleware d'autorisation.
- Si les scopes requis sont absents : 403 JSON `{ "error": "forbidden", "message": "Insufficient scope" }`.
- L'autorisation reste **serveur uniquement**, sans persistance ni logique métier.

## Comportement d'erreur
- Toute route inconnue retourne un JSON 404 : `{ "error": "not_found", "message": "Endpoint not found" }`.
- Les erreurs serveur inattendues retournent un JSON 500 : `{ "error": "internal_error", "message": "Internal server error" }`.

## Usage
- Installer les dépendances dans `backend/`.
- Lancer le serveur : `npm start` (port 3000).
