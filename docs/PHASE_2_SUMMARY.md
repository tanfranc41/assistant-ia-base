# Phase 2 – Synthèse globale

## État actuel
- La démo de la Phase 1 est terminée et figée
- Socle backend minimal Phase 2 actif (Express, endpoints publics `GET /health`, `GET /api/info`, `GET /api/version`)
- Middleware d'authentification Phase 2 en place et **gelé** (structure-only, Base64 JSON) protégeant `GET /api/auth/test`
- Pas de logique métier ni de persistance implémentées

## Ce qui est déjà défini
- Approche API-first validée
- Spécification OpenAPI créée et figée
- Séparation explicite des endpoints publics et protégés
- Format de jeton structure-only (Base64 d'un JSON contenant `user_id`, `scopes[]`, `exp`)
- Gestion des erreurs documentée (404 / 500)
- Modèle d'autorisation (rôles/scopes, conceptuel)
- Modèle de données conceptuel (User, Token/Session)

## Ce qui n'est explicitement PAS implémenté
- Pas d'authentification sécurisée (aucune signature, aucune crypto, aucun secret)
- Pas de logique d'autorisation (scopes/roles non appliqués)
- Pas de base de données ni persistance
- Pas de configuration de déploiement ou d'hébergement

## Ce qui reste indécis
- Choix du fournisseur d'identité
- Technologie de base de données
- Stratégie d'application de l'autorisation (Phase suivante choisie : **Authorization**)
- Logique métier

## Règles avant toute évolution
- Auth Phase 2 gelée : pas de modification du middleware ni nouveaux comportements sans changement explicite de phase
- Tout nouvel endpoint doit :
  - Être défini d'abord dans OpenAPI
  - Avoir un document de plan d'endpoint dédié
  - Respecter les règles d'endpoint de la Phase 2
- Toute persistance ou autorisation effective requiert une décision explicite

## Portail de décision
- Phase suivante explicitement choisie : **Authorization** (travail sur scopes/règles d'accès)
- La persistance et toute sécurité production restent interdites tant qu'une phase dédiée n'est pas ouverte

Contraintes :
- Backend minimal uniquement (aucune persistance, aucune sécurité production)
- Middleware d'auth structure-only figé
- Documentation et implémentation doivent rester alignées
