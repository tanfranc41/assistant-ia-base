# Phase 2 – Format de jeton (conceptuel)

## Statut
- Phase de conception uniquement
- Aucune implémentation autorisée

## Type de jeton
- Jeton sans état (stateless token)
- Jeton de type Bearer
- Aucune session stockée côté serveur

## Champs conceptuels du payload (noms uniquement)
- token_id
- user_id
- issued_at
- expires_at
- scopes / roles
- issuer
- version

## Principes de sécurité
- Jetons d'accès de courte durée
- Expiration explicite
- Aucune donnée sensible dans le payload du jeton

## Hors périmètre explicite
- Algorithmes cryptographiques
- Clés de signature ou secrets
- Implémentation de jetons de rafraîchissement (refresh token)
- Tout code

## Porte de décision
- Ce document doit être validé avant :
  - Protéger tout endpoint API
  - Implémenter toute logique d'authentification
