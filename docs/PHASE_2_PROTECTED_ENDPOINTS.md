# Phase 2 – Endpoints protégés (conceptuel)

## Statut
- Phase de conception uniquement
- Aucune implémentation autorisée

## Endpoints publics (sans authentification)
- `GET /health` : Vérification de l'état du service
- `GET /api/info` : Informations générales sur l'API
- `GET /api/version` : Version de l'API et phase actuelle

## Endpoints protégés (à venir)

### Gestion du profil utilisateur
- **Méthode + chemin** : `GET /api/user/profile`
  - **Scopes / rôles requis** : `read:profile` ou rôle `user`
  - **Justification fonctionnelle** : Lecture des informations du profil utilisateur connecté

- **Méthode + chemin** : `PUT /api/user/profile`
  - **Scopes / rôles requis** : `write:profile` ou rôle `user`
  - **Justification fonctionnelle** : Mise à jour des informations du profil utilisateur connecté

### Gestion des préférences
- **Méthode + chemin** : `GET /api/user/preferences`
  - **Scopes / rôles requis** : `read:preferences` ou rôle `user`
  - **Justification fonctionnelle** : Lecture des préférences de l'utilisateur (langue, thème, etc.)

- **Méthode + chemin** : `PUT /api/user/preferences`
  - **Scopes / rôles requis** : `write:preferences` ou rôle `user`
  - **Justification fonctionnelle** : Mise à jour des préférences de l'utilisateur

### Gestion des conversations
- **Méthode + chemin** : `GET /api/conversations`
  - **Scopes / rôles requis** : `read:conversations` ou rôle `user`
  - **Justification fonctionnelle** : Liste des conversations de l'utilisateur connecté

- **Méthode + chemin** : `POST /api/conversations`
  - **Scopes / rôles requis** : `write:conversations` ou rôle `user`
  - **Justification fonctionnelle** : Création d'une nouvelle conversation

- **Méthode + chemin** : `GET /api/conversations/{id}`
  - **Scopes / rôles requis** : `read:conversations` ou rôle `user`
  - **Justification fonctionnelle** : Accès à une conversation spécifique de l'utilisateur

- **Méthode + chemin** : `DELETE /api/conversations/{id}`
  - **Scopes / rôles requis** : `write:conversations` ou rôle `user`
  - **Justification fonctionnelle** : Suppression d'une conversation de l'utilisateur

### Gestion des messages
- **Méthode + chemin** : `POST /api/conversations/{id}/messages`
  - **Scopes / rôles requis** : `write:messages` ou rôle `user`
  - **Justification fonctionnelle** : Envoi d'un message dans une conversation

- **Méthode + chemin** : `GET /api/conversations/{id}/messages`
  - **Scopes / rôles requis** : `read:messages` ou rôle `user`
  - **Justification fonctionnelle** : Lecture des messages d'une conversation

### Administration (exemples conceptuels)
- **Méthode + chemin** : `GET /api/admin/users`
  - **Scopes / rôles requis** : `admin:users` ou rôle `admin`
  - **Justification fonctionnelle** : Liste de tous les utilisateurs (accès administrateur)

- **Méthode + chemin** : `GET /api/admin/stats`
  - **Scopes / rôles requis** : `admin:read` ou rôle `admin`
  - **Justification fonctionnelle** : Accès aux statistiques système (accès administrateur)

- **Méthode + chemin** : `PUT /api/admin/users/{id}/status`
  - **Scopes / rôles requis** : `admin:users` ou rôle `admin`
  - **Justification fonctionnelle** : Modification du statut d'un utilisateur (activation/désactivation)

## Règles
- Tous les endpoints protégés doivent être définis dans ce document avant toute implémentation
- Les scopes doivent être cohérents avec le modèle d'autorisation défini dans `PHASE_2_AUTHORIZATION_MODEL.md`
- Aucun code, aucun token réel, aucune sécurité implémentée à ce stade
- Chaque endpoint protégé doit déclarer explicitement les scopes ou rôles requis
- Le principe du moindre privilège doit être appliqué : accorder uniquement les permissions nécessaires
- Les endpoints d'administration doivent être clairement séparés des endpoints utilisateur

## Porte de décision
- Ce document doit être validé avant :
  - Ajout d'un endpoint protégé dans la spécification OpenAPI
  - Implémentation de l'authentification
  - Implémentation de l'autorisation
  - Toute modification des scopes ou rôles conceptuels
