import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParametresPageComponent } from './parametres-page.component';

const routes: Routes = [
  {
    path: '',
    component: ParametresPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametresPageRoutingModule { }
