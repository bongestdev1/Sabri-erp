import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Alert } from 'selenium-webdriver';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';

@Component({
  selector: 'app-prix-with-quantites',
  templateUrl: './prix-with-quantites.component.html',
  styleUrls: ['./prix-with-quantites.component.scss']
})
export class PrixWithQuantitesComponent implements OnInit {

  modalReference: NgbModalRef;
  isLoading = false
  page = 1
  @Input() prixWithQuantites
  @Input() allTypeTiers = []
  @Input() isDetails = "0"
  @Input() article
 
  objectKeys = Object.keys;
  contactFormGroup: FormGroup;
  items = { 
    sousProduit:"Sous_Produit",
    prixVenteHT:"Prix_venteHT",
    quantiteMin:"Quantite_Min",
    quantiteMax:"Quantite_Max",
    typeTier:"Type_Tier",
  };

  itemsVariable = { 
    sousProduit:"Sous_Produit",
    prixVenteHT:"Prix_venteHT",
    quantiteMin:"Quantite_Min",
    quantiteMax:"Quantite_Max",
    typeTier:"Type_Tier",
  };
  
  id = ""
  prixWithQuantite = {
    id: "",
    prixVenteHT:0,
    quantiteMin:0,
    quantiteMax:0,
    typeTier:"",
    sousProduit:""
  }

  erreurPrixWithQuantite = {
    prixVenteHT:"",
    quantiteMin:"",
    quantiteMax:"",
  }

  public visible = false;
  closeResult = '';

  constructor(
    private modalService: NgbModal,
    private http: HttpClient, 
    public informationGenerale: InformationsService,
    public fonctionPartagesService:FonctionPartagesService) {

  }

  options2: NgbModalOptions = {
    container: '.session-modal-container'
  };

  open(content) {
    this.prixWithQuantite = {
      sousProduit:"",
      id: "",
      prixVenteHT:0,
      quantiteMin:0,
      quantiteMax:0,
      typeTier:""
    }

    this.erreurPrixWithQuantite = {
      prixVenteHT:"",
      quantiteMin:"",
      quantiteMax:"",
    }

    this.modalReference = this.modalService.open(content, this.options2);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  openModifier(content,prixWithQuantite) {
  
    for(let i = 0; i < this.prixWithQuantites.length; i++){
      if(this.prixWithQuantites[i].id == prixWithQuantite.id){
        for(let key in this.prixWithQuantite){
          this.prixWithQuantite[key] = this.prixWithQuantites[i][key]
        }
      }
    }

    this.erreurPrixWithQuantite = {
      prixVenteHT:"",
      quantiteMin:"",
      quantiteMax:"",
    }

    this.modalReference = this.modalService.open(content,prixWithQuantite);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  JoinAndClose() {
    this.modalReference.close();
  }

  ngOnInit(): void {

  }

  titre = "prixWithQuantites"

  controleInputs() {
 
    for(let key in this.erreurPrixWithQuantite){
      this.erreurPrixWithQuantite[key] = ""
      document.getElementById(this.titre + key).classList.remove("border-erreur")
    }

    var isValid = true

    if(this.prixWithQuantite.quantiteMin > this.prixWithQuantite.quantiteMax){
      document.getElementById(this.titre + 'quantiteMin').classList.add("border-erreur")
      this.erreurPrixWithQuantite['quantiteMin'] = "Veuillez inserer la quantite minumale est inferieur a la quantite maximale !!"
      isValid = false      
    }

    if(this.prixWithQuantite.quantiteMin < 0 ){
      document.getElementById(this.titre + 'quantiteMin').classList.add("border-erreur")
      this.erreurPrixWithQuantite['quantiteMin'] = "Veuillez inserer la quantite superieur ou egal zero !!"
      isValid = false      
    }

    if(this.prixWithQuantite.quantiteMax < 0 ){
      document.getElementById(this.titre + 'quantiteMax').classList.add("border-erreur")
      this.erreurPrixWithQuantite['quantiteMax'] = "Veuillez inserer la quantite superieur ou egal zero !!"
      isValid = false      
    }

    return isValid
  }

  enregistrerPrixWithQuantite() {
    if (!this.controleInputs()) {
      return
    }

    if(!this.verifierPartiesInterval(this.prixWithQuantite, this.prixWithQuantites)){
        alert("Attention, ilya une partie de cet intervalle de qantite se trouve dans un autre !!")
        return
    }

    this.prixWithQuantite.id = this.fonctionPartagesService.getIdOfArrayElement(this.prixWithQuantites, 'id')
    this.prixWithQuantites.push(this.prixWithQuantite);  
    
    this.prixWithQuantite = {
      sousProduit:"",
      id : this.fonctionPartagesService.getIdOfArrayElement(this.prixWithQuantites, 'id'),
      prixVenteHT:0,
      quantiteMin:0,
      quantiteMax:0,
      typeTier:""
    }
    this.JoinAndClose()
  }

  tabEmpty = []
  inisialiserEmptyTab(){
    this.tabEmpty = []
    if(this.prixWithQuantites){
      for(let i = 0; i < (6 - this.prixWithQuantites.length); i++){
        this.tabEmpty.push({})
      }
    }else{
      for(let i = 0; i < 6; i++){
        this.tabEmpty.push({})
      }
    }

    return true
  }

  modifierPrixWithQuantite(id) {
    if (!this.controleInputs()) {
      return
    } 

    if(!this.verifierPartiesInterval(this.prixWithQuantite, this.prixWithQuantites.filter(x => x.id != this.prixWithQuantite.id))){
      alert("Attention, ilya une partie de cet intervalle de qantite se trouve dans un autre !!")
      return
    }
   
    this.supprimerPrixWithQuantite(this.prixWithQuantite.id)
    
    this.prixWithQuantites.push(this.prixWithQuantite);  
    
    this.prixWithQuantite = {
      sousProduit:"",
      id : this.id,
      prixVenteHT:0,
      quantiteMin:0,
      quantiteMax:0,
      typeTier:""
    }
    this.JoinAndClose()

  }

  supprimerPrixWithQuantite(id){
    for(let i = 0; i < this.prixWithQuantites.length; i++){
      if(this.prixWithQuantites[i].id == id){
        this.prixWithQuantites.splice(i,1);
      }
    }
  }

  verifierPartiesInterval(item, prixWithQuantites){
     var items = prixWithQuantites.filter(x => x.typeTier == item.typeTier)
     for(let i = 0; i < items.length; i++){
        if(!(items[i].quantiteMin > item.quantiteMax || items[i].quantiteMax < item.quantiteMin)){
           return false       
        }
     }
     return true
  }
  
  //start - Modal-attention-des-intervalles-inclus
  isOpenModalConfirmationIntervallInclus = false
  openConfirmationConfirmationIntervallInclus() {
    this.isOpenModalConfirmationIntervallInclus = true
  }

  closeConfirmationIntervallInclus() {
    this.isOpenModalConfirmationIntervallInclus = false
  }
  //end - Modal-attention-des-intervalles-inclus

  changeSousProduit(){
    for(let i = 0; i < this.article.sousProduits.length; i++){
      if(this.article.sousProduits[i].id == this.prixWithQuantite.sousProduit){
           this.prixWithQuantite.prixVenteHT = this.article.prixVenteHT + this.article.sousProduits[i].impactPrix  
      }
    }
  }

}
