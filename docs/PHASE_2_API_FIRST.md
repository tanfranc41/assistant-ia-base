# Phase 2 – Approche API First

## Statut
- Document de cadrage. **Aucune implémentation de production n’est autorisée** à ce stade.

## Objectifs
- Définir les contrats d’API avant toute écriture de code.
- Utiliser une spécification unique (OpenAPI v3) comme source de vérité pour back-end et front-end.
- Aligner l’expérience utilisateur, la sécurité et les besoins de données dès la conception.

## Livrables attendus
- Spécification OpenAPI complète (modèles, erreurs, codes de statut, pagination, versionnage).
- Guide de conventions (noms, ressources, verbes, gestion des identifiants, traces et idempotence).
- Stratégie d’authentification et d’autorisations décrite (sans secrets ni intégrations réelles).
- Catalogue priorisé des endpoints Phase 2 avec exemples de requêtes/réponses JSON.
- Mocks ou serveurs simulés générés depuis la spécification pour dé-risquer l’intégration front.

## Méthode de travail
- Ateliers design-first impliquant produit, UX, sécurité et données.
- Revues de contrats itératives avec les consommateurs (consumer-driven quand applicable).
- Validation automatique : linting OpenAPI, tests contractuels, génération client/serveur pour vérifications locales.

## Hors périmètre immédiat
- Pas de déploiement, pas de base de données ni de secrets.
- Pas d’implémentation de logique métier réelle tant que la spécification n’est pas validée.

## Critères de go/no-go Phase 2 (API)
- Spécification OpenAPI approuvée et stable (version 0.x gelée pour la phase de build).
- Conventions d’erreur, de journalisation et de versionnage partagées.
- Mocks disponibles pour le front et scripts d’automatisation prêts à générer clients/serveur.
- Plan de migration et compatibilité ascendante défini pour la v1.0 des API.
