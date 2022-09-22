import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PrixSpecifiqueRequest } from '../Models/prix-specifique-request';
import { ItemArticleSelected } from '../Models/item-article-selected';
import { ShemaArticle } from '../Models/shema-article';
import { ShemaArticle2 } from '../Models/shema-article2';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';

@Component({
  selector: 'app-prix-specifique-articles-list',
  templateUrl: './prix-specifique-articles-list.component.html',
  styleUrls: ['./prix-specifique-articles-list.component.scss']
})
export class PrixSpecifiqueArticlesListComponent implements OnInit {
  formC:FormGroup
  // end autocomplete articles
  
  @Input() articles
  @Input() allArticles = []
  @Input() allTypeTiers = []
  @Input() allClients = []
  @Input() isLoading 
  @Input() errorList = []
  @Input() idArticle = ""
  @Input() allFrais = []
  
  lienGetById = "/articles/getByIdCategorie/"

  @Output() getAllParametres = new EventEmitter<string>();
  @Output() ajouterArticle = new EventEmitter<{idArticle: string, idLigne: string}>();
  @Output() setNewList = new EventEmitter<Object>();
  
  articleSelected = ""
  erreurAjouterArticle = ""

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private http: HttpClient,
    public informationGenerale: InformationsService,
    private tokenStorageService: TokenStorageService,
    private notificationToast: ToastNotificationService,
    public fonctionPartagesService: FonctionPartagesService, private fb:FormBuilder) {
 
      this.formC = this.fb.group({
        article: [''],
        // sousProduit: [''],
        client: [''],
        marge:[''], 
        margePourcentage:[''],
        // quantiteMin:[''],
        // quantiteMax:[''], 
        note:[''],
        prixAchat:[''],
        numero:[''],
        reference:[''],
        designation:[''],
        newPrixVenteHT:[''],
      })
 
  }

  request = new PrixSpecifiqueRequest()

  oldRequest = new PrixSpecifiqueRequest()

  //start prix specifique

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

  getPrixSpecifiques() {

    if (this.isLoading) {
      return
    }

    for(let key in this.request.search){
      this.request.search[key] = this.formC.value[key]
    }
    
    this.request.societe = this.informationGenerale.idSocieteCurrent   

    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.lienList, this.request,this.tokenStorageService.getHeader()).subscribe(

      res => {
        
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {

          console.log(resultat.resultat)
          this.setNewList.emit({items:resultat.resultat})
         // this.prixSpecifiques = resultat.resultat.docs
          this.oldRequest = resultat.request
          if(!this.testSyncronisation(this.request, resultat.request)){
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
   
    return true;
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
    
    //this.getPrixSpecifiques()
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

  //end prix specifique

  ngOnInit(): void {
  }
  

  getStyleErrorLigne(item){
    var nbrError = this.errorList.filter(x => x.id == item.id) 
    if(nbrError.length > 0){
      return "background:rgb(241, 152, 152);"
    }else{
      return "background:white;"
    }
  }


  lienAjoute = "/articles/newArticle"

  objectKeys = Object.keys;
  // begin autocomplete articles
  itemArticleSelected = new ItemArticleSelected()
  
  //pour list article dans autocomplite
  shemaArticle = new ShemaArticle()

  //pour list article dans autocomplite
  shemaArticleVariables = new ShemaArticle()

  getPrixAfterMarge(item){
    //console.log(item)
    var prixAchat = Number(item.prixAchat)
    if(item.margeAppliqueeSur !== "Achat" && item.prixRevient){
      prixAchat = Number(item.prixRevient)
    }
    
    var prixSpecifique = 0
    for(let i = 0; i < this.articles.length; i++){
      if(this.articles[i].numero == item.numero){
        prixSpecifique = prixAchat + this.articles[i].margePourcentage * 0.01 * prixAchat +  Number(this.articles[i].marge)
        this.articles[i].newPrixVenteHT = prixSpecifique
      }
    }
  }

  parametresGlobal = {
    margeGlobal : 0,
    margePourcentageGlobal : 0
  }
  
  changeParametreGlobal(){
    for (let i = 0; i < this.articles.length; i++){
      this.articles[i].marge = this.parametresGlobal.margeGlobal;
      this.articles[i].margePourcentage = this.parametresGlobal.margePourcentageGlobal;

      var prixAchat = Number(this.articles[i].prixAchat)
      if(this.articles[i].margeAppliqueeSur !== "Achat" && this.articles[i].prixRevient){
        prixAchat = Number(this.articles[i].prixRevient)
      }

      var prixSpecifique = prixAchat + ( this.articles[i].margePourcentage * 0.01 * prixAchat) +  this.articles[i].marge
      this.articles[i].newPrixVenteHT = prixSpecifique
    }
  }
  
  // end autocomplete articles

  //begin delete item
  numeroItemDelete = 0

  tabNumbers = [ "marge", "margePourcentage"]
  allTabNumbers = ['qteInv1', 'qteInv2', 'qteInv3', 'qteInvValide']
  tabCoches = ['qteInv1', 'qteInv2', 'qteInv3']
  tabQTV = ['qteInvValide']
  
  idsFrais = []

  ngOnChanges(changes: SimpleChanges) {
    var newKeys:any = {}
    this.idsFrais = []
    console.log(this.allFrais)

    for(let key in this.shemaArticle){
      newKeys[key] = this.shemaArticle[key]
      if(key === "prixAchat" && this.allFrais && this.allFrais.length > 0){
          for(let frais of this.allFrais){
            this.idsFrais.push(frais.id)
            newKeys[frais.id] = frais.type
          }
       }  
    }

    this.shemaArticle = JSON.parse(JSON.stringify(newKeys))
    this.shemaArticleVariables = JSON.parse(JSON.stringify(newKeys))

  }

  // start modal sous produit
  titreCrud = "Ajouter"
  modalReference: NgbModalRef;
  closeResult = '';
  titre = "sousProduit";

  sousProduit = {
    sousProduit: "",
    reference: "",
  }

  erreurSousProduit = {
    reference:"",
  }

  open(content, item) {
    
    this.titreCrud = "Ajouter"
    this.sousProduit = {
      sousProduit: "",
      reference: "",
    }

    this.erreurSousProduit = {
      reference:"",
    }

    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  openAjouter(content, idLigne) {
    this.itemArticleSelected.article = ""
    this.posLigneAjouter = idLigne
    
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  JoinAndClose() {
    this.modalReference.close();
  }

  tabEmpty = []
  inisialiserEmptyTab(){
    this.tabEmpty = this.fonctionPartagesService.inisialiserEmptyTab(this.articles)
    return true
  }

  getStyle(item){
    if(item.numero != 0){
      return "background-color:white;"
    }else{
      return "background-color: rgba(64, 26, 231, 0.30);"
    }
  }

  getStyleDropDown(item){
      if(item.numero == 0 && item.isShow == 0){
        return "display:none;"
      }else{
        return "display:block;"
      }
  }

  deleteLigne(numero){
    var newlist = this.articles
    for(let i = 0; i < newlist.length; i++){
        if(newlist[i].numero == numero){
            newlist.splice(i,1)
            this.setNewList.emit({items:newlist})
        }
    }
  }

  
  //start Categorie
  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  typeElement
  keySelectedTypeTier = "libelle"
  objetTypeTier = {libelle:""}

  closeModalAjoutElement() {
    this.isOpenModalAjoutElement = false
    this.getAllParametres.emit()
  }

  openModalAjoutTypeTier() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterTypeTier
    this.isOpenModalAjoutElement = true
  }

  setTypeTierID(objet){
    for(let i = 0; i < this.articles.length; i++){
      if(this.articles[i].id == objet.item.id){
        this.articles[i].typeTier = objet.id
      }
    }
  }
  //end Categorie

   //start Client
   typeClient
   keySelectedClient = "raisonSociale"
   objetClient = {
    raisonSociale:"Raison sociale",
    code:"Code",
    matriculeFiscale: "matricule Fiscale",
    email:"Email",
   }
 
   openModalAjoutClient() {
     this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterClient
     this.isOpenModalAjoutElement = true
   }
   
  setClientID(objet){
    for(let i = 0; i < this.articles.length; i++){
      if(this.articles[i].id == objet.item.id){
        this.articles[i].client = objet.id
      }
    }
  }
   //end Client
  
   //start article
   shemaMultiSortie = {
    reference: "Réference",
    designation: "Désignation",
    prixVenteHT: "Prix HT",
    prixTTC: "Prix TTC"
  }

  shemaArticle2 = new ShemaArticle2()

  keySelectedArticle = "reference"

  shemaArticle2Number = {
    marge: '',
    tauxTVA: '',
    prixTTC: '',
    pVenteConseille: '',
    plafondmarge: ''
  }

  shemaArticle2Quantite = {
    qteEnStock: '',
    qteTheorique: ''
  }

  erreurArticle={
    reference : ""
  }

  setArticleID(id){

  }

  //ajouterArticle()
  posLigneAjouter = ""

  ajouterArticle2(){
    if(this.itemArticleSelected.article == ""){
      return
    }
    this.ajouterArticle.emit({idArticle:this.itemArticleSelected.article, idLigne:this.posLigneAjouter})    
    this.JoinAndClose()
  }

  setArticle2ID(id){
    this.itemArticleSelected.article = id
  }
  //end article


  checkedFrais(numero, idFrais){
    if(this.articles.filter(x => x.numero === numero).length > 0){
      return this.articles.filter(x => x.numero === numero)[0].frais.filter(x => x.idFrais === idFrais).length > 0 
    }

    return false
  }

  clickedFrais(numero, idFrais){
    console.log(idFrais)
    if(this.checkedFrais(numero, idFrais)){
      this.articles[numero - 1].frais = this.articles[numero - 1].frais.filter(x => x.idFrais !== idFrais)
    }else{
      this.articles[numero - 1].frais.push({idFrais:idFrais})
    }

    // console.log(this.articles[numero - 1].frais)

    var prixRevient = this.articles[numero - 1].prixAchat
    for(var i = 0; i < this.articles[numero - 1].frais.length; i++ ){
      if(this.allArticles.filter(x => x.id === this.articles[numero - 1].article).length > 0 && 
        this.allArticles.filter(x => x.id === this.articles[numero - 1].article)[0].frais.filter(x => x.frais === this.articles[numero - 1].frais[i].idFrais).length > 0){
        var montant = this.allArticles.filter(x => x.id === this.articles[numero - 1].article)[0].frais.filter(x => x.frais === this.articles[numero - 1].frais[i].idFrais)[0].montant
        console.log("montant", montant)
        prixRevient += montant
      }
    }

    this.articles[numero - 1].prixRevient = prixRevient
  }
  
  calculeReciproquePrixSpecifique(numero){
    var prixAchat = this.articles[numero - 1].prixAchat
    var prixSpecifique = this.articles[numero - 1].newPrixVenteHT

    if(this.articles[numero - 1].margeAppliqueeSur !== 'Achat'){
       prixAchat = this.articles[numero - 1].prixRevient
    }
    
    var difference = prixSpecifique - prixAchat
    
    if(difference <= 0){
      this.articles[numero - 1].marge = difference
      this.articles[numero - 1].margePourcentage = 0
    }else{
      var montantMargePourcentage = this.articles[numero - 1].margePourcentage * prixAchat / 100
      if(montantMargePourcentage < difference ){
        this.articles[numero - 1].marge = difference - montantMargePourcentage             
      }else{
        this.articles[numero - 1].marge = difference
        this.articles[numero - 1].margePourcentage = 0
      }
    }

  }

}
 