import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedGlobalModule } from './../../../shared-global/shared-global.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';


import { AjouterArticleRoutingModule } from './ajouter-article-routing.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AjouterArticleRoutingModule,
    SharedModule,
    SharedGlobalModule,
    FormsModule, 
    ReactiveFormsModule,
  ],
  exports: [
  ]

})
export class AjouterArticleModule { }
