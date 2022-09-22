import { SharedModule } from '../../../theme/shared/shared.module';
import { DetailsBonLivraisonRoutingModule } from './details-bon-livraison-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DetailsBonLivraisonRoutingModule,
    SharedModule
  ]
})
export class DetailsBonLivraisonModule { }
