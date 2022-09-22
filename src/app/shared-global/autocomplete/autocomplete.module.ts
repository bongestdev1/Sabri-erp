import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutocompleteRoutingModule } from './autocomplete-routing.module';

import { AutocompleteComponent } from './autocomplete.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AutocompleteRoutingModule
  ],
  exports:[
  ]
})
export class AutocompleteModule { }
