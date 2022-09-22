import { DashFinanceComponent } from './dash-finance.component';
import { DashFinanceRoutingModule } from './dash-finance-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../../theme/shared/shared.module';


@NgModule({
  declarations: [DashFinanceComponent],
  imports: [
    CommonModule,
    DashFinanceRoutingModule,
    SharedModule
  ]
})
export class DashFinanceModule { }
