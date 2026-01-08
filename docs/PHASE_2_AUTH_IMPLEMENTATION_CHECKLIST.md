# Phase 2 – Checklist de démarrage de l'implémentation Auth

## Statut
- Phase 2 Auth minimale déjà implémentée et validée (middleware structure-only)
- Checklist archivée ; toute nouvelle évolution nécessite l'ouverture d'une nouvelle phase

## Pré-requis documentaires (tous requis)
- [ ] PHASE_2_AUTHENTICATION_DESIGN validé
- [ ] PHASE_2_AUTHORIZATION_MODEL validé
- [ ] PHASE_2_IDENTITY_PROVIDER_DECISION validée
- [ ] PHASE_2_TOKEN_FORMAT validé
- [ ] PHASE_2_DATA_MODEL validé
- [ ] OpenAPI mise à jour pour les endpoints protégés (documentaire uniquement)

## Décisions obligatoires avant code
- [ ] Fournisseur d'identité choisi (interne / externe / hybride)
- [ ] Format de jeton confirmé (conceptuel)
- [ ] Durée de vie des jetons définie
- [ ] Modèle rôles / scopes validé
- [ ] Endpoints à protéger explicitement listés

## Contraintes techniques
- Authentification stateless uniquement
- Aucun secret en clair
- Aucun stockage de session serveur
- Aucun code auth côté frontend
- Respect strict des contrats OpenAPI

## Interdictions
- Implémentation partielle
- Ajout d'un endpoint protégé sans contrat validé
- Ajout de logique auth hors du backend
- Contournement de cette checklist

## Décision finale
- [ ] GO – L'implémentation auth peut commencer
- [ ] NO-GO – L'implémentation auth reste interdite

## Règle
- Un seul élément non validé = NO-GO
