import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AjouterFournisseurComponent } from './ajouter-fournisseur.component';

const routes: Routes = [
  {
    path: '',
    component: AjouterFournisseurComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjouterFournisseurRoutingModule { }
