import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AjouterReglementComponent } from './ajouter-reglement.component';

const routes: Routes = [
  {
    path: '',
    component: AjouterReglementComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjouterReglementRoutingModule { }
