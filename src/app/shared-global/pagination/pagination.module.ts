import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginationRoutingModule } from './pagination-routing.module';
import {NgbButtonsModule, NgbDropdownModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../../theme/shared/shared.module';

import { PaginationComponent } from './pagination.component';

@NgModule({
  declarations: [PaginationComponent],
  imports: [
    CommonModule,
    PaginationRoutingModule,
    SharedModule,
    NgbDropdownModule,
    NgbButtonsModule,
    NgbTooltipModule
  ]
})
export class PaginationModule { }
