import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { SuperAdminComponent } from './theme/layout/super-admin/super-admin.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'authentication/login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./demo/pages/authentication/authentication.module').then(module => module.AuthenticationModule)
      },
      {
        path: 'authentication',
        loadChildren: () => import('./authentication/authentication.module').then(module => module.AuthenticationModule)
      },

    ]
  },

  {
    path: 'dashboard-admin',
    component: SuperAdminComponent,
    children: [
            {
              path: 'role/:id',
              loadChildren: () => import('./comerce/admin/role-admin/role-admin.module').then(module => module.RoleAdminModule)
            },
            //  {
            //    path: 'AjouterRole/:idSociete',
            //    loadChildren: () => import('./comerce/role/ajouter-role/ajouter-role.module').then(module => module.AjouterRoleModule)
            //  },
            //  {
            //    path: 'ModifierRole/:idSociete/:id',
            //    loadChildren: () => import('./comerce/role/modifier-role/modifier-role.module').then(module => module.ModifierRoleModule)
            //  },
            //  {
            //    path: 'AjouterSociete',
            //    loadChildren: () => import('./comerce/parametres/societe/ajout-societe/ajout-societe.module').then(module => module.AjoutSocieteModule)
            //  },
            //  {
            //    path: 'ModifierSociete/:id',
            //    loadChildren: () => import('./comerce/parametres/societe/ajout-societe/ajout-societe.module').then(module => module.AjoutSocieteModule)
            //  },
              {
                path: 'societe',
                loadChildren: () => import('./comerce/admin/societe-admin/societe-admin.module').then(module => module.SocieteAdminModule)
              },
              {
                path: 'utilisateur/:id',
                loadChildren: () => import('./comerce/admin/utilisateur-admin/utilisateur-admin.module').then(module => module.UtilisateurAdminModule)
              }
    ]
  },

  {
    path: '',
    component: AdminComponent,
    children: [
     
        //  {
        //    path: 'rbeArticle',
        //    loadChildren: () => import('./comerce/rbe-article/rbe-article-routing.module').then(module => module.RbeArticleRoutingModule)
        //  },
        //  {
        //    path: 'dlmClient/:idClient',
        //    loadChildren: () => import('./comerce/dlm-client/dlm-client.module').then(module => module.DlmClientModule)
        //  },
        //  {
        //    path: 'dlmClient',
        //    loadChildren: () => import('./comerce/dlm-client/dlm-client.module').then(module => module.DlmClientModule)
        //  },
        //   {
        //     path: 'dmcClient/:idClient',
        //     loadChildren: () => import('./comerce/dmc-client/dmc-client.module').then(module => module.DmcClientModule)
        //   },
        //   {
        //     path: 'dmcClient',
        //     loadChildren: () => import('./comerce/dmc-client/dmc-client.module').then(module => module.DmcClientModule)
        //   },
        //    {
        //      path: 'dmsStock',
        //      loadChildren: () => import('./comerce/dms-vente/dms-vente.module').then(module => module.DmsVenteModule)
        //    },
        //    {
        //      path: 'dmfFournisseur/:idFournisseur',
        //      loadChildren: () => import('./comerce/dmf-fournisseur/dmf-fournisseur.module').then(module => module.DmfFournisseurModule)
        //    },
        //    {
        //      path: 'dmfFournisseur',
        //      loadChildren: () => import('./comerce/dmf-fournisseur/dmf-fournisseur.module').then(module => module.DmfFournisseurModule)
        //    },
       {
         path: 'prixSpecifiques',
         loadChildren: () => import('./comerce/article/prix-specifique-article/prix-specifique-articl-input/prix-specifique-articl-input.module').then(module => module.PrixSpecifiqueArticlInputModule)
       },
       {
         path: 'dashboard',
         loadChildren: () => import('./demo/dashboard/dashboard.module').then(module => module.DashboardModule)
       },
       {
         path: 'layout',
         loadChildren: () => import('./demo/pages/layout/layout.module').then(module => module.LayoutModule)
       },
       {
         path: 'basic',
         loadChildren: () => import('./demo/ui-elements/ui-basic/ui-basic.module').then(module => module.UiBasicModule)
       },
       {
         path: 'forms',
         loadChildren: () => import('./demo/pages/form-elements/form-elements.module').then(module => module.FormElementsModule)
       },
       {
         path: 'tbl-bootstrap',
         loadChildren: () => import('./demo/pages/tables/tbl-bootstrap/tbl-bootstrap.module').then(module => module.TblBootstrapModule)
       },
       {
         path: 'charts',
         loadChildren: () => import('./demo/pages/core-chart/core-chart.module').then(module => module.CoreChartModule)
       },
       {
         path: 'maps',
         loadChildren: () => import('./demo/pages/core-maps/core-maps.module').then(module => module.CoreMapsModule)
       },
       {
         path: 'sample-page',
         loadChildren: () => import('./demo/pages/sample-page/sample-page.module').then(module => module.SamplePageModule)
       },
       {
         path: 'client',
         loadChildren: () => import('./comerce/client/client.module').then(module => module.ClientModule)
       },
        {
          path: 'fournisseur',
          loadChildren: () => import('./comerce/fournisseur/fournisseur.module').then(module => module.FournisseurModule)
        },
      {
        path: 'article',
        loadChildren: () => import('./comerce/article/article.module').then(module => module.ArticleModule)
      },
      {
        path: 'importations',
        loadChildren: () => import('./importations-page/importations-page.module').then(module => module.ImportationsPageModule)
      },
      {
        path: 'parametresImportations',
        loadChildren: () => import('./parametres-importations-page/parametres-importations-page.module').then(module => module.ParametresImportationsPageModule)
      }, 
      {
        path: 'parametresPage',
        loadChildren: () => import('./parametres-page/parametres-page.module').then(module => module.ParametresPageModule)
      },
      {
        path: 'alert-stock',
        loadChildren: () => import('./comerce/article/alert-stock/alert-stock.module').then(module => module.AlertStockModule)
      },
          //  {
          //    path: 'transporteur',
          //    loadChildren: () => import('./comerce/transporteur/transporteur.module').then(module => module.TransporteurModule)
          //  },
          //  {
          //    path: 'depot',
          //    loadChildren: () => import('./comerce/depot/depot.module').then(module => module.DepotModule)
          //  },
          //   {
          //     path: 'parametre',
          //     loadChildren: () => import('./comerce/parametres/parametres.module').then(module => module.ParametresModule)
          //   },
      
           {
             path: 'variable',
             loadChildren: () => import('./comerce/variables/variables.module').then(module => module.VariablesModule)
           }, 
    {
      path: 'bonLivraison',
      loadChildren: () => import('./comerce/bonLivraison/bon-livrason.module').then(module => module.BonLivrasonModule)
    },
     {
       path: 'venteComptoire',
       loadChildren: () => import('./comerce/bonLivraison/bon-livrason.module').then(module => module.BonLivrasonModule)
     },
     {
       path: 'parametreColonnesFacture',
       loadChildren: () => import('./comerce/bonLivraison/livraison/livraison.module').then(module => module.LivraisonModule)
     },
      {
        path: 'parametreGeneraleFacture',
        loadChildren: () => import('./comerce/bonLivraison/parametrelivraison/parametrelivraison.module').then(module => module.ParametrelivraisonModule)
      },
      //        {
      //          path: 'bonTransfert',
      //          loadChildren: () => import('./comerce/bonTransfert/bon-transfert.module').then(module => module.BonTransfertModule)
      //        },
      //      {
      //       path: 'bonCasse',
      //       loadChildren: () => import('./comerce/bonCasse/bon-casse.module').then(module => module.BonCasseModule)
      //      },
      //    {
      //      path: 'demandeAchatInterne',
      //      loadChildren: () => import('./comerce/demandeAchatInterne/demande-achat-interne.module').then(module => module.DemandeAchatInterneModule)
      //    },
      //    {
      //      path: 'demandeOffrePrix',
      //      loadChildren: () => import('./comerce/demande-offre-prix/demande-offre-prix-crud.module').then(module => module.DemandeOffrePrixCrudModule)
      //    },
      //     {
      //       path: 'devisAchat',
      //       loadChildren: () => import('./comerce/devis-achat/devis-achat.module').then(module => module.DevisAchatModule)
      //     },
      //    {
      //      path: 'comparaisonPrixDevisAchat',
      //      loadChildren: () => import('./comerce/comparison-prix-devis-achat/comparison-prix-devis-achat.module').then(module => module.ComparisonPrixDevisAchatModule)
      //    }, 
          
      //     {
      //       path: 'bonReception',
      //       loadChildren: () => import('./comerce/bonReception/bonreception.module').then(module => module.BonreceptionModule)
      //     },
      //     {
      //       path: 'achatComptoire',
      //       loadChildren: () => import('./comerce/bonReception/bonreception.module').then(module => module.BonreceptionModule)
      //     },
      //     {
      //       path: 'bonCommande',
      //       loadChildren: () => import('./comerce/bonCommande/boncommande.module').then(module => module.BoncommandeModule)
      //     },
      //  {
      //    path: 'bonRetourClient',
      //    loadChildren: () => import('./comerce/bonRetourClient/bonretourclient.module').then(module => module.BonretourclientModule)
      //  },
      //    {
      //      path: 'retourVenteComptoire',
      //      loadChildren: () => import('./comerce/bonRetourClient/bonretourclient.module').then(module => module.BonretourclientModule)
      //    },
      //     {
      //       path: 'bonRetourFournisseur',
      //       loadChildren: () => import('./comerce/bonRetourFournisseur/bonretourfournisseur.module').then(module => module.BonretourfournisseurModule)
      //     },
      //     {
      //       path: 'retourAchatComptoire',
      //       loadChildren: () => import('./comerce/bonRetourFournisseur/bonretourfournisseur.module').then(module => module.BonretourfournisseurModule)
      //     },
      //    {
      //      path: 'commande',
      //      loadChildren: () => import('./comerce/commande/commande.module').then(module => module.CommandeModule)
      //    },
      //      {
      //        path: 'devis',
      //        loadChildren: () => import('./comerce/devis/devis.module').then(module => module.DevisModule)
      //      },
      //         {
      //          path: 'inventaire',
      //          loadChildren: () => import('./comerce/inventaire/inventaire.module').then(module => module.InventaireModule)
      //        }, 
          {
            path: 'reglement',
            loadChildren: () => import('./comerce/reglements/reglements.module').then(module => module.ReglementsModule)
          },
          // {
          //   path: 'factureVente',
          //   loadChildren: () => import('./comerce/facture-vente/facture-vente-routing.module').then(module => module.FactureVenteRoutingModule)
          // },
          // {
          //   path: 'factureAchat',
          //   loadChildren: () => import('./comerce/facture-achat/facture-achat-routing.module').then(module => module.FactureAchatRoutingModule)
          // }, 
          //    {
          //      path: 'articlesVendu',
          //      loadChildren: () => import('./comerce/listArticlesVendu/list-articles-vendu/list-articles-vendu.module').then(module => module.ListArticlesVenduModule)

          //    },
          //    {
          //      path: 'secteur',
          //      loadChildren: () => import('./comerce/secteur/secteur.module').then(module => module.SecteurModule)
          //    },
          //  {
          //    path: 'correctionStock',
          //    loadChildren: () => import('./comerce/correctionStock/correction-stock.module').then(module => module.CorrectionStockModule)
          //  }, 
          //   {
          //     path: 'commandeTransfert/:id',
          //     loadChildren: () => import('./comerce/commande-convertion/commande-convertion.module').then(module => module.CommandeConvertionModule)
          //   },
           
          //    {
          //      path: 'bonReceptionTransfert/:id',
          //      loadChildren: () => import('./comerce/bon-reception-convertion/bon-reception-convertion.module').then(module => module.BonReceptionConvertionModule)
          //    },
          //   {
          //     path: 'bonLivraisonCommandeTransfert/:id',
          //     loadChildren: () => import('./comerce/bon-livraison-commande-convertion/bon-livraison-commande-convertion.module').then(module => module.BonLivraisonCommandeConvertionModule)
          //   },
          //    {
          //      path: 'bonLivraisonDevisTransfert/:id',
          //      loadChildren: () => import('./comerce/bon-livraison-devis-convertion/bon-livraison-devis-convertion.module').then(module => module.BonLivraisonDevisConvertionModule)
          //    },
          //    {
          //      path: 'bonCommandeTransfert/:id',
          //      loadChildren: () => import('./comerce/bon-commande-conversion/bon-commande-conversion.module').then(module => module.BonCommandeConversionModule)
          //    },
          //  {
          //    path: 'bonRetourClientTransfert/:id',
          //    loadChildren: () => import('./comerce/bon-retour-client-convertion/bon-retour-client-convertion.module').then(module => module.BonRetourClientConvertionModule)
          //  },
          //   {
          //     path: 'bonRetourFournisseurTransfert/:id',
          //     loadChildren: () => import('./comerce/bon-retour-fournisseur-convertion/bon-retour-fournisseur-convertion.module').then(module => module.BonRetourFournisseurConvertionModule)
          //   }, 
          //    {
          //    path: 'releveClient',
          //    loadChildren: () => import('./comerce/releve-client/releve-client.module').then(module => module.ReleveClientModule)
          //  },
          //  {
          //    path: 'releveClientF',
          //    loadChildren: () => import('./comerce/releve-client-filtrer/releve-client-filtrer.module').then(module => module.ReleveClientFiltrerModule)
          //  },
          //    {
          //      path: 'mouvementStock',
          //      loadChildren: () => import('./comerce/mouvement-stock/mouvement-stock.module').then(module => module.MouvementStockModule)
          //    }, 
          //    {
          //      path: 'journalAchats',
          //      loadChildren: () => import('./comerce/journal-achat/journal-achat-routing.module').then(module => module.JournalAchatRoutingModule)
          //    }, 
          //    {
          //      path: 'journalVentes',
          //      loadChildren: () => import('./comerce/journal-vente/journal-vente-routing.module').then(module => module.JournalVenteRoutingModule)
          //    }, 
          //    {
          //       path: 'reglementFournisseur',
          //       loadChildren: () => import('./comerce/reglementFournisseur/reglementfournisseur.module').then(module => module.ReglementfournisseurModule)
          //     }, 
          //   {
          //     path: 'ordreEmission',
          //     loadChildren: () => import('./comerce/ordreEmission/ordre-emission.module').then(module => module.OrdreEmissionModule)
          //   },
          //    {
          //      path: 'utilisateur',
          //      loadChildren: () => import('./comerce/utilisateur/utilisateur.module').then(module => module.UtilisateurModule)
          //    },
          //   {
          //     path: 'personnel',
          //     loadChildren: () => import('./comerce/personnel/personnel.module').then(module => module.PersonnelModule)
          //   },
          //  {
          //    path: 'bonArticleCasse',
          //    loadChildren: () => import('./comerce/bonArticleCasse/bon-article-casse.module').then(module => module.BonArticleCasseModule)
          //  },
          //   {
          //     path: 'role',
          //     loadChildren: () => import('./comerce/role/role.module').then(module => module.RoleModule)
          //   }, 
          //   {
          //     path: 'bonTravail',
          //     loadChildren: () => import('./comerce/bonTravail/bon-travail.module').then(module => module.BonTravailModule)
          //   },

          //   {
          //     path: 'bonPrelevement',
          //     loadChildren: () => import('./comerce/bonPrelevement/bon-prelevement.module').then(module => module.BonPrelevementModule)
          //   }, 
          //   {
          //     path: 'typeTier',
          //     loadChildren: () => import('./comerce/typeTier/type-tier.module').then(module => module.TypeTierModule)
          //   },
          //    {
          //      path: 'typeContact',
          //      loadChildren: () => import('./comerce/typeContact/type-contact.module').then(module => module.TypeContactModule)
          //    },
          //    {
          //      path: 'conditionReglement',
          //      loadChildren: () => import('./comerce/condition-reglement/condition-reglement.module').then(module => module.ConditionReglementModule)
          //    },
          //   {
          //     path: 'statuOpportunite',
          //     loadChildren: () => import('./comerce/statu-opportunite/statu-opportunite.module').then(module => module.StatuOpportuniteModule)
          //   },
          //    {
          //      path: 'projetInterne',
          //      loadChildren: () => import('./comerce/projetInterne/projet-interne.module').then(module => module.ProjetInterneModule)
          //    },
          //    {
          //      path: 'exercices',
          //      loadChildren: () => import('./comerce/exercices/exercices.module').then(module => module.ExercicesModule)
          //    },
          //    {
          //      path: 'tacheProjetInterne',
          //      loadChildren: () => import('./comerce/tacheProjetInterne/tache-projet-interne.module').then(module => module.TacheProjetInterneModule)
          //    },
          //    {
          //      path: 'typeCompte',
          //      loadChildren: () => import('./comerce/typeCompte/type-compte.module').then(module => module.TypeCompteModule)
          //    },
          //    {
          //      path: 'typeFournisseur',
          //      loadChildren: () => import('./comerce/type-fournisseur/type-fournisseur.module').then(module => module.TypeFournisseurModule)
          //    }, 
          //   {
          //     path: 'chargeDirecte',
          //     loadChildren: () => import('./comerce/charge-directe/charge-directe.module').then(module => module.ChargeDirecteModule)
          //   }, 
          //   {
          //     path: 'variantes',
          //     loadChildren: () => import('./comerce/variantes/variantes.module').then(module => module.VariantesModule)
          //   },
          //   {
          //     path: 'releveClientDetaille',
          //     loadChildren: () => import('./comerce/releve-client-detaille/releve-client-detaille.module').then(module => module.ReleveClientDetailleModule)
          //   },

          //    {
          //      path: 'nomenclature',
          //      loadChildren: () => import('./comerce/nomenclature/nomenclature.module').then(module => module.NomenclatureModule)
          //    }, 
 
        {
          path: 'recepetion',
          loadChildren: () => import('./comerce/bonLivraison/receptions/receptions.module').then(module => module.ReceptionsModule)
        },
  
              //  {
              //    path: 'caisses',
              //    loadChildren: () => import('./comerce/caisse/caisse.module').then(module => module.CaisseModule)
              //  },
              //  {
              //    path: 'sessionCaisses',
              //    loadChildren: () => import('./comerce/session-caisse/session-caisse.module').then(module => module.SessionCaisseModule)
              //  },
              //  {
              //    path: 'chargesSociete',
              //    loadChildren: () => import('./comerce/charge-societe/charge-societe.module').then(module => module.ChargeSocieteModule)
              //  }, 
        {
          path: 'filterCat',
          loadChildren: () => import('./comerce/filter-aticle-categorie/filter-aticle-categorie.module').then(module => module.FilterAticleCategorieModule)
        }, 
            //  {
            //    path: 'rappelStock',
            //    loadChildren: () => import('./comerce/rappel-stock/rappel-stock-routing.module').then(module => module.RappelStockRoutingModule)
            //  },
            //   {
            //     path: 'valeurStock',
            //     loadChildren: () => import('./comerce/valeur-stock/valeur-stock.module').then(module => module.ValeurStockModule)
            //   },
            //  {
            //    path: 'expedition',
            //    loadChildren: () => import('./comerce/expedition/expedition.module').then(module => module.ExpeditionModule)
            //  },

            //  {
            //    path: 'gmao',
            //    loadChildren: () => import('./GMAO/gmao.module').then(module => module.GmaoModule)
            //  }, 
        {
          path: 'comptabilite',
          loadChildren: () => import('./Comptabilite/comptabilite.module').then(module => module.ComptabiliteModule)
        },

    ]
  },

  {
    path: '**',
    redirectTo: 'authentication/page-inaccessible',
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
