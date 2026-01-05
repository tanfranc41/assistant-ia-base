# Audit du dépôt

## Global assessment
- Périmètre cohérent avec une démo frontend statique : interface unique, état utilisateur simulé en mémoire, aucune logique serveur.
- Backend vide et clairement indiqué comme réservé à plus tard.
- Documentation majoritairement alignée (FR référence) et déclinée en EN/NL/DE avec le même message de démo uniquement.
- Composants PWA présents (manifest, service worker) mais limités au shell et désormais décrits comme éléments purement démonstratifs.
- Pas d’infrastructure de build ou de tests automatisés, ce qui est cohérent avec le périmètre vitrine.

## What is correct and solid
- Règles de périmètre explicites : “pas de backend”, “pas d’authentification réelle”, “données non persistées” dans README et LOCK.
- Alignement i18n : structure des clés documentée et identique dans toutes les langues (FR/EN/NL/DE).
- Frontend `index.html` cohérent avec la doc DEMO/I18N (sélecteur de langue, utilisateur démo, logout mémoire).
- Dossier `backend/` laissé vide par design et signalé comme tel dans l’architecture.
- Git simple et lisible : racine courte, séparation frontend/docs, pas de dépendances cachées.

## What is unclear or missing
- Aucun rappel local dans `backend/` pour indiquer l’absence de code et l’interdiction d’y ajouter de la logique tant qu’une nouvelle phase n’est pas ouverte.
- Les assets PWA étaient précédemment décrits comme “non présents” ; la documentation a été corrigée mais nécessite de rester synchronisée si le service worker évolue.

## What should NOT be changed
- Ne pas ajouter de logique backend, d’authentification ou de persistance tant que le projet reste en mode démo.
- Ne pas modifier la structure du bloc `translations` ou les codes langue (`en`, `fr`, `nl`, `de`).
- Ne pas complexifier le service worker : conserver un cache shell minimal ou le retirer uniquement lors d’une phase validée.
- Ne pas dégeler l’UI sans décision explicite de phase (commentaire de garde présent dans `index.html`).

## Optional improvements (facultatif)
- Ajouter un court `README` dans `backend/` rappelant qu’il est vide et verrouillé en phase démo.
- Documenter (ou vérifier périodiquement) que la liste des assets mis en cache par `sw.js` reste limitée au shell et qu’aucune donnée utilisateur n’est concernée.
