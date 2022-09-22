import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FiltreDateButtonComponent } from './filtre-date-button.component';

const routes: Routes = [
  {
    path: '',
    component: FiltreDateButtonComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FiltreDateButtonRoutingModule { }
