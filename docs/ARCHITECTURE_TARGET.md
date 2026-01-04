# Objectif du document
- Ébauche d’architecture conceptuelle pour le produit réel.
- Aucune implémentation n’est autorisée à ce stade ; ce document sert uniquement de référence préparatoire.

# Vue d’ensemble
- **Frontend (client web)** : interface utilisateur et logique de présentation.
- **Backend (API)** : logique métier, authentification, paiements (phase future).
- **Services externes (futur)** : services IA, prestataire de paiement, e-mail, etc.

# Rôles des composants
- **Frontend** :
  - Affichage UI.
  - Gestion de l’internationalisation (i18n).
  - Gestion d’état (simulation locale dans la démonstration actuelle ; implémentation complète prévue pour le produit cible).
- **Backend** : exposition d’endpoints API, authentification, facturation, orchestration (uniquement prévu pour les phases ultérieures).
- **Services** : intégrations tierces (uniquement prévues pour le futur).

# Flux conceptuels
- Utilisateur → Frontend → Backend → Services.
- Flux décrits au niveau conceptuel uniquement (aucun endpoint, aucune pile technologique spécifiée).
- Exemple conceptuel :
  1. Consultation d’une ressource par l’utilisateur.
  2. Affichage via le frontend.
  3. Validation métier via le backend.
  4. Notification envoyée par un service tiers.

# Principes structurants
- Séparation nette Frontend / Backend.
- Sécurité dès la conception (à adresser dans les phases futures).
- Scalabilité prévue pour les itérations ultérieures.
- Maintenabilité et approche documentation-first.

# Limites actuelles
- Pas d’implémentation backend.
- Pas d’authentification.
- Pas de paiements.
- Pas d’appels IA.
- Pas de persistance.
