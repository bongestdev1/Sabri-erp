import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'ajout',
        loadChildren: () => import('./ajouter-article/ajouter-article.module').then(module => module.AjouterArticleModule)
      },
      {
        path: 'list',
        loadChildren: () => import('./list-article/list-article.module').then(module => module.ListArticleModule)
      },
      {
        path: 'modifier/:id',
        loadChildren: () => import('./ajouter-article/ajouter-article.module').then(module => module.AjouterArticleModule)
      },
      {
        path: 'details/:id',
        loadChildren: () => import('./details-article/details-article.module').then(module => module.DetailsArticleModule)
      },
      {
        path: 'alertList',
        loadChildren: () => import('./alerte-liste/alerte-liste.module').then(module => module.AlerteListeModule)
      },
      {
        path: 'alertStock',
        loadChildren: () => import('./alert-stock/alert-stock.module').then(module => module.AlertStockModule)
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
