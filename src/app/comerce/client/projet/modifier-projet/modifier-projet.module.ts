import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ModifierProjetRoutingModule } from './modifier-projet-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModifierProjetRoutingModule,
    SharedModule,
  ]
})
export class ModifierProjetModule { }
