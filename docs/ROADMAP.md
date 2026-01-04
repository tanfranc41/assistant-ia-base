## Feuille de route

1. **Frontend (interface web)**  
   - Stabiliser l’interface statique actuelle (AI Assistant) et préciser les points d’intégration futurs.  
   - Préparer un point d’entrée unique pour les appels réseau (API Gateway simplifiée / passerelle API) dès que le backend (serveur applicatif) sera disponible.

2. **Backend (serveur applicatif)**  
   - Définir les endpoints (points de terminaison) d’authentification (connexion/déconnexion) et de gestion d’état utilisateur.  
   - Mettre en place une couche de sécurité minimale (validation d’entrées, journalisation sécurisée).  
   - Prévoir des tests unitaires et d’intégration simples dès l’ajout du code.

3. **Documentation (documentation)**  
   - Décrire le flux d’authentification (login/connexion, refresh/rafraîchissement de session).  
   - Documenter la configuration locale (variables d’environnement / environment variables) et les commandes de démarrage.  
   - Ajouter un guide de contribution pour aligner les pratiques (revues de code, tests obligatoires).

4. **Déploiement (deployment)**  
   - Anticiper un déploiement statique du frontend (hébergement de fichiers statiques).  
   - Préparer un conteneur (container) ou un service managé pour le backend, avec pipeline CI/CD minimal.
