import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
//import { UserService } from '../../../services/user/user.service';
import { Router, Event } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-famille-modal',
  templateUrl: './add-famille-modal.component.html',
  styleUrls: ['./add-famille-modal.component.scss']
})
export class AddFamilleModalComponent implements OnInit {
  @Input() isOpenModalAjoutFamille = false

  @Input() isLoading = false

  @Input() idAjoutFamilleModal
  
  @Input() params1AjoutFamille

  @Input() params2AjoutFamille

  @Input() idCategorie = ""
  
  classCss = "modalAjoutFamille"

  @Output() closeModalAjoutFamille = new EventEmitter<string>();

  constructor( private router:Router,  private http: HttpClient){ 
   
  }


  closeAjoutFamille(){
    this.closeModalAjoutFamille.emit();
  }
  
  ngOnInit(): void {
   
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalAjoutFamille){
      this.classCss = "modalAjoutFamille modalAjoutFamille-open"
    }else{
      this.classCss = "modalAjoutFamille"
    }
  }

}