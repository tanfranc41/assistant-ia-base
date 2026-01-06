# Phase 2 – Synthèse globale

## État actuel
- La démo de la Phase 1 est terminée et figée
- La Phase 2 est uniquement en mode conception
- Un socle backend minimal existe (endpoints health/info/version uniquement)
- Pas de logique métier, pas d'auth, pas de persistance implémentées

## Ce qui est déjà défini
- Approche API-first validée
- Spécification OpenAPI créée et figée
- Endpoints existants :
  - GET /health
  - GET /api/info
  - GET /api/version
- Gestion des erreurs documentée (404 / 500)
- Conception de l'authentification (conceptuelle, token-based, stateless)
- Modèle d'autorisation (rôles/scopes, conceptuel)
- Modèle de données conceptuel (User, Token/Session)

## Ce qui n'est explicitement PAS implémenté
- Pas d'authentification réelle
- Pas de logique d'autorisation
- Pas de base de données ni persistance
- Pas de secrets, tokens ou credentials
- Pas d'endpoints protégés
- Pas de configuration de déploiement ou d'hébergement

## Ce qui reste indécis
- Choix du fournisseur d'identité
- Format et cycle de vie du token
- Technologie de base de données
- Stratégie d'application de l'autorisation
- Logique métier

## Règles avant toute implémentation
- Aucun code backend au-delà du socle actuel
- Tout nouvel endpoint doit :
  - Être défini d'abord dans OpenAPI
  - Avoir un document de plan d'endpoint dédié
  - Respecter les règles d'endpoint de la Phase 2
- Tout travail d'auth ou de données requiert une décision explicite

## Portail de décision
- L'implémentation de la Phase 2 ne peut démarrer qu'après :
  - Décision GO explicite
  - Validation des choix d'auth, de données et de sécurité
  - Mise à jour des contrats API si nécessaire

Contraintes :
- Documentation uniquement
- Pas de modifications des fichiers existants
- Pas de changements de code
