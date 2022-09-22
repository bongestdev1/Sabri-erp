import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListArticleComponent } from './list-article.component';

const routes: Routes = [
  {
    path: '',
    component: ListArticleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListArticleRoutingModule { }
