# Architecture du projet

- **frontend/index.html** : interface de démonstration uniquement, simule l’état connecté/déconnecté ; aucune authentification réelle.
- **backend/** : serveur Express minimal (Phase 2), sans authentification ni base de données, sans persistance.
  - Endpoint `GET /health` → `{ status: "ok", phase: "phase-2" }`.
  - Endpoint `GET /api/info` → `{ name: "AI Assistant", phase: "phase-2", status: "backend baseline active" }`.

## Ce qui est simulé
- Utilisateur de démonstration.
- État connecté/déconnecté stocké côté frontend seulement.
- Réponses backend statiques uniquement pour tests de santé/info.

## Ce qui n’est pas encore implémenté
- Connexion réelle ou gestion des comptes.
- Sécurité (sessions, tokens, stockage).
- Logique métier, persistance ou autres endpoints que ceux documentés.

## Règles à respecter
- Ne pas ajouter d’authentification ou de base de données sans décision de conception.
- Ne pas introduire de logique métier tant que le périmètre n’a pas été validé.
- Toute évolution doit passer par une Pull Request.
