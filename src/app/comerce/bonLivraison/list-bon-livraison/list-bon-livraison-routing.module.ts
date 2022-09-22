import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListBonLivraisonComponent } from './list-bon-livraison.component';

const routes: Routes = [
  {
    path: '',
    component: ListBonLivraisonComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListBonLivraisonRoutingModule { }
