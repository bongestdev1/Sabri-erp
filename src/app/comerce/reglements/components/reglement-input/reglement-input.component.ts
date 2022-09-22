import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import {formatDate} from '@angular/common';
import { InformationsService } from 'src/app/services/informations.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reglement-input',
  templateUrl: './reglement-input.component.html',
  styleUrls: ['./reglement-input.component.scss']
})
export class ReglementInputComponent implements OnInit {

  @Output() getBonLivraison = new EventEmitter<string>();
  @Output() getAllParametres = new EventEmitter<string>();
  @Output() supprimerLiltrage = new EventEmitter<string>();
 
  @Input() reglement:any
  @Input() erreurReglement:any
  @Input() parametres:any
  @Input() parametres2:any
  @Input() isLoading:any
  @Input() ancienBonLivraisons:any
  @Input() avecLiltrage = false

  isModifierReglement = true

  objectKeys = Object.keys;

  constructor(
    public fonctionPartagesService:FonctionPartagesService,
    public informationGenerale: InformationsService,
    private router: Router) { }

  ngOnInit(): void {
    this.reglement.modeReglement = this.informationGenerale.modeReglCurrent
    this.isModifierReglement = this.router.url.indexOf('liltrage') === -1 
  }

  supprimerLiltrageClick(){
     this.supprimerLiltrage.emit()
  }

  setModeLiltrage(){
    if(this.reglement.activerLiltrage == "non"){
      this.reglement.activerLiltrage = "oui"
      this.getBonLivraison.emit()
    }else{
      this.parametres.bonLivraisons = []
      this.ancienBonLivraisons = []
      this.reglement.activerLiltrage = "non"
    }
  }

   getClientRaisonSociale(id){
      let client = this.parametres.allClients.filter(x => x.id == id)
      if(client.length > 0){
        return client[0].raisonSociale
      }
   }

   getModeReglementLibelle(id){
    let modeReglement = this.parametres.allModeReglements.filter(x => x.id == id)
    if(modeReglement.length > 0){
      return modeReglement[0].libelle
    }
   }

   //autocomplete Client
   keySelectedClient = "raisonSociale"
   objetClient = {
     code:"Code",
     raisonSociale:"Raison Sociale",
     matriculeFiscale:"Matricule Fiscale",
     email:"Email",
     telephone:"Téléphone",
     classement:"Classement",
     plafondCredit:"Plafond Crédit",
     mobiles:"Mobiles",
     siteWeb:"Site Web",
     credit:"Crédit",
     fax:"Fax",
     statusProspection:"Status Prospection",
   }
   
   setClientID(id){
     this.reglement.client = id
     this.parametres.bonLivraisons = []
     this.reglement.reste = this.reglement.montant
     this.getBonLivraison.emit()
   }
   
   getDate(date){
     if(date){
       return formatDate(new Date(date), 'dd/MM/yyyy', 'en')
     }else{
       return ""
     }
   }
 
   setIsPayee(id){
     console.log(id)
     for(let i = 0; i < this.parametres.bonLivraisons.length; i++){
       if(id == this.parametres.bonLivraisons[i].id){
         if("oui" == this.parametres.bonLivraisons[i].isPayee){
           this.parametres.bonLivraisons[i].isPayee = "non"
         }else{
           this.parametres.bonLivraisons[i].isPayee = "oui"
         }
       }
     }
   }
 
   changeMontantAPayer(id){
     for(let i = 0; i < this.parametres.bonLivraisons.length; i++){
       if(id == this.parametres.bonLivraisons[i].id){
         console.log(this.parametres.bonLivraisons[i].montantAPayer)
       }
     }
   }
 
  itemsVariableG = {
    numero:"Numéro",
    date:"Date",
    montantTotal:"Montant total",
    montantPaye:"Montant paye",
    restPayer:"Reste à payer",
    montantAPayer:"Montant affecté",
    isPayee:"Payee"
  }

  itemsVariableGOrderby = {
    numero:0,
    date:0,
    montantTotal:0,
    montantPaye:0,
    restPayer:0,
    montantAPayer:0,
    isPayee:0
  }

  setlitterage(){

    this.reglement.reste = this.reglement.montant
    
    for(let i = 0; i < this.parametres.bonLivraisons.length; i++){
      this.parametres.bonLivraisons[i].montantPaye = this.ancienBonLivraisons[i].montantPaye - this.ancienBonLivraisons[i].montantAPayer
      this.parametres.bonLivraisons[i].restPayer = this.ancienBonLivraisons[i].restPayer + this.ancienBonLivraisons[i].montantAPayer
      this.parametres.bonLivraisons[i].isPayee = this.ancienBonLivraisons[i].isPayee
    }
    
    var somme = 0
    for(let i = 0; i < this.parametres.bonLivraisons.length; i++){
        if(this.parametres.bonLivraisons[i].montantTotal < (this.parametres.bonLivraisons[i].montantAPayer + this.parametres.bonLivraisons[i].montantPaye)){
           this.parametres.bonLivraisons[i].montantAPayer = this.parametres.bonLivraisons[i].montantTotal - this.parametres.bonLivraisons[i].montantPaye
        }

        if(this.parametres.bonLivraisons[i].montantAPayer < 0){
          this.parametres.bonLivraisons[i].montantAPayer = 0
        }

        var reste = this.reglement.montant - somme
        if( reste >= this.parametres.bonLivraisons[i].montantAPayer ){
          somme += this.parametres.bonLivraisons[i].montantAPayer
        }else{
          this.parametres.bonLivraisons[i].montantAPayer = reste
          somme += reste
        }

        this.parametres.bonLivraisons[i].montantPaye = this.parametres.bonLivraisons[i].montantAPayer + this.parametres.bonLivraisons[i].montantPaye
        this.parametres.bonLivraisons[i].restPayer = this.parametres.bonLivraisons[i].montantTotal - this.parametres.bonLivraisons[i].montantPaye
    }
     
    this.reglement.reste = this.reglement.montant - somme
  }
  
  
  //autocomplete ModeReglement
  keySelectedModeReglement = "libelle"
  objetModeReglement = {libelle:""}
  setModeReglementID(id){
    this.reglement.modeReglement = id
  }

