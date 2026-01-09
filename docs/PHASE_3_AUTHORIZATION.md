# Phase 3 – Authorization (prêt à démarrer)

## Statut
- Phase Authorization ouverte (documentation)
- Aucune implémentation d’autorisation encore autorisée

## Objectif
- Définir les scopes requis par endpoint protégé
- Préparer la validation avant tout code

## Endpoints concernés (protégés)
*(exemples conceptuels, cohérents avec PHASE_2_PROTECTED_ENDPOINTS.md)*

- `GET /api/user/profile`
  - Scopes requis : `user:read`

- `PUT /api/user/profile`
  - Scopes requis : `user:write`

- `GET /api/conversations`
  - Scopes requis : `conversation:read`

- `POST /api/conversations`
  - Scopes requis : `conversation:write`

- `GET /api/admin/stats`
  - Scopes requis : `admin:read`

## Règles d’autorisation (conceptuelles)
- Autorisation appliquée côté serveur uniquement
- Le frontend ne décide jamais des permissions
- Tout endpoint protégé déclare explicitement ses scopes requis
- Principe du moindre privilège
- Séparation stricte des endpoints utilisateur et administrateur

## Hors périmètre
- Aucun code
- Aucun choix de bibliothèque RBAC / ABAC
- Aucun stockage ou persistance
- Aucune sécurité production

## Porte de décision
- L’implémentation de l’autorisation est autorisée uniquement après :
  - Validation de ce document
  - Mise à jour d’OpenAPI (dans une étape dédiée)
  - Décision GO explicite “Authorization Implementation”
