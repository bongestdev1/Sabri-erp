import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'categories',
        loadChildren: () => import('./categories/categories.module').then(module => module.CategoriesModule)
      },
      // {
      //   path: 'familles',
      //   loadChildren: () => import('./familles/familles.module').then(module => module.FamillesModule)
      // },
      // {
      //   path: 'sousFamilles',
      //   loadChildren: () => import('./sous-familles/sous-familles.module').then(module => module.SousFamillesModule)
      // },
      // {
      //   path: 'uniteMesure',
      //   loadChildren: () => import('./unite-mesure/unite-mesure.module').then(module => module.UniteMesureModule)
      // },
      // {
      //   path: 'modele',
      //   loadChildren: () => import('./modele/modele.module').then(module => module.ModeleModule)
      // },
      // {
      //   path: 'marque',
      //   loadChildren: () => import('./marque/marque.module').then(module => module.MarqueModule)
      // },
      // {
      //   path: 'modeLivraison',
      //   loadChildren: () => import('./mode-livraison/mode-livraison.module').then(module => module.ModeLivraisonModule)
      // },
      // {
      //   path: 'frais',
      //   loadChildren: () => import('./frais/frais.module').then(module => module.FraisModule)
      // },
      // {
      //   path: 'etatGlobal',
      //   loadChildren: () => import('./etat-global/etat-global.module').then(module => module.EtatGlobalModule)
      // },
      // {
      //   path: 'methodeReglement',
      //   loadChildren: () => import('./methode-reglement/methode-reglement.module').then(module => module.MethodeReglementModule)
      // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VariablesRoutingModule { }
