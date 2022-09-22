import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListparamlivraisonComponent } from './listparamlivraison/listparamlivraison.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { LivraisonRoutingModule } from './livraison-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    LivraisonRoutingModule
    
  ]
})
export class LivraisonModule { }
