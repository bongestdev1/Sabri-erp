import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MotPasseOublierComponent } from './mot-passe-oublier.component';


const routes: Routes = [
  {
    path:"",
    component:MotPasseOublierComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MotPasseOublierRoutingModule { }
