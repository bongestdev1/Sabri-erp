import { ShemaArticle2 } from './../Models/shema-article2';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';

@Component({
  selector: 'app-prix-specifique-articl-input',
  templateUrl: './prix-specifique-articl-input.component.html',
  styleUrls: ['./prix-specifique-articl-input.component.scss']
})
export class PrixSpecifiqueArticlInputComponent implements OnInit {
  public isCollapsed: boolean;
  public multiCollapsed1: boolean;
  public multiCollapsed2: boolean;

  @Input() idArticle = ""

  lienAjoute = "/prixSpecifiques/newPrixSpecifique"

  //apiList = "/inventaires/listInventaires"
  lienGetByIdNouvelle = "/articles/getByIdCategorie/"
  lienGetByIdEncienne = "/prixSpecifiques/listPrixSpecifiqueByCategorie"

  allArticles = []
  articles = []
  allCategories = []
  allClients = []
  allTypeTiers = []
  allFrais = []

  objectKeys = Object.keys;

  parametresGlobal = {
    categorie:"",
    article:"",
    client:"",
    typeTier:"",
    marge:0,
    margePourcentage:0,
    quantiteMin: 0,
    quantiteMax: 0,
  }

  constructor(private notificationToast: ToastNotificationService,
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    public informationGenerale: InformationsService, public fonctionPartagesService: FonctionPartagesService, private router: Router) {
    this.getAllParametres()
  }

