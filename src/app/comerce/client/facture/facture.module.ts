import { FactureRoutingModule } from './facture-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FactureRoutingModule,
    SharedModule,
    NgbModule
  ]
})
export class FactureModule { }
