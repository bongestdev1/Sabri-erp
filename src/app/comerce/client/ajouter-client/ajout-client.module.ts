import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AjouterClientRoutingModule } from './ajouter-client-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AjouterClientRoutingModule,
    SharedModule,
  ]
})

export class AjoutClientModule { }