  //autocomplete SituationReglement
  keySelectedSituationReglement = "libelle"
  objetSituationReglement = {libelle:"Libelle",
                             encaisse:"EnCaisse"}
  setSituationReglementID(id){
    this.reglement.situationReglement = id
  }
  //open modal ajout Client
  isOpenModalAjout = false
  idAjoutModal = ""
  typeElement
  closeModalAjout(){
    this.isOpenModalAjout = false
    this.getAllParametres.emit()
  }

  openModalAjoutClient(){
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterClient
    this.isOpenModalAjout = true
  }

  openModalAjoutModeReglement(){
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterModeReglement
    this.isOpenModalAjout = true
  }

  openModalAjoutSituationReglement(){
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterSituationReglement
    this.isOpenModalAjout = true
  }
  

  liltrageAutomatique(){

    var pos = 0

    
    this.reglement.reste = this.reglement.montant
    
    console.log("liltrageAutomatique", this.parametres.bonLivraisons)
      
    for(let i = 0; i < this.parametres.bonLivraisons.length; i++){
      for(let j = 0; j < this.ancienBonLivraisons.length; j++){
        if(this.ancienBonLivraisons[j].id == this.parametres.bonLivraisons[i].id){
          this.parametres.bonLivraisons[i].montantPaye = this.ancienBonLivraisons[j].montantPaye - this.ancienBonLivraisons[j].montantAPayer
          this.parametres.bonLivraisons[i].restPayer = this.ancienBonLivraisons[j].restPayer + this.ancienBonLivraisons[j].montantAPayer
          this.parametres.bonLivraisons[i].isPayee = this.ancienBonLivraisons[j].isPayee
        }
      }
    }

  
    while(this.reglement.reste > 0 && pos < this.parametres.bonLivraisons.length){
      
      if(this.parametres.bonLivraisons[pos].restPayer >  this.reglement.reste){
        this.parametres.bonLivraisons[pos].montantAPayer = this.reglement.reste
      }else{
        if(this.parametres.bonLivraisons[pos].restPayer > 0){
          this.parametres.bonLivraisons[pos].montantAPayer = this.parametres.bonLivraisons[pos].restPayer
        }else{
          this.parametres.bonLivraisons[pos].montantAPayer = 0
        }
      }

      this.reglement.reste -= this.parametres.bonLivraisons[pos].montantAPayer

      this.parametres.bonLivraisons[pos].restPayer -= this.parametres.bonLivraisons[pos].montantAPayer
      this.parametres.bonLivraisons[pos].montantPaye += this.parametres.bonLivraisons[pos].montantAPayer
    
      pos++
    }
    
    for(let i = pos; i < this.parametres.bonLivraisons.length; i++){
      this.parametres.bonLivraisons[i].montantAPayer = 0
      this.parametres.bonLivraisons[i].restPayer -= this.parametres.bonLivraisons[i].montantAPayer
      this.parametres.bonLivraisons[i].montantPaye += this.parametres.bonLivraisons[i].montantAPayer
    }

  }

  orderByDocuments(){
    var orderBySelected = ""
    for(let varkey in  this.itemsVariableGOrderby){
      if(this.itemsVariableGOrderby[varkey] != 0){
        orderBySelected = varkey
      }
    } 

    console.log(orderBySelected)
    
    for(let i = 0 ; i < this.parametres.bonLivraisons.length; i++){
      var selected = i
      
     console.log("i",i)
    
      for(let j = i ; j < this.parametres.bonLivraisons.length; j++){
        console.log("j",j)
        if(this.itemsVariableGOrderby[orderBySelected] == 1){
          if(this.parametres.bonLivraisons[selected][orderBySelected] < this.parametres.bonLivraisons[j][orderBySelected]){
            selected = j
          }
        }else{
          if(this.parametres.bonLivraisons[selected][orderBySelected] > this.parametres.bonLivraisons[j][orderBySelected]){
            selected = j
          }
        } 
      }
      var aux = this.parametres.bonLivraisons[i]
      this.parametres.bonLivraisons[i] = this.parametres.bonLivraisons[selected]
      this.parametres.bonLivraisons[selected] = aux

    }

  }

  changeCroissante(key){
    var classStyle = key+"-croissante";
    var buttons = document.getElementsByClassName(classStyle);
    if(this.itemsVariableGOrderby[key] == 1){
      this.itemsVariableGOrderby[key] = -1
      this.activationCroissante(buttons[0], buttons[1])
    }else{
      this.itemsVariableGOrderby[key] = 1
      this.activationCroissante(buttons[1], buttons[0])
    }

    for(let varkey in  this.itemsVariableGOrderby){
      if(key != varkey){
         this.itemsVariableGOrderby[varkey] = 0
      }
    }
    
    this.orderByDocuments()
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

  deplaceLigne(id, pas){
    var bonLivraisons = this.parametres.bonLivraisons
    for(let i = 0; i < bonLivraisons.length; i++){
      if(bonLivraisons[i].id == id){
         var pos = i + pas
         if(pos > -1 && pos < bonLivraisons.length){
            var aux = bonLivraisons[pos]
            bonLivraisons[pos] = bonLivraisons[i]
            bonLivraisons[i] = aux
            this.parametres.bonLivraisons = bonLivraisons
            return 
         }
            
      }
    }
  }
}
