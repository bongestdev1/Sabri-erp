import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListFournisseurComponent } from './list-fournisseur.component';

const routes: Routes = [
  {
    path: '',
    component: ListFournisseurComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListFournisseurRoutingModule { }
