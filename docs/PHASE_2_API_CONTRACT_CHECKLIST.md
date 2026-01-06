# Phase 2 – Check-list de validation du contrat API

## Périmètre
- Cette check-list valide uniquement les endpoints existants :
  - GET /health
  - GET /api/info
  - GET /api/version
- Basée strictement sur docs/openapi.yaml

## Préconditions
- Backend exécuté localement sur le port 3000
- Aucune modification de code autorisée pendant la validation

## Check-list (tout doit être OK)

### GET /health
- [ ] Retourne HTTP 200
- [ ] Clés JSON exactement : status, phase
- [ ] Valeurs conformes aux exemples OpenAPI
- [ ] Aucun champ supplémentaire

### GET /api/info
- [ ] Retourne HTTP 200
- [ ] Clés JSON exactement : name, phase, status
- [ ] Valeurs conformes aux exemples OpenAPI
- [ ] Aucun champ supplémentaire

### GET /api/version
- [ ] Retourne HTTP 200
- [ ] Clés JSON exactement : version, phase
- [ ] Valeurs conformes aux exemples OpenAPI
- [ ] Aucun champ supplémentaire

### Gestion des erreurs
- [ ] Route inconnue retourne HTTP 404
- [ ] Corps 404 conforme au schéma Error (error, message)
- [ ] Corps 500 conforme au schéma Error (error, message)

## Règle
- Si un élément échoue → l’API n’est pas conforme
- Aucun nouvel endpoint ou logique n’est autorisé tant que la check-list n’est pas entièrement validée
