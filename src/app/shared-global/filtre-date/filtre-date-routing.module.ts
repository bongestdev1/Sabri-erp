import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FiltreDateComponent } from './filtre-date.component';
import { FiltreDateButtonComponent } from './filtre-date-button/filtre-date-button.component';

const routes: Routes = [
  {
    path: '',
    component: FiltreDateComponent
  },
  {
    path: 'avecButton',
    component: FiltreDateButtonComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FiltreDateRoutingModule { }
