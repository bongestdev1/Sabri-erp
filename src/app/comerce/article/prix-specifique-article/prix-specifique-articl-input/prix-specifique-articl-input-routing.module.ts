import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrixSpecifiqueArticlInputComponent } from './prix-specifique-articl-input.component';

const routes: Routes = [
  {
    path: '',
    component: PrixSpecifiqueArticlInputComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrixSpecifiqueArticlInputRoutingModule { }
