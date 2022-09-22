import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
//import { UserService } from '../../../services/user/user.service';
import { Router, Event } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { InformationsService } from 'src/app/services/informations.service';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';

@Component({
  selector: 'app-parametres-societes-modal',
  templateUrl: './parametres-societes-modal.component.html',
  styleUrls: ['./parametres-societes-modal.component.scss']
})
export class ParametresSocietesModalComponent implements OnInit {

  objectKeys = Object.keys;

  @Input() isOpenModalAdd = false

  @Input() isLoading = false

  @Input() name = ""

  @Input() request

  @Input() requestErreur

  classCss = "modalParametresSocietes"
  
  @Output() addItem = new EventEmitter<string>();

  @Output() closeModalAdd = new EventEmitter<string>();

  constructor(private router:Router,  private http: HttpClient, private informationsServices: InformationsService, 
    private tokenStorageService: TokenStorageService){ 
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
      this.classCss = "modalParametresSocietes modalParametresSocietes-open"
      this.getSocietes()
    }else{
      this.classCss = "modalParametresSocietes"
    }
  }

  societes = []

  getSocietes() {
    this.isLoading = true
   
    this.http.get(this.informationsServices.baseUrl + "/societes/allSocietesUtilisateur", this.tokenStorageService.getHeader()).subscribe(
      res => {
        let resultat: any = res
        if (resultat.status) {
          console.log(resultat.societes)
          this.isLoading = false
          this.societes = resultat.societes
         
          var isFound = false
          for(let i = 0; i < this.societes.length; i++){
             if(this.societes[i].id == this.informationsServices.idSocieteCurrent){
               this.closeAdd()
               isFound = true
             }
          }

          if(this.societes.length == 1){
            this.informationsServices.setSocieteCurrent2(this.societes[0].id, this.societes[0].raisonSociale)
            this.informationsServices.setSocieteCurrentObject(this.societes[0]) 
    
            this.closeAdd()
          }
 
          if(!isFound && this.societes.length == 0){
            this.informationsServices.setSocieteCurrent2("", "")
            this.informationsServices.setSocieteCurrentObject(null) 
          }

        }
      }, err => {
        console.log(err)
        this.isLoading = false
      }

    );
  }

}