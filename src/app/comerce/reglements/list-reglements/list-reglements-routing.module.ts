import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListReglementComponent } from '../../bonLivraison/reglement/list-reglement/list-reglement.component';

const routes: Routes = [
  {
    path: '',
    component: ListReglementComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListReglementsRoutingModule { }
