# Objectif PWA
Préparer le projet à une compatibilité multi-appareils (mobile, tablette, bureau) grâce à une future PWA. Il s’agit uniquement d’une phase de préparation, sans mise en œuvre technique à ce stade.

# Icônes et identité
- Icônes requises : 192x192 et 512x512.
- 192x192 : utilisée pour les raccourcis et aperçus rapides.
- 512x512 : utilisée pour l’installation et les écrans de lancement.
- Icônes déjà présentes dans `frontend/icons/` pour les besoins de la démo statique (non adaptées à la production).

# Manifeste web
- Fichier `frontend/manifest.json` minimal présent pour la démo (nom, couleurs, icônes). 
- Pas de gestion avancée : aucune orientation, aucune configuration spécifique à des environnements.
- Toute évolution production devra revoir complètement le manifeste (icônes, noms, scope, start_url).

# Comportement hors ligne
- Service worker `frontend/sw.js` en place uniquement pour mettre en cache le shell et afficher un message “Offline”.
- Aucun cache applicatif métier, aucune synchronisation en arrière-plan, aucune persistance.
- Si le périmètre change, revoir les stratégies de cache et les versions de cache avant toute activation.

# Compatibilité
Cible : navigateurs modernes sur mobile, tablette et bureau. Pas de support pour les navigateurs obsolètes. Approche web-first.

# Limites actuelles
- Implémentation minimale et purement démonstrative (shell statique seulement).
- Icônes et manifeste à considérer comme provisoires.
- Aucune gestion d’état ou de données hors ligne.
- Aucun prompt d’installation ni configuration d’environnement.

# Passage à l’implémentation
Le lancement d’une PWA nécessitera une phase explicite d’implémentation ultérieure. Ce document sert uniquement de référence préparatoire.
