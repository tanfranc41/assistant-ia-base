# Phase 2 – Modèle d’autorisation (conceptuel)

## Statut
- Phase de conception uniquement
- Aucune mise en œuvre d’autorisation autorisée

## Objectifs
- Définir clairement les principes de contrôle d’accès
- Garder le modèle simple, auditable et évolutif
- S’aligner sur une API sans état basée sur des jetons

## Concepts clés (conceptuel)
- Rôle : ensemble nommé de permissions (ex. : admin, user, reader)
- Permission / scope : action explicitement autorisée (ex. : read:profile, write:settings)
- Attribution : manière dont les rôles/scopes sont associés à un utilisateur (conceptuel uniquement)

## Règles d’autorisation
- Autorisation appliquée côté serveur uniquement
- Le frontend ne décide jamais des permissions
- Chaque endpoint protégé doit déclarer les scopes requis

## Relation avec le jeton
- Les jetons peuvent transporter rôles et/ou scopes
- Le backend reste sans état
- Aucune session stockée sur le serveur

## Hors périmètre explicite
- Aucun code d’autorisation
- Aucun choix de librairie RBAC/ABAC
- Aucun schéma de base de données ou persistance
- Aucune logique de permission côté frontend

## Porte de décision
- L’implémentation d’autorisation ne peut commencer qu’après :
  - Validation de ce document
  - Mise à jour des contrats d’API en conséquence
