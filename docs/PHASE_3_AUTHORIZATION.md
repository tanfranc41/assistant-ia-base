# Phase 3 – Authorization : règles (conceptuelles)

## Statut
- Décision GO actée pour l’implémentation serveur uniquement
- Phase Authorization en implémentation contrôlée (scopes vérifiés côté backend)

## Principe général
- Un endpoint protégé déclare explicitement les scopes requis
- Tous les scopes requis sont cumulatifs (logique AND)
- Aucune décision implicite

## Règles générales d’autorisation
- L’autorisation est appliquée côté serveur uniquement
- Le frontend ne décide jamais des permissions
- Principe du moindre privilège
- Séparation stricte des endpoints utilisateur et administrateur
- Aucun héritage automatique de scopes

## Endpoints protégés implémentés (serveur uniquement)
- `GET /api/user/profile` → scopes requis : `read:profile`
- `PUT /api/user/profile` → scopes requis : `write:profile`
- `GET /api/conversations` → scopes requis : `read:conversations`
- `POST /api/conversations` → scopes requis : `write:conversations`
- `GET /api/admin/stats` → scopes requis : `admin:read`
- `GET /api/auth/test` → scopes requis : `auth:test` (test temporaire)

## Hors périmètre explicite
- Aucun choix RBAC / ABAC
- Aucun stockage ou persistance
- Aucune sécurité production

## Porte de décision
- L’implémentation de l’autorisation est interdite tant que :
  - Ce document n’est pas validé
  - Une décision GO explicite “Authorization Implementation” n’est pas actée
