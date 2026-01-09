# Architecture du projet

- **frontend/index.html** : interface de démonstration statique (multi-langue), état connecté/déconnecté simulé en mémoire uniquement.
- **backend/** : mini serveur Express **Phase 2** avec endpoints publics (`/health`, `/api/info`, `/api/version`) et un endpoint protégé de test (`/api/auth/test`) derrière un middleware d’auth Base64 JSON (structure-only, non sécurisé).

## Ce qui est simulé
- Utilisateur de démonstration côté frontend.
- État connecté/déconnecté stocké côté frontend seulement.
- Authentification backend limitée à une vérification de structure du jeton (pas de crypto, pas de persistance).

## Ce qui n’est pas encore implémenté
- Connexion réelle ou gestion des comptes.
- Sécurité (sessions, tokens signés, stockage).
- Endpoints métiers décrits pour la Phase 3 (profils, préférences, conversations…) : uniquement documentés.

## Règles à respecter
- Ne pas ajouter de persistance ni de sécurité production sans décision explicite.
- Toute évolution doit passer par une Pull Request.
