# Phase 2 – Règles post-authentification

## Statut
- Authentification technique minimale en place
- Implémentation toujours non sécurisée et temporaire

## Ce que l’authentification permet désormais
- Identifier un utilisateur de manière conceptuelle
- Accéder à des endpoints protégés (selon documentation)
- Transmettre un contexte utilisateur minimal (user_id, scopes)
- Préparer les règles d’autorisation futures

## Ce qui reste strictement interdit
- Toute logique métier réelle
- Toute persistance (base de données, fichiers, cache)
- Toute décision de sécurité réelle
- Toute validation de droits avancée
- Toute utilisation frontend de l’auth

## Règles obligatoires
- Tout nouvel endpoint protégé doit être documenté avant implémentation
- Toute règle d’autorisation doit être définie avant code
- Aucune évolution sans décision explicite de phase

## Porte de décision suivante
- Passage à la phase “Authorization réelle”
- Passage à la phase “Persistance”
- Ou gel volontaire
