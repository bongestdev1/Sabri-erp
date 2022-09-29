import { ClassementFournisseurComponent } from './fournisseur/classement-fournisseur/classement-fournisseur.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedGlobalModule } from '../shared-global/shared-global.module';
import { SharedModule } from '../theme/shared/shared.module';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';


import { AddArticleModalComponent } from './commerce-modals/add-article-modal/add-article-modal.component';
import { AddCategorieModalComponent } from './commerce-modals/add-categorie-modal/add-categorie-modal.component';
import { AddFamilleModalComponent } from './commerce-modals/add-famille-modal/add-famille-modal.component';
import { AddMarqueModalComponent } from './commerce-modals/add-marque-modal/add-marque-modal.component';
import { AddModalComponent } from './commerce-modals/add-modal/add-modal.component';
import { AddModeleModalComponent } from './commerce-modals/add-modele-modal/add-modele-modal.component';
import { AddSousFamilleModalComponent } from './commerce-modals/add-sous-famille-modal/add-sous-famille-modal.component';
import { AlerteListeComponent } from './article/alerte-liste/alerte-liste.component';
import { AjouterArticleComponent } from './article/ajouter-article/ajouter-article.component';
import { DetailsArticleComponent } from './article/details-article/details-article.component';
import { FraisArticleComponent } from './article/frais-article/frais-article.component';
import { ListArticleComponent } from './article/list-article/list-article.component';
 import { AjouterClientComponent } from './client/ajouter-client/ajouter-client.component';
 import { AutreAdresseComponent } from './client/autre-adresse/autre-adresse.component';
 import { ClassementClientComponent } from './client/classement-client/classement-client.component';
 import { ComplementsComponent } from './client/complements/complements.component';
 import { ContactsComponent } from './client/contacts/contacts.component';
 import { DetailsClientComponent } from './client/details-client/details-client.component';
 import { FactureComponent } from './client/facture/facture.component';
 import { ListClientComponent } from './client/list-client/list-client.component';
 import { LivraisonComponent } from './client/livraison/livraison.component';
 import { ModifierClientComponent } from './client/modifier-client/modifier-client.component';
 import { AjoutProjetComponent } from './client/projet/ajout-projet/ajout-projet.component';
 import { ListProjetComponent } from './client/projet/list-projet/list-projet.component';
 import { ModifierProjetComponent } from './client/projet/modifier-projet/modifier-projet.component';
 import { SupprimerClientComponent } from './client/supprimer-client/supprimer-client.component';
 import { AjouterFournisseurComponent } from './fournisseur/ajouter-fournisseur/ajouter-fournisseur.component';
 import { ListFournisseurComponent } from './fournisseur/list-fournisseur/list-fournisseur.component';
 import { DetailsFournisseurComponent } from './fournisseur/details-fournisseur/details-fournisseur.component';
 import { ModifierFournisseurComponent } from './fournisseur/modifier-fournisseur/modifier-fournisseur.component';
  import { ReleveFournisseurComponent } from './fournisseur/releve-fournisseur/releve-fournisseur.component';
import { ParametresPageComponent } from '../parametres-page/parametres-page.component';
import { AutocompleteFamilleComponent } from './autocompletes/autocomplete-famille/autocomplete-famille.component';
import { AutocompleteCategorieComponent } from './autocompletes/autocomplete-categorie/autocomplete-categorie.component';

  //  import { DlmClientComponent } from './dlm-client/dlm-client.component';
import { ArticleHtmlComponent } from './article/article-html/article-html.component';
 import { ClientHtmlComponent } from './client/client-html/client-html.component';
