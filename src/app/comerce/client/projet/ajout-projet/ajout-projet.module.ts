import { SharedModule } from '../../../../theme/shared/shared.module';
import { AjoutProjetRoutingModule } from './ajout-projet-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AjoutProjetRoutingModule,
    SharedModule
  ]
})
export class AjoutProjetModule { }
