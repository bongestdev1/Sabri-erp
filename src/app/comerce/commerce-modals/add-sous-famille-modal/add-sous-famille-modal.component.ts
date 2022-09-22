import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
//import { UserService } from '../../../services/user/user.service';
import { Router, Event } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-sous-famille-modal',
  templateUrl: './add-sous-famille-modal.component.html',
  styleUrls: ['./add-sous-famille-modal.component.scss']
})
export class AddSousFamilleModalComponent implements OnInit {

  @Input() isOpenModalAjoutSousFamille = false

  @Input() isLoading = false

  @Input() idAjoutSousFamilleModal
  
  @Input() params1AjoutSousFamille

  @Input() params2AjoutSousFamille

  @Input() idFamille = ""
  
  @Input() idCategorie = ""

  classCss = "modalAjoutSousFamille"

  @Output() closeModalAjoutSousFamille = new EventEmitter<string>();

  constructor( private router:Router,  private http: HttpClient){ 
   
  }


  closeAjoutSousFamille(){
    this.closeModalAjoutSousFamille.emit();
  }
  
  ngOnInit(): void {
   
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalAjoutSousFamille){
      this.classCss = "modalAjoutSousFamille modalAjoutSousFamille-open"
    }else{
      this.classCss = "modalAjoutSousFamille"
    }
  }

}