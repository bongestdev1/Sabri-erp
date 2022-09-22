import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivraisonRoutingModule } from './livraison-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LivraisonRoutingModule,
    SharedModule,
    NgbModule
  ]
})
export class LivraisonModule { }
