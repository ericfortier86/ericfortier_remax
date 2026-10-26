export type NavigationGroup = { id: string; label: string; links: { label: string; href: string }[] };

// Sections et destinations du site professionnel d’Eric Fortier.
export const mainNavigation: NavigationGroup[] = [
  {
    "id": "properties",
    "label": "PROPRIÉTÉS",
    "links": [
      {
        "label": "Toutes les propriétés",
        "href": "https://www.eric-fortier.com/fr/properties"
      },
      {
        "label": "Nouvelles constructions",
        "href": "https://www.eric-fortier.com/fr/properties"
      }
    ]
  },
  {
    "id": "areas",
    "label": "SECTEURS",
    "links": [
      {
        "label": "Gatineau",
        "href": "https://www.eric-fortier.com/fr/secteur-gatineau"
      },
      {
        "label": "Hull",
        "href": "https://www.eric-fortier.com/fr/secteur-hull"
      },
      {
        "label": "Aylmer",
        "href": "https://www.eric-fortier.com/fr/secteur-aylmer"
      },
      {
        "label": "Cantley",
        "href": "https://www.eric-fortier.com/fr/secteur-cantley"
      },
      {
        "label": "Val-des-monts",
        "href": "https://www.eric-fortier.com/fr/secteur-val-des-monts"
      },
      {
        "label": "Buckingham",
        "href": "https://www.eric-fortier.com/fr/secteur-buckingham"
      },
      {
        "label": "Chelsea",
        "href": "https://www.eric-fortier.com/fr/secteur-chelsea"
      },
      {
        "label": "Masson-Angers",
        "href": "https://www.eric-fortier.com/fr/secteur-masson-angers"
      }
    ]
  },
  {
    "id": "buy",
    "label": "ACHETER",
    "links": [
      {
        "label": "Acheter",
        "href": "https://www.eric-fortier.com/fr/acheter"
      },
      {
        "label": "Premiers acheteurs",
        "href": "https://www.eric-fortier.com/fr/premiers-acheteurs"
      },
      {
        "label": "Guide de l'acheteur",
        "href": "https://www.eric-fortier.com/fr/guide-de-lacheteur"
      },
      {
        "label": "Stratégie d'achat",
        "href": "https://www.eric-fortier.com/fr/"
      },
      {
        "label": "Calculatrice hypothécaire",
        "href": "https://www.eric-fortier.com/fr/calculators/mortgage-payment"
      },
      {
        "label": "Calculatrice d'emprunt maximum",
        "href": "https://www.eric-fortier.com/fr/calculators/maximum-mortgage"
      },
      {
        "label": "Calculatrice taxe de bienvenue",
        "href": "https://www.eric-fortier.com/fr/calculators/welcome-tax"
      }
    ]
  },
  {
    "id": "sell",
    "label": "VENDRE",
    "links": [
      {
        "label": "Vendre",
        "href": "https://www.eric-fortier.com/fr/vendre"
      },
      {
        "label": "Guide du vendeur",
        "href": "https://www.eric-fortier.com/fr/"
      },
      {
        "label": "Stratégie de vente",
        "href": "https://www.eric-fortier.com/fr/"
      },
      {
        "label": "Évaluation immobilière",
        "href": "https://evaluation.eric-fortier.com/"
      }
    ]
  },
  {
    "id": "about",
    "label": "À PROPOS",
    "links": [
      {
        "label": "Eric Fortier inc",
        "href": "https://www.eric-fortier.com/fr/eric-fortier-courtier-immobilier-remax-direct"
      },
      {
        "label": "Conseils et actualités immobilières",
        "href": "https://www.eric-fortier.com/fr/blogs"
      },
      {
        "label": "Contact",
        "href": "#public-profile-contact-info"
      }
    ]
  }
];
