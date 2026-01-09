# État des lieux (09/01/2026)

## 1) Phase actuelle réelle
- **Phase 2 (baseline)** : backend Express minimal actif avec middleware d’auth “structure-only” et endpoints publics `/health`, `/api/info`, `/api/version`, plus `/api/auth/test` protégé.
- Frontend : démo statique multi-langue, état connecté/déconnecté en mémoire sans appels réseau.
- Phase 3 (autorisation avancée, endpoints métier) : **non implémentée en code**, uniquement présente dans la documentation et la spécification OpenAPI.

## 2) Implémenté en code
- Frontend `frontend/index.html` : carte UI, sélecteur de langue (EN/FR/NL/DE), génération d’un pseudo-token en mémoire, bouton logout qui réinitialise l’état simulé ; pas d’appels API ni de stockage.
- Backend `backend/server.js` + `middleware/auth.js` :
  - Endpoints publics : `/health`, `/api/info`, `/api/version` (réponses JSON statiques phase-2).
  - Endpoint protégé : `/api/auth/test` derrière un middleware qui vérifie un jeton Base64 JSON `{ user_id, scopes[], exp }` (structure-only, non sécurisé).
  - Gestion des 404 et 500 génériques.

## 3) Uniquement documenté (pas de code)
- Phase 3 autorisation et endpoints métiers (profils, préférences, conversations, messages, admin) décrits dans `docs/openapi.yaml` et les documents `PHASE_3_*`.
- Approche API-first et identité fournisseur (`PHASE_2_API_FIRST.md`, `PHASE_2_IDENTITY_PROVIDER*.md`) sans implémentation.
- Divers guides de phase (AUDIT, DECISIONS, GO/NO-GO, CHECKLIST) sans impact code.

## 4) Incohérences code ↔ documentation
- Anciennes mentions d’un backend “absent” (corrigé ici : le backend minimal existe depuis la Phase 2).
- Spécification OpenAPI et docs Phase 3 listent des endpoints protégés et des règles d’autorisation qui **n’existent pas** dans le code actuel.
- Certains documents (OVERVIEW) indiquent “aucune implémentation en cours” alors que le backend minimal Phase 2 est présent.

## 5) Intentions des dernières PR fermées (récentes)
- **#89** : proposer l’implémentation d’autorisation Phase 3 côté backend (scopes, 403) — non reflété dans le code actuel.
- **#55** : rendre visible le cadrage “API First” (documentation uniquement).
- **#53** : documenter le baseline backend Phase 2 (health/info/version).
- **#20** : audit du dépôt et plan de remise au propre.
- (Plus ancien) **#17** : lier le login frontend à un appel protégé (non présent dans le frontend actuel).

## 6) Prochaine étape logique (sans ajouter de nouvelles fonctionnalités)
- Aligner la documentation sur l’état réel Phase 2 : distinguer clairement ce qui est implémenté (backend minimal + frontend démo) de ce qui reste théorique (Phase 3, API First étendue).
- Décider explicitement si l’on **poursuit Phase 2** (stabilisation/qualité, tests) ou si l’on ouvre une **implémentation réelle Phase 3** ; dans tous les cas, nettoyer l’OpenAPI pour qu’elle reflète soit le code, soit un backlog assumé.
