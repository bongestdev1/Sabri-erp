import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListArticleSocieteRoutingModule } from './list-article-societe-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListArticleSocieteRoutingModule,
    SharedModule,
    FormsModule, ReactiveFormsModule,
  ]
})
export class ListArticleSocieteModule { }
