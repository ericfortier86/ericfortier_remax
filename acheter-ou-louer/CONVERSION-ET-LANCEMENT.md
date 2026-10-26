# Landing page acheteurs — Eric Fortier

La page reprend Manrope, le bleu #1845f2, le logo RE/MAX, la photographie principale et le portrait du site professionnel. Les huit secteurs ciblés sont Gatineau, Hull, Aylmer, Cantley, Val-des-Monts, Buckingham, Chelsea et Masson-Angers.

## Ce qui fonctionne

- Comparaison acheter/louer sur 1 à 25 ans : patrimoine après frais de revente, solde hypothécaire, assurance prêt, frais d’achat, entretien, taxes et placements des économies. Les hypothèses restent modifiables et les calculs restent dans le navigateur. Valeurs initiales : mise de fonds minimale selon le prix, frais d’achat de 1 %, frais de revente de 4 % et hausse annuelle du loyer de 3,1 % (base TAL 2026 utilisée comme hypothèse, sans prédire les hausses futures).
- Budget d’achat indicatif avec revenu brut, dettes, épargne disponible, test de résistance et ratios ABD/ATD. Simulation sur 25 ans avec mise de fonds minimale; le surplus d’épargne reste en réserve. Cette variante ne cherche pas à utiliser toute l’épargne pour maximiser le financement.
- Quatre intentions de contact : conseils d’achat, liste de propriétés, préparation d’un futur achat et référence hypothécaire. Chaque demande est enregistrée dans D1 et une notification est tentée à eric.fortier@remax-quebec.com via FormSubmit.
- Préférences de secteurs, types de propriété, budget et échéancier; consentements distincts pour le suivi et les envois. Le résumé du calcul n’est partagé que sur choix explicite.
- Pixel Meta 2378121756324783 après consentement : PageView, CalculatorUsed et Lead. Lead se déclenche après enregistrement réussi. Les coordonnées et les valeurs financières ne sont pas ajoutées aux événements.
- Checklist imprimable ou enregistrable en PDF, ressources de crédit et liens vers les pages de secteurs du site professionnel.
- Titres et descriptions uniques, langue fr-CA, données structurées RealEstateAgent/WebPage, sitemap, robots et liens avec le site professionnel. La nouvelle page a sa propre URL canonique.

## Pour lancer les publicités

1. L’activation FormSubmit a été confirmée par Eric le 23 octobre 2026. Vérifier la réception d’une notification de test dans la boîte courriel. Les demandes restent enregistrées même si le courriel échoue. Le statut `pending` identifie les notifications à reprendre.
2. La première publication Sites est privée. Pour accueillir les visiteurs Meta, passer le site à une audience publique et, idéalement, relier un sous-domaine comme acheter.eric-fortier.com. Un compte ChatGPT ne doit pas être nécessaire aux visiteurs de la campagne.
3. À la connexion du domaine définitif, remplacer SITE_URL dans lib/site.ts et republier pour mettre à jour les URL canoniques, Open Graph et le sitemap. Ajouter un lien depuis la section Acheter du site principal et soumettre le sitemap dans Search Console. Le ciblage géographique est repris; aucun classement SEO identique ne peut être garanti.
4. Faire une vraie demande de test et vérifier sa réception, le bouton Répondre et l’événement Lead dans les outils Meta. Les tests locaux n’envoient aucun courriel.

Les inscriptions à la sélection sont recueillies avec leurs critères. La sélection de propriétés et le suivi des acheteurs sont manuels dans cette version : aucune campagne d’envoi automatique ni synchronisation Centris n’est annoncée comme active. La section hypothécaire est prête pour les partenaires qui seront ajoutés plus tard.

## Idées pour enrichir l’offre

1. **Rencontre de préparation de 15 minutes.** Une porte d’entrée simple : budget, échéancier et une prochaine étape précise. Ajouter un vrai lien de réservation lorsqu’il est disponible.
2. **Bilan « Mon coût d’achat complet ».** Remettre un résumé personnalisé incluant mise de fonds, frais de départ, réserve et mensualité confortable, après validation des chiffres avec le professionnel hypothécaire.
3. **Plan de préparation sur 3, 6 ou 12 mois.** Définir un objectif d’épargne et un rendez-vous de suivi; faire accompagner les questions de crédit par un professionnel compétent.
4. **Sélection par style de vie et secteur.** Enrichir les préférences avec temps de déplacement, entretien souhaité, proximité des services, maison/condo/plex et critères indispensables.
5. **Mini-série de trois courriels, sur inscription.** Budget total, documents de financement, puis visites et promesse d’achat. Prévoir une plateforme d’envoi et un vrai mécanisme de désabonnement avant d’automatiser cette série.
6. **Rencontre sur les programmes de premier achat.** Inviter un partenaire hypothécaire à expliquer CELIAPP et RAP selon le dossier, sans promettre une admissibilité ou une économie universelle.

## Deux angles publicitaires à essayer

**Angle comparaison** : « Acheter ou louer en Outaouais? Explorez les deux scénarios avec un calculateur gratuit. Aucun courriel requis pour voir votre résultat. » Lien vers #calculateur.

**Angle préparation** : « Un premier achat dans 6 ou 12 mois? Commencez par un plan. Découvrez vos possibilités et préparez les prochaines étapes avec Eric Fortier, courtier immobilier en Outaouais. » Lien vers #accompagnement.

Exemple d’attribution : `?utm_source=meta&utm_medium=paid_social&utm_campaign=acheteurs_outaouais&utm_content=comparaison` avant l’ancre.

## Sources des calculs

- Mise de fonds : https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/hypotheques/combien-mise-de-fonds.html
- Primes SCHL : https://www.cmhc-schl.gc.ca/consommateurs/acheter-une-maison/assurance-pret-hypothecaire-pour-les-consommateurs/couts-de-lassurance-pret-hypothecaire-schl
- Ratios et taux de qualification : https://www.cmhc-schl.gc.ca/professionnels/financement-de-projets-et-financement-hypothecaire/assurance-pret-hypothecaire/aph-po-et-petits-immeubles-locatifs/premier-chez-soi
- Taxe québécoise sur les primes : https://www.revenuquebec.ca/fr/citoyens/taxes/biens-et-services-taxables-detaxes-ou-exoneres/taxe-sur-les-primes-dassurance/
- Base TAL 2026 : https://www.tal.gouv.qc.ca/fr/reconduction-du-bail-et-fixation-de-loyer/pourcentages-applicables-aux-criteres-de-fixation-de-loyer
- Dossier et cote de crédit : https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/dossier-pointage-credit/commander-dossier-credit.html

Références consultées le 23 octobre 2026. Les taux illustratifs ne sont pas des taux offerts. Les changements de taux au renouvellement, les pénalités de remboursement et les avantages fiscaux propres au dossier ne sont pas modélisés.