import { PrixWithQuantitesComponent } from './article/prix-with-quantites/prix-with-quantites.component';
import { ArticleStockComponent } from './article/article-stock/article-stock.component';
import { ArticleVariantesComponent } from './article/article-variantes/article-variantes.component';
import { AlertStockComponent } from './article/alert-stock/alert-stock.component';
import { RouterModule } from '@angular/router';
import { PrixSpecifiqueArticleComponent } from './article/prix-specifique-article/prix-specifique-article.component';
import { PrixSpecifiqueArticlInputComponent } from './article/prix-specifique-article/prix-specifique-articl-input/prix-specifique-articl-input.component';
import { PrixSpecifiqueArticlesListComponent } from './article/prix-specifique-article/prix-specifique-articles-list/prix-specifique-articles-list.component';
import { AutocompleteFournisseurComponent } from './autocompletes/autocomplete-fournisseur/autocomplete-fournisseur.component';
import { LignePrixSpecifiqueComponent } from './article/prix-specifique-article/ligne-prix-specifique/ligne-prix-specifique.component';
import { AddElementModalComponent } from './commerce-modals/add-element-modal/add-element-modal.component';
import { AjoutChauffeurCommerceComponent } from './commerce-modals/add-element-modal/ajout-chauffeur-commerce/ajout-chauffeur-commerce.component';
import { AutocompleteClientComponent } from './autocompletes/autocomplete-client/autocomplete-client.component';
import { AutocompleteArticleComponent } from './autocompletes/autocomplete-article/autocomplete-article.component';
import { AutocompleteSousFamilleComponent } from './autocompletes/autocomplete-sous-famille/autocomplete-sous-famille.component';


  import { MiseAJourComponent } from './bonLivraison/parametrelivraison/mise-a-jour/mise-a-jour.component';
  import { ModifierParamComponent } from './bonLivraison/parametrelivraison/modifier-param/modifier-param.component';
  import { ValiderParamComponent } from './bonLivraison/parametrelivraison/valider-param/valider-param.component';
  import { ModifierlistparamComponent } from './bonLivraison/livraison/modifierlistparam/modifierlistparam.component';
  import { HeaderANDfooterPDFComponent } from './bonLivraison/parametrelivraison/header-andfooter-pdf/header-andfooter-pdf.component';
  import { ListparamlivraisonComponent } from './bonLivraison/livraison/listparamlivraison/listparamlivraison.component'; 
    //      import { ExpeditionComponent } from './expedition/expedition/expedition.component';
    //  import { ListDemandeAchatInterneComponent } from './demandeAchatInterne/list-demande-achat-interne/list-demande-achat-interne.component';
    //  import { AjoutDemandeAchatInterneComponent } from './demandeAchatInterne/ajout-demande-achat-interne/ajout-demande-achat-interne.component';
    //  import { DemandeAchatInterneLigneComponent } from './demandeAchatInterne/demande-achat-interne-ligne/demande-achat-interne-ligne.component'; 
    //      import { BonReceptionConvertionComponent } from './bon-reception-convertion/bon-reception-convertion.component';  
    //       import { ListChargeSocieteComponent } from './charge-societe/list-charge-societe/list-charge-societe.component';
    //      import { AjoutChargeSocieteComponent } from './charge-societe/ajout-charge-societe/ajout-charge-societe.component';
    //      import { ModifierChargeSocieteComponent } from './charge-societe/modifier-charge-societe/modifier-charge-societe.component';
    //      import { ListSessionCaisseComponent } from './session-caisse/list-session-caisse/list-session-caisse.component';
    //      import { ModifierSessionCaisseComponent } from './session-caisse/modifier-session-caisse/modifier-session-caisse.component';
    //      import { AjoutSessionCaisseComponent } from './session-caisse/ajout-session-caisse/ajout-session-caisse.component';
    //      import { AjoutChauffeurModule } from './../GMAO/chauffeur/ajout-chauffeur/ajout-chauffeur.module'; 
    //      import { ListChargeDirecteComponent } from './charge-directe/list-charge-directe/list-charge-directe.component';
    //      import { AjoutChargeDirecteComponent } from './charge-directe/ajout-charge-directe/ajout-charge-directe.component'; 
    //      import { AjoutPersonnelModule } from './personnel/ajout-personnel/ajout-personnel.module'; 
    //     import { BonLivraisonCommandeConvertionComponent } from './bon-livraison-commande-convertion/bon-livraison-commande-convertion.component';
    //     import { BonLivraisonDevisConvertionComponent } from './bon-livraison-devis-convertion/bon-livraison-devis-convertion.component';
    //     import { BonRetourClientConvertionComponent } from './bon-retour-client-convertion/bon-retour-client-convertion.component';
    //     import { BonRetourFournisseurConvertionComponent } from './bon-retour-fournisseur-convertion/bon-retour-fournisseur-convertion.component';

    //     import { AjoutBonArticleCasseComponent } from './bonArticleCasse/ajout-bon-article-casse/ajout-bon-article-casse.component';
    //     import { DetailsBonArticleCasseComponent } from './bonArticleCasse/details-bon-article-casse/details-bon-article-casse.component';
    //     import { ListBonArticleCasseComponent } from './bonArticleCasse/list-bon-article-casse/list-bon-article-casse.component';
    //     import { ModifierBonArticleCasseComponent } from './bonArticleCasse/modifier-bon-article-casse/modifier-bon-article-casse.component'; 
    //   import { AjoutBonCommandeComponent } from './bonCommande/ajout-bon-commande/ajout-bon-commande.component';
    //   import { DetailsBonCommandeComponent } from './bonCommande/details-bon-commande/details-bon-commande.component';
    //   import { ListBonCommandeComponent } from './bonCommande/list-bon-commande/list-bon-commande.component';
    //   import { ModifierBonCommandeComponent } from './bonCommande/modifier-bon-commande/modifier-bon-commande.component';
  import { ReceptionsComponent } from './bonLivraison/receptions/receptions.component';
  import { AjoutBonLivraisonComponent } from './bonLivraison/ajout-bon-livraison/ajout-bon-livraison.component';
  import { DetailsBonLivraisonComponent } from './bonLivraison/details-bon-livraison/details-bon-livraison.component';
  import { ExpeditionsComponent } from './bonLivraison/expeditions/expeditions.component';
  import { ListBonLivraisonComponent } from './bonLivraison/list-bon-livraison/list-bon-livraison.component';
  import { ModifierBonLivraisonComponent } from './bonLivraison/modifier-bon-livraison/modifier-bon-livraison.component';
  import { RoutesTransfertDocumentsComponent } from './bonLivraison/routes-transfert-documents/routes-transfert-documents.component';
    //       import { AjoutBonPrelevementComponent } from './bonPrelevement/ajout-bon-prelevement/ajout-bon-prelevement.component';
    //       import { DetailsBonPrelevementComponent } from './bonPrelevement/details-bon-prelevement/details-bon-prelevement.component';
    //       import { LigneBPsComponent } from './bonPrelevement/ligne-bps/ligne-bps.component';
    //       import { ListBonPrelevementComponent } from './bonPrelevement/list-bon-prelevement/list-bon-prelevement.component';
    //       import { ModifierBonPrelevementComponent } from './bonPrelevement/modifier-bon-prelevement/modifier-bon-prelevement.component';
    //  import { AjoutBonRetourClientComponent } from './bonRetourClient/ajout-bon-retour-client/ajout-bon-retour-client.component';
    //  import { DetailsBonRetourClientComponent } from './bonRetourClient/details-bon-retour-client/details-bon-retour-client.component';
    //  import { ListBonRetourClientComponent } from './bonRetourClient/list-bon-retour-client/list-bon-retour-client.component';
    //  import { ModifierBonRetourClientComponent } from './bonRetourClient/modifier-bon-retour-client/modifier-bon-retour-client.component';
    //    import { AjoutBonRetourFournisseurComponent } from './bonRetourFournisseur/ajout-bon-retour-fournisseur/ajout-bon-retour-fournisseur.component';
    //    import { DetailsBonRetourFournisseurComponent } from './bonRetourFournisseur/details-bon-retour-fournisseur/details-bon-retour-fournisseur.component';
    //    import { ListBonRetourFournisseurComponent } from './bonRetourFournisseur/list-bon-retour-fournisseur/list-bon-retour-fournisseur.component';
    //    import { ModifierBonRetourFournisseurComponent } from './bonRetourFournisseur/modifier-bon-retour-fournisseur/modifier-bon-retour-fournisseur.component';
    //       import { LigneBTsComponent } from './bonTransfert/ligne-bts/ligne-bts.component';
    //       import { ListBonTransfertComponent } from './bonTransfert/list-bon-transfert/list-bon-transfert.component';
    //       import { AjoutBonTravailComponent } from './bonTravail/ajout-bon-travail/ajout-bon-travail.component';
    //       import { DetailsBonTravailComponent } from './bonTravail/details-bon-travail/details-bon-travail.component';
    //       import { LigneBTravailsComponent } from './bonTravail/ligne-btravails/ligne-btravails.component';
    //       import { ListBonTravailComponent } from './bonTravail/list-bon-travail/list-bon-travail.component';
    //       import { ModifierBonTravailComponent } from './bonTravail/modifier-bon-travail/modifier-bon-travail.component';
    //   import { AjoutCommandeComponent } from './commande/ajout-commande/ajout-commande.component';
    //   import { DetailsCommandeComponent } from './commande/details-commande/details-commande.component';
    //   import { ListCommandeComponent } from './commande/list-commande/list-commande.component';
    //   import { ModifierCommandeComponent } from './commande/modifier-commande/modifier-commande.component';
    //      import { CommandeConvertionComponent } from './commande-convertion/commande-convertion.component'; 
    //       import { ConditionReglementComponent } from './condition-reglement/condition-reglement.component';
    //      import { AjoutCorrectionStockComponent } from './correctionStock/ajout-correction-stock/ajout-correction-stock.component';
    //      import { DetailsCorrectionStockComponent } from './correctionStock/details-correction-stock/details-correction-stock.component';
    //      import { LigneCorrectionStocksComponent } from './correctionStock/ligne-correction-stocks/ligne-correction-stocks.component';
    //      import { ListCorrectionStockComponent } from './correctionStock/list-correction-stock/list-correction-stock.component';
    //      import { ModifierCorrectionStockComponent } from './correctionStock/modifier-correction-stock/modifier-correction-stock.component'; 
    //     import { AjoutDevisComponent } from './devis/ajout-devis/ajout-devis.component';
    //     import { DetailsDevisComponent } from './devis/details-devis/details-devis.component';
    //     import { ListDevisComponent } from './devis/list-devis/list-devis.component';
    //     import { ModifierDevisComponent } from './devis/modifier-devis/modifier-devis.component'; 
    //       import { AjoutExerciceComponent } from './exercices/ajout-exercice/ajout-exercice.component';
    //       import { ModifierExerciceComponent } from './exercices/modifier-exercice/modifier-exercice.component';
    //       import { AjoutInventaireComponent } from './inventaire/ajout-inventaire/ajout-inventaire.component';
    //       import { DetailsInventaireComponent } from './inventaire/details-inventaire/details-inventaire.component';
    //       import { LigneInventaireComponent } from './inventaire/ligne-inventaire/ligne-inventaire.component';
    //       import { ListInventaireComponent } from './inventaire/list-inventaire/list-inventaire.component';
    //       import { ModifierInventaireComponent } from './inventaire/modifier-inventaire/modifier-inventaire.component';
    //       import { ListArticlesVenduComponent } from './listArticlesVendu/list-articles-vendu/list-articles-vendu.component';
    //       import { MouvementStockComponent } from './mouvement-stock/mouvement-stock.component';
    //       import { ListOrdreEmissionComponent } from './ordreEmission/list-ordre-emission/list-ordre-emission.component';
    //       import { ModifierOrdreEmissionComponent } from './ordreEmission/modifier-ordre-emission/modifier-ordre-emission.component';
    //       import { AjoutModeReglementComponent } from './parametres/mode-reglement/ajout-mode-reglement/ajout-mode-reglement.component';
    //       import { DetailsModeReglementComponent } from './parametres/mode-reglement/details-mode-reglement/details-mode-reglement.component';
    //       import { ListModeReglementComponent } from './parametres/mode-reglement/list-mode-reglement/list-mode-reglement.component';
    //       import { ModifierModeReglementComponent } from './parametres/mode-reglement/modifier-mode-reglement/modifier-mode-reglement.component';
    //       import { AjoutSocieteComponent } from './parametres/societe/ajout-societe/ajout-societe.component';
    //       import { DetailsSocieteComponent } from './parametres/societe/details-societe/details-societe.component';
    //       import { ListSocieteComponent } from './parametres/societe/list-societe/list-societe.component';
    //       import { AjoutTauxTvaComponent } from './parametres/taux-tva/ajout-taux-tva/ajout-taux-tva.component';
    //       import { DetailsTauxTvaComponent } from './parametres/taux-tva/details-taux-tva/details-taux-tva.component';
    //       import { ListTauxTvaComponent } from './parametres/taux-tva/list-taux-tva/list-taux-tva.component';
    //       import { ModifierTauxTvaComponent } from './parametres/taux-tva/modifier-taux-tva/modifier-taux-tva.component';
    //       import { DetailsPersonnelComponent } from './personnel/details-personnel/details-personnel.component';
    //       import { ListPersonnelComponent } from './personnel/list-personnel/list-personnel.component';
    //       import { ModifierPersonnelComponent } from './personnel/modifier-personnel/modifier-personnel.component';
    //       import { AjoutProjetInterneComponent } from './projetInterne/ajout-projet-interne/ajout-projet-interne.component';
    //       import { DetailsProjetInterneComponent } from './projetInterne/details-projet-interne/details-projet-interne.component';
    //       import { ListProjetInterneComponent } from './projetInterne/list-projet-interne/list-projet-interne.component';
    //       import { ModifierProjetInterneComponent } from './projetInterne/modifier-projet-interne/modifier-projet-interne.component';
    //       import { ReleveClientComponent } from './releve-client/releve-client.component';
    //     import { AjouterRoleComponent } from './role/ajouter-role/ajouter-role.component';
    //     import { DetailsRoleComponent } from './role/details-role/details-role.component';
    //     import { ListRoleComponent } from './role/list-role/list-role.component';
    //     import { ModifierRoleComponent } from './role/modifier-role/modifier-role.component';
    //       import { AjoutSecteurComponent } from './secteur/ajout-secteur/ajout-secteur.component';
    //       import { ListSecteurComponent } from './secteur/list-secteur/list-secteur.component';
    //       import { ModifierSecteurComponent } from './secteur/modifier-secteur/modifier-secteur.component';
    //       import { StatuOpportuniteComponent } from './statu-opportunite/statu-opportunite.component';
    //       import { AjoutTransporteurComponent } from './transporteur/ajout-transporteur/ajout-transporteur.component';
    //       import { ListTransporteurComponent } from './transporteur/list-transporteur/list-transporteur.component';
    //       import { ModifierTransporteurComponent } from './transporteur/modifier-transporteur/modifier-transporteur.component';
    //       import { AjoutTypeContactComponent } from './typeContact/ajout-type-contact/ajout-type-contact.component';
    //       import { ListTypeContactComponent } from './typeContact/list-type-contact/list-type-contact.component';
    //       import { ModifierTypeContactComponent } from './typeContact/modifier-type-contact/modifier-type-contact.component';
    //       import { AjoutTypeTierComponent } from './typeTier/components/ajout-type-tier/ajout-type-tier.component';
    //       import { ListTypeTierComponent } from './typeTier/components/list-type-tier/list-type-tier.component';
    //       import { ModifierTypeTierComponent } from './typeTier/components/modifier-type-tier/modifier-type-tier.component';
    //       import { AjoutUtilisateurComponent } from './utilisateur/Components/ajout-utilisateur/ajout-utilisateur.component';
    //       import { DetailsUtilisateurComponent } from './utilisateur/Components/details-utilisateur/details-utilisateur.component';
    //       import { ListUtilisateurComponent } from './utilisateur/Components/list-utilisateur/list-utilisateur.component';
    //       import { ModifierUtilisateurComponent } from './utilisateur/Components/modifier-utilisateur/modifier-utilisateur.component';
    //     import { AjoutCategoriesComponent } from './variables/categories/ajout-categories/ajout-categories.component';
    //     import { DetailsCategoriesComponent } from './variables/categories/details-categories/details-categories.component';
        import { ListCategoriesComponent } from './variables/categories/list-categories/list-categories.component';
    //     import { ModifierCategoriesComponent } from './variables/categories/modifier-categories/modifier-categories.component';
    //     import { AjoutFamillesComponent } from './variables/familles/ajout-familles/ajout-familles.component';
    //     import { DetailsFamillesComponent } from './variables/familles/details-familles/details-familles.component';
    //     import { ListFamillesComponent } from './variables/familles/list-familles/list-familles.component';
    //     import { ModifierFamillesComponent } from './variables/familles/modifier-familles/modifier-familles.component';
    //     import { AjoutFraisComponent } from './variables/frais/ajout-frais/ajout-frais.component';
    //     import { ListFraisComponent } from './variables/frais/list-frais/list-frais.component';
    //     import { AjoutMarqueComponent } from './variables/marque/ajout-marque/ajout-marque.component';
    //     import { DetailsMarqueComponent } from './variables/marque/details-marque/details-marque.component';
    //     import { ListMarqueComponent } from './variables/marque/list-marque/list-marque.component';
    //     import { ModifierMarqueComponent } from './variables/marque/modifier-marque/modifier-marque.component';
    //     import { AjoutModeLivraisonComponent } from './variables/mode-livraison/ajout-mode-livraison/ajout-mode-livraison.component';
    //     import { DetailsModeLivraisonComponent } from './variables/mode-livraison/details-mode-livraison/details-mode-livraison.component';
    //     import { ListModeLivraisonComponent } from './variables/mode-livraison/list-mode-livraison/list-mode-livraison.component';
    //     import { ModifierModeLivraisonComponent } from './variables/mode-livraison/modifier-mode-livraison/modifier-mode-livraison.component';
    //     import { AjoutModeleComponent } from './variables/modele/ajout-modele/ajout-modele.component';
    //     import { DetailsModeleComponent } from './variables/modele/details-modele/details-modele.component';
    //     import { ListModeleComponent } from './variables/modele/list-modele/list-modele.component';
    //     import { ModifierModeleComponent } from './variables/modele/modifier-modele/modifier-modele.component';
    //     import { AjoutSousFamillesComponent } from './variables/sous-familles/ajout-sous-familles/ajout-sous-familles.component';
    //     import { DetailsSousFamillesComponent } from './variables/sous-familles/details-sous-familles/details-sous-familles.component';
    //     import { ListSousFamillesComponent } from './variables/sous-familles/list-sous-familles/list-sous-familles.component';
    //     import { ModifierSousFamillesComponent } from './variables/sous-familles/modifier-sous-familles/modifier-sous-familles.component';
    //     import { AjoutUniteMesureComponent } from './variables/unite-mesure/ajout-unite-mesure/ajout-unite-mesure.component';
    //     import { DetailsUniteMesureComponent } from './variables/unite-mesure/details-unite-mesure/details-unite-mesure.component';
    //     import { ListUniteMesureComponent } from './variables/unite-mesure/list-unite-mesure/list-unite-mesure.component';
    //     import { ModifierUniteMesureComponent } from './variables/unite-mesure/modifier-unite-mesure/modifier-unite-mesure.component';
    //       import { ExercicesComponent } from './exercices/exercices.component'; 
    //       import { AjouterReglementFournisseurComponent } from './reglementFournisseur/ajouter-reglement-fournisseur/ajouter-reglement-fournisseur.component';
    //      import { TypeCompteComponent } from './typeCompte/type-compte.component';
    //      import { DetailsTacheProjetInterneComponent } from './tacheProjetInterne/details-tache-projet-interne/details-tache-projet-interne.component';
    //      import { ModifierTacheProjetInterneComponent } from './tacheProjetInterne/modifier-tache-projet-interne/modifier-tache-projet-interne.component';
    //      import { AjoutTacheProjetInterneComponent } from './tacheProjetInterne/ajout-tache-projet-interne/ajout-tache-projet-interne.component';
    //      import { ListTacheProjetInterneComponent } from './tacheProjetInterne/list-tache-projet-interne/list-tache-projet-interne.component'; 
      import { DetailsReglementComponent } from './reglements/details-reglement/details-reglement.component';
      import { ReglementDetailsComponent } from './reglements/components/reglement-details/reglement-details.component';
      import { ReglementInputComponent } from './reglements/components/reglement-input/reglement-input.component';
     import { InputBonLivraisonComponent } from './bonLivraison/input-bon-livraison/input-bon-livraison.component';
     import { ReglementsBonLivraisonComponent } from './bonLivraison/reglements-bon-livraison/reglements-bon-livraison.component';
     import { LigneblComponent } from './bonLivraison/lignebl/lignebl.component' 
      import { ReglementInput2Component } from './reglements/components/reglement-input2/reglement-input2.component';
  import { ChargeGlobalComponent } from './bonLivraison/charge-global/charge-global.component' 
          // import { AjoutTypeCompteComponent } from './typeCompte/ajout-type-compte/ajout-type-compte.component';
          // import { ModifierTypeCompteComponent } from './typeCompte/modifier-type-compte/modifier-type-compte.component';
          // import { AjoutStatuOpportuniteComponent } from './statu-opportunite/ajout-statu-opportunite/ajout-statu-opportunite.component';
          // import { ModifierStatuOpportuniteComponent } from './statu-opportunite/modifier-statu-opportunite/modifier-statu-opportunite.component'; 
   import { DocumentDetailsComponent } from './bonLivraison/document-details/document-details.component';
        //   import { BonTransfertHtmlComponent } from './bonTransfert/bon-transfert-html/bon-transfert-html.component';
        //   import { BonTravailHtmlComponent } from './bonTravail/bon-travail-html/bon-travail-html.component';
        //  import { RoleHtmlComponent } from './role/role-html/role-html.component';
        // import { CorrectionStockHtmlComponent } from './correctionStock/correction-stock-html/correction-stock-html.component';
        // import { VariantesComponent } from './variantes/variantes.component';
        // import { AjoutVarianteComponent } from './variantes/ajout-variante/ajout-variante.component';
      import { SocieteAdminComponent } from './admin/societe-admin/societe-admin.component';
      import { UtilisateurAdminComponent } from './admin/utilisateur-admin/utilisateur-admin.component';
      import { RoleAdminComponent } from './admin/role-admin/role-admin.component'
    //      import { ReleveClientDetailleComponent } from './releve-client-detaille/releve-client-detaille.component';
    //      import { NomenclatureComponent } from './nomenclature/nomenclature.component'
    //      import { CaisseComponent } from './caisse/caisse.component';
    //      import { AjoutCaisseComponent } from './caisse/ajout-caisse/ajout-caisse.component';
    //      import { ModifierCaisseComponent } from './caisse/modifier-caisse/modifier-caisse.component';
    //      import { ReglementsCaisseComponent } from './session-caisse/reglements-caisse/reglements-caisse.component';
    //      import { ChargeModeReglComponent } from './session-caisse/charge-mode-regl/charge-mode-regl.component'
    //      import { RechercheSessionCaisseComponent } from './session-caisse/recherche-session-caisse/recherche-session-caisse.component';
    //      import { ReleveClientFiltrerComponent } from './releve-client-filtrer/releve-client-filtrer.component';
    //     import { ListBonCasseComponent } from './bonCasse/list-bon-casse/list-bon-casse.component';
    //     import { BonCasseHtmlComponent } from './bonCasse/bon-casse-html/bon-casse-html.component';
    //     import { LigneBonCasseComponent } from './bonCasse/ligne-bon-casse/ligne-bon-casse.component';
    //     import { RappelStockComponent } from './rappel-stock/rappel-stock.component';
    //      import { ValeurStockComponent } from './valeur-stock/valeur-stock.component';
    //      import { AjoutSituationReglementComponent } from './parametres/mode-reglement/situation-reglement/ajout-situation-reglement/ajout-situation-reglement.component';
    //      import { ListSituationReglementComponent } from './parametres/mode-reglement/situation-reglement/list-situation-reglement/list-situation-reglement.component'
    //      import { TypeFournisseurComponent } from './type-fournisseur/type-fournisseur.component';
    //      import { AjoutTypeFournisseurComponent } from './type-fournisseur/ajout-type-fournisseur/ajout-type-fournisseur.component';
    //      import { ModifierTypeFournisseurComponent } from './type-fournisseur/modifier-type-fournisseur/modifier-type-fournisseur.component';
 
    //    import { EtatGlobalComponent } from './variables/etat-global/etat-global/etat-global.component';
    //    import { ListEtatGlobalComponent } from './variables/etat-global/list-etat-global/list-etat-global.component';
 
    //  import { DemandeOffrePrixComponent } from './demande-offre-prix/demande-offre-prix/demande-offre-prix.component';
    //  import { DemandeOffrePrixLigneComponent } from './demande-offre-prix/demande-offre-prix-ligne/demande-offre-prix-ligne.component';
    //  import { ListDemandeOffrePrixComponent } from './demande-offre-prix/list-demande-offre-prix/list-demande-offre-prix.component';
    //  import { DemandeOffrePrixFournisseurComponent } from './demande-offre-prix/demande-offre-prix-fournisseur/demande-offre-prix-fournisseur.component';
    //  import { DemandeOffrePrixFournisseurEmailComponent } from './demande-offre-prix/demande-offre-prix-fournisseur-email/demande-offre-prix-fournisseur-email.component';
 
    //      import { LigneOEComponent } from './ordreEmission/ligne-oe/ligne-oe.component';
    //      import { ListBAComponent } from './ordreEmission/list-ba/list-ba.component';
 
    //   import { SeparateurEmailComponent } from './demande-offre-prix/separateur-email/separateur-email.component';
    //   import { DevisAchatComponent } from './devis-achat/devis-achat/devis-achat.component';
    //   import { DevisAchatLigneComponent } from './devis-achat/devis-achat-ligne/devis-achat-ligne.component';
    //   import { ListDevisAchatComponent } from './devis-achat/list-devis-achat/list-devis-achat.component';
 
    //    import { ListMethodeReglementComponent } from './variables/methode-reglement/list-methode-reglement/list-methode-reglement.component';
    //    import { AjoutMethodeReglementComponent } from './variables/methode-reglement/ajout-methode-reglement/ajout-methode-reglement.component';
    //      import { ListExpeditionComponent } from './expedition/list-expedition/list-expedition.component';
    //      import { DetailsExpeditionComponent } from './expedition/details-expedition/details-expedition.component';
    //      import { LigneExpComponent } from './expedition/ligne-exp/ligne-exp.component';
    //  import { ComparisonPrixDevisAchatComponent } from './comparison-prix-devis-achat/comparison-prix-devis-achat.component';
    //      import { DepotComponent } from './depot/depot/depot.component';
    //      import { DepotListComponent } from './depot/depot-list/depot-list.component';
    //      import { DepotFicheComponent } from './depot/depot-fiche/depot-fiche.component';
 

      import { AjouterReglementComponent } from './reglements/ajouter-reglement/ajouter-reglement.component';
        //  import { ListEcheanceFournisseurComponent } from './reglementFournisseur/list-echeance-fournisseur/list-echeance-fournisseur.component';
        //  import { ListReglementFournisseurComponent } from './reglementFournisseur/list-reglement-fournisseur/list-reglement-fournisseur.component';
        //  import { ModifierReglementFournisseurComponent } from './reglementFournisseur/modifier-reglement-fournisseur/modifier-reglement-fournisseur.component';
      import { ListEcheanceClientComponent } from './reglements/list-echeance-client/list-echeance-client.component';
      import { ListReglementsComponent } from './reglements/list-reglements/list-reglements.component';
      import { ModifierReglementComponent } from './reglements/modifier-reglement/modifier-reglement.component';

 import { ChargeDetailsComponent } from './bonLivraison/charge-details/charge-details.component'
 import { HistoriqueVenteComponent } from './bonLivraison/lignebl/historique-vente/historique-vente.component';
 import { HistoriqueAchatComponent } from './bonLivraison/lignebl/historique-achat/historique-achat.component'

 import { ListReceptionComponent } from './bonLivraison/receptions/list-reception/list-reception.component';
 import { ModifierReceptionComponent } from './bonLivraison/receptions/modifier-reception/modifier-reception.component'

  import { FilterAticleCategorieComponent } from './filter-aticle-categorie/filter-aticle-categorie.component';
