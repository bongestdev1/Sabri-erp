import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AjouterArticleComponent } from './ajouter-article.component';

const routes: Routes = [
  {
    path: '',
    component: AjouterArticleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjouterArticleRoutingModule { }
