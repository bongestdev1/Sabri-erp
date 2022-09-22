import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-empty-array',
  templateUrl: './empty-array.component.html',
  styleUrls: ['./empty-array.component.scss']
})
export class EmptyArrayComponent implements OnInit {

  constructor() { }

  @Input() tabArray = []
  @Input() totalLigne = 10

  tabEmpty = []
  inisialiserContacts(){
    this.tabEmpty = []
    for(let i = 0; i < (this.totalLigne - this.tabArray.length); i++){
      this.tabEmpty.push({})
    }
    return true
  }

  ngOnInit(): void {
  
  }
  
  ngOnChanges(changes: SimpleChanges) {
    this.inisialiserContacts()
  }
}
