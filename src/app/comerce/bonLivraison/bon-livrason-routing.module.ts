import { NgModule } from '@angular/core';
import { ListBonLivraisonComponent } from './list-bon-livraison/list-bon-livraison.component';
import { RouterModule, Routes } from '@angular/router';
import { DetailsBonLivraisonComponent } from './details-bon-livraison/details-bon-livraison.component';
import { ModifierBonLivraisonComponent } from './modifier-bon-livraison/modifier-bon-livraison.component';
import { AjoutBonLivraisonComponent } from './ajout-bon-livraison/ajout-bon-livraison.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListBonLivraisonComponent
      },
      {
        path: 'ajout',
        component: AjoutBonLivraisonComponent
      },
      {
        path: 'modifier/:id',
        component: ModifierBonLivraisonComponent
      },
      {
        path: 'details/:id',
        component: DetailsBonLivraisonComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BonLivrasonRoutingModule { }
