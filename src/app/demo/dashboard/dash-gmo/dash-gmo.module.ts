import { DashGmoComponent } from './dash-gmo.component';
import { DashGmoRoutingModule } from './dash-gmo-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../../theme/shared/shared.module';


@NgModule({
  declarations: [DashGmoComponent],
  imports: [
    CommonModule,
    DashGmoRoutingModule,
    SharedModule
  ]
})
export class DashGmoModule { }
