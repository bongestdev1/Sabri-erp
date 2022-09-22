import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Spinner3RoutingModule } from './spinner3-routing.module';
import { Spinner3Component } from './spinner3.component';

import {SharedModule} from '../../theme/shared/shared.module';

@NgModule({
  declarations: [Spinner3Component],
  imports: [
    CommonModule,
    Spinner3RoutingModule,
    SharedModule
  ]
})
export class SpinnerModule { }
