import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FilterAticleCategorieRoutingModule } from './filter-aticle-categorie-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FilterAticleCategorieRoutingModule,
    SharedModule
  ]
})
export class FilterAticleCategorieModule { }
