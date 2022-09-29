import { DetailsClientComponent } from '../../client/details-client/details-client.component';
import { ModifierCategoriesComponent } from './modifier-categories/modifier-categories.component';
import { AjoutCategoriesComponent } from './ajout-categories/ajout-categories.component';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListCategoriesComponent
      },
      {
        path: 'ajout',
        component: AjoutCategoriesComponent
      },
      {
        path: 'modifier/:id',
        component: ModifierCategoriesComponent
      },
      {
        path: 'details/:id',
        component: DetailsClientComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
