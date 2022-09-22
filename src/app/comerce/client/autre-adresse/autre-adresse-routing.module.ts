import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutreAdresseComponent } from './autre-adresse.component';


const routes: Routes = [
  {
    path: '',
    component: AutreAdresseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutreAdresseRoutingModule { }
