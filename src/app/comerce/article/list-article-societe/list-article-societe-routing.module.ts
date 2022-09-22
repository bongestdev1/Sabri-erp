import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListArticleSocieteComponent } from './list-article-societe.component';

const routes: Routes = [
  {
    path: '',
    component: ListArticleSocieteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
export class ListArticleSocieteRoutingModule { }
