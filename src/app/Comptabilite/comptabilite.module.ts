import { ClasseComponent } from './classe/classe.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedGlobalModule } from '../shared-global/shared-global.module';
import { SharedModule } from '../theme/shared/shared.module';
import { ComptabiliteRoutingModule } from './comptabilite-routing.module';


@NgModule({
  declarations: [
    ClasseComponent,
  ],
  imports: [
    CommonModule,
    ComptabiliteRoutingModule,
    SharedGlobalModule,
    SharedModule,
  ],
  exports: [

  ]
})
export class ComptabiliteModule { }
