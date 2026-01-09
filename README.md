# Assistant IA Base

Base de démonstration frontend pour un assistant IA, accompagnée d’un backend minimal Phase 2 (Express) avec authentification **structure-only** temporaire.

## Périmètre actuel
- Démo frontend statique (`frontend/index.html`).
- Interface multilingue (FR / EN / NL / DE).
- État connecté / déconnecté simulé uniquement (login / logout en mémoire).
- Backend minimal : endpoints publics (`/health`, `/api/info`, `/api/version`) et endpoints protégés (`/api/user/profile`, `/api/conversations`, `/api/admin/stats`, `/api/auth/test`) derrière un middleware d'auth Base64 JSON (non sécurisé, temporaire) et une autorisation par scopes côté serveur.

## Hors périmètre
- Pas de persistance des données.
- Pas d’authentification ou de sécurité production (jeton non signé, aucune crypto, aucun secret).

## Documentation
- `docs/ARCHITECTURE.md` : structure du projet et périmètre de la démo.
- `docs/ROADMAP.md` : étapes prévues.
- `docs/I18N.md` et dossiers `docs/fr`, `docs/en`, `docs/nl`, `docs/de` : règles d’internationalisation et traductions alignées.

## Règles multilingues
- Le français est la langue de référence.
- Les autres langues sont des traductions alignées sur la version française.

## Contribution
- Toute modification doit passer par une Pull Request.
