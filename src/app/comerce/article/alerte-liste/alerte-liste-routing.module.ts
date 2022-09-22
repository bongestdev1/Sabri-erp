import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlerteListeComponent } from './alerte-liste.component';

const routes: Routes = [
  {
    path: '',
    component: AlerteListeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlerteListeRoutingModule { }
