import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifierClientComponent } from './modifier-client.component';

const routes: Routes = [
  {
    path: '',
    component: ModifierClientComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifierClientRoutingModule { }
