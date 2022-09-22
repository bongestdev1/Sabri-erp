import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ModifierBonLivraisonComponent } from './modifier-bon-livraison.component';

const routes: Routes = [
  {
    path: '',
    component: ModifierBonLivraisonComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifierBonLivraisonRoutingModule { }
