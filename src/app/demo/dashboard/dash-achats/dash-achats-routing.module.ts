import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashAchatsComponent } from './dash-achats.component';

const routes: Routes = [
  {
    path: '',
    component: DashAchatsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashAchatsRoutingModule { }
