# Phase 2 – Fournisseur d’identité (options de conception)

## Statut
- Phase de conception uniquement
- Aucune mise en œuvre autorisée

## Pourquoi un fournisseur d’identité est nécessaire
- Authentification sécurisée pour l’accès aux API
- Séparation des responsabilités entre identité et logique applicative

## Options à considérer (conceptuel)
- Gestion interne des identités (utilisateurs personnalisés)
- Fournisseur externe (compatible OIDC, par ex. OAuth2 / OpenID Connect)
- Approche hybride (IdP externe + profil utilisateur interne)

## Critères de comparaison
- Responsabilité sécurité
- Complexité opérationnelle
- Verrouillage fournisseur
- Coût et passage à l’échelle
- Conformité et auditabilité

## Explicitement hors du périmètre
- Choisir un fournisseur spécifique
- Tout SDK, bibliothèque ou configuration
- Tout secret, clé ou identifiant
- Tout code d’implémentation

## Portail de décision
- Une option doit être explicitement sélectionnée
- Sélection requise avant :
  - Implémentation de l’authentification
  - Finalisation du format des jetons
  - Endpoints API protégés
