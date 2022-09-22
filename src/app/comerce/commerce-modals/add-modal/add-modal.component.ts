import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
//import { UserService } from '../../../services/user/user.service';
import { Router, Event } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss']
})
export class AddModalComponent implements OnInit {

  objectKeys = Object.keys;

  @Input() isOpenModalAdd = false

  @Input() isLoading = false

  @Input() name = ""

  @Input() request

  @Input() requestErreur

  classCss = "modalDelete"
  
  @Output() addItem = new EventEmitter<string>();

  @Output() closeModalAdd = new EventEmitter<string>();

  constructor( private router:Router,  private http: HttpClient){ 
   
  }

  add() {
    this.addItem.emit();
  }

  closeAdd(){
    this.closeModalAdd.emit();
  }
  
  ngOnInit(): void {
   
  }

  ngOnChanges(changes: SimpleChanges) {

    for(let key in this.request){
      this.request[key] = ""
    }

    if(this.isOpenModalAdd){
      this.classCss = "modalDelete modalDelete-open"
    }else{
      this.classCss = "modalDelete"
    }
  }

}