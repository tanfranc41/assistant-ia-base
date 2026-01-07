# Phase 2 – Décision : Fournisseur d’identité

## Statut
- Décision adoptée
- Aucune implémentation encore autorisée

## Option retenue
- Option choisie : INTERNE

## Justification
- La gestion interne offre une maîtrise complète de la sécurité et évite toute dépendance externe ou verrouillage fournisseur.
- Cette approche simplifie l'architecture, réduit la complexité opérationnelle et facilite l'audit du système d'authentification.
- La maintenabilité à long terme est optimale car toute la logique reste sous contrôle direct du projet.

## Ce que cette décision autorise
- Finalisation du format de jeton
- Conception des endpoints protégés (documentaire uniquement)

## Ce que cette décision n’autorise PAS encore
- Aucun code d’authentification
- Aucun fournisseur concret
- Aucun secret, clé ou configuration
- Aucun endpoint protégé implémenté

## Porte suivante
- L’implémentation de l’authentification est possible uniquement après :
  - Validation des contrats API
  - Validation sécurité
  - Décision formelle de démarrage de l’implémentation
