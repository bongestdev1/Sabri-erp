import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutreAdresseRoutingModule } from './autre-adresse-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AutreAdresseRoutingModule,
    SharedModule,
    NgbModule
  ]
})
export class AutreAdresseModule { }
