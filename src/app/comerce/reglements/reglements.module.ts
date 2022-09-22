import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';

import { ReglementsRoutingModule } from './reglements-routing.module';
import { ReglementInput2Component } from './components/reglement-input2/reglement-input2.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ReglementsRoutingModule,
    SharedModule
  ]
})
export class ReglementsModule { }
