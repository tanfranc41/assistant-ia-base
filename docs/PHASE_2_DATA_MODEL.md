# Phase 2 – Modèle de données (conceptuel)

## Statut
- Phase de conception uniquement
- Aucune implémentation n’est autorisée

## Objectifs
- Identifier les entités cœur du domaine
- Clarifier leurs responsabilités et frontières
- Préparer l’alignement avec les futurs contrats d’API et le design d’authentification

## Entités identifiées (conceptuelles)

### User
- **Rôle / portée** : représente une personne pouvant s’authentifier et interagir avec le système.
- **Attributs clés (noms uniquement)** : id, email, preuve_authentification (hash ou équivalent), nom_complet, rôle(s)/scopes, état_compte, date_création, date_mise_à_jour.
- **Relations** : possède plusieurs sessions/tokens actifs ou expirés ; peut être référencé par des événements d’audit (conceptuels).

### Session / Token (conceptuel)
- **Rôle / portée** : matérialise une authentification active ou un jeton d’accès/actualisation pour un utilisateur.
- **Attributs clés (noms uniquement)** : token_id, utilisateur_id, type_token (access/refresh), scopes, expiration, émis_le, dernière_utilisation, émis_par (client/appareil), statut (valide/révoqué), raison_révocation, adresse_ip/device_fingerprint (optionnel).
- **Relations** : appartient à un utilisateur ; peut être associé à des événements d’audit ou de sécurité (conceptuels).

## Hors périmètre explicite
- Choix de base de données
- ORM ou implémentation de schéma
- Migrations
- Index ou optimisation de performance
- Toute logique de persistance réelle

## Principes de conception
- Minimal et évolutif : commencer simple, permettre l’ajout progressif d’attributs et d’entités
- Pas de duplication de responsabilité entre entités
- Compatible avec un design d’API stateless (tokens porteurs des informations nécessaires)

## Portail de décision
- Ce document doit être validé avant :
  - Tout choix de base de données
  - Toute implémentation de persistance
  - Tout endpoint d’API protégé
