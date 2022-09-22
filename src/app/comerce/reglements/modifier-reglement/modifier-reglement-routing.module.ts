import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModifierArticleComponent } from 'src/app/comerce/article/modifier-article/modifier-article.component';

const routes: Routes = [
  
  {
    path: '',
    component: ModifierArticleComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifierReglementRoutingModule { }
