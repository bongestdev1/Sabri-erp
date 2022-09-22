import { Component, OnInit, Input, SimpleChanges , Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-nombre-list-page',
  templateUrl: './nombre-list-page.component.html',
  styleUrls: ['./nombre-list-page.component.scss']
})
export class NombreListPageComponent implements OnInit {

  @Input() control: FormControl;

  @Output() getItemsEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {

  }

  getItems(){
    this.getItemsEvent.emit();
  }

}
