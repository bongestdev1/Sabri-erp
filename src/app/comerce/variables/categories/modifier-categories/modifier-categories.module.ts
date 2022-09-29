import { ModifierCategoriesRoutingModule } from './modifier-categories-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModifierCategoriesRoutingModule,
    SharedModule,
  ]
})
export class ModifierCategoriesModule { }
