import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ModifierClientRoutingModule } from './modifier-client-routing.module';



import { FormsModule, ReactiveFormsModule } from "@angular/forms";
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModifierClientRoutingModule,
    SharedModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class MofifierClientModule { }
