import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilterAticleCategorieComponent } from './filter-aticle-categorie.component';

const routes: Routes = [
  {
    path: '',
    component: FilterAticleCategorieComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilterAticleCategorieRoutingModule { }
