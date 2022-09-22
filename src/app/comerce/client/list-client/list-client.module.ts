import { SharedGlobalModule } from 'src/app/shared-global/shared-global.module';
import { ListClientComponent } from './list-client.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ListClientRoutingModule } from './list-client-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ListClientRoutingModule,
    SharedModule,
    FormsModule, ReactiveFormsModule,
  ],
  exports:[
  ]
})
export class ListClientModule { }
