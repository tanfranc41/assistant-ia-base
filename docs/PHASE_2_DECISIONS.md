# Phase 2 – Journal de décisions

## Statut
- Phase 2 en mode design uniquement (authentification cadrée)
- Aucune implémentation autorisée

## Décisions actées (authentification)
- Authentification basée sur token, backend stateless, gérée au niveau API (voir `PHASE_2_AUTHENTICATION_DESIGN.md`).

## Décisions à prendre plus tard
- Choix d’architecture backend
- Choix de l’identity provider (interne vs externe)
- Format des tokens, durée de vie et stratégie de refresh
- Modèle de rôles et permissions
- Approche de persistance des données
- Principes de conception API
- Modèle de sécurité

## Explicitement interdit pour l’instant
- Tout code de production
- Toute base de données, identifiants ou secrets
- Toute configuration de déploiement ou d’hébergement

## Porte de décision
- La phase 2 ne peut démarrer qu’après une validation explicite go/no-go par la gouvernance, sur des critères formalisés avant lancement
