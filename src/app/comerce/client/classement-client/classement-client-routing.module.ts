import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassementClientComponent } from './classement-client.component';

const routes: Routes = [
  {
    path: '',
    component: ClassementClientComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ClassementClientRoutingModule { }
