import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InformationsService } from 'src/app/services/informations.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {formatDate} from '@angular/common';
import { UtiliteService } from 'src/app/services/utilite.service';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';
const parametres = require("../parametres.json");

@Component({
  selector: 'app-list-echeance-client',
  templateUrl: './list-echeance-client.component.html',
  styleUrls: ['./list-echeance-client.component.scss']
})
export class ListEcheanceClientComponent implements OnInit {

  pageModifie = "/reglement/modifier/"

  formC:FormGroup

  parametres = {
    typeReglement:"",
    apiDelete:"",
    apiList:"",
    pageDetails:"",
    pageModifie:"",
    pageAjoute:"",
    pageEcheance:"",
    apiEcheances:"",
    titreAjouter:""
  }

  getDate(date){
    return formatDate(new Date(date), 'yyyy-MM-dd', 'en');
  }

  isOpenModalDelete = false
  idDeleteModal = ""
  params1Delete = ""
  params2Delete = ""

  deleteItem(){
     
    if (this.isLoading) {
      return
    }

    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.parametres.apiDelete +"/"+this.idDeleteModal, {},this.tokenStorageService.getHeader()).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
            this.getReglements(this.request)
            this.closeModalDelete()
         }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }

  openModalDelete(id, params2){
    this.idDeleteModal = id
    this.isOpenModalDelete = true
    this.params1Delete = "Le Reglement"
    this.params2Delete = params2
  }

  closeModalDelete(){
    this.isOpenModalDelete = false
  }
  constructor(
    private utilite:UtiliteService,
    private fb:FormBuilder, 
    private router:Router, 
    private tokenStorageService: TokenStorageService,
    private http: HttpClient, 
    public informationGenerale: InformationsService) {
   
    this.formC = this.fb.group({
      numero:[''],
      client:[''],
      notes:[''],
      dateEcheance:[''],
      numCheque:[''],
      dateReglement:[''],
      montant:[''],
      tresorerie:[''],
      modeReglement:[''],
      limit:10
    })

    this.getReglements(this.request)
  }

  
  arrayObjets = ["client", "fournisseur"]


  objectKeys = Object.keys;

  items = {    
    numero:"active",
    client:"active",
    modeReglement:"active",
    tresorerie:"active",
    montant:"active",
    dateReglement:"active",
    numCheque:"active",
    dateEcheance:"active",
    notes:"active",
  };

  itemsVariable = {
    numero:"active",
    client:"active",
    modeReglement:"active",
    tresorerie:"active",
    montant:"active",
    dateReglement:"active",
    numCheque:"active",
    dateEcheance:"active",
    notes:"active",
  };

  request = {
    dateStart: this.informationGenerale.idDateAujourdCurrent,
    dateEnd: this.informationGenerale.idDateFinCurrent,
    societe:"",
    typeReglement:"",
    search:{ 
      client:"",
      modeReglement:"",
      tresorerie:"",
      montant:"",
      dateReglement:"",
      numCheque:"",
      dateEcheance:"",
      notes:"",   
    },
    orderBy:{ 
      client:0,
      modeReglement:0,
      tresorerie:0,
      montant:0,
      dateReglement:0,
      numCheque:0,
      dateEcheance:0,
      notes:0,
    },
    limit: 10,
    page:1
  } 

  oldRequest = { 
    dateStart: this.informationGenerale.idDateAujourdCurrent,
    dateEnd: this.informationGenerale.idDateFinCurrent,
    societe:"",
    typeReglement:"",
    search:{ 
      client:"",
      modeReglement:"",
      tresorerie:"",
      montant:"",
      dateReglement:"",
      numCheque:"",
      dateEcheance:"",
      notes:"",   
    },
    orderBy:{ 
      client:0,
      modeReglement:0,
      tresorerie:0,
      montant:0,
      dateReglement:0,
      numCheque:0,
      dateEcheance:0,
      notes:0,
    },
    limit: 10,
    page:1
  }

  ngOnInit(): void {
    var key = this.router.url.replace("/reglement/", "")
    key = key.substring(0, key.indexOf('/'))
    this.parametres = parametres[key]
  }
  isLoading = false

  reglements = []

  getReglements(request) {

    if (this.isLoading) {
      return
    }

    for(let key in this.request.search){
      this.request.search[key] = this.formC.value[key]
    }
    
    this.request.dateStart = request.dateStart 
    this.request.dateEnd = request.dateEnd 
    this.request.limit = this.formC.value.limit
    this.request.societe = this.informationGenerale.idSocieteCurrent


    if(!this.testSyncronisation(this.request, this.oldRequest)){
      this.request.page = 1
    }

    this.isLoading = true
    this.parametres.apiEcheances = "/reglements/listEcheances"
    this.http.post(this.informationGenerale.baseUrl + this.parametres.apiEcheances, this.request,this.tokenStorageService.getHeader()).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.reglements = resultat.resultat.docs
          this.totalPage = resultat.resultat.pages
          this.oldRequest = resultat.request
          if(this.totalPage < this.request.page && this.request.page != 1){
            this.request.page = this.totalPage 
            this.getReglements(this.request)
          }

          if(!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page) ){
            this.getReglements(this.request)
          }
        }
      }, err => {
        this.isLoading = false
        alert("Désole, il y a un problème de connexion internet")
      }
    );
  }

  testSyncronisation(request1, request2) {
    for (let key in request1.search) {
      if (request1.search[key] != request2.search[key]) {
        return false
      }
    }

    for (let key in request1.orderBy) {
      if (request1.orderBy[key] != request2.orderBy[key]) {
        return false
      }
    }

    if (request1.limit != request2.limit) {
      return false
    }

    return true;
  }



  totalPage = 1

  setLimitPage(newLimitPage: number) {
    this.request.limit = newLimitPage
    this.request.page = 1
    this.getReglements(this.request)
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getReglements(this.request)
  }

  titreFile = "Liste d'articles"
  nameFile = "liste_article"
  objetFile = {
    numero:"numero",
    client:"client",
    modeReglement:"modeReglement",
    tresorerie:"tresorerie",
    montant:"montant",
    dateReglement:"dateReglement",
  }
  printout() {
    this.utilite.printout(this.reglements, this.objetFile, this.titreFile)
  }

  generatePDF() {
    this.utilite.generatePDF(this.reglements, this.objetFile, this.titreFile, this.nameFile)
  }
  
  exportexcel() {
    /* table id is passed over here */
    this.utilite.exportexcel(this.reglements, this.objetFile, this.titreFile, this.nameFile)
  }

  changeCroissante(key) {
    var classStyle = key + "-croissante";
    var buttons = document.getElementsByClassName(classStyle);
    if (this.request.orderBy[key] == 1) {
      this.request.orderBy[key] = -1
      this.activationCroissante(buttons[0], buttons[1])
    } else {
      this.request.orderBy[key] = 1
      this.activationCroissante(buttons[1], buttons[0])
    }

    for (let varkey in this.request.orderBy) {
      if (key != varkey) {
        this.request.orderBy[varkey] = 0
      }
    }

    this.getReglements(this.request)
  }

  activationCroissante(buttons1, buttons2) {
    var buttons = document.getElementsByClassName("croissante");

    for (let i = 0; i < buttons.length; i++) {
      var classList = buttons[i].getAttribute("class")
      classList = classList.replace("active-buttons-croissante", "")
      buttons[i].setAttribute("class", classList)
    }

    classList = buttons2.getAttribute("class")
    classList = classList.replace("active-buttons-croissante", "")
    classList += " active-buttons-croissante"
    buttons2.setAttribute("class", classList)
  }
}
