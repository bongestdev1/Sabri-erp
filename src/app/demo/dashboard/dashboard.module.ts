import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {SharedModule} from '../../theme/shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    NgApexchartsModule,
  ]
})
export class DashboardModule { }
