import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifierProjetComponent } from './modifier-projet.component';

const routes: Routes = [
  {
    path: '',
    component: ModifierProjetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifierProjetRoutingModule { }
