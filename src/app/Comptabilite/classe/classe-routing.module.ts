import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClasseComponent } from './classe.component';

const routes: Routes = [
  {
    path: '',
    component: ClasseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClasseRoutingModule { }
