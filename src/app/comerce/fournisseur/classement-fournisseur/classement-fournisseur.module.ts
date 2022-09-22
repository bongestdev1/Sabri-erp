import { ClassementFournisseurRoutingModule } from './classement-fournisseur-routing.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbButtonsModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ClassementFournisseurRoutingModule,
    SharedModule,
    FormsModule, ReactiveFormsModule,
  ],
  exports:[
  ]

})
export class ClassementFournisseurModule { }
