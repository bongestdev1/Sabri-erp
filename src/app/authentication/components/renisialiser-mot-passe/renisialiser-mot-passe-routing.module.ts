import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RenisialiserMotPasseComponent } from './renisialiser-mot-passe.component';


const routes: Routes = [
  {
    path:"",
    component:RenisialiserMotPasseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RenisialiserMotPasseRoutingModule { }
