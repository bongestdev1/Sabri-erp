import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
//import { UserService } from '../../../services/user/user.service';
import { Router, Event } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-marque-modal',
  templateUrl: './add-marque-modal.component.html',
  styleUrls: ['./add-marque-modal.component.scss']
})
export class AddMarqueModalComponent implements OnInit {

  @Input() isOpenModalAjoutMarque = false

  @Input() isLoading = false

  @Input() idAjoutMarqueModal
  
  @Input() params1AjoutMarque

  @Input() params2AjoutMarque

  @Input() idCategorie = ""
  
  classCss = "modalAjoutMarque"

  @Output() closeModalAjoutMarque = new EventEmitter<string>();

  constructor( private router:Router,  private http: HttpClient){ 
   
  }


  closeAjoutMarque(){
    this.closeModalAjoutMarque.emit();
  }
  
  ngOnInit(): void {
   
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalAjoutMarque){
      this.classCss = "modalAjoutMarque modalAjoutMarque-open"
    }else{
      this.classCss = "modalAjoutMarque"
    }
  }

}