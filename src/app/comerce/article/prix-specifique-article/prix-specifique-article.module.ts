import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrixSpecifiqueArticleRoutingModule } from './prix-specifique-article-routing.module';
import { LignePrixSpecifiqueComponent } from './ligne-prix-specifique/ligne-prix-specifique.component';

@NgModule({
  declarations: [],
  imports: [
    PrixSpecifiqueArticleRoutingModule,
    CommonModule
  ]
})

export class PrixSpecifiqueArticleModule { }