//      import { DmcClientComponent } from './dmc-client/dmc-client.component';
//       import { DmfFournisseurComponent } from './dmf-fournisseur/dmf-fournisseur.component';
//       import { DmsVenteComponent } from './dms-vente/dms-vente.component';
//  import { RbeArticleComponent } from './rbe-article/rbe-article.component';

  //  import { AjoutBonReceptionComponent } from './bonReception/ajout-bon-reception/ajout-bon-reception.component';
  //  import { DetailsBonReceptionComponent } from './bonReception/details-bon-reception/details-bon-reception.component';
  //  import { ListBonReceptionComponent } from './bonReception/list-bon-reception/list-bon-reception.component';
  //  import { ModifierBonReceptionComponent } from './bonReception/modifier-bon-reception/modifier-bon-reception.component'; 

  //    import { FactureVenteComponent } from './facture-vente/facture-vente/facture-vente.component';
  //    import { FactureVenteLigneComponent } from './facture-vente/facture-vente-ligne/facture-vente-ligne.component';
  //    import { FactureVenteListComponent } from './facture-vente/facture-vente-list/facture-vente-list.component';
  //    import { FactureAchatComponent } from './facture-achat/facture-achat/facture-achat.component';
  //    import { FactureAchatLigneComponent } from './facture-achat/facture-achat-ligne/facture-achat-ligne.component';
  //    import { FactureAchatListComponent } from './facture-achat/facture-achat-list/facture-achat-list.component';
    import { AutocompleteSocieteComponent } from './autocompletes/autocomplete-societe/autocomplete-societe.component';
      //  import { JournalVenteComponent } from './journal-vente/journal-vente.component';
      //  import { JournalAchatComponent } from './journal-achat/journal-achat.component';
      //   import { BonCommandeConversionComponent } from './bon-commande-conversion/bon-commande-conversion.component';

