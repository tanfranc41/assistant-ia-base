# Phase 2 – Backend Baseline

## État actuel
- Un squelette de backend minimal existe
- Un seul endpoint de health est disponible
- Aucune logique métier n'est implémentée

## Ce que fait le backend
- Démarre un serveur HTTP
- Répond à /health avec un statut simple
- Confirme le bootstrapping technique de la Phase 2

## Ce que le backend ne fait pas
- Pas d'authentification
- Pas de base de données
- Pas de persistance
- Pas de services externes
- Pas de gestion de configuration

## Interdictions explicites
- Pas d'expansion d'API sans validation
- Pas de gestion de données utilisateur
- Pas de logique de sécurité
- Pas de comportement spécifique à l'environnement

## Règle
- Toute évolution du backend requiert une décision explicite
- Ce fichier doit être mis à jour avant tout changement fonctionnel
