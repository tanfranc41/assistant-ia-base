# Phase 2 – Format de jeton (conceptuel)

## Statut
- Implémentation minimale **structure-only** en place (middleware backend)
- Non sécurisé, temporaire, figé pour la Phase 2

## Type de jeton
- Jeton sans état (stateless token)
- Jeton de type Bearer
- Aucune session stockée côté serveur

## Champs obligatoires (structure seulement)
- `user_id` : string non vide
- `scopes` : tableau de strings non vides
- `exp` : nombre > 0

## Format attendu
- Header HTTP : `Authorization: Bearer <token>`
- `<token>` : Base64 d'un JSON contenant uniquement les champs ci-dessus
- Aucune validation de signature, aucune cryptographie, aucune vérification métier

## Principes de sécurité
- Jetons d'accès de courte durée
- Expiration explicite
- Aucune donnée sensible dans le payload du jeton

## Hors périmètre explicite
- Algorithmes cryptographiques
- Clés de signature ou secrets
- Implémentation de jetons de rafraîchissement (refresh token)
- Tout code
- Toute évolution du format sans changement explicite de phase

## Porte de décision
- Toute modification du format ou ajout de champs nécessite un changement explicite de phase
