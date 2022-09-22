import { Injectable } from '@angular/core';
import { TokenStorageService } from '../../../../../app/services/authentication/token-storage.service'

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'collapse',
        icon: 'feather icon-home',
        children :[
          {
            id: 'default',
            title: 'default',
            type: 'item',
            icon : 'feather icon-monitor',
            url: '/dashboard/default'
          },
          //  {
          //    id: 'equivalenceArticles',
          //    title: 'Equivalence Articles',
          //    type: 'item',
          //    classes: 'nav-item',
          //    url: '/bonLivraison',
          //    icon: 'feather icon-sliders'
          //  },

          {
            id: 'stocks',
            title: 'Stocks',
            type: 'item',
            icon : 'icofont-database',
            url: '/dashboard/stocks'
          },
          // {
          //   id: 'ventes',
          //   title: 'Ventes',
          //   type: 'item',
          //   icon : 'icofont-sale-discount',
          //   url: '/dashboard/ventes'
          // },
          // {
          //   id: 'achats',
          //   title: 'Achats',
          //   type: 'item',
          //   icon : 'feather icon-shopping-cart',
          //   url: '/dashboard/achats'
          // },
          // {
          //   id: 'gmo',
          //   title: 'Gmo',
          //   icon : 'icofont-monitor',
          //   type: 'item',
          //   url: '/dashboard/gmo'
          // },
          // {
          //   id: 'finance',
          //   title: 'Finance',
          //   icon : 'icofont-money-bag',
          //   type: 'item',
          //   classes: 'nav-item',
          //   url: '/parametresImportations'
          // },
          //  {
          //    id: 'commerciaux',
          //    title: 'Commerciaux',
          //    type: 'item',
          //    classes: 'nav-item',
          //    url: '/bonTravail',
          //    icon: 'icofont-brand-business-insider'
          //  },
          //  {
          //    id: 'banques',
          //    title: 'Banques',
          //    type: 'item',
          //    classes: 'nav-item',
          //    url: '/banque',
          //    icon: 'icofont-bank-transfer-alt'
          //  },

          //  {
          //    id: 'soldeTiers',
          //    title: 'Solde initiaux des tiers',
          //    type: 'item',
          //    classes: 'nav-item',
          //    url: '/bonRetour',
          //    icon: 'icofont-money'
          //  },

        ]
      },
    ],
  },

  {
    id: 'ui-element',
    title: '',
    type: 'group',
    icon: 'feather icon-layers',
    children: [
      {
        id: 'donneBase',
        title: 'Donnees de base',
        type: 'collapse',
        icon: 'feather icon-align-justify',
        classes: 'nav-item',
        children: [
          {
            id: 'listArticles',
            title: 'Articles',
            type: 'item',
            classes: 'nav-item',
            url: '/article/list',
            icon: 'icofont-clip-board'
          },
          // {
          //   id: 'equivalenceArticles',
          //   title: 'Equivalence Articles',
          //   type: 'item',
          //   classes: 'nav-item',
          //   url: '/bonLivraison',
          //   icon: 'feather icon-sliders'
          // },
          {
            id: 'clients',
            title: 'Clients',
            type: 'item',
            classes: 'nav-item',
            url: '/client/list',
            icon: 'icofont-contacts'
          },
          {
            id: 'fournisseurs',
            title: 'Fournisseurs',
            type: 'item',
            classes: 'nav-item',
            url: '/fournisseur/list',
            icon: 'icofont-business-man'
          },

          {
            id: 'transporteur',
            title: 'Transporteur',
            type: 'item',
            classes: 'nav-item',
            url: '/transporteur/list',
            icon: 'icofont-vehicle-delivery-van'
          },
          {
            id: 'importations',
            title: 'Importations',
            type: 'item',
            classes: 'nav-item',
            url: '/importations',
            icon: 'icofont-cash-on-delivery'
          },
          {
            id: 'parametresImportations',
            title: 'Parametres importations',
            type: 'item',
            classes: 'nav-item',
            url: '/parametresImportations',
            icon: 'feather icon-settings'
          },
          // {
          //   id: 'commerciaux',
          //   title: 'Commerciaux',
          //   type: 'item',
          //   classes: 'nav-item',
          //   url: '/bonTravail',
          //   icon: 'feather icon-user-check'
          // },
          // {
          //   id: 'banques',
          //   title: 'Banques',
          //   type: 'item',
          //   classes: 'nav-item',
          //   url: '/banque',
          //   icon: 'feather icon-bar-chart'
          // },

          // {
          //   id: 'soldeTiers',
          //   title: 'Solde initiaux des tiers',
          //   type: 'item',
          //   classes: 'nav-item',
          //   url: '/bonRetour',
          //   icon: 'feather icon-user-check'
          // },

        ]
      }
    ]
  },

  {
    id: 'ui-element',
    title: '',
    type: 'group',
    icon: 'feather icon-layers',
    children: [
      {
        id: 'achat',
        title: 'Achats',
        type: 'collapse',
        icon: 'feather icon-shopping-cart',
        children: [
          {
            id: 'demandeAchatInterne',
            title: 'Demande achat interne',
            type: 'item',
            classes: 'nav-item',
            url: '/demandeAchatInterne/list',
            icon: 'icofont-rotation'
          },
          {
            id: 'demandeOffresPrix',
            title: 'Demande offres prix',
            type: 'item',
            classes: 'nav-item',
            url: '/demandeOffrePrix/list',
            icon: 'icofont-price'
          },
          {
            id: 'DevisAchat',
            title: 'Devis Achat',
            type: 'item',
            classes: 'nav-item',
            url: '/devisAchat/list',
            icon: 'icofont-patient-file'
          },
          {
            id: 'ComparaisonPrixDevisAchat',
            title: 'Comparaison Prix Devis Achat',
            type: 'item',
            classes: 'nav-item',
            url: '/comparaisonPrixDevisAchat',
            icon: 'icofont-exclamation'
          },
          {
            id: 'bonsCommande',
            title: 'Bons de commande',
            type: 'item',
            classes: 'nav-item',
            url: '/bonCommande/list',
            icon: 'icofont-tasks'
          },
          {
            id: 'bonsReception',
            title: 'Bons de reception',
            type: 'item',
            classes: 'nav-item',
            url: '/bonReception/list',
            icon: 'icofont-tick-mark'
          },
          {
            id: 'achatComptoire',
            title: 'Achat Comptoire',
            type: 'item',
            classes: 'nav-item',
            url: '/achatComptoire/list',
            icon: 'icofont-leaflet'
          },
          /*{
             id: 'bonsAchat',
             title: 'Bons Achat',
             type: 'item',
             classes: 'nav-item',
             url: '/bonAchat/list',
             icon: 'feather icon-file-text'
           },*/
          {
            id: 'facturesAchat',
            title: 'Factures Achat',
            type: 'item',
            classes: 'nav-item',
            url: '/factureAchat/list',
            icon: 'icofont-ebook'
          },
          {
            id: 'BonRetourFournisseur',
            title: 'Bon Retour Fournisseur',
            type: 'item',
            url: '/bonRetourFournisseur/list',
            classes: 'nav-item',
            icon: 'icofont-rounded-double-left'
          },
          {
            id: 'retourAchatComptoire',
            title: 'Retour Achat Comptoire',
            type: 'item',
            url: '/retourAchatComptoire/list',
            classes: 'nav-item',
            icon: 'icofont-rounded-double-left'
          },
          //  {
          //    id: 'avoirsFournisseurs',
          //    title: 'Avoirs fournisseurs',
          //    type: 'item',
          //    classes: 'nav-item',
          //    url: '/bonLivraison',
          //    icon: 'icofont-money-bag'
          //  },
          //  {
          //    id: 'memoiresReglements',
          //    title: 'Mémoires de reglements',
          //    type: 'item',
          //    classes: 'nav-item',
          //    url: '/bonCommande',
          //    icon: 'icofont-memorial'
          //  },
          //  {
          //    id: 'suivieAchat',
          //    title: 'Suivie achat',
          //    type: 'item',
          //    classes: 'nav-item',
          //    url: '/bonLivraison',
          //    icon: 'icofont-hand-drag1'
          //  },
          {
            id: 'releveeFournisseur',
            title: 'Relevee fournisseur',
            type: 'item',
            classes: 'nav-item',
            url: '/fournisseur/releveFournisseur',
            icon: 'icofont-trello'
          },
          {
            id: 'classementFournisseurs',
            title: 'Classement fournisseurs',
            type: 'item',
            classes: 'nav-item',
            url: '/fournisseur/classementFournisseur',
            icon: 'icofont-result-sport'
          },
          {
            id: 'ReglementsBonAchat',
            title: 'Reglements B.A',
            type: 'item',
            classes: 'nav-item',
            url: '/reglement/bonAchat/list',
            icon: 'icofont-repair'
          },
          {
            id: 'ReglementsBonRetourFournisseur',
            title: 'Reglements B.R.F',
            type: 'item',
            classes: 'nav-item',
            url: '/reglement/bonRetourFournisseur/list',
            icon: 'icofont-repair'
          },
          {
            id: 'dmfFournisseur',
            title: 'DMF-Fournisseur',
            type: 'item',
            classes: 'nav-item',
            url: '/dmfFournisseur',
            icon: 'feather icon-paperclip'
          },
          {
            id: 'journalAchat',
            title: 'Journal-Achats',
            type: 'item',
            url: '/journalAchats',
            classes: 'nav-item',
            icon: 'icofont-calendar'
          }

        ]
      }
    ]
  },
  {
    id: 'ui-element',
    title: '',
    type: 'group',
    icon: 'feather icon-layers',
    children: [
      {
        id: 'stock',
        title: 'Stock',
        type: 'collapse',
        icon: 'icofont-database',
        children: [
          /*{
            id: 'bonsEntree',
            title: 'Bons Entree',
            type: 'item',
            classes: 'nav-item',
            url: '/bonEntree',
            icon: 'feather icon-file-plus'
          },
          {
            id: 'BonsSortie',
            title: 'Bons de sortie',
            type: 'item',
            classes: 'nav-item',
            url: '/bonCommande',
            icon: 'feather icon-file-plus'
          },*/
          {
            id: 'bonTransfert',
            title: 'Bon de transfert',
            type: 'item',
            classes: 'nav-item',
            url: '/bonTransfert/list',
            icon: 'icofont-redo'
          },
          {
            id: 'rappelStock',
            title: 'Rappel Stock',
            type: 'item',
            classes: 'nav-item',
            url: '/rappelStock',
            icon: 'icofont-read-book'
          },
          //  {
          //    id: 'bonReservation',
          //    title: 'Bon de reservation',
          //    type: 'item',
          //    classes: 'nav-item',
          //    url: '/bonReservation',
          //    icon: 'icofont-read-book-alt'
          //  },
          {
            id: 'bonCasses',
            title: 'Bon de casses',
            type: 'item',
            classes: 'nav-item',
            url: '/bonCasse/list',
            icon: 'icofont-close-squared-alt'
          },
          {
            id: 'mouvementStock',
            title: 'Mouvement de stock',
            type: 'item',
            url: '/mouvementStock',
            classes: 'nav-item',
            icon: 'icofont-refresh'
          },
          {
            id: 'correctionStock',
            title: 'Correction Stock',
            type: 'item',
            url: '/correctionStock/list',
            classes: 'nav-item',
            icon: 'icofont-repair'
          },
          {
            id: 'inventaire',
            title: 'Inventaire',
            type: 'item',
            classes: 'nav-item',
            url: '/inventaire/list',
            icon: 'icofont-database'
          },
          {
            id: 'alerteStock',
            title: 'Alerte de stock',
            type: 'item',
            classes: 'nav-item',
            url: '/article/alertStock',
            icon: 'icofont-alarm'
          },
          /* {
             id: 'suiviePieces',
             title: 'Suivie des pieces (N° serie)',
             type: 'item',
             classes: 'nav-item',
             url: '/bonRetour',
             icon: 'feather icon-file'
           },*/
          {
            id: 'valeurStock',
            title: 'Valeur de stock',
            type: 'item',
            classes: 'nav-item',
            url: '/valeurStock',
            icon: 'icofont-data'
          },
          {
            id: 'dmsStock',
            title: 'DMS-Stock',
            type: 'item',
            classes: 'nav-item',
            url: '/dmsStock',
            icon: 'icofont-delivery-time'
          },

        ]
      }
    ]
  },
  {
    id: 'ui-element',
    title: '',
    type: 'group',
    icon: 'feather icon-layers',
    children: [
      {
        id: 'vente',
        title: 'Vente',
        type: 'collapse',
        icon: 'icofont-sale-discount',
        children: [
          {
            id: 'devis',
            title: 'Devis',
            type: 'item',
            classes: 'nav-item',
            url: '/devis/list',
            icon: 'icofont-ui-copy'
          },
          {
            id: 'commandes',
            title: 'Commandes',
            type: 'item',
            classes: 'nav-item',
            url: '/commande/list',
            icon: 'icofont-designbump'
          },
          {
            id: 'venteComptoire',
            title: 'Vente Comptoire',
            type: 'item',
            classes: 'nav-item',
            url: '/venteComptoire/list',
            icon: 'icofont-cart-alt'
          },
          {
            id: 'bonsLivraison',
            title: 'Bons de livraison',
            type: 'item',
            classes: 'nav-item',
            url: '/bonLivraison/list',
            icon: 'icofont-fast-delivery'
          },
          {
            id: 'retourVenteComptoire',
            title: 'Retour Vente Comptoire',
            type: 'item',
            url: '/retourVenteComptoire/list',
            classes: 'nav-item',
            icon: 'icofont-caret-left'
          },
          {
            id: 'BonRetourClient',
            title: 'Bon Retour Client',
            type: 'item',
            url: '/bonRetourClient/list',
            classes: 'nav-item',
            icon: 'icofont-caret-left'
          },
          {
            id: 'facturesVente',
            title: 'Factures Vente',
            type: 'item',
            classes: 'nav-item',
            url: '/factureVente/list',
            icon: 'icofont-ui-clip-board'
          },
          //  {
          //    id: 'facturesAvoir',
          //    title: 'Factures avoir',
          //    type: 'item',
          //    classes: 'nav-item',
          //    url: '/factureAvoir',
          //    icon: 'icofont-ui-office'
          //  },
          //  {
          //    id: 'ordreLivraison',
          //    title: 'Ordre de livraison',
          //    type: 'item',
          //    classes: 'nav-item',
          //    url: '/ordreLivraison',
          //    icon: 'icofont-listing-number'
          //  },
          //  {
          //    id: 'calendrierLivraison',
          //    title: 'Calendrier de livraison',
          //    type: 'item',
          //    classes: 'nav-item',
          //    url: '/calendrierLivraison',
          //    icon: 'icofont-ui-calendar'
          //  },
          {
            id: 'projetsClient',
            title: 'Projets clients',
            type: 'item',
            classes: 'nav-item',
            url: '/client/projet/list',
            icon: 'icofont-users-social'
          },

          {
            id: 'ListArticlesVendu',
            title: 'Produits vendu',
            type: 'item',
            classes: 'nav-item',
            url: '/articlesVendu',
            icon: 'icofont-listine-dots'
          },

          {
            id: 'ReglementsBonLivraison',
            title: 'Reglements B.L',
            type: 'item',
            classes: 'nav-item',
            url: '/reglement/bonLivraison/list',
            icon: 'icofont-handshake-deal'
          },
          {
            id: 'ReglementsBonRetourClient',
            title: 'Reglements B.R.C',
            type: 'item',
            classes: 'nav-item',
            url: '/reglement/bonRetourClient/list',
            icon: 'icofont-handshake-deal'
          },
          {
            id: 'releveeClient',
            title: 'Relevee client',
            type: 'item',
            classes: 'nav-item',
            url: '/releveClientF',
            icon: 'icofont-user-alt-7'
          },
          {
            id: 'releveeClientDetaille',
            title: 'Relevee client Detaille',
            type: 'item',
            classes: 'nav-item',
            url: '/releveClientDetaille',
            icon: 'icofont-search-user'
          },
          {
            id: 'classementClient',
            title: 'Classement client',
            type: 'item',
            classes: 'nav-item',
            url: '/client/classementClient',
            icon: 'icofont-result-sport'
          },
          {
            id: 'prixSpecifique',
            title: 'Prix specifique',
            type: 'item',
            classes: 'nav-item',
            url: '/prixSpecifiques',
            icon: 'icofont-tags'
          },
          // {
          //   id: 'dlmClient',
          //   title: 'DLM-Client',
          //   type: 'item',
          //   classes: 'nav-item',
          //   url: '/dlmClient',
          //   icon: 'icofont-clock-time'
          // },
          {
            id: 'RBE-Article',
            title: 'RBE-article',
            type: 'item',
            classes: 'nav-item',
            url: '/rbeArticle',
            icon: 'icofont-list'
          },
          {
            id: 'dmcClient',
            title: 'DMC-Client',
            type: 'item',
            classes: 'nav-item',
            url: '/dmcClient',
            icon: 'icofont-clock-time'
          },
          {
            id: 'journalVente',
            title: 'Journal-Ventes',
            type: 'item',
            url: '/journalVentes',
            classes: 'nav-item',
            icon: 'icofont-clip-board'
          },
        ]
      }
    ]
  },
  {
    id: 'ui-element',
    title: '',
    type: 'group',
    icon: 'feather icon-layers',
    children: [
      {
        id: 'finance',
        title: 'Finance',
        type: 'collapse',
        icon: 'icofont-money-bag',
        children: [
          //  {
          //    id: 'encaissements',
          //    title: 'Encaissements',
          //    type: 'item',
          //    classes: 'nav-item',
          //    url: '/encaissements',
          //    icon: 'icofont-bank'
          //  },
          //  {
          //    id: 'decaissements',
          //    title: 'Decaissements',
          //    type: 'item',
          //    classes: 'nav-item',
          //    url: '/decaissements',
          //    icon: 'icofont-swoosh-down'
          //  },
          //  {
          //    id: 'recetteDepense',
          //    title: 'Recette et depense',
          //    type: 'item',
          //    classes: 'nav-item',
          //    url: '/recetteDepense',
          //    icon: 'icofont-file-alt'
          //  },
          // {
          //   id: 'clotureJournée',
          //   title: 'Cloture de journée',
          //   type: 'item',
          //   classes: 'nav-item',
          //   url: '/clotureJournée',
          //   icon: 'icofont-ui-calendar'
          // },
          {
            id: 'charges-societe',
            title: 'Charges société',
            type: 'item',
            classes: 'nav-item',
            url: '/chargesSociete/list',
            icon: 'icofont-flash'
          },
          //  {
          //    id: 'ordresVirements',
          //    title: 'Ordres de virements',
          //    type: 'item',
          //    classes: 'nav-item',
          //    url: '/ordresVirements',
          //    icon: 'icofont-listing-number'
          //  },
          //  {
          //    id: 'demandesPaiement',
          //    title: 'Demandes de paiement',
          //    type: 'item',
          //    classes: 'nav-item',
          //    url: '/demandesPaiement',
          //    icon: 'icofont-pay'
          //  },
          //  {
          //    id: 'ordresPaiement',
          //    title: 'Ordres de paiement',
          //    type: 'item',
          //    classes: 'nav-item',
          //    url: '/ordresPaiement',
          //    icon: 'icofont-listing-number'
          //  },
          //  {
          //    id: 'gestionChequiers',
          //    title: 'Gestion des chequiers',
          //    type: 'item',
          //    classes: 'nav-item',
          //    url: '/gestionChequiers',
          //    icon: 'icofont-archive'
          //  },
          //  {
          //    id: 'carnetRecus',
          //    title: 'Carnet des recus',
          //    type: 'item',
          //    classes: 'nav-item',
          //    url: '/carnetRecus',
          //    icon: 'icofont-book-alt'
          //  },
          //  {
          //    id: 'MVTInterComptes',
          //    title: 'MVT inter-comptes',
          //    type: 'item',
          //    classes: 'nav-item',
          //    url: '/MVTInterComptes',
          //    icon: 'icofont-hand-drag'
          //  },
          //  {
          //    id: 'retenueAchat',
          //    title: 'Retenue à la source Achat',
          //    type: 'item',
          //    classes: 'nav-item',
          //    url: '/retenueAchat',
          //    icon: 'icofont-pie-chart'
          //  },
          //  {
          //    id: 'lettrageVentes',
          //    title: 'Lettrage des ventes',
          //    type: 'item',
          //    classes: 'nav-item',
          //    url: '/lettrageVentes',
          //    icon: 'icofont-shopify'
          //  },
          //  {
          //    id: 'versements',
          //    title: 'Versements',
          //    type: 'item',
          //    classes: 'nav-item',
          //    url: '/versements',
          //    icon: 'icofont-bill'
          //  },
          //  {
          //    id: 'bordereauRemiseChaques',
          //    title: 'Bordereau remise chéques',
          //    type: 'item',
          //    classes: 'nav-item',
          //    url: '/bordereauRemiseChaques',
          //    icon: 'icofont-sale-discount'
          //  },
          //  {
          //    id: 'bordereauVersements',
          //    title: 'Bordereau de versements',
          //    type: 'item',
          //    classes: 'nav-item',
          //    url: '/bordereauVersements',
          //    icon: 'icofont-sale-discount'
          //  },
          // {
          //   id: 'suivieEchanciersClients',
          //   title: 'Suivie echanciers clients',
          //   type: 'item',
          //   classes: 'nav-item',
          //   url: '/suivieEchanciersClients',
          //   icon: 'icofont-search-user'
          // },
          //  {
          //    id: 'reglementsImpayés',
          //    title: 'Reglements impayés',
          //    type: 'item',
          //    classes: 'nav-item',
          //    url: '/reglementsImpayés',
          //    icon: 'icofont-dollar-flase'
          //  },
          // {
          //   id: 'suivieEchanciersFournisseurs',
          //   title: 'Suivie echanciers fournisseurs',
          //   type: 'item',
          //   classes: 'nav-item',
          //   url: '/suivieEchanciersFournisseurs',
          //   icon: 'icofont-search-user'
          // },
          //  {
          //    id: 'cautionsBancaires',
          //    title: 'Cautions bancaires',
          //    type: 'item',
          //    classes: 'nav-item',
          //    url: '/cautionsBancaires',
          //    icon: 'icofont-bank'
          //  },
          //  {
          //    id: 'alimentationCaisse',
          //    title: 'Alimentation de caisse',
          //    type: 'item',
          //    classes: 'nav-item',
          //    url: '/alimentationCaisse',
          //    icon: 'icofont-dollar-plus'
          //  },
          //  {
          //    id: 'versementsEspece',
          //    title: 'Versements espece',
          //    type: 'item',
          //    classes: 'nav-item',
          //    url: '/versementsEspece',
          //    icon: 'icofont-coins'
          //  },
          //  {
          //    id: 'transfertCaisse',
          //    title: 'Transfert de caisse',
          //    type: 'item',
          //    classes: 'nav-item',
          //    url: '/transfertCaisse',
          //    icon: 'icofont-share-boxed'
          //  },
          {
            id: 'charges',
            title: 'Coûts directs',
            type: 'item',
            classes: 'nav-item',
            url: '/chargeDirecte/list',
            icon: 'icofont-flash'
          },
          // {
          //   id: 'suiviCaisse',
          //   title: 'Suivi de caisse',
          //   type: 'item',
          //   classes: 'nav-item',
          //   url: '/sessionCaisses/recherche',
          //   icon: 'icofont-inbox'
          // },
          {
            id: 'sessionCaisse',
            title: 'session des caisses',
            type: 'item',
            classes: 'nav-item',
            url: '/sessionCaisses/list',
            icon: 'icofont-listing-box'
          },

          {
            id: 'caisses',
            title: 'Caisses',
            type: 'item',
            classes: 'nav-item',
            url: '/caisses',
            icon: 'icofont-dropbox'
          },
          //  {
          //    id: 'interetsBancaire',
          //    title: 'Interets bancaire',
          //    type: 'item',
          //    classes: 'nav-item',
          //    url: '/interetsBancaire',
          //    icon: 'icofont-bank'
          //  },
          //  {
          //    id: 'gestionAGIO',
          //    title: 'Gestion des AGIO',
          //    type: 'item',
          //    classes: 'nav-item',
          //    url: '/gestionAGIO',
          //    icon: 'icofont-chart-line-alt'
          //  },
          //  {
          //    id: 'listeAGIO',
          //    title: 'Liste des AGIO',
          //    type: 'item',
          //    classes: 'nav-item',
          //    url: '/listeAGIO',
          //    icon: 'icofont-listine-dots'
          //  },
          //  {
          //    id: 'engagementFournisseurs',
          //    title: 'Engagement fournisseurs',
          //    type: 'item',
          //    classes: 'nav-item',
          //    url: '/engagementFournisseurs',
          //    icon: 'icofont-handshake-deal'
          //  },
          //  {
          //    id: 'engagementLeasing',
          //    title: 'Engagement Leasing',
          //    type: 'item',
          //    classes: 'nav-item',
          //    url: '/engagementLeasing',
          //    icon: 'icofont-handshake-deal'
          //  },
        ]
      }
    ]
  },


  {
    id: 'ui-element',
    title: '',
    type: 'group',
    icon: 'feather icon-layers',
    children: [
      {
        id: 'variable',
        title: 'Variable',
        type: 'collapse',
        icon: 'feather icon-grid',
        children: [
          {
            id: 'categories',
            title: 'Categories articles',
            type: 'item',
            classes: 'nav-item',
            url: '/variable/categories/list',
            icon: 'icofont-listing-number'
          },
          {
            id: 'familles',
            title: 'Familles articles',
            type: 'item',
            classes: 'nav-item',
            url: '/variable/familles/list',
            icon: 'icofont-listine-dots'
          },
          {
            id: 'sousfamilles',
            title: 'Sous familles articles',
            type: 'item',
            classes: 'nav-item',
            url: '/variable/sousFamilles/list',
            icon: 'icofont-sub-listing'
          },
          {
            id: 'marques',
            title: 'Marques',
            type: 'item',
            classes: 'nav-item',
            url: '/variable/marque/list',
            icon: 'icofont-book-mark'
          },
          {
            id: 'modeles',
            title: 'Modéles',
            type: 'item',
            classes: 'nav-item',
            url: '/variable/modele/list',
            icon: 'icofont-cubes'
          },
          {
            id: 'depot',
            title: 'Depots',
            type: 'item',
            classes: 'nav-item',
            url: '/depot/list',
            icon: 'icofont-presentation'
          },
          {
            id: 'tauxTVA',
            title: 'Taux TVA',
            type: 'item',
            classes: 'nav-item',
            url: '/parametre/tauxTVA/list',
            icon: 'icofont-ui-rate-blank'
          },
          {
            id: 'frais',
            title: 'Frais',
            type: 'item',
            classes: 'nav-item',
            url: '/variable/frais/list',
            icon: 'icofont-bill'
          },
          {
            id: 'etatGlobal',
            title: 'Etat Global',
            type: 'item',
            classes: 'nav-item',
            url: '/variable/etatGlobal/list',
            icon: 'icofont-world'
          },
          {
            id: 'role',
            title: 'Type Role',
            type: 'item',
            classes: 'nav-item',
            url: '/role/list',
            icon: 'icofont-user-alt-1'
          },
          {
            id: 'uniteMesure',
            title: 'Unité mesure',
            type: 'item',
            classes: 'nav-item',
            url: '/variable/uniteMesure/list',
            icon: 'icofont-instrument'
          },
          {
            id: 'modeReglements',
            title: 'Modes de reglements',
            type: 'item',
            classes: 'nav-item',
            url: '/parametre/modeReglement/list',
            icon: 'icofont-info-circle'
          },
          {
            id: 'modeLivraison',
            title: 'Mode livraison',
            type: 'item',
            classes: 'nav-item',
            url: '/variable/modeLivraison/list',
            icon: 'icofont-info-circle'
          },
          {
            id: 'typeContact',
            title: 'Type Contact',
            type: 'item',
            classes: 'nav-item',
            url: '/typeContact/list',
            icon: 'icofont-info-circle'
          },
          {
            id: 'typeFournisseurs',
            title: 'Type Fournisseurs',
            type: 'item',
            classes: 'nav-item',
            url: '/typeFournisseur',
            icon: 'icofont-info-circle'
          },
          {
            id: 'Personnelles',
            title: 'Personnelles',
            type: 'item',
            classes: 'nav-item',
            url: '/personnel/list',
            icon: 'icofont-users-social'
          },
          {
            id: 'rolesUtilisateurs',
            title: 'Roles utilisateurs',
            type: 'item',
            classes: 'nav-item',
            url: '/role/list',
            icon: 'icofont-users'
          },
          {
            id: 'droitsAccèsUtilisateurs',
            title: 'Droits accès utilisateurs',
            type: 'item',
            classes: 'nav-item',
            url: '/utilisateur/list',
            icon: 'icofont-user-alt-2'
          },
          {
            id: 'secteurs',
            title: 'Secteurs',
            type: 'item',
            classes: 'nav-item',
            url: '/secteur/list',
            icon: 'icofont-building-alt'
          },
          {
            id: 'variantes',
            title: 'Variantes',
            type: 'item',
            classes: 'nav-item',
            url: '/variantes',
            icon: 'icofont-direction-sign'
          },
          {
            id: 'methodeReglement',
            title: 'Methode Reglement',
            type: 'item',
            classes: 'nav-item',
            url: '/variable/methodeReglement/list',
            icon: 'icofont-handshake-deal'
          }
        ]
      }
    ]
  },

  {
    id: 'ui-element',
    title: '',
    type: 'group',
    icon: 'feather icon-layers',
    children: [
      {
        id: 'fichier',
        title: 'AutreFichier',
        type: 'collapse',
        icon: 'icofont-files-stack',
        children: [
          {
            id: 'BonTravail',
            title: 'Bon Travail',
            type: 'item',
            url: '/bonTravail/list',
            classes: 'nav-item',
            icon: 'icofont-worker'
          },
          {
            id: 'BonPrelevement',
            title: 'Bon Prelevement',
            type: 'item',
            url: '/bonPrelevement/list',
            classes: 'nav-item',
            icon: 'icofont-cut'
          },
          {
            id: 'typeTier',
            title: 'Type Tier',
            type: 'item',
            url: '/typeTier/list',
            classes: 'nav-item',
            icon: 'icofont-pencil-alt-1'
          },
          {
            id: 'conditionReglement',
            title: 'Condition Reglement',
            type: 'item',
            url: '/conditionReglement',
            classes: 'nav-item',
            icon: 'icofont-calculations'
          },
          {
            id: 'statuOpportunite',
            title: 'status Opportunite',
            type: 'item',
            url: '/statuOpportunite',
            classes: 'nav-item',
            icon: 'icofont-unique-idea'
          },
          {
            id: 'projetInterne',
            title: 'Projet interne',
            type: 'item',
            url: '/projetInterne/list',
            classes: 'nav-item',
            icon: 'icofont-architecture-alt'
          },
          {
            id: 'forms-element',
            title: 'Tache ProjetInterne',
            type: 'item',
            url: '/tacheProjetInterne/list',
            classes: 'nav-item',
            icon: 'icofont-clip-board'
          },
          {
            id: 'typeCompte',
            title: 'Type Compte',
            type: 'item',
            url: '/typeCompte',
            classes: 'nav-item',
            icon: 'icofont-ui-settings'
          },
          {
            id: 'nomenclature',
            title: 'Nomenclature',
            type: 'item',
            url: '/nomenclature',
            classes: 'nav-item',
            icon: 'icofont-id-card'
          },
          {
            id: 'situationReg',
            title: 'Situation Reglement',
            type: 'item',
            url: '/parametre/modeReglement/situationReg',
            classes: 'nav-item',
            icon: 'icofont-opposite'
          },
          {
            id: 'expedition',
            title: 'Expedition',
            type: 'item',
            url: '/expedition/list',
            classes: 'nav-item',
            icon: 'icofont-fast-delivery'
          },
        ]
      }]
  },
  {
    id: 'ui-element',
    title: '',
    type: 'group',
    icon: 'feather icon-layers',
    children: [
      {
        id: 'gmao',
        title: 'GMAO',
        type: 'collapse',
        icon: 'icofont-monitor',
        children: [
          {
            id: 'forms-element',
            title: 'Categorie Machine',
            type: 'item',
            url: '/gmao/categorieMachine',
            classes: 'nav-item',
            icon: 'icofont-navigation-menu'
          },
          {
            id: 'forms-element',
            title: 'Modele Machine',
            type: 'item',
            url: '/gmao/modeleMachine',
            classes: 'nav-item',
            icon: 'icofont-navigation-menu'
          },
          {
            id: 'forms-element',
            title: 'Marque Machine',
            type: 'item',
            url: '/gmao/marqueMachine',
            classes: 'nav-item',
            icon: 'icofont-brand-natgeo'
          },
          {
            id: 'forms-element',
            title: 'Operation Preventif',
            type: 'item',
            url: '/gmao/operationPreventif',
            classes: 'nav-item',
            icon: 'icofont-repair'
          },
          {
            id: 'forms-element',
            title: 'Energie',
            type: 'item',
            url: '/gmao/energie',
            classes: 'nav-item',
            icon: 'icofont-power-zone'
          },
          {
            id: 'forms-element',
            title: 'Machine',
            type: 'item',
            url: '/gmao/machine',
            classes: 'nav-item',
            icon: 'icofont-truck'
          },
          {
            id: 'forms-element',
            title: 'Periodicite',
            type: 'item',
            url: '/gmao/periodicite',
            classes: 'nav-item',
            icon: 'icofont-delivery-time'
          },
          {
            id: 'forms-element',
            title: 'Etat Tache',
            type: 'item',
            url: '/gmao/etatTache',
            classes: 'nav-item',
            icon: 'icofont-attachment'
          },
          {
            id: 'forms-element',
            title: 'Plan Preventif',
            type: 'item',
            url: '/gmao/planPreventif/list',
            classes: 'nav-item',
            icon: 'icofont-patient-file'
          },
          {
            id: 'forms-element',
            title: 'Tache Preventif',
            type: 'item',
            url: '/gmao/tachePreventif/list',
            classes: 'nav-item',
            icon: 'icofont-attachment'
          },
          {
            id: 'forms-element',
            title: 'Etat Carburant',
            type: 'item',
            url: '/gmao/etatCarburant',
            classes: 'nav-item',
            icon: 'icofont-energy-oil'
          },
          {
            id: 'forms-element',
            title: 'Technicien',
            type: 'item',
            url: '/gmao/technicien/list',
            classes: 'nav-item',
            icon: 'icofont-labour'
          },
          {
            id: 'ordreMission',
            title: 'Ordre de mission',
            type: 'item',
            classes: 'nav-item',
            url: '/ordreEmission/list',
            icon: 'icofont-file-document'
          },

          {
            id: 'forms-element',
            title: 'Type Frais',
            type: 'item',
            url: '/gmao/typeFrais/list',
            classes: 'nav-item',
            icon: 'icofont-money'
          },
          {
            id: 'forms-element',
            title: 'Mission',
            type: 'item',
            url: '/gmao/missions/list',
            classes: 'nav-item',
            icon: 'icofont-brand-target'
          },
          {
            id: 'forms-element',
            title: 'Frais Mission',
            type: 'item',
            url: '/gmao/fraisMission',
            classes: 'nav-item',
            icon: 'icofont-money'
          },
          {
            id: 'forms-element',
            title: 'Chauffeur',
            type: 'item',
            url: '/gmao/chauffeur/list',
            classes: 'nav-item',
            icon: 'icofont-labour'
          },
          {
            id: 'forms-element',
            title: 'Vehicule',
            type: 'item',
            url: '/gmao/vehicule',
            classes: 'nav-item',
            icon: 'icofont-vehicle-delivery-van'
          },
          {
            id: 'forms-element',
            title: 'Pointage Compte',
            type: 'item',
            url: '/gmao/pointageCompteur/list',
            classes: 'nav-item',
            icon: 'icofont-hand-drag1'
          },
        ]
      }]
  },
  {
    id: 'ui-element',
    title: '',
    type: 'group',
    icon: 'feather icon-layers',
    children: [
      {
        id: 'comptabilite',
        title: 'Comptabilite',
        type: 'collapse',
        icon: 'icofont-attachment',
        children: [
          {
            id: 'forms-element',
            title: 'Classe',
            type: 'item',
            url: '/comptabilite/classe',
            classes: 'nav-item',
            icon: 'icofont-hand-drawn-right'
          },
        ]
      }]
  },
  {
    id: 'ui-element',
    title: '',
    type: 'group',
    icon: 'feather icon-layers',
    children: [
      {
        id: 'administration',
        title: 'Administration',
        type: 'collapse',
        icon: 'feather icon-settings',
        children: [
          {
            id: 'listparamliv',
            title: 'Paramètres Colonnes Facture',
            type: 'item',
            classes: 'nav-item',
            url: '/parametreColonnesFacture/listparamliv',
            icon: 'icofont-file-exe'
          },
          /*{
            id: 'Parametres',
            title: 'Paramètres Généraux Facture',
            type: 'item',
            classes: 'nav-item',
            url: '/parametreGeneraleFacture/validparam',
            icon: 'feather icon-shuffle'
          },*/
          {
            id: 'Parametres',
            title: 'Parametres',
            type: 'item',
            classes: 'nav-item',
            url: '/parametresPage',
            icon: 'icofont-file-exe'
          },
          {
            id: 'exercices',
            title: 'Exercices',
            type: 'item',
            classes: 'nav-item',
            url: '/exercices',
            icon: 'icofont-file-alt'
          },
          {
            id: 'configurationSociétes',
            title: 'Configuration sociétes',
            type: 'item',
            classes: 'nav-item',
            url: '/parametre/societe/list',
            icon: 'icofont-file-exe'
          },
          // {
          //   id: 'importation',
          //   title: 'Importation',
          //   type: 'item',
          //   classes: 'nav-item',
          //   url: '/importation',
          //   icon: 'icofont-file-exe'
          // },
          /*{
            id: 'confTableauBord',
            title: 'Configuration Tableau bord',
            type: 'item',
            classes: 'nav-item',
            url: '/confTableauBord',
            icon: 'feather icon-crop'
          },
          {
            id: 'licence',
            title: 'Licence',
            type: 'item',
            classes: 'nav-item',
            url: '/licence',
            icon: 'feather icon-alert-octagon'
          },*/
        ]
      }
    ]
  },
  //  {
  //    id: 'ui-element',
  //    title: 'Client',
  //    type: 'group',
  //    icon: 'feather icon-layers',
  //    children: [
  //      {
  //        id: 'basic',
  //        title: 'Basic',
  //        type: 'collapse',
  //        icon: 'feather icon-box',
  //        children: [
  //          {
  //            id: 'alert',
  //            title: 'Alert',
  //            type: 'item',
  //            url: '/basic/alert'
  //          },
  //          {
  //            id: 'button',
  //            title: 'Button',
  //            type: 'item',
  //            url: '/basic/button'
  //          },
  //          {
  //            id: 'badges',
  //            title: 'Badges',
  //            type: 'item',
  //            url: '/basic/badges'
  //          },
  //          {
  //            id: 'breadcrumb-pagination',
  //            title: 'Breadcrumbs & Pagination',
  //            type: 'item',
  //            url: '/basic/breadcrumb-paging'
  //          },
  //          {
  //            id: 'cards',
  //            title: 'Cards',
  //            type: 'item',
  //            url: '/basic/cards'
  //          },
  //          {
  //            id: 'collapse',
  //            title: 'Collapse',
  //            type: 'item',
  //            url: '/basic/collapse'
  //          },
  //          {
  //            id: 'carousel',
  //            title: 'Carousel',
  //            type: 'item',
  //            url: '/basic/carousel'
  //          },
  //          {
  //            id: 'grid-system',
  //            title: 'Grid System',
  //            type: 'item',
  //            url: '/basic/grid-system'
  //          },
  //          {
  //            id: 'progress',
  //            title: 'Progress',
  //            type: 'item',
  //            url: '/basic/progress'
  //          },
  //          {
  //            id: 'modal',
  //            title: 'Modal',
  //            type: 'item',
  //            url: '/basic/modal'
  //          },
  //          {
  //            id: 'spinner',
  //            title: 'Spinner',
  //            type: 'item',
  //            url: '/basic/spinner'
  //          },
  //          {
  //            id: 'tabs-pills',
  //            title: 'Tabs & Pills',
  //            type: 'item',
  //            url: '/basic/tabs-pills'
  //          },
  //          {
  //            id: 'typography',
  //            title: 'Typography',
  //            type: 'item',
  //            url: '/basic/typography'
  //          },
  //          {
  //            id: 'tooltip-popovers',
  //            title: 'Tooltip & Popovers',
  //            type: 'item',
  //            url: '/basic/tooltip-popovers'
  //          },
  //          {
  //            id: 'toasts',
  //            title: 'Toasts',
  //            type: 'item',
  //            url: '/basic/toasts'
  //          },
  //          {
  //            id: 'other',
  //            title: 'Other',
  //            type: 'item',
  //            url: '/basic/other'
  //          }
  //        ]
  //      },
  //      {
  //        id: 'bootstrap',
  //        title: 'Liste',
  //        type: 'item',
  //        url: '/tbl-bootstrap/bt-basic',
  //        classes: 'nav-item',
  //        icon: 'feather icon-server'
  //      }
  //    ]
  //  },
  //  {
  //    id: 'forms',
  //    title: 'Article',
  //    type: 'group',
  //    icon: 'feather icon-layout',
  //    children: [
  //      {
  //        id: 'forms-element',
  //        title: 'Forms',
  //        type: 'item',
  //        url: '/forms/basic',
  //        classes: 'nav-item',
  //        icon: 'feather icon-file-text'
  //      }
  //    ]
  //  },
   {
     id: 'pages',
     title: 'Pages',
     type: 'group',
     icon: 'feather icon-file-text',
     children: [
       {
         id: 'auth',
         title: 'Authentication',
         type: 'collapse',
         icon: 'feather icon-lock',
         children: [
           {
             id: 'signup',
             title: 'Sign up',
             type: 'item',
             url: '/auth/signup',
             target: true,
             breadcrumbs: false,
             icon : "icofont-medical-sign"
           },
           {
             id: 'signin',
             title: 'Sign in',
             type: 'item',
             url: '/auth/signin',
             target: true,
             breadcrumbs: false,
             icon : "icofont-sign-in"
           }
         ]
       },
      //  {
      //    id: 'sample-page',
      //    title: 'Sample Page',
      //    type: 'item',
      //    url: '/sample-page',
      //    classes: 'nav-item',
      //    icon: 'feather icon-sidebar'
      //  }
     ]
   }
]


@Injectable()
export class NavigationItem {

  constructor(private tokenStorageService: TokenStorageService) {

  }

  public get() {

    const user = this.tokenStorageService.getUser()
    let newNavigationsItems = []

    if (user != undefined && user != null && user != {} && user.role != null) {
      newNavigationsItems = this.getItemsFormNavigation(NavigationItems, user)
    }

    return newNavigationsItems;

  }

  getItemsFormNavigation(navigationItems, user) {
    let newNavigation = []

    for (let item of navigationItems) {
      if (item.children && item.children.length > 0) {

        let childrens = this.getItemsFormNavigation(item.children, user)
        item.children = childrens

        if (this.checkIsValide(item, user)) {
          newNavigation.push(item)
        }
      } else {
        if (this.checkIsValide(item, user)) {
          newNavigation.push(item)
        }
      }
    }

    return newNavigation
  }

  checkIsValide(item, user) {
    if (user.role.modules.filter(x => x.id == item.id).length > 0) {
      let module = user.role.modules.filter(x => x.id == item.id)[0]
      if (module.avoirAccee != "non") {
        return true
      }
    } else {
      return true
    }
    return false
  }

}
