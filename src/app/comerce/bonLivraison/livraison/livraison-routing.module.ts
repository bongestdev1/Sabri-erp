import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListparamlivraisonComponent } from './listparamlivraison/listparamlivraison.component';
import { ModifierlistparamComponent } from './modifierlistparam/modifierlistparam.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'listparamliv',
        component: ListparamlivraisonComponent
      },
      {
        path: 'modifier/:id',
        component: ModifierlistparamComponent
      },
      
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivraisonRoutingModule { }
