import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModifierFournisseurComponent } from './modifier-fournisseur.component';


const routes: Routes = [
  {
    path: '',
    component: ModifierFournisseurComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifierFournisseurRoutingModule { }
