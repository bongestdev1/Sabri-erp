import { Component, OnInit, Input, SimpleChanges , Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import {formatDate} from '@angular/common';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';

@Component({
  selector: 'app-expeditions',
  templateUrl: './expeditions.component.html',
  styleUrls: ['./expeditions.component.scss']
})
export class ExpeditionsComponent implements OnInit {

  
  articleFormGroup: FormGroup;

  lienAjoute = "/articles/newArticle"

  apiAjouteExpedition = "/bonLivraisons/addExpedition/"

  objectKeys = Object.keys;

  erreurExpedition = {
    transporteur:"",
  }

  expeditions = [
    {
      numero:0,
      transporteur:"",
      date:"",
      articles:[
        {
          numero:0,
          article:"",
          reference:"",
          designation:"",
          unite:"",
          quantiteVente:0,
          quantiteLivree:0,
          quantiteALivree:0,
          quantiteRestant:0,
        }
      ]
    }
  ]

  @Input() bonLivraison
  @Input() isDetails = "non"
  @Output() ajouterExpeditionEvent = new EventEmitter<string>();
  
  newExpedition = {
    transporteur:"",
    date:new Date(),
    articles:[
      {
        numero:0,
        article:"",
        reference:"",
        designation:"",
        unite:"",
        quantiteVente:0,
        quantiteLivree:0,
        quantiteALivree:0,
        quantiteRestant:0,
      }
    ]
  }

  shemaArticle = {
    numero: "Numéro",
    reference: "Réference",
    designation: "Désignation",
    quantiteVente: "Quantite",
    unite: "Unite",
    quantiteLivree: "Quantite Livrée",
    quantiteALivree: "Quantite à Livrée",
    quantiteRestant: "Quantite Restant"
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
    private fonctionPartagesService: FonctionPartagesService) 
 {}

  ngOnInit(): void {
  }

  controleInputs() {
    for(let key in this.erreurExpedition){
      this.erreurExpedition[key] = ""
    }
   
    
    var isValid = true

    return isValid
  }

  addNewExpedition(){
    if (this.isLoading) {
      return
    }

    var newExpedition = this.getExpedition()
    if(newExpedition.articles.length == 0){
      return
    }

    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.apiAjouteExpedition+this.bonLivraison.id, newExpedition,this.tokenStorageService.getHeader()).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
             this.notificationToast.showSuccess("Votre expedition est bien enregistrée !")
             this.bonLivraison.expeditions = resultat.resultat
             this.expeditions = resultat.resultat
             this.resetNewExpedition()
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }

  reseteFormulaire(){
   /* for(let key in this.itemArticleSelected){
      this.itemArticleSelected[key] = ""
    }*/  
  }

  //begin delete item
 
  tabNumbers= [ 'quantiteALivree']
  allTabNumbers = [ 'quantiteVente', 'quantiteLivree', 'quantiteRestant', 'quantiteALivree']
  tabNumbersLabel = ['quantiteVente', 'quantiteLivree', 'quantiteRestant']

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

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.bonLivraison)
    if(this.bonLivraison.articles){
      this.expeditions = this.bonLivraison.expeditions
      
      this.resetNewExpedition()    
    }

  }

  resetNewExpedition(){
    var articles = []
    for(let i = 0; i < this.bonLivraison.articles.length; i++){
      
      var somme = 0
      for(let j = 0; j < this.expeditions.length; j++){
        for(let k = 0; k < this.expeditions[j].articles.length; k++){
             if(this.expeditions[j].articles[k].article == this.bonLivraison.articles[i].article){
                somme += this.expeditions[j].articles[k].quantiteALivree
             }
        }
      }

      var lignebl = {
        numero:i+1,
        article:this.bonLivraison.articles[i].article,
        reference:this.bonLivraison.articles[i].reference,
        designation:this.bonLivraison.articles[i].designation,
        unite:this.bonLivraison.articles[i].unite,
        quantiteVente:this.bonLivraison.articles[i].quantiteVente,
        quantiteLivree:somme,
        quantiteALivree:this.bonLivraison.articles[i].quantiteVente - somme,
        quantiteRestant:0,
      }
      if(lignebl.quantiteALivree != 0 || lignebl.quantiteRestant != 0){
        articles.push(lignebl) 
      }

      this.newExpedition.articles = articles
    }

  }

  changeQuantiteRestant(){
    for(let i = 0; i < this.newExpedition.articles.length; i++){
      
      if(this.newExpedition.articles[i].quantiteALivree < 0){
        this.newExpedition.articles[i].quantiteALivree = 0
      }else if( this.newExpedition.articles[i].quantiteALivree > (this.newExpedition.articles[i].quantiteVente - this.newExpedition.articles[i].quantiteLivree)){
        this.newExpedition.articles[i].quantiteALivree = (this.newExpedition.articles[i].quantiteVente - this.newExpedition.articles[i].quantiteLivree)
      }

      this.newExpedition.articles[i].quantiteRestant = (this.newExpedition.articles[i].quantiteVente - this.newExpedition.articles[i].quantiteLivree) - this.newExpedition.articles[i].quantiteALivree
    }
  }

  getExpedition(){
  
    let articles = []
    for(let i = 0; i < this.newExpedition.articles.length; i++){
        if(this.newExpedition.articles[i].quantiteALivree != 0){
          articles.push(this.newExpedition.articles[i])
        }
    }

    if(articles.length == 0){
      this.notificationToast.showError("Aucun article sera expédié")
      return {articles:[]}
    }

    var newExpedition = {
      transporteur:this.newExpedition.transporteur,
      date:new Date(),
      articles:[
        {
          numero:0,
          article:"",
          reference:"",
          designation:"",
          unite:"",
          quantiteVente:0,
          quantiteLivree:0,
          quantiteALivree:0,
          quantiteRestant:0,
        }
      ]
    }
    newExpedition.date = new Date()
    newExpedition.articles = articles

    return newExpedition
   
   /* this.bonLivraison.expeditions.push(newExpedition)

    for(let i = 0; i < this.bonLivraison.articles.length; i++){
      var somme = 0
      for(let j = 0; j < this.bonLivraison.expeditions.length; j++){
        for(let k = 0; k < this.bonLivraison.expeditions[j].articles.length; k++){
             if(this.bonLivraison.expeditions[j].articles[k].article == this.bonLivraison.articles[i].article){
                somme += this.bonLivraison.expeditions[j].articles[k].quantiteALivree
             }
        }
      }
      this.bonLivraison.articles[i].quantiteLivree = somme
    }
    
    this.ajouterExpeditionEvent.emit()*/
  }

  shemaExpedition = {
    numero: "Numéro Expedition",
    transporteur: "transporteur",
    date: "date",
    heure: "heure",
    nbrArticles: "Nombre Articles expediees",
  }

  shemaExpeditionLigne = {
    numero: "Numéro Article",
    reference: "Réference",
    designation: "Désignation",
    quantiteVente: "Quantite",
    unite: "Unite",
    quantiteLivree: "Quantite Livrée",
    quantiteALivree: "Quantite à Livrée",
    quantiteRestant: "Quantite Restant"
  }

  /*
  shemaExpedition = {
    numero1: "Numéro Expedition",
    transporteur: "transporteur",
    date: "date",
    heure: "heure",
    numero2: "Numéro Article",
    reference: "Réference",
    designation: "Désignation",
    quantiteVente: "Quantite",
    unite: "Unite",
    quantiteLivree: "Quantite Livrée",
    quantiteALivree: "Quantite à Livrée",
    quantiteRestant: "Quantite Restant"
  }

  arrayListExpeditionAffichee = []
  initialiserListExpeditions(){
    this.arrayListExpeditionAffichee = []
    for(let i = this.expeditions.length - 1 ; i > -1; i--){
      for(let j = 0 ; j < this.expeditions[i].articles.length; j++){
        var item  = { 
          numero1: i + 1,
          transporteur: this.expeditions[i].transporteur,
          date: formatDate(new Date(this.expeditions[i].date), 'yyyy-MM-dd', 'en'),
          heure: formatDate(new Date(this.expeditions[i].date), 'HH:mm', 'en'),
          numero2: this.expeditions[i].articles[j].numero,
          reference: this.expeditions[i].articles[j].reference,
          designation: this.expeditions[i].articles[j].designation,
          quantiteVente: this.expeditions[i].articles[j].quantiteVente,
          unite: this.expeditions[i].articles[j].unite,
          quantiteLivree: this.expeditions[i].articles[j].quantiteLivree,
          quantiteALivree: this.expeditions[i].articles[j].quantiteALivree,
          quantiteRestant: this.expeditions[i].articles[j].quantiteRestant
        }  
        
        if(j != 0){
          item.transporteur = ""
          item.date = ""
          item.heure = "" 
        }

        this.arrayListExpeditionAffichee.push(item)
      }
      
    }
  }
  */

  getNumeroExpedition(date){
    for(let i = 0; i < this.expeditions.length; i++){
      if(this.expeditions[i].date == date){
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
    if(list.getAttribute("class").indexOf("desactive-list-article") == -1){
      list.classList.add("desactive-list-article")
    }else{
      list.classList.remove("desactive-list-article")
    }
  }

  showAddExpedation = false

}
