import { DashStocksComponent } from './dash-stocks.component';
import { DashStocksRoutingModule } from './dash-stocks-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../../theme/shared/shared.module';


@NgModule({
  declarations: [DashStocksComponent],
  imports: [
    CommonModule,
    DashStocksRoutingModule,
    SharedModule
  ]
})
export class DashStocksModule { }
