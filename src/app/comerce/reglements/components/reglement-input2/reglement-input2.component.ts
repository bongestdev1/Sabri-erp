import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import {formatDate} from '@angular/common';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';

@Component({
  selector: 'app-reglement-input2',
  templateUrl: './reglement-input2.component.html',
  styleUrls: ['./reglement-input2.component.scss']
})
export class ReglementInput2Component implements OnInit {

  @Output() joinAndClose = new EventEmitter<string>();
  @Output() getAllParametres = new EventEmitter<string>();
 
  @Input() allModeReglement:any
  @Input() allSituationReglement:any
  @Input() reglements:any
  @Input() isLoading:any
  @Input() bonLivraison:any

  reglement = {
    id:"",
    client:"",
    modeReglement:"",
    tresorerie:"",
    montant:0,
    dateReglement:"",
    dateEncaissement :"",
    numCheque:"",
    dateEcheance:"",
    notes:"",
    societe:"",
    numero:"Nouveau",
    reste:0,
    situationReglement:"",
    activerLiltrage:"oui",
    montantAPayer:0
  }

  erreurReglement = {
    situationReglement:"",
    modeReglement:"",
    montant:""
  }

  objectKeys = Object.keys;

  constructor(
    private notificationToast: ToastNotificationService, 
    public fonctionPartagesService:FonctionPartagesService, 
    public informationGenerale: InformationsService) {
     }

  ngOnInit(): void {
    this.reglement.montant = this.bonLivraison.restPayer
    this.reglement.montantAPayer = this.bonLivraison.restPayer
    this.reglement.reste = 0
    this.reglement.modeReglement = this.informationGenerale.modeReglCurrent
    this.reglement.dateReglement = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.reglement.dateEcheance = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  }

  getDate(date){
    return formatDate(new Date(date), 'dd/MM/yyyy', 'en')
  }
 
  
   setlitterage(){
        if(this.reglement.montantAPayer > this.reglement.montant){
          this.reglement.montantAPayer = this.reglement.montant
        }
        
        if(this.reglement.montantAPayer < 0){
          this.reglement.montantAPayer = 0
        }

        this.reglement.reste =  this.reglement.montant - this.reglement.montantAPayer
        
   }

   addReglement(){
    if (!this.controleInputs()) {
      return
    }
    this.reglement.numero = "Nouveau"
    this.reglement.id = this.fonctionPartagesService.getIdOfArrayElement(this.reglements , 'id')
    this.reglements.push (this.reglement)
    console.log(this.reglements)
    this.joinAndClose.emit()
   }
 
  itemsVariableG = {
    numero:"Numéro",
    date:"Date",
    montantTotal:"Montant total",
    montantPaye:"Montant paye",
    montantAPayer:"Montant à payer",
    restPayer:"Reste à payer",
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

  controleInputs() { 
    for(let key in this.erreurReglement){
      this.erreurReglement[key] = ""
    }
   
    var isValid = true

    if(this.reglement.modeReglement == ""){
       this.erreurReglement.modeReglement = "Veuillez remplir ce champ"
       isValid = false
    }

    if(this.reglement.situationReglement == ""){
      this.erreurReglement.situationReglement = "Veuillez remplir ce champ"
      isValid = false
    }

    if(this.reglement.montant <= 0){
      this.erreurReglement.montant = "Votre Montant est invalid"
      isValid = false
    }
    
    return isValid
  }


    //autocomplete SituationReglement
    keySelectedSituationReglement = "libelle"
    objetSituationReglement = {libelle:"Libelle",
                               encaisse:"EnCaisse"}
    setSituationReglementID(id){
      this.reglement.situationReglement = id
    }

    openModalAjoutSituationReglement(){
      this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterSituationReglement
      this.isOpenModalAjout = true
    }
    //open modal ajout Client
    
 
  //autocomplete ModeReglement
  keySelectedModeReglement = "libelle"
  objetModeReglement = {libelle:""}
  setModeReglementID(id){
    this.reglement.modeReglement = id
  }

  //open modal ajout Client
  isOpenModalAjout = false
  idAjoutModal = ""
  typeElement
  closeModalAjout(){
    this.isOpenModalAjout = false
    this.getAllParametres.emit()
  }

  openModalAjoutModeReglement(){
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterModeReglement
    this.isOpenModalAjout = true
  }

  //fixed chiffre after vergule
  showInput(event){
    this.fonctionPartagesService.showInput(event)
    setTimeout(() => {
      this.fixedVerguleNumbers()
    }, 100)
  }

  fixedVerguleNumbers(){
    this.reglement.montant = Number(this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(this.reglement.montant))
    this.reglement.montantAPayer = Number(this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(this.reglement.montantAPayer))
  }

}

