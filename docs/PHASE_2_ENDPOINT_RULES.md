# Phase 2 – Règles de création des endpoints API

## Principe général
- Tout nouvel endpoint Phase 2 doit être défini **avant toute implémentation**.

## Ordre obligatoire
1. Définition dans la spécification OpenAPI (`docs/openapi.yaml`)
2. Validation du contrat (revue humaine)
3. Création d’un document de plan d’endpoint (`PHASE_2_ENDPOINT_*.md`)
4. Implémentation backend minimale
5. Validation manuelle

## Règles de conception
- Endpoints stateless uniquement
- Réponses JSON explicites et documentées
- Aucun champ implicite ou dynamique
- Aucun accès base de données
- Aucun secret, token ou session

## Règles d’implémentation
- Un endpoint = une responsabilité claire
- Aucun effet de bord
- Aucun appel externe
- Pas de logique métier complexe

## Ce qui est interdit
- Ajouter un endpoint sans OpenAPI
- Modifier un endpoint gelé
- Implémenter avant validation documentaire
- Ajouter auth, persistance ou sécurité avancée sans décision formelle

## Validation
- Conformité stricte à OpenAPI
- Test manuel via curl
- Revue avant merge

## Contraintes
- Documentation uniquement
- Aucun changement de code
- Aucun édit des fichiers existants
