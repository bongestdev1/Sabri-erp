import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ValiderParamComponent } from './valider-param/valider-param.component';
import { ModifierParamComponent } from './modifier-param/modifier-param.component';
import { MiseAJourComponent } from './mise-a-jour/mise-a-jour.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'validparam',
        component: ValiderParamComponent
      },
      {
        path: 'modifier',
        component: ModifierParamComponent
      },
      {
        path: 'mise-a-jour',
        component: MiseAJourComponent
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrelivraisonRoutingModule { }
