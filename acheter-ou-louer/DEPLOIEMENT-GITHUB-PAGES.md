# Deux sites indépendants

- `ericfortier86/ericfortier_remax` publie toujours le site existant à `evaluation.eric-fortier.com`, depuis la racine de `main`. Ne pas modifier son fichier `CNAME` ni son réglage Pages.
- Le sous-dossier `acheter-ou-louer` reste la source de la page acheteurs et de son API Cloudflare/D1.
- `ericfortier86/louer-ou-acheter` publie uniquement les fichiers publics exportés à `louer-ou-acheter.eric-fortier.com`. Son propre fichier `CNAME` et son propre réglage Pages sont indépendants du site d’évaluation.

## Publier une modification de la page acheteurs

1. Modifier et vérifier cette source. Pousser dans le dépôt `ericfortier_remax` pour déployer le Worker/API par Cloudflare Builds.
2. Exécuter `npm run build`, puis lancer `npm run start -- --port 5174` dans ce sous-dossier. Le serveur local doit utiliser exactement cette compilation.
3. Dans un second terminal, exécuter `node scripts/export-github-pages.mjs http://127.0.0.1:5174 CHEMIN_DU_DEPOT_LOUER_OU_ACHETER`. Le dernier argument est le checkout du dépôt distinct `ericfortier86/louer-ou-acheter`.
4. Vérifier l’export comme un site statique : langues, navigation directe, calculateur, formulaire vers le Worker. Seuls les fichiers publics, six pages HTML, les métadonnées et le fichier `CNAME` sont exportés. Aucun contenu D1 ni identifiant de connexion n’est exporté.
5. Committer et pousser ces fichiers dans le dépôt `louer-ou-acheter`. GitHub Pages publie sa branche `main`, dossier racine. Arrêter le serveur de prévisualisation après vérification.

Les deux déploiements sont distincts : pousser le Worker ne republie pas automatiquement les fichiers du dépôt Pages. Toute modification visible doit être exportée puis poussée dans ce deuxième dépôt.

## Domaine GoDaddy

Configurer d’abord le domaine personnalisé `louer-ou-acheter.eric-fortier.com` dans les réglages Pages du **nouveau** dépôt, puis ajouter le CNAME GoDaddy : nom `louer-ou-acheter`, valeur `ericfortier86.github.io`, TTL 1 heure. Conserver le CNAME `evaluation`.

Quand GitHub a validé le DNS et émis le certificat, activer **Enforce HTTPS** pour le nouveau site. Vérifier le formulaire à cette nouvelle adresse; FormSubmit peut demander une activation propre à ce domaine.

## Langues et API

Le français utilise `/`, `/guide-acheteur/` et `/confidentialite/`; l’anglais utilise `/en/`, `/en/guide-acheteur/` et `/en/confidentialite/`. Les liens historiques `?lang=en` continuent de fonctionner côté navigateur. Les pages anglaises ont leur propre HTML et leurs métadonnées avant JavaScript. EN/FR conserve le formulaire et le calculateur grâce à l’historique du navigateur.

Les demandes et confirmations sont envoyées à `https://ericfortier-remax.ericfortier86.workers.dev/api/leads`. Le Worker autorise uniquement ses propres origines, le domaine acheteurs et l’origine GitHub Pages du propriétaire. Les notifications FormSubmit partent du navigateur après l’enregistrement durable dans D1. Les demandes ne sont jamais publiées sur GitHub.
