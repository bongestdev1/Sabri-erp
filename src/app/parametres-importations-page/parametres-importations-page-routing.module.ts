import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParametresImportationsPageComponent } from './parametres-importations-page.component';

const routes: Routes = [
  {
    path: '',
    component: ParametresImportationsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametresImportationsPageRoutingModule { }
