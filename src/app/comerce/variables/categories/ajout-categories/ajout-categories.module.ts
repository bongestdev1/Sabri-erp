import { AjoutCategoriesRoutingModule } from './ajout-categories-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AjoutCategoriesRoutingModule,
    SharedModule,
  ]
})
export class AjoutCategoriesModule { }
