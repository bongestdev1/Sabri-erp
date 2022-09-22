import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SocieteAdminComponent } from './societe-admin.component';

const routes: Routes = [
  {
    path: '',
    component: SocieteAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocieteAdminRoutingModule { }
