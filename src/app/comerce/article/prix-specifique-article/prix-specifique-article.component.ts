import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InformationsService } from 'src/app/services/informations.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx'; 
import { Router } from '@angular/router';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { UtiliteService } from 'src/app/services/utilite.service';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';

@Component({
  selector: 'app-prix-specifique-article',
  templateUrl: './prix-specifique-article.component.html',
  styleUrls: ['./prix-specifique-article.component.scss']
})
export class PrixSpecifiqueArticleComponent implements OnInit {
  formC:FormGroup

  lienDelete = "/prixSpecifiques/deletePrixSpecifique"
  lienList = "/prixSpecifiques/listPrixSpecifique"

  isOpenModalDelete = false
  idDeleteModal = ""
  params1Delete = ""
  params2Delete = ""

  deleteItem(){
     
    if (this.isLoading) {
      return
    }

    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.lienDelete +"/"+this.idDeleteModal, {},this.tokenStorageService.getHeader()).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
            this.getPrixSpecifiques()
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
    this.params1Delete = "La prixSpecifique"
    this.params2Delete = params2
  }

  closeModalDelete(){
    this.isOpenModalDelete = false
  }

  constructor(
    private utilite:UtiliteService, 
    private fonctionPartagesService:FonctionPartagesService, 
    private fb:FormBuilder, 
    private router:Router, 
    private http: HttpClient, 
    private tokenStorageService: TokenStorageService,
    public informationGenerale: InformationsService) {
   
    this.formC = this.fb.group({
        article: [''],
        sousProduit: [''],
        typeTier: [''],
        client: [''],
        remise:[''], 
        remisePourcentage:[''],
        quantiteMin:[''],
        quantiteMax:[''], 
        note:[''],
    
      limit:10
    })

    this.getPrixSpecifiques()

  }
  
  gotToAdd(){
    this.router.navigate(['ajouterPrixSpecifique']);
  }

  objectKeys = Object.keys;

  items = { 
    article: "article",
    sousProduit: "sousProduit",
    typeTier: "typeTier",
    client: "client",
    remise:"remise", 
    remisePourcentage:"Remise Pourcentage",
    quantiteMin:"quantiteMin",
    quantiteMax:"quantiteMax", 
    note:"note",
  };

  itemsVariable = { 
    article: "article",
    sousProduit: "sousProduit",
    typeTier: "typeTier",
    client: "client",
    remise:"remise", 
    remisePourcentage:"Remise Pourcentage",
    quantiteMin:"quantiteMin",
    quantiteMax:"quantiteMax", 
    note:"note",
  };

  request = { 
    search:{
      article: "",
      sousProduit: "",
      typeTier: "",
      client: "",
      remise:"", 
      remisePourcentage:"",
      quantiteMin:"",
      quantiteMax:"", 
      note:"", 
    },
    orderBy:{ 
      article: 0,
      sousProduit: 0,
      typeTier: 0,
      client: 0,
      remise:0, 
      remisePourcentage:0,
      quantiteMin:0,
      quantiteMax:0, 
      note:0,
    },
    limit: 10,
    page:1,
    societe:""
  } 

  oldRequest = { 
    search:{
      article: "",
      sousProduit: "",
      typeTier: "",
      client: "",
      remise:"", 
      remisePourcentage:"",
      quantiteMin:"",
      quantiteMax:"", 
      note:"", 
    },
    orderBy:{ 
      article: 0,
      sousProduit: 0,
      typeTier: 0,
      client: 0,
      remise:0, 
      remisePourcentage:0,
      quantiteMin:0,
      quantiteMax:0, 
      note:0,
    },
    limit: 10,
    page:1,
    societe:""
  }

  ngOnInit(): void {
  }
  isLoading = false

  prixSpecifiques = []

  getPrixSpecifiques() {

    if (this.isLoading) {
      return
    }

    for(let key in this.request.search){
      this.request.search[key] = this.formC.value[key]
    }
    
    this.request.limit = this.formC.value.limit
    this.request.societe = this.informationGenerale.idSocieteCurrent   

    if(!this.testSyncronisation(this.request, this.oldRequest)){
      this.request.page = 1
    }

    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.lienList, this.request,this.tokenStorageService.getHeader()).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.prixSpecifiques = resultat.resultat.docs
          this.totalPage = resultat.resultat.pages
          this.oldRequest = resultat.request
          if(this.totalPage < this.request.page && this.request.page != 1){
            this.request.page = this.totalPage 
            this.getPrixSpecifiques()
          }

          if(!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page) ){
            this.getPrixSpecifiques()
          }
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
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
   
    if(request1.limit != request2.limit){
      return false
    }

    return true;
  }

  totalPage = 1

  setLimitPage(newLimitPage: number) {
    this.request.limit = newLimitPage
    this.request.page = 1
    this.getPrixSpecifiques()
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getPrixSpecifiques()
  }

  titreFile = "Liste de prix specifiques"
  nameFile = "liste_prix_specifiques"
  
  printout() {
    this.utilite.printout(this.prixSpecifiques, this.items, this.titreFile)
  }

  generatePDF() {
    this.utilite.generatePDF(this.prixSpecifiques, this.items, this.titreFile, this.nameFile)
  }
  
  exportexcel() {
    /* table id is passed over here */
    this.utilite.exportexcel(this.prixSpecifiques, this.items, this.titreFile, this.nameFile)
  }

  //open modal ajout Element
  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  typeElement
  
  closeModalAjoutElement(){
    this.isOpenModalAjoutElement = false
    this.getPrixSpecifiques()
  }
  
  openModalAjout(){
    this.typeElement = this.fonctionPartagesService.titreOfModal.lignePrixSpecifique
    this.isOpenModalAjoutElement = true
  }

  openModalModifier(id){
    this.idAjoutElementModal = id
    this.typeElement = this.fonctionPartagesService.titreOfModal.lignePrixSpecifique
    this.isOpenModalAjoutElement = true
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
    
    this.getPrixSpecifiques()
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
