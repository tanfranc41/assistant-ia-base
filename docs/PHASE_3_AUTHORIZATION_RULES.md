# Phase 3 – Authorization (règles)

## Statut
- Phase Authorization ouverte (implémentation serveur uniquement en cours)
- Scopes vérifiés côté backend conformément au GO

## Objectif
- Définir les règles d’autorisation par scopes
- Servir de référence avant tout code

## Endpoints concernés (protégés)
*(implémentation minimale côté backend)*

- `GET /api/user/profile`
  - Scopes requis : `read:profile`
- `PUT /api/user/profile`
  - Scopes requis : `write:profile`
- `GET /api/conversations`
  - Scopes requis : `read:conversations`
- `POST /api/conversations`
  - Scopes requis : `write:conversations`
- `GET /api/admin/stats`
  - Scopes requis : `admin:read`
- `GET /api/auth/test`
  - Scopes requis : `auth:test` (test temporaire)

## Règles d’autorisation
- Autorisation appliquée côté serveur uniquement
- Le frontend ne décide jamais
- Un endpoint protégé = scopes explicitement listés
- Principe du moindre privilège
- Séparation stricte user / admin

## Hors périmètre
- Aucun choix de bibliothèque RBAC / ABAC
- Aucun stockage ou persistance
- Aucune sécurité production

## Porte de décision
- Implémentation autorisée seulement après :
  - Validation de ce document
  - Mise à jour OpenAPI (dans une étape dédiée)
  - Décision GO explicite “Authorization Implementation”
