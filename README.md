# Assistant IA Base

Base de démonstration frontend pour un assistant IA. Phase 2 ajoute un backend Express minimal pour servir de base technique.

## Périmètre actuel
- Démo frontend statique (`frontend/index.html`).
- Interface multilingue (FR / EN / NL / DE).
- État connecté / déconnecté simulé uniquement (login / logout en mémoire).
- Backend minimal (`backend/`) : serveur Express sans authentification ni base de données, sans persistance ni logique métier.
  - `GET /health` → `{ status: "ok", phase: "phase-2" }`.
  - `GET /api/info` → `{ name: "AI Assistant", phase: "phase-2", status: "backend baseline active" }`.

## Hors périmètre
- Pas d’authentification réelle.
- Pas de persistance des données ou de base de données.
- Pas de logique métier au-delà des réponses statiques indiquées.

## Documentation
- `docs/ARCHITECTURE.md` : structure du projet et périmètre de la démo.
- `docs/ROADMAP.md` : étapes prévues.
- `docs/I18N.md` et dossiers `docs/fr`, `docs/en`, `docs/nl`, `docs/de` : règles d’internationalisation et traductions alignées.

## Règles multilingues
- Le français est la langue de référence.
- Les autres langues sont des traductions alignées sur la version française.

## Contribution
- Toute modification doit passer par une Pull Request.