  getAllParametres() {
    this.isLoading = true
    this.http.post(this.informationGenerale.baseUrl + "/prixSpecifiques/getAllParametres", {societe: this.informationGenerale.idSocieteCurrent},this.tokenStorageService.getHeader()).subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.allArticles = resultat.articles
          this.allCategories = resultat.categories
          this.allClients = resultat.clients
          this.allTypeTiers = resultat.typeTiers
          this.allFrais = resultat.frais
         
          if(this.idArticle.length > 1){
            this.parametresGlobal.article = this.idArticle
            this.afficherEnciennes()
          }
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  ajouterNouvelles(){
    if (this.parametresGlobal.categorie != "") {
      this.getArticleByCategories(this.parametresGlobal.categorie)
    }
  }

  afficherEnciennes(){
    if(this.isLoading == true){
      return
    }
    this.isLoading = true
    var request = { societe: this.informationGenerale.idSocieteCurrent, categorie:this.parametresGlobal.categorie, article:this.parametresGlobal.article, typeTier:this.parametresGlobal.typeTier, client:this.parametresGlobal.client }
    this.http.post(this.informationGenerale.baseUrl + this.lienGetByIdEncienne, request,this.tokenStorageService.getHeader()).subscribe(
      res => {

        console.log(res)

        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.articles = resultat.prix
          this.errorList = []
          this.numerotationLigne()
        }
      }, err => {
        this.isLoading = false
        console.log(err)
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  setNewList(objet){
    this.articles = objet.items
    this.numerotationLigne()
  }

  checkNaN(item, key){
    if(item[key]){
         return item[key]
    }else{
      if(this.fonctionPartagesService.colonnesPrix.includes(key) || this.fonctionPartagesService.colonnesQuantites.includes(key) )
        return 0
      else
        return ""
    }
  }

  isChangeFrais = false

  initialiserInventaireArticle(articles) {
    this.articles = []
    var j = 0

    for (let item of articles) {
      j++
      var objet = {
        id:this.fonctionPartagesService.getIdOfArrayElement(this.articles, 'id'), 
        frais: item.frais,
        article: item.id,
        numero: j,
        sousProduit: "",
        marge: this.checkNaN(item, "marge") ,
        margePourcentage: this.checkNaN(item, "margePourcentage") ,
        quantiteMin: this.checkNaN(item, "quantiteMin"),
        quantiteMax: this.checkNaN(item, "quantiteMax"),
        client: this.parametresGlobal.client,
        sousProduits:[],
        note: this.checkNaN(item, "note")
      }
      this.articles.push(objet)
    }

    console.log(this.articles)

    this.numerotationLigne()
  }

  getSousProduits(idArticle){
     var articles = this.allArticles.filter(x => x.id == idArticle)
     if(articles.length > 0){
       return articles[0].sousProduits
     }
  }

  getPrixAchat(idArticle){
    var articles = this.allArticles.filter(x => x.id == idArticle)
    if(articles.length > 0){
      return articles[0].prixAchat
    }
 }

  ajouterArticle(objetP){
    var newArticles = []
    var j = 1;

    if(objetP.idLigne == ""){
      var objet = {
        id:this.fonctionPartagesService.getIdOfArrayElement(this.articles, 'id'), 
        article: objetP.idArticle,
        numero: j,
        sousProduit: "",
        marge: this.parametresGlobal.marge,
        margePourcentage: this.parametresGlobal.margePourcentage,
        quantiteMin: this.parametresGlobal.quantiteMin,
        quantiteMax: this.parametresGlobal.quantiteMax,
        client: this.parametresGlobal.client,
        sousProduits:[],
        note: ""
      }
      j++
      newArticles.push(objet)
      for(let i = 0; i < this.articles.length; i++){
        this.articles[i].numero = j
        j++
        newArticles.push(this.articles[i])
      }
      this.articles = newArticles
      this.numerotationLigne()
      return 
    }

    for(let i = 0; i < this.articles.length; i++){
      this.articles[i].numero = j
      j++
      newArticles.push(this.articles[i])
      if(this.articles[i].id == objetP.idLigne){
        var objet = {
          id:this.fonctionPartagesService.getIdOfArrayElement(this.articles, 'id'), 
          article: objetP.idArticle,
          numero: j,
          sousProduit: "",
          marge: this.parametresGlobal.marge,
          margePourcentage: this.parametresGlobal.margePourcentage,
          quantiteMin: this.parametresGlobal.quantiteMin,
          quantiteMax: this.parametresGlobal.quantiteMax,
          client: this.parametresGlobal.client,
          sousProduits:[],
          note: ""
        }
        j++
        newArticles.push(objet)
      }
    }

    this.articles = newArticles
    this.numerotationLigne()
  }

  numerotationLigne(){
    for(let i = 0; i < this.articles.length; i++){
      this.articles[i].numero = i+1
      //this.articles[i].sousProduits = this.getSousProduits(this.articles[i].article)
      var prixAchat = Number(this.articles[i].prixAchat)
      if(this.articles[i].margeAppliqueeSur !== "Achat" && this.articles[i].prixRevient){
        prixAchat = Number(this.articles[i].prixRevient)
      }

      var prixSpecifique = prixAchat + ( this.articles[i].margePourcentage * 0.01 * prixAchat) +  this.articles[i].marge
   
      this.articles[i].newPrixVenteHT = prixSpecifique
    }
    console.log(this.articles)
  }

  getReference(sousProduits, sousProduit) {
    if (sousProduit == "") {
      return ""
    }

    for (let i = 0; i < sousProduits.length; i++) {
      if (sousProduits[i].id == sousProduit) {
        return sousProduits[i].reference
      }
    }
  }

  ngOnInit(): void {
    this.isCollapsed = true;
    this.multiCollapsed1 = true;
    this.multiCollapsed2 = true;
  }

  controleInputs() {
    var isValid = true

    return isValid
  }

  isLoading = false

  errorList = []

  ajoutInventaire() {
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }

    var request:any = {}
    request.ligneInventaire = this.articles
    request.societe = this.informationGenerale.idSocieteCurrent

    if (this.isLoading) {
      return
    }

    this.isLoading = true
    this.http.post(this.informationGenerale.baseUrl + this.lienAjoute, request,this.tokenStorageService.getHeader()).subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          //this.reseteFormulaire()
          this.notificationToast.showSuccess("Votre inventaire est bien enregistrée !")
          //this.articles = resultat.resultat
          this.errorList = []
          this.numerotationLigne() 
        }else{
          this.notificationToast.showError("On ne peut pas enregistrer les lignes rouge car ilya deja un prix pour leurs intervalles !")
          this.articles = resultat.resultat
          for(let i = 0; i < resultat.errorList.length; i++){
            this.articles.push(resultat.errorList[i])
          }
          this.errorList = resultat.errorList
          this.numerotationLigne() 
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  //start get list


  //end get list

 
  // start categorie
  objetCategorie = {
    libelle: "active",
  }
  keySelectedCategorie = "libelle"

  setCategorieID(id) {
    this.parametresGlobal.categorie = id
  }
  // end categorie
  
  getArticleByCategories(id) {
    this.isLoading = true
    var request = { societe: this.informationGenerale.idSocieteCurrent }
    this.http.post(this.informationGenerale.baseUrl + this.lienGetByIdNouvelle + id, request,this.tokenStorageService.getHeader()).subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.initialiserInventaireArticle(resultat.resultat);
        }
      }, err => {
        this.isLoading = false
        console.log(err)
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  //start Categorie
  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  typeElement

  closeModalAjoutElement() {
    this.isOpenModalAjoutElement = false
    this.getAllParametres()
  }

  openModalAjoutCategorie() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterCategorie
    this.isOpenModalAjoutElement = true
  }

  openModalAjoutPersonnel() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterPersonnel
    this.isOpenModalAjoutElement = true
  }
  //end Categorie

  
  //start TypeTier
  keySelectedTypeTier = "libelle"
  objetTypeTier = {libelle:""}
  
  openModalAjoutTypeTier() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterTypeTier
    this.isOpenModalAjoutElement = true
  }

  setTypeTierID(id){
    this.parametresGlobal.typeTier = id
    this.parametresGlobal.client = ""
    for (let i = 0; i < this.articles.length; i++){
      this.articles[i].typeTier = id;
    }
  }
  //end TypeTier

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
   
  setClientID(id){
    this.parametresGlobal.client = id
    this.parametresGlobal.typeTier = ""
    for (let i = 0; i < this.articles.length; i++){
      this.articles[i].client = id;
    }
  }
   //end Client

   //ajouterArticle()

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

  setArticle2ID(id){
    this.parametresGlobal.article = id
  }
  //end article

  //start change marge (%)
  
  //end change marge (%)

 
}