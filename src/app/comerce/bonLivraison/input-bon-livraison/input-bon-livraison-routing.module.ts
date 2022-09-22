import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputBonLivraisonComponent } from './input-bon-livraison.component';


const routes: Routes = [
  {
    path:"",
    component:InputBonLivraisonComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InputBonLivraisonRoutingModule { }
