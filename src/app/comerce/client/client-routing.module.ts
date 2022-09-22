import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'ajout',
        loadChildren: () => import('./ajouter-client/ajout-client.module').then(module => module.AjoutClientModule)
      },
      {
        path: 'list',
        loadChildren: () => import('./list-client/list-client.module').then(module => module.ListClientModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('./contacts/contacts.module').then(module => module.ContactsModule)
      },
      {
        path: 'autreAdresse',
        loadChildren: () => import('./autre-adresse/autre-adresse.module').then(module => module.AutreAdresseModule)
      },
      {
        path: 'complement',
        loadChildren: () => import('./complements/complement.module').then(module => module.ComplementModule)
      },
      {
        path: 'facture',
        loadChildren: () => import('./facture/facture.module').then(module => module.FactureModule)
      },
      {
        path: 'details/:id',
        loadChildren: () => import('./details-client/details-client.module').then(module => module.DetailsClientModule)
      },
      {
        path: 'modifier/:id',
        loadChildren: () => import('./modifier-client/modifier-client.module').then(module => module.MofifierClientModule)
      },
      {
        path: 'projet',
        loadChildren: () => import('./projet/projet.module').then(module => module.ProjetModule)
      },
      {
        path: 'classementClient',
        loadChildren: () => import('./classement-client/classement-client.module').then(module => module.ClassementClientModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
