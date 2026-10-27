# ericfortier_remax
Évaluation de votre propriété dans le secteur Gatineau et ses environs

## Sites publiés

- La racine de ce dépôt publie l’évaluation immobilière à `https://evaluation.eric-fortier.com/` avec GitHub Pages. Conserver son fichier `CNAME` et son réglage Pages.
- Le sous-dossier `acheter-ou-louer` contient la source du site acheteurs et de l’API Cloudflare/D1. Ses fichiers publics sont publiés dans le dépôt distinct `ericfortier86/louer-ou-acheter` à `https://louer-ou-acheter.eric-fortier.com/`. Voir sa documentation de déploiement avant de modifier ce site.

## Page d’évaluation

La refonte approuvée conserve les textes français et anglais, les sept champs d’origine, le processus, les six FAQ et les huit secteurs. Le formulaire en deux étapes utilise l’endpoint Formspree existant. `merci.html` confirme une demande et reste exclue de l’indexation.

- Présentation : `assets/styles.css`.
- Textes bilingues : `assets/content.js`.
- Navigation : `assets/navigation.js`.
- Formulaire, langues, consentement et suivi : `assets/app.js`.
- Configuration de production : `assets/config.js` (`preview: false`).

Le pixel Meta `2378121756324783` et le compte Google Ads `AW-852570859` sont chargés seulement après acceptation des témoins publicitaires. Un événement `Lead` est déclenché après une soumission acceptée et n’est pas répété par un rafraîchissement de la confirmation. Les données des champs ne sont pas envoyées dans les paramètres publicitaires.

La note Google a été vérifiée à 5,0/5 le 27 octobre 2026 sur la fiche Google Maps correspondant au Place ID existant. La page conduit directement aux avis Google au lieu de présenter un nombre d’avis figé non vérifié. `googleReviewCount` peut rester `null`; ne renseigner un total que depuis la fiche Google ou une confirmation du propriétaire. Cette configuration ne synchronise pas automatiquement les totaux Google.

Le champ `googleLeadSendTo` reste vide tant qu’une véritable étiquette de conversion n’a pas été fournie depuis Google Ads. L’événement personnalisé existant `lead_form_submit` est conservé. Ne pas inventer d’étiquette de conversion.

Avant toute future publication, tester le formulaire, la traduction, les menus mobiles et le comportement du pixel après consentement. La copie de présentation initiale reste séparée du dépôt de production dans l’espace de travail local.
