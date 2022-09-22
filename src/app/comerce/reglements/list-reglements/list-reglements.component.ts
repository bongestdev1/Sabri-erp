import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InformationsService } from 'src/app/services/informations.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx'; 
import { Router, NavigationEnd } from '@angular/router';
import {formatDate} from '@angular/common';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';
import { UtiliteService } from 'src/app/services/utilite.service';
const parametres = require("../parametres.json");

@Component({
  selector: 'app-list-reglements',
  templateUrl: './list-reglements.component.html',
  styleUrls: ['./list-reglements.component.scss']
})

export class ListReglementsComponent implements OnInit {

  formC:FormGroup

  parametres = {
    typeReglement:"",
    apiDelete:"",
    apiList:"",
    pageDetails:"",
    pageModifie:"",
    pageAjoute:"",
    pageEcheance:"",
    titreAjouter:"",
    typeTier:"Client"
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
         }else{
          this.notificationToast.showError( this.fonctionPartages.getMessageBackend(resultat.message))
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
    this.params1Delete = "La Reglement"
    this.params2Delete = params2
  }

  closeModalDelete(){
    this.isOpenModalDelete = false
  }
  constructor(
    private notificationToast: ToastNotificationService,
    private utilite:UtiliteService,
    private tokenStorageService:TokenStorageService,
    private fb:FormBuilder, private router:Router, private http: HttpClient, public informationGenerale: InformationsService, public fonctionPartages:FonctionPartagesService) {
   
    this.formC = this.fb.group({
      numero:[''],
      client:[''],
      fournisseur:[''],
      notes:[''],
      dateEcheance:[''],
      numCheque:[''],
      dateReglement:[''],
      montant:[''],
      tresorerie:[''],
      modeReglement:[''],
      reste:[''],
      limit:10
    })

  }

  
  arrayObjets = ["client", "fournisseur"]

  gotToAdd(){
    this.router.navigate([this.parametres.pageAjoute]);
  }

  goToListEcheance(){
    this.router.navigate([this.parametres.pageEcheance]);
  }

  objectKeys = Object.keys;

  items = {    
    numero:"Numéro",
    client:"Client",
    fournisseur:"Fournisseur",
    modeReglement:"Mode-Reglement",
    tresorerie:"Trésorerie",
    montant:"Montant",
    reste:"Reste",
    dateReglement:"Date",
    numCheque:"Numéro Chèque",
    dateEcheance:"Date d'échéance",
    notes:"Notes"
  };

  itemsVariable = {   
    numero:"Numéro",
    client:"Client",
    fournisseur:"Fournisseur",
    modeReglement:"Mode-Reglement",
    tresorerie:"Trésorerie",
    montant:"Montant",
    reste:"Reste Liltrages",
    dateReglement:"Date",
    numCheque:"Numéro Chèque",
    dateEcheance:"Date d'échéance",
    notes:"Notes"
  };

  

  request = {
    dateStart: this.informationGenerale.idDateAujourdCurrent,
    dateEnd: this.informationGenerale.idDateFinCurrent,
    magasin:"",
    typeReglement:"",
    search:{ 
      numero:"",
      client:"",
      fournisseur:"",
      modeReglement:"",
      tresorerie:"",
      montant:"",
      reste:"",
      dateReglement:"",
      numCheque:"",
      dateEcheance:"",
      notes:"",   
    },
    orderBy:{ 
      numero:0,
      client:0,
      fournisseur:0,
      modeReglement:0,
      tresorerie:0,
      montant:0,
      reste:0,
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
    magasin:"",
    typeReglement:"",
    search:{ 
      numero:"",
      client:"",
      fournisseur:"",
      modeReglement:"",
      tresorerie:"",
      montant:"",
      reste:"",
      dateReglement:"",
      numCheque:"",
      dateEcheance:"",
      notes:"",   
    },
    orderBy:{ 
      numero:0,
      client:0,
      fournisseur:0,
      modeReglement:0,
      tresorerie:0,
      montant:0,
      reste:0,
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
    if(this.parametres.typeTier == 'Client'){
       this.items.fournisseur = undefined
       this.itemsVariable.fournisseur = undefined
       delete(this.items.fournisseur)
       delete(this.itemsVariable.fournisseur)
    }else{
      this.items.client = undefined
      this.itemsVariable.client = undefined
      delete(this.items.client)
      delete(this.itemsVariable.client)
    }
    this.getReglements(this.request)
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
    this.request.magasin = this.informationGenerale.idSocieteCurrent
    this.request.typeReglement = this.parametres.typeReglement

    if(!this.testSyncronisation(this.request, this.oldRequest)){
      this.request.page = 1
    }

    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.parametres.apiList, this.request,this.tokenStorageService.getHeader()).subscribe(

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

  testSyncronisation(request1, request2){
    for(let key in request1.search){
      if(request1.search[key] != request2.search[key]){
        return false
      }
    }
 
    for(let key in request1.orderBy){
      if(request1.orderBy[key] != request2.orderBy[key]){
        return false
      }
    }

    if(request1.dateStart != request2.dateStart || request1.dateEnd != request2.dateEnd){
      return false
    }
   
    if(request1.limit != request2.limit){
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


  titreFile = "Liste reglement"
  nameFile = "liste_reglements"
  printout() {
    this.utilite.printout(this.reglements, this.items, this.titreFile)
  }

  generatePDF() {
    this.utilite.generatePDF(this.reglements, this.items, this.titreFile, this.nameFile)
  }
  
  exportexcel() {
    /* table id is passed over here */
    this.utilite.exportexcel(this.reglements, this.items, this.titreFile, this.nameFile)
  }

  changeCroissante(key){
    var classStyle = key+"-croissante";
    var buttons = document.getElementsByClassName(classStyle);
    if(this.request.orderBy[key] == 1){
      this.request.orderBy[key] = -1
      this.activationCroissante(buttons[0], buttons[1])
    }else{
      this.request.orderBy[key] = 1
      this.activationCroissante(buttons[1], buttons[0])
    }

    for(let varkey in  this.request.orderBy){
      if(key != varkey){
         this.request.orderBy[varkey] = 0
      }
    }
    
    this.getReglements(this.request)
  }


  activationCroissante(buttons1, buttons2){
    var buttons = document.getElementsByClassName("croissante");

    for(let i = 0; i < buttons.length; i++){
      var classList = buttons[i].getAttribute("class")
      classList = classList.replace("active-buttons-croissante","")
      buttons[i].setAttribute("class", classList) 
    }
   
    classList = buttons2.getAttribute("class")
    classList = classList.replace("active-buttons-croissante","")
    classList += " active-buttons-croissante"
    buttons2.setAttribute("class", classList)
  }
}
