import { Component, OnInit, Input, SimpleChanges , Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import {formatDate} from '@angular/common';
import { ObjetsAutocompleteService } from 'src/app/services/objets-autocomplete.service';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';

@Component({
  selector: 'app-receptions',
  templateUrl: './receptions.component.html',
  styleUrls: ['./receptions.component.scss']
})
export class ReceptionsComponent implements OnInit {
 
  articleFormGroup: FormGroup;

  lienAjoute = "/articles/newArticle"

  @Input() apiAjouteReception = "/receptions/addReception"
  @Input() allTransporteurs = []
  @Input() titreDocument = ""
  @Input() bonLivraison
  @Input() receptions
  @Input() allArticles = []
  
  objetSousProduits = {}
  
  objectKeys = Object.keys;

  erreurReception = {
    idConnecte:""
  }

  newReception = {
    transporteur:"",
    idConnecte:"61cc5766dac87021a8bb8a28",
    date:new Date(),
    articles:[]
  }

  shemaArticle = {
    numero: "Numéro",
    reference: "Réference",
    designation: "Désignation",
    sousProduit: "Sous_Produit",
    lot: "Lot / Numéro Série",
    quantiteAchat: "Quantite",
    unite: "Unite",
    quantiteRecevoit: "Quantite Recevoit",
    quantiteARecevoit: "Quantite à Recevoit",
    quantiteRestant: "Quantite Restant"
  }

  shemaArticle2 = {
    numero: "Numéro",
    reference: "Réference",
    designation: "Désignation",
    sousProduit: "Sous_Produit",
    lot: "Lot / Numéro Série",
    unite: "Unite",
    quantiteARecevoit: "Quantite à Recevoit",
  }
  
  isLoading = false

  getNumber(float){
    return this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(float)
  }
  // end autocomplete articles

  constructor(private notificationToast:ToastNotificationService, 
    private http: HttpClient, 
    private tokenStorageService:TokenStorageService,
    public informationGenerale: InformationsService,
    public fonctionPartagesService: FonctionPartagesService,
    public objetsAutocomplete:ObjetsAutocompleteService) 
  {}


  ngOnInit(): void {
  }

  controleInputs() {
    for(let key in this.erreurReception){
      this.erreurReception[key] = ""
    }

    var isValid = true
    if(this.newReception.idConnecte == ""){
      this.erreurReception.idConnecte = "Veuillez remplir ce champ"
      isValid = false
    }
   
    return isValid
  }

  addNewReception(){
    if (this.isLoading) {
      return
    }

    var newReception = this.getReception()
 
    if(!this.controleInputs() || newReception.articles.length == 0){
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }

    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.apiAjouteReception, newReception,this.tokenStorageService.getHeader()).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          console.log(resultat)
             this.notificationToast.showSuccess("Votre reception est bien enregistrée !")
             this.receptions.push(resultat.resultat)
             this.resetNewReception()
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }

  reseteFormulaire(){
    /*for(let key in this.itemArticleSelected){
      this.itemArticleSelected[key] = ""
    }*/  
  }

  //begin delete item
 
  tabNumbers= ['quantiteARecevoit']
  allTabNumbers = [ 'quantiteAchat', 'quantiteRecevoit', 'quantiteRestant', 'quantiteARecevoit']
  tabNumbersLabel = ['quantiteAchat', 'quantiteRecevoit', 'quantiteRestant']

  fixedVerguleNumbers(){
  }

  showInput2(event){
    this.fonctionPartagesService.showInput2(event)
    setTimeout( () => { 
      this.fixedVerguleNumbers()
    },100)
  }

  showInput(event){
    this.fonctionPartagesService.showInput(event)
    setTimeout( () => { 
      this.fixedVerguleNumbers()
    },100)
  }

  resetDesactiveInput(id){
    this.fonctionPartagesService.resetDesactiveInput(id)
  }

  ngOnChanges(changes: SimpleChanges){
    if(this.bonLivraison.articles){
      this.resetNewReception()
    }

    this.objetSousProduits = {}
    if(this.allArticles){
      for(let i = 0; i < this.allArticles.length; i++){
        if(this.allArticles[i].sousProduits){
          this.objetSousProduits[this.allArticles[i].id] = this.allArticles[i].sousProduits      
        }else{
          this.objetSousProduits[this.allArticles[i].id] = []      
        } 
      }
    }
  }

  resetNewReception(){

    var newArticles = []
    for(let i = 0; i < this.bonLivraison.articles.length; i++){
      var isExiste = false
      for(let j = 0; j < newArticles.length; j++){
        if(this.bonLivraison.articles[i].article == newArticles[j].article){
           isExiste = true
           newArticles[j].quantiteAchat += this.bonLivraison.articles[i].quantiteAchat
        }    
      }    
      if(!isExiste){
        newArticles.push(this.bonLivraison.articles[i])    
      } 
    }

    var articles = []
    for(let i = 0; i < newArticles.length; i++){
      
      var somme = 0
      for(let j = 0; j < this.receptions.length; j++){
        for(let k = 0; k < this.receptions[j].articles.length; k++){
            if(this.receptions[j].articles[k].article == newArticles[i].article){
               somme += this.receptions[j].articles[k].quantiteARecevoit
            }
        }
      }

      var lignebl = {
        numero:i+1,
        article:newArticles[i].article,
        reference:newArticles[i].reference,
        designation:newArticles[i].designation,
        unite:newArticles[i].unite,
        quantiteAchat:newArticles[i].quantiteAchat,
        quantiteRecevoit:somme,
        quantiteARecevoit:newArticles  [i].quantiteAchat - somme,
        quantiteRestant:0,
      }
      if(lignebl.quantiteARecevoit > 0 && lignebl.quantiteRestant == 0){
        articles.push(lignebl) 
      }

      this.newReception.articles = articles
    }

  }

  changeQuantiteRestant(){
    for(let i = 0; i < this.newReception.articles.length; i++){
      
      if(this.newReception.articles[i].quantiteARecevoit < 0){
        this.newReception.articles[i].quantiteARecevoit = 0
      }else if( this.newReception.articles[i].quantiteARecevoit > (this.newReception.articles[i].quantiteAchat - this.newReception.articles[i].quantiteRecevoit)){
        this.newReception.articles[i].quantiteARecevoit = (this.newReception.articles[i].quantiteAchat - this.newReception.articles[i].quantiteRecevoit)
      }

      this.newReception.articles[i].quantiteRestant = (this.newReception.articles[i].quantiteAchat - this.newReception.articles[i].quantiteRecevoit) - this.newReception.articles[i].quantiteARecevoit
    }
  }

  getReception(){
  
    let articles = []
    for(let i = 0; i < this.newReception.articles.length; i++){
        if(this.newReception.articles[i].quantiteARecevoit != 0){
          articles.push(this.newReception.articles[i])
        }
    }

    if(articles.length == 0){
      this.notificationToast.showError("Aucun article sera expédié")
      return {articles:[]}
    }

    var newReception = {
      transporteur:this.newReception.transporteur,
      date:new Date(),
      document:this.bonLivraison.id,
      typeDocument:this.titreDocument,
      societe:this.informationGenerale.idSocieteCurrent,
      exercice:this.informationGenerale.exerciceCurrent,
      articles:articles,
    }

    return newReception
   
  }

  shemaReception = {
    numero: "Numéro Reception",
    transporteur: "transporteur",
    date: "date",
    heure: "heure",
    nbrArticles: "Nombre Articles",
  }

  getNumeroReception(date){
    for(let i = 0; i < this.receptions.length; i++){
      if(this.receptions[i].date == date){
        return i+1
      }
    }
  }

  getDate(date){
    return formatDate(new Date(date), 'yyyy-MM-dd', 'en')
  }

  getTime(date){
    return formatDate(new Date(date), 'HH:mm', 'en')
  }

  showList(event){
    var list = document.getElementById(event.target.name)
    console.log("list",list)
    if(list.getAttribute("class").indexOf("desactive-list-article") == -1){
      list.classList.add("desactive-list-article")
    }else{
      list.classList.remove("desactive-list-article")
    }
  }

  showAddExpedation = false

  emptyTable = []
  initialisationEmptyTable(){
    this.emptyTable = []
    if(this.receptions.length < 6){
      for(let i = this.receptions.length; i < 6; i++){
        this.emptyTable.push({})
      }
      return true
    }
    return false
  }

  setTransporteurID(id){
    this.newReception.transporteur = id
  }

  //open modal ajout Element
  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  typeElement
  openModalAjoutTransporteur(){
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterTransporteur
    this.isOpenModalAjoutElement = true
  }
  closeModalAjoutElement() {
    this.isOpenModalAjoutElement = false
  }

  
}
