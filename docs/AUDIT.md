# Audit global chronologique

## 1. Origine du projet
- Intention initiale : fournir une démo d’assistant IA centrée sur une interface statique multilingue (README.md, docs/ARCHITECTURE.md, docs/fr/DEMO.md).
- Périmètre de départ : frontend uniquement, sans backend, sans authentification réelle, sans persistance (docs/ARCHITECTURE.md, docs/LOCK.md).
- Frontend / backend : séparation déclarée ; backend d’abord laissé vide par choix (docs/ARCHITECTURE.md).
- Objectif de démonstration : montrer l’UI, le changement de langue et un état connecté/déconnecté simulé (frontend/index.html, docs/I18N.md et dossiers de traduction).

## 2. Phase 1 – État initial
- Ce qui existait : page statique, traductions FR/EN/NL/DE alignées, manifest + service worker pour la vitrine, aucune logique serveur (frontend/*, docs/de|en|fr|nl/DEMO.md).
- Ce qui était volontairement absent : authentification, API, stockage, appels IA, paiement (docs/LOCK.md, docs/PHASE_2_EXPLAINED.md).
- Décisions prises : français langue de référence, documentation-first, évolutions via Pull Request uniquement (README.md, docs/DECISIONS.md, docs/LOCK.md).

## 3. Phase 2 – Construction du socle
- Mise en place du backend minimal : serveur Express dans backend/server.js ; endpoints publics `GET /health`, `GET /api/info`, `GET /api/version` (backend/README.md).
- Endpoints publics : réponses JSON indiquant statut, phase et version (backend/server.js).
- Documentation API-first : fichier docs/openapi.yaml, plans d’endpoint (docs/PHASE_2_ENDPOINT_*_PLAN.md), checklists de conformité (docs/PHASE_2_API_*).
- Décisions d’authentification : approche token Bearer stateless, format base64 JSON défini, absence de crypto ni de secrets (docs/PHASE_2_TOKEN_FORMAT.md, docs/PHASE_2_AUTHENTICATION_DESIGN.md).
- Ce qui a été implémenté : middleware d’auth structure-only appliqué aux routes protégées `/api` et endpoint de test `GET /api/auth/test` (backend/middleware/auth.js, backend/server.js).
- Ce qui a été explicitement refusé : aucune persistance, aucune sécurité production, pas de logique métier, pas d’autorisation effective, pas de déploiement (backend/README.md, docs/PHASE_2_BACKEND_BASELINE.md, docs/PHASE_2_SUMMARY.md).

## 4. Authentification – évolution complète
- Étapes successives : cadrage conceptuel (docs/PHASE_2_AUTHENTICATION_DESIGN.md) → décision GO pour implémenter une version minimale (docs/PHASE_2_AUTH_GO.md) → middleware structure-only livré (backend/middleware/auth.js).
- Middleware structure-only : vérifie uniquement la présence et la structure du token, retourne 401 sinon, aucun 403 implémenté (backend/middleware/auth.js).
- Token base64 JSON : champs obligatoires `user_id` (string), `scopes` (array de strings), `exp` (number) ; pas de signature ni de secret (docs/PHASE_2_TOKEN_FORMAT.md).
- Endpoints protégés : groupe `/api` protégé, avec `GET /api/auth/test` comme endpoint de test (backend/server.js).
- Ce qui est gelé aujourd’hui : middleware et format de jeton déclarés « figés » en Phase 2 (backend/README.md, docs/PHASE_2_SUMMARY.md).
- Pourquoi ce gel existe : sécuriser le périmètre démo et éviter toute dérive sans ouverture explicite d’une nouvelle phase (docs/LOCK.md, docs/PHASE_NEXT.md).

## 5. Pull Requests MERGÉES
- PR #87 « Document Phase 3 authorization rules » (commit e85c861) : merge ayant introduit la base actuelle (backend Express minimal, middleware auth structure-only, frontend démo multilingue, manifest + service worker, documentation complète Phase 2 et cadrage Phase 3). Phase concernée : fin Phase 2 / ouverture documentaire Phase 3.

## 6. Pull Requests NON MERGÉES
- Aucune Pull Request ouverte, draft ou abandonnée n’est observable dans l’historique local du dépôt ; seul le merge de la PR #87 est présent (git log local).

## 7. Phase actuelle
- Phase en cours : Phase 2 gelée avec cadrage de la phase Authorization (Phase 3) uniquement au niveau documentaire (docs/PHASE_NEXT.md, docs/PHASE_3_AUTHORIZATION*.md).
- Ce qui est autorisé : documentation, cadrage des règles d’autorisation, maintien du backend minimal existant sans changement de comportement (docs/PHASE_NEXT.md).
- Ce qui est strictement interdit : modifier le middleware Auth Phase 2, ajouter persistance ou sécurité production, implémenter autorisation effective ou déploiement (docs/PHASE_NEXT.md, docs/PHASE_2_SUMMARY.md).

## 8. Gouvernance et règles
- Décisions figées : français langue de référence, doc-first, évolutions via PR, séparation frontend/backend, principe de moindre privilège côté serveur (README.md, docs/DECISIONS.md, docs/LOCK.md, docs/PHASE_3_AUTHORIZATION.md).
- Règles de modification : tout changement nécessite mise à jour documentaire et validation de phase ; endpoints nouveaux doivent passer par OpenAPI et plans dédiés (docs/PHASE_2_ENDPOINT_RULES.md, docs/PHASE_2_SUMMARY.md).
- Conditions pour ouvrir une nouvelle phase : décision explicite, validation des documents de cadrage, checklist complétée (docs/PHASE_2_GO_NO_GO.md, docs/PHASE_NEXT.md).

## 9. État final du projet (photo actuelle)
- Backend : Express minimal actif, endpoints `/health`, `/api/info`, `/api/version`, `/api/auth/test` derrière middleware structure-only ; pas de base de données ni de logique métier.
- Authentification : token Bearer base64 JSON, validation structurelle uniquement, gelée en Phase 2.
- Autorisation : aucune implémentation ; règles conceptuelles listées pour Phase 3 (docs/PHASE_3_AUTHORIZATION*.md).
- Frontend : page statique multilingue, état connecté/déconnecté simulé, assets PWA présents, aucune intégration serveur.
- Documentation : volumineuse et centrée Phase 2/3 (OpenAPI, checklists, décisions, règles d’i18n) ; certains documents hérités mentionnent encore un backend vide, écart constaté par rapport au code actuel.

## 10. Prochaines options possibles
- Continuer : lever le gel via une nouvelle phase pour faire évoluer l’auth ou l’autorisation.
- Geler : conserver le socle actuel en mode démonstration documentée.
- Auditer : vérifier la cohérence entre documents hérités et code backend désormais présent.
- Changer de phase : ouvrir explicitement la phase Authorization (implémentation) ou la phase Persistance après validation documentaire.
