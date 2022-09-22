import { DashVentesComponent } from './dash-ventes.component';
import { DashVentesRoutingModule } from './dash-ventes-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../../theme/shared/shared.module';


@NgModule({
  declarations: [DashVentesComponent],
  imports: [
    CommonModule,
    DashVentesRoutingModule,
    SharedModule
  ]
})
export class DashVentesModule { }
