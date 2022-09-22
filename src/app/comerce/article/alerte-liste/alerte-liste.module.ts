import { AlerteListeRoutingModule } from './alerte-liste-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    AlerteListeRoutingModule
  ]
})
export class AlerteListeModule { }
