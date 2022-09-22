import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';

import { DetailsArticleRoutingModule } from './details-article-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DetailsArticleRoutingModule,
    SharedModule
  ]
})
export class DetailsArticleModule { }
