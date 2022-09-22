import { ListClientModule } from './../../client/list-client/list-client.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ListFournisseurComponent } from './list-fournisseur.component';
import { ListFournisseurRoutingModule } from './list-fournisseur-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbButtonsModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ListFournisseurRoutingModule,
    SharedModule,
    FormsModule, ReactiveFormsModule,
  ],
  exports:[
  ]

})
export class ListFournisseurModule { }
