import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashDefaultRoutingModule } from './dash-default-routing.module';
import { DashDefaultComponent } from './dash-default.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [DashDefaultComponent],
  imports: [
    CommonModule,
    DashDefaultRoutingModule,
    SharedModule,
    NgApexchartsModule
  ]
})
export class DashDefaultModule { }
