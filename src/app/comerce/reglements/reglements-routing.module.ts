import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AjouterReglementComponent } from './ajouter-reglement/ajouter-reglement.component';
import { ModifierReglementComponent } from './modifier-reglement/modifier-reglement.component';
import { ListReglementsComponent } from './list-reglements/list-reglements.component'; 
import { ListEcheanceClientComponent } from './list-echeance-client/list-echeance-client.component';
import { DetailsReglementComponent } from './details-reglement/details-reglement.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'bonLivraison/list',
        component: ListReglementsComponent
      },
      {
        path: 'bonLivraison/ajout',
        component: AjouterReglementComponent
      },
      {
        path: 'bonLivraison/modifier/reglement/:id',
        component: ModifierReglementComponent
      }, {
        path: 'bonLivraison/modifier/liltrage/:id',
        component: ModifierReglementComponent
      },
      {
        path: 'bonLivraison/echeanceClient',
        component: ListEcheanceClientComponent
      },
      {
        path: 'bonLivraison/details/:id',
        component: DetailsReglementComponent
      },
      {
        path: 'bonRetourClient/list',
        component: ListReglementsComponent
      },
      {
        path: 'bonRetourClient/ajout',
        component: AjouterReglementComponent
      },
      {
        path: 'bonRetourClient/modifier/reglement/:id',
        component: ModifierReglementComponent
      },  {
        path: 'bonRetourClient/modifier/liltrage/:id',
        component: ModifierReglementComponent
      },
      {
        path: 'bonRetourClient/echeanceClient',
        component: ListEcheanceClientComponent
      },
      {
        path: 'bonRetourClient/details/:id',
        component: DetailsReglementComponent
      }
      ,
      {
        path: 'bonAchat/list',
        component: ListReglementsComponent
      },
      {
        path: 'bonAchat/ajout',
        component: AjouterReglementComponent
      },
      {
        path: 'bonAchat/modifier/reglement/:id',
        component: ModifierReglementComponent
      },  {
        path: 'bonAchat/modifier/liltrage/:id',
        component: ModifierReglementComponent
      },
      {
        path: 'bonAchat/echeanceClient',
        component: ListEcheanceClientComponent
      },
      {
        path: 'bonAchat/details/:id',
        component: DetailsReglementComponent
      }
      , {
        path: 'bonRetourFournisseur/list',
        component: ListReglementsComponent
      },
      {
        path: 'bonRetourFournisseur/ajout',
        component: AjouterReglementComponent
      },
      {
        path: 'bonRetourFournisseur/modifier/reglement/:id',
        component: ModifierReglementComponent
      },
      {
        path: 'bonRetourFournisseur/modifier/liltrage/:id',
        component: ModifierReglementComponent
      },
      {
        path: 'bonRetourFournisseur/echeanceClient',
        component: ListEcheanceClientComponent
      },
      {
        path: 'bonRetourFournisseur/details/:id',
        component: DetailsReglementComponent
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReglementsRoutingModule { }
