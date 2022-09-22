import { SharedGlobalModule } from 'src/app/shared-global/shared-global.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceptionsRoutingModule } from './receptions-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReceptionsRoutingModule,
    SharedModule,
    SharedGlobalModule
  ]
})
export class ReceptionsModule { }
