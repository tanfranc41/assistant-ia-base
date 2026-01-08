# Phase 2 – Rapport de conformité API

## Périmètre vérifié
- GET /health
- GET /api/info
- GET /api/version
- GET /api/auth/test (protégé par middleware structure-only Base64 JSON)
- Gestion des erreurs 404 et 500
- Conformité à docs/openapi.yaml (périmètre implémenté uniquement)

## Résultat de la validation
- Endpoints publics conformes au contrat (réponses statiques)
- Endpoint protégé requiert un header `Authorization: Bearer <base64-json>` contenant `user_id` (string), `scopes[]` (strings), `exp` (number)
- 401 retourné si header absent/mal formé, 200 avec payload conforme (testé via curl)

## Gestion des erreurs
- 404 conforme (error, message)
- 500 conforme (error, message)
- Aucun autre code de statut exposé

## Conclusion
- API Phase 2 (socle + middleware Auth structure-only) conforme et gelée
- Aucun nouvel endpoint autorisé sans nouvelle phase documentaire

## Statut final
- Phase 2 Auth Gate : VALIDÉE (middleware en place et testé)
- Prochaine étape explicite : Phase Authorization (travail sur scopes/règles d'accès)
