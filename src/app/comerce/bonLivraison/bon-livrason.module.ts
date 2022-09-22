import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { BonLivrasonRoutingModule } from './bon-livrason-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BonLivrasonRoutingModule,
    SharedModule,
  ]
})
export class BonLivrasonModule { }
