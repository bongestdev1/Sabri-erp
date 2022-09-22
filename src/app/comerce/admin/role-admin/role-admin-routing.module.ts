import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleAdminComponent } from './role-admin.component';

const routes: Routes = [
  {
    path: '',
    component: RoleAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleAdminRoutingModule { }
