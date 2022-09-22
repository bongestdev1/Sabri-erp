import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AjoutBonLivraisonComponent } from './ajout-bon-livraison.component';

const routes: Routes = [
  {
    path: '',
    component: AjoutBonLivraisonComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjoutBonLivraisonRoutingModule { }
