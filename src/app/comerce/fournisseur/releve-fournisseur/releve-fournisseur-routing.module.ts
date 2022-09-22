import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReleveFournisseurComponent } from './releve-fournisseur.component';
const routes: Routes = [
  {
    path: '',
    component: ReleveFournisseurComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReleveFournisseurRoutingModule { }
