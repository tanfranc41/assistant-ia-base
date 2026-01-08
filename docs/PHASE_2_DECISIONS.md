# Phase 2 – Journal de décisions

## Statut
- Phase 2 Auth implémentée pour validation technique (middleware structure-only) et **gelée**
- Phase suivante ciblée : **Authorization** (règles/scopes)

## Décisions actées (authentification)
- Middleware Express `Authorization: Bearer <base64-JSON>` vérifiant uniquement la structure (`user_id` string, `scopes[]` strings, `exp` number) pour les endpoints protégés
- Endpoints publics et protégés séparés (`/health`, `/api/info`, `/api/version` publics ; `/api/auth/test` protégé)
- Auth stateless, sans secret ni cryptographie

## Décisions à prendre plus tard
- Choix d’architecture backend et fournisseur d'identité
- Durée de vie des tokens / signature réelle
- Modèle de rôles et permissions effectif (phase Authorization)
- Approche de persistance des données
- Principes de sécurité production

## Explicitement interdit pour l’instant
- Modification du middleware Auth Phase 2 sans ouverture de phase
- Ajout de secrets, cryptographie ou persistance
- Toute configuration de déploiement ou d'hébergement

## Porte de décision
- La phase Authorization peut démarrer (travail sur scopes/règles)
- Les évolutions de persistance ou de sécurité production nécessitent une nouvelle décision explicite
