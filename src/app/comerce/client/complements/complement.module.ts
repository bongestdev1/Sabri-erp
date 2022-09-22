import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplementRoutingModule } from './complement-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComplementRoutingModule,
    SharedModule,
    NgbModule
  ]
})
export class ComplementModule { }
