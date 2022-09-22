import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'ajout',
        loadChildren: () => import('./ajout-projet/ajout-projet.module').then(module => module.AjoutProjetModule)
      },
      {
        path: 'list',
        loadChildren: () => import('./list-projet/list-projet.module').then(module => module.ListProjetModule)
      },
      {
        path: 'modifier/:id',
        loadChildren: () => import('./modifier-projet/modifier-projet.module').then(module => module.ModifierProjetModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjetRoutingModule { }
