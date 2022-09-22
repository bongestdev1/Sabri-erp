import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';

import { ClientHtmlRoutingModule } from './client-html-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ClientHtmlRoutingModule,
    SharedModule,
  ]
})
export class ClientHtmlModule { }
