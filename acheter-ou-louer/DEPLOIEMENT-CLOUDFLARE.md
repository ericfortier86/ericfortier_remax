# Landing acheteurs — déploiement sur votre Worker

Ce dossier contient la landing « Acheter ou louer? La question se pose! ». Il est séparé du site d’évaluation qui se trouve à la racine du dépôt et utilise evaluation.eric-fortier.com.

## Configuration à compléter

1. Worker identifié : `ericfortier-remax`, adresse `https://ericfortier-remax.ericfortier86.workers.dev`. Cette configuration et les URL SEO sont renseignées.
2. Créer une base D1 nommée `acheteurs-outaouais` dans Cloudflare → Storage & databases → D1. Relever son Database ID. La configuration lie cette base sous le nom `DB`.
3. Compléter la configuration en exécutant :

```sh
npm run configure:cloudflare -- --worker ericfortier-remax --url https://ericfortier-remax.ericfortier86.workers.dev --database-id UUID_D1
```

Si le nom de la base diffère, ajouter `--database-name NOM_BASE`.

Les identifiants de ressource ne sont pas des clés secrètes. Aucun jeton d’accès Cloudflare ne doit être ajouté aux fichiers du dépôt.

## Réglages du build Cloudflare

Dans le Worker connecté à GitHub :

- Répertoire racine / Root directory : `acheter-ou-louer`
- Commande de compilation / Build command : `npm run build`
- Commande de déploiement / Deploy command : `npm run deploy`
- Node.js : `22.23.4`, fixé par `.nvmrc`

La commande de déploiement applique les migrations D1 puis publie le Worker compilé. Le jeton utilisé par Cloudflare Builds doit permettre le déploiement du Worker et l’application des migrations à la base D1.

La configuration d’exemple ne se déploie pas : la commande refuse de publier tant que le nom réel du Worker, l’URL publique et le Database ID ne sont pas renseignés. Ne pas modifier le CNAME du site d’évaluation à la racine.

## Vérifications après publication

- La page est accessible sans connexion ChatGPT.
- Les menus restent en haut au défilement et le curseur du calculateur atteint 25 ans.
- Une demande réelle de test est enregistrée dans D1 et reçue à eric.fortier@remax-quebec.com.
- Le pixel Meta est chargé après acceptation des témoins et l’événement Lead suit un enregistrement réussi.

La nouvelle base D1 commence vide. Les demandes conservées sur l’hébergement Sites ne sont pas transférées automatiquement.

Pour raccorder ensuite `acheter.eric-fortier.com`, ajouter le domaine dans Cloudflare, mettre à jour l’URL publique avec la commande de configuration et republier. Les liens canoniques, le sitemap et les métadonnées suivront cette URL.
