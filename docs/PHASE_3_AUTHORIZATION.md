# DOCUMENT CANONIQUE — PHASE 3 (AUTHORIZATION)
**STATUT : DOCUMENTATION UNIQUEMENT — AUCUNE IMPLÉMENTATION AUTORISÉE**

Ce document fait autorité pour la compréhension de la Phase 3 — Authorization.  
Il ne décrit **PAS** une implémentation, mais un cadrage conceptuel strict. Toute lecture différente est une erreur.

---

## 1) Contexte et rappel des phases

- **Phase 2 :**
  - Implémente une authentification de **STRUCTURE UNIQUEMENT**.
  - Le token Base64 JSON (`user_id`, `scopes`, `exp`) est un **validateur de forme**.
  - Il ne fournit **AUCUNE** sécurité réelle.
  - Il ne fournit **AUCUNE** décision d’accès.

- **Phase 3 :**
  - **NE CONTIENT AUCUN CODE** à ce stade.
  - Sert à cadrer l’Authorization avant toute implémentation future.
  - Toute implémentation sans décision GO explicite est **INTERDITE**.

## 2) Distinction fondamentale

**Authentication ≠ Authorization**

- **Authentication (Phase 2) :**
  - Vérifie la présence et la forme d’un token.
  - N’accorde **AUCUN** droit.
  - Ne décide jamais “autorisé / interdit”.

- **Authorization (Phase 3) :**
  - Décide explicitement ce qu’un utilisateur a le droit de faire.
  - Est une logique **PRODUIT**, pas une logique technique.
  - N’existe **PAS** encore dans le code.

## 3) Intention réelle de la Phase 3

La Phase 3 vise **UNIQUEMENT** à définir :
- comment seront décidés les droits d’accès
- selon quels principes non négociables
- **sans implémentation technique**

La Phase 3 ne vise **PAS** :
- la sécurité réelle
- la cryptographie
- la persistance
- la logique métier
- l’accélération du développement

## 4) Principes non négociables (cadrage)

- L’Authorization est décidée **CÔTÉ SERVEUR UNIQUEMENT**. Le frontend ne décide jamais des droits.
- Les droits sont exprimés par des scopes **EXPLICITES**. Aucun droit implicite n’est autorisé.
- Chaque endpoint a une liste claire et auditable de scopes requis. Il n’existe pas de “rôle magique” ou global.
- **Principe du moindre privilège** : un utilisateur ne dispose que des droits strictement nécessaires.
- **Séparation stricte user / admin** : aucun mélange, aucun chevauchement implicite.
- **Refus par défaut** : si un scope requis est absent → accès refusé (conceptuellement).

## 5) Scopes — clarification importante

- La présence de scopes dans le token Phase 2 :
  - N’implique **AUCUN** droit réel.
  - N’a **AUCUNE** signification opérationnelle.
  - Sert uniquement à préparer un futur modèle.

Il est **STRICTEMENT INTERDIT** de déduire :
- que les scopes actuels gouvernent l’accès
- qu’un scope correspond à une permission effective
- qu’un endpoint est autorisé parce qu’un scope existe

## 6) Interdictions explicites en Phase 3

Tant que la Phase 3 est en documentation uniquement, il est **STRICTEMENT INTERDIT** de :

- Mettre en place une sécurité réelle (JWT signé, crypto, secrets, clés, certificats, etc.)
- Introduire toute forme de persistance (base de données, fichiers, cache, sessions)
- Implémenter une logique métier réelle
- Modifier le middleware d’authentification Phase 2 tant que la règle de gel est active
- Implémenter “rapidement” puis documenter après

## 7) /api et middleware — clarification

Le montage actuel où le middleware est appliqué au groupe `/api` est :
- un choix **TECHNIQUE** Phase 2
- destiné à tester un flux minimal
- **PAS** une décision produit

Il est **INTERDIT** d’en déduire que :
- “tout /api doit être protégé”
- “/api est une frontière d’Authorization”
- “le produit impose une règle globale sur /api”

## 8) openapi.yaml — mode de lecture correct

`openapi.yaml` est :
- une **projection documentaire**
- un **contrat API envisagé**
- un outil de **conception API-first**

`openapi.yaml` **N’EST PAS** :
- un état réel du code
- une promesse d’implémentation
- un backlog implicite
- une liste de tâches à réaliser

Toute lecture différente est incorrecte.

## 9) Gouvernance et gel

Le gel (**LOCK / GO_NO_GO / PHASE_NEXT**) a pour priorités :
1. Éviter toute illusion de sécurité
2. Empêcher les dérives et modifications silencieuses
3. Forcer la clarification produit avant tout code

Le gel est une discipline volontaire, pas un ralentissement.

## 10) Conclusion canonique

- Phase 3 est un **CADRAGE**, pas une implémentation.
- Aucun droit n’existe tant qu’il n’est pas explicitement défini et validé.
- Aucun code ne doit précéder une décision claire.
- Toute accélération non cadrée est une erreur.

**Ce document est la référence. Toute contradiction avec ce document est invalide.**
