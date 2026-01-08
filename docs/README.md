# Documentation du projet

Le dossier `docs/` rassemble l’ensemble de la documentation du projet.

## Documents disponibles
- `ARCHITECTURE.md` : structure du projet et périmètre de la démo.
- `ROADMAP.md` : étapes futures prévues.
- `fr/I18N.md` (et traductions) : règles d’internationalisation pour la démo frontend.

## Organisation multilingue
- La documentation existe en `fr`, `en`, `nl`, `de`.
- Le français est la langue de référence.

## Règles importantes
- Frontend de démonstration uniquement côté UI.
- Backend minimal Phase 2 présent (health/info/version publics + `/api/auth/test` protégé par middleware auth structure-only Base64 JSON).
- Authentification non sécurisée, temporaire et gelée : aucune modification du middleware ou nouveaux comportements sans changement de phase explicite.
- Pas de persistance ni de sécurité production.
- Toute modification doit passer par une Pull Request.
