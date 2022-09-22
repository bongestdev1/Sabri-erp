import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrixSpecifiqueArticleComponent } from './prix-specifique-article.component';

const routes: Routes = [
  {
    path: '',
    component: PrixSpecifiqueArticleComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrixSpecifiqueArticleRoutingModule { }
