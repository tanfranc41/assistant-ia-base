# Phase 2 – Décision GO Auth

## Statut
- Décision adoptée
- L’implémentation de l’authentification est autorisée

## Pré-requis validés
- Spécification OpenAPI figée
- Modèle de jeton validé
- Modèle d’autorisation validé
- Fournisseur d’identité décidé
- Modèle de données conceptuel validé
- Checklist d’implémentation Auth validée

## Ce qui devient autorisé
- Implémentation de l’authentification backend
- Validation des jetons
- Protection des endpoints définis
- Gestion des erreurs 401 / 403

## Ce qui reste interdit
- Auth côté frontend
- Secrets en clair
- Déploiement ou configuration prod

## Règle
- Toute implémentation Auth doit respecter strictement OpenAPI et la documentation Phase 2
