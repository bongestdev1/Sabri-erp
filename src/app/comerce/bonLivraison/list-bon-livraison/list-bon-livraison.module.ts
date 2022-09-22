import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ListBonLivraisonRoutingModule } from './list-bon-livraison-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListBonLivraisonRoutingModule,
    SharedModule,
  ]
})
export class ListBonLivraisonModule { }
