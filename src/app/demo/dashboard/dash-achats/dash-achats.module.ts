import { DashAchatsRoutingModule } from './dash-achats-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { DashAchatsComponent } from './dash-achats.component';
import {SharedModule} from '../../../theme/shared/shared.module';


@NgModule({
  declarations: [DashAchatsComponent],
  imports: [
    CommonModule,
    DashAchatsRoutingModule,
    SharedModule
  ]
})
export class DashAchatstModule { }
