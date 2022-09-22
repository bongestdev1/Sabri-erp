import { Component, OnInit, Input, ViewChild, SimpleChanges, ElementRef } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
//import { UserService } from '../../../services/user/user.service';
import { Router, Event } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-add-element-modal',
  templateUrl: './add-element-modal.component.html',
  styleUrls: ['./add-element-modal.component.scss']
})
export class AddElementModalComponent implements OnInit {

  @Input() isOpenModalAjoutElement = false

  @Input() isLoading = false

  @Input() idAjoutElementModal
           
  @Input() idAjoutPersModal

  @Input() typeDocument

  @Input() params1AjoutElement

  @Input() params2AjoutElement

  classCss = "modalAjoutElement"

  @Input() typeElement = ""
  
  @Output() closeModalAjoutElement = new EventEmitter<string>();
  @Output() selectionLigne = new EventEmitter<string>();

  constructor( private router:Router,  private http: HttpClient,
    public fonctionPartagesService:FonctionPartagesService){ 
  }

  
  selectionLigneFunction(id){
    this.selectionLigne.emit(id)
  }

  closeAjoutElement(){
    this.closeModalAjoutElement.emit();
  }
  
  ngOnInit(): void {
   
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalAjoutElement){
      this.classCss = "modalAjoutElement modalAjoutElement-open"
    }else{
      this.classCss = "modalAjoutElement"
    }
  }

}