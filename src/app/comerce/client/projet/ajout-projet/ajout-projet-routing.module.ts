import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutProjetComponent } from './ajout-projet.component';

const routes: Routes = [
  {
    path: '',
    component: AjoutProjetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AjoutProjetRoutingModule { }
