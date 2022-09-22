import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImportationsPageComponent } from './importations-page.component';

const routes: Routes = [
  {
    path: '',
    component: ImportationsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportationsPageRoutingModule { }
