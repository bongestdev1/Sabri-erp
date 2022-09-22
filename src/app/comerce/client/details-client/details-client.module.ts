import { DetailsClientRoutingModule } from './details-client-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { DetailsClientComponent } from './details-client.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DetailsClientRoutingModule,
    SharedModule,
  ],
  exports:[
  ]
})
export class DetailsClientModule { }
