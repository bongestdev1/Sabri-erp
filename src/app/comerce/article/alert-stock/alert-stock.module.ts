import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AlertStockRoutingModule } from './alert-stock-routing.module';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AlertStockRoutingModule,
    SharedModule,
    FormsModule, ReactiveFormsModule,
  ]
})
export class AlertStockModule { }
