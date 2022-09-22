import { Component, OnInit, Input, SimpleChanges , Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-spinner3',
  templateUrl: './spinner3.component.html',
  styleUrls: ['./spinner3.component.scss']
})
export class Spinner3Component implements OnInit {

  @Input() isLoading: false;

  constructor() { }

  ngOnInit(): void {
  }

}
