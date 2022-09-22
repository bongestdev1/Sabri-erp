import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ListProjetRoutingModule } from './list-projet-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListProjetRoutingModule,
    SharedModule,
    FormsModule, ReactiveFormsModule,
  ]
})
export class ListProjetModule { }
