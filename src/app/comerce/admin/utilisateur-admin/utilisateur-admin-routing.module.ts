import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UtilisateurAdminComponent } from './utilisateur-admin.component';

const routes: Routes = [
  {
    path: '',
    component: UtilisateurAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilisateurAdminRoutingModule { }
