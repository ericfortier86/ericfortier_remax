# Acheter ou louer? La question se pose!

Landing page acheteurs d’Eric Fortier, à déployer sur son Worker Cloudflare depuis le dépôt `ericfortier86/ericfortier_remax`.

Ce projet est isolé dans `acheter-ou-louer` pour conserver le site d’évaluation présent à la racine du dépôt.

## Commandes

- Installation : `npm ci`
- Développement : `npm run dev`
- Compilation : `npm run build`
- Déploiement : `npm run deploy`

Le nom du Worker, son URL publique et la base D1 doivent être configurés avant le premier déploiement. Voir [DEPLOIEMENT-CLOUDFLARE.md](DEPLOIEMENT-CLOUDFLARE.md) pour les réglages exacts.

Le formulaire conserve les demandes dans D1 et tente une notification FormSubmit à eric.fortier@remax-quebec.com. Le pixel Meta est conditionné au consentement. Les calculs restent dans le navigateur, sauf si le visiteur choisit de joindre un résumé à sa demande.

## Français et anglais

Le français est la version par défaut. Le paramètre `?lang=en` affiche la version anglaise (y compris le calculateur, le formulaire, la checklist et la confidentialité). Les boutons EN/FR de l’entête et du pied de page changent la langue sans réinitialiser les saisies, en conservant les paramètres publicitaires. Les liens de ressources internes conservent la langue. Les titres, descriptions, URL canoniques et liens `hreflang` sont rendus dans la bonne langue dès la réponse du serveur.

Les traductions se trouvent dans `lib/translations.ts`. Les valeurs internes des choix du formulaire restent identiques dans les deux langues; la langue de la demande est enregistrée dans D1 et indiquée dans le courriel de notification pour faciliter le suivi.

Le document `CONVERSION-ET-LANCEMENT.md` conserve les suggestions marketing et l’historique de la version Sites. Pour ce déploiement, utiliser les instructions Cloudflare ci-dessus.
