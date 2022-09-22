import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DetailsBonLivraisonComponent } from './details-bon-livraison.component';

const routes: Routes = [
  {
    path: '',
    component: DetailsBonLivraisonComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsBonLivraisonRoutingModule { }
