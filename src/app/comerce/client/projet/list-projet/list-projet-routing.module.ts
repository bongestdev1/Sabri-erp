import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListProjetComponent } from './list-projet.component';


const routes: Routes = [
  {
    path: '',
    component: ListProjetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ListProjetRoutingModule { }
