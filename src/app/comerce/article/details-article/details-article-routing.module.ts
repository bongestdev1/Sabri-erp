import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsArticleComponent } from './details-article.component';

const routes: Routes = [
  {
    path: '',
    component: DetailsArticleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsArticleRoutingModule { }
