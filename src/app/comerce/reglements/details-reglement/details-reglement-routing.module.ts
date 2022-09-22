import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsReglementComponent } from './details-reglement.component';

const routes: Routes = [
  {
    path: '',
    component: DetailsReglementComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsReglementRoutingModule { }
