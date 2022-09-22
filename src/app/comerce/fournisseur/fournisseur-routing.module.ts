import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'ajout',
        loadChildren: () => import('./ajouter-fournisseur/ajouter-fournisseur.module').then(module => module.AjouterFournisseurModule)
      },
      {
        path: 'list',
        loadChildren: () => import('./list-fournisseur/list-fournisseur.module').then(module => module.ListFournisseurModule)
      },
      {

        path: 'details/:id',
        loadChildren: () => import('./details-fournisseur/details-fournisseur.module').then(module => module.DetailsFournisseurModule)

      },
      {
        path: 'modifier/:id',
        loadChildren: () => import('./modifier-fournisseur/modifier-fournisseur.module').then(module => module.ModifierFournisseurModule)
      },
      {
        path: 'releveFournisseur',
        loadChildren: () => import('./releve-fournisseur/releve-fournisseur.module').then(module => module.ReleveFournisseurModule)
      },
      {
        path : 'classementFournisseur',
        loadChildren : ()=> import ('./classement-fournisseur/classement-fournisseur.module').then(module => module.ClassementFournisseurModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FournisseurRoutingModule { }
