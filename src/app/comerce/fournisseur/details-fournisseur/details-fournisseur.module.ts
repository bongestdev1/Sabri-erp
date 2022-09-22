import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { DetailsFournisseurRoutingModule } from './details-fournisseur-routing.module';
import { DetailsFournisseurComponent } from './details-fournisseur.component';
import { DetailsClientModule } from '../../client/details-client/details-client.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    DetailsFournisseurRoutingModule,
    SharedModule,
  ],
  exports: [
  ]
})
export class DetailsFournisseurModule { }