@NgModule({
    declarations: [ 

      // ListTacheProjetInterneComponent,
      // AjoutTacheProjetInterneComponent,
      // ModifierTacheProjetInterneComponent,
      
      //          TypeFournisseurComponent,
      //          AjoutTypeFournisseurComponent,
      //          ModifierTypeFournisseurComponent,
        
      //      DemandeAchatInterneLigneComponent,
      //      AjoutDemandeAchatInterneComponent,
      //      ListDemandeAchatInterneComponent,
        
      //      DemandeOffrePrixComponent,
      //      DemandeOffrePrixLigneComponent,
      //      ListDemandeOffrePrixComponent,
      //      DemandeOffrePrixFournisseurComponent,
      //      DemandeOffrePrixFournisseurEmailComponent,
        
      //          LigneOEComponent,
      //          ListBAComponent,
        
      //       SeparateurEmailComponent,
      //       DevisAchatComponent,
      //       DevisAchatLigneComponent,
      //       ListDevisAchatComponent,
         
      //          AjoutMethodeReglementComponent,
      //          ListMethodeReglementComponent,
      //            ListExpeditionComponent,
      //            DetailsExpeditionComponent,
      //            ExpeditionComponent,
      //            LigneExpComponent,
      //        ComparisonPrixDevisAchatComponent,
      //        FactureVenteComponent,
      //        FactureVenteLigneComponent,
      //        FactureVenteListComponent,
      //        FactureAchatComponent,
      //        FactureAchatLigneComponent,
      //        FactureAchatListComponent,
            AutocompleteSocieteComponent,
                // BonCommandeConversionComponent,
         
         ListparamlivraisonComponent,
         HeaderANDfooterPDFComponent,
         ModifierlistparamComponent,
         ValiderParamComponent,
         ModifierParamComponent,
         MiseAJourComponent,
            //      DepotComponent,
            //     DepotListComponent,
            //     DepotFicheComponent,
 
            //   EtatGlobalComponent,
            //  ListEtatGlobalComponent,
            //   CorrectionStockHtmlComponent,
            //   RoleHtmlComponent, 
            //    BonTravailHtmlComponent,
            //    BonTransfertHtmlComponent,
          DocumentDetailsComponent,
                //  AjoutStatuOpportuniteComponent,
                // ModifierStatuOpportuniteComponent,
                //  AjoutTypeCompteComponent,
                //  ModifierTypeCompteComponent, 
               ReglementInput2Component,
         ReglementsBonLivraisonComponent,
         InputBonLivraisonComponent,
               ReglementDetailsComponent,
               ReglementInputComponent,
                //  DetailsTacheProjetInterneComponent,
               DetailsReglementComponent,
                //  TypeCompteComponent,
           LigneblComponent,
            //     ExercicesComponent,
            //    BonReceptionConvertionComponent,
            //    BonLivraisonCommandeConvertionComponent,
            //    BonLivraisonDevisConvertionComponent,
            //    BonRetourClientConvertionComponent,
            //    BonRetourFournisseurConvertionComponent,

              

            //  AjoutBonReceptionComponent,
            //  DetailsBonReceptionComponent,
            //  ListBonReceptionComponent,
            //  ModifierBonReceptionComponent,
         
            //      AjoutBonArticleCasseComponent,
            //     DetailsBonArticleCasseComponent,
            //     ListBonArticleCasseComponent,
            //     ModifierBonArticleCasseComponent,
            //   AjoutBonCommandeComponent,
            //  DetailsBonCommandeComponent,
            //  ListBonCommandeComponent,
            //  ModifierBonCommandeComponent,
         ReceptionsComponent,
         AjoutBonLivraisonComponent,
         DetailsBonLivraisonComponent,
         ExpeditionsComponent,
         ListBonLivraisonComponent,
         ModifierBonLivraisonComponent,
         RoutesTransfertDocumentsComponent,
          //      AjoutBonPrelevementComponent,
          //      DetailsBonPrelevementComponent,
          //      LigneBPsComponent,
          //      ListBonPrelevementComponent,
          //      ModifierBonPrelevementComponent,
          // AjoutBonRetourClientComponent,
          // DetailsBonRetourClientComponent,
          // ListBonRetourClientComponent,
          // ModifierBonRetourClientComponent,
          //   AjoutBonRetourFournisseurComponent,
          //   DetailsBonRetourFournisseurComponent,
          //   ListBonRetourFournisseurComponent,
          //   ModifierBonRetourFournisseurComponent,
          //      LigneBTsComponent,
          //      ListBonTransfertComponent,
          //      AjoutBonTravailComponent,
          //      DetailsBonTravailComponent,
          //      LigneBTravailsComponent,
          //      ListBonTravailComponent,
          //      ModifierBonTravailComponent,
          //  AjoutCommandeComponent,
          //  DetailsCommandeComponent,
          //  ListCommandeComponent,
          //  ModifierCommandeComponent,
          //     CommandeConvertionComponent,
          //       ConditionReglementComponent,
          //     AjoutCorrectionStockComponent,
          //     DetailsCorrectionStockComponent,
          //     LigneCorrectionStocksComponent,
          //     ListCorrectionStockComponent,
          //     ModifierCorrectionStockComponent,
          //     AjoutDevisComponent,
          //    DetailsDevisComponent,
          //    ListDevisComponent,
          //    ModifierDevisComponent,
          //       AjoutExerciceComponent,
          //      ModifierExerciceComponent,
          //      AjoutInventaireComponent,
          //      DetailsInventaireComponent,
          //      LigneInventaireComponent,
          //      ListInventaireComponent,
          //      ModifierInventaireComponent,
          //      ListArticlesVenduComponent,
          //      MouvementStockComponent,
          //      ListOrdreEmissionComponent,
          //      ModifierOrdreEmissionComponent,
          //       AjoutModeReglementComponent,
          //       DetailsModeReglementComponent,
          //       ListModeReglementComponent,
          //       ModifierModeReglementComponent,
          //       AjoutSocieteComponent,
          //       DetailsSocieteComponent,
          //       ListSocieteComponent,
          //       AjoutTauxTvaComponent,
          //       DetailsTauxTvaComponent,
          //       ListTauxTvaComponent,
          //       ModifierTauxTvaComponent,
          //       DetailsPersonnelComponent,
          //       ListPersonnelComponent,
          //       ModifierPersonnelComponent,
          //       AjoutProjetInterneComponent,
          //       DetailsProjetInterneComponent,
          //       ListProjetInterneComponent,
          //       ModifierProjetInterneComponent,
          //        AjouterReglementFournisseurComponent,
          //       ListEcheanceFournisseurComponent,
          //       ListReglementFournisseurComponent,
          //       ModifierReglementFournisseurComponent,
              AjouterReglementComponent,
              ListEcheanceClientComponent,
              ListReglementsComponent,
              ModifierReglementComponent,
              //     ReleveClientComponent,
              //   AjouterRoleComponent,
              //   DetailsRoleComponent,
              //   ListRoleComponent,
              //   ModifierRoleComponent,
              //    AjoutSecteurComponent,
              //    ListSecteurComponent,
              //    ModifierSecteurComponent,
              //     StatuOpportuniteComponent,
              //    AjoutTransporteurComponent,
              //    ListTransporteurComponent,
              //    ModifierTransporteurComponent,
              //    AjoutTypeContactComponent,
              //    ListTypeContactComponent,
              //    ModifierTypeContactComponent,
              //    AjoutTypeTierComponent,
              //    ListTypeTierComponent,
              //    ModifierTypeTierComponent,
              //    AjoutUtilisateurComponent,
              //    DetailsUtilisateurComponent,
              //    ListUtilisateurComponent,
              //    ModifierUtilisateurComponent,
              //  AjoutCategoriesComponent,
              //  DetailsCategoriesComponent,
               ListCategoriesComponent,
              //  ModifierCategoriesComponent,
              //  AjoutFamillesComponent,
              //  DetailsFamillesComponent,
              //  ListFamillesComponent,
              //  ModifierFamillesComponent,
              //  AjoutFraisComponent,
              //  ListFraisComponent,
              //  AjoutMarqueComponent,
              //  DetailsMarqueComponent,
              //  ListMarqueComponent,
              //  ListMarqueComponent,
              //  ModifierMarqueComponent,
              //  AjoutModeLivraisonComponent,
              //  DetailsModeLivraisonComponent,
              //  ListModeLivraisonComponent,
              //  ModifierModeLivraisonComponent,
              //  AjoutModeleComponent,
              //  DetailsModeleComponent,
              //  ListModeleComponent,
              //  ModifierModeleComponent,
              //  AjoutSousFamillesComponent,
              //  DetailsSousFamillesComponent,
              //  ListSousFamillesComponent,
              //  ModifierSousFamillesComponent,
              //  AjoutUniteMesureComponent,
              //  DetailsUniteMesureComponent,
              //  ListUniteMesureComponent,
              //  ModifierUniteMesureComponent,
              //    VariantesComponent,
              //    AjoutVarianteComponent, 
         
           ChargeGlobalComponent,
          ChargeDetailsComponent,
                  // AjoutChargeDirecteComponent,
                  // ListChargeDirecteComponent,
         
          HistoriqueVenteComponent,
          HistoriqueAchatComponent,
         
               SocieteAdminComponent,
              UtilisateurAdminComponent,
             RoleAdminComponent,
              // ReleveClientDetailleComponent,
              // NomenclatureComponent, 
         
         ListReceptionComponent,
         ModifierReceptionComponent, 
            //   CaisseComponent,
            //   AjoutCaisseComponent,
            //   ModifierCaisseComponent,
            //   AjoutSessionCaisseComponent,
            //   ModifierSessionCaisseComponent,
            //    ListSessionCaisseComponent,
            //    ReglementsCaisseComponent,
            //   ChargeModeReglComponent,
            //  ModifierChargeSocieteComponent,
            //  AjoutChargeSocieteComponent,
            //   ListChargeSocieteComponent, 
          FilterAticleCategorieComponent, 
              //   RechercheSessionCaisseComponent,
              //   ReleveClientFiltrerComponent,

              // ListBonCasseComponent,
              // BonCasseHtmlComponent,
              // LigneBonCasseComponent,
              //  RappelStockComponent,
              //   ValeurStockComponent,
              //   ListSituationReglementComponent,
              //   AjoutSituationReglementComponent, 


        LignePrixSpecifiqueComponent,
        PrixSpecifiqueArticleComponent,
        PrixSpecifiqueArticlInputComponent,
        PrixSpecifiqueArticlesListComponent,
        AlertStockComponent,
        ArticleStockComponent,
        ArticleVariantesComponent,
        PrixWithQuantitesComponent,
         ClientHtmlComponent,
        ArticleHtmlComponent,

        AddArticleModalComponent,
        AddCategorieModalComponent,
        AddElementModalComponent,
        AddFamilleModalComponent,
        AddMarqueModalComponent,
        AddModalComponent,
        AddModeleModalComponent,
        AddSousFamilleModalComponent,

        AlerteListeComponent,
        AjouterArticleComponent,
        DetailsArticleComponent,
        FraisArticleComponent,
        ListArticleComponent,

        AjouterClientComponent,
         AutreAdresseComponent,
        ClassementClientComponent,

        ClassementFournisseurComponent,
        ComplementsComponent,
        ContactsComponent,
        FactureComponent,
        LivraisonComponent,

         ModifierClientComponent,
         AjoutProjetComponent,
         ListProjetComponent,
         ModifierProjetComponent,
        SupprimerClientComponent,

          AjouterFournisseurComponent,

          ModifierFournisseurComponent,
          ReleveFournisseurComponent,

        ParametresPageComponent,

        AutocompleteFournisseurComponent,

        ListClientComponent,
        ListFournisseurComponent,
        DetailsClientComponent,
        DetailsFournisseurComponent,

        AjoutChauffeurCommerceComponent,
        AutocompleteClientComponent,
        AutocompleteArticleComponent,


        AutocompleteCategorieComponent,
        AutocompleteFamilleComponent,
        AutocompleteSousFamilleComponent,
          //      JournalVenteComponent,
          //      JournalAchatComponent,

          // DlmClientComponent,

          //   DmcClientComponent,

          //    DmfFournisseurComponent,

          //   DmsVenteComponent,

          //  RbeArticleComponent,
    ],
    imports: [
        CommonModule,
        SharedGlobalModule,
        SharedModule,
        NgbTabsetModule,
        NgbAccordionModule, NgbCollapseModule,
                  // AjoutPersonnelModule,
        RouterModule,
        RouterModule,
    ],
    exports: [

    ]
})
export class ComerceModule { }