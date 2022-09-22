import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import {formatDate} from '@angular/common';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reglements-bon-livraison',
  templateUrl: './reglements-bon-livraison.component.html',
  styleUrls: ['./reglements-bon-livraison.component.scss']
})
export class ReglementsBonLivraisonComponent implements OnInit {

 
  @Output() getAllParametres = new EventEmitter<string>();
  @Input() allModeReglement:any
  @Input() allSituationReglement:any
  @Input() reglements:any
  @Input() ancienReglements:any
  @Input() isLoading:any
  @Input() bonLivraison:any
 

  getAllParametres2(){
    this.getAllParametres.emit()
  }

  calculeTotalReglement(){
    let somme = 0
    for(let i = 0; i < this.reglements.length; i++){
      somme += this.reglements[i].montantAPayer
    }

    this.bonLivraison.montantPaye = somme
    this.bonLivraison.restPayer =  this.bonLivraison.montantTotal - this.bonLivraison.montantPaye
    console.log(this.bonLivraison)
  }

  constructor(private modalService: NgbModal, public fonctionPartagesService:FonctionPartagesService) { }

  modalReference: NgbModalRef;
  public visible = false;
  closeResult = '';

  changeMontant(){
    console.log(this.reglements)
    var somme = 0
    for(let i = 0; i < this.reglements.length; i++){
      
      if(this.reglements[i].montantAPayer < 0){
        this.reglements[i].montantAPayer = 0
      }
    
      somme += this.reglements[i].montantAPayer
    
      if(somme > this.bonLivraison.montantTotal){
        this.reglements[i].montantAPayer -= (somme - this.bonLivraison.montantTotal)
        somme = this.bonLivraison.montantTotal
      }
      
      if(this.reglements[i].numero == "Nouveau"){
        if(this.reglements[i].montantAPayer > this.reglements[i].montant){
          this.reglements[i].montantAPayer = this.reglements[i].montant
        }
        this.reglements[i].reste = this.reglements[i].montant - this.reglements[i].montantAPayer
      }else{
        var reglements = this.ancienReglements.filter( x => x.numero == this.reglements.id)
        if(reglements.length > 0){
          var reglement = reglements[0]
          reglement.reste += reglement.montantAPayer
          if(reglement.reste < this.reglements[i].montantAPayer){
            this.reglements[i].montantAPayer = reglement.reste
          }
          reglement.reste -= this.reglements[i].montantAPayer
          this.reglements[i].reste = reglement.reste
        }
      }
    }

    this.calculeTotalReglement()
  }
 
  open(content) {
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  joinAndClose() {
    this.modalReference.close();
    this.changeMontant()
    this.calculeTotalReglement()
  }

  objectKeys = Object.keys;

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.reglements)
  }


  itemsVariableG = {
    numero:"Numéro",
    dateReglement:"Date",
    dateEcheance:"Date Echeance",
    numCheque:"Num Cheque",
    modeReglement:"Mode Reglement",
    montant:"Montant",
    reste:"Reste",
    montantAPayer:"montant affecté",
  }

  itemsVariableGOrderby = {
    numero:0,
    dateReglement:0,
    dateEcheance:0,
    montant:0,
    reste:0,
    montantAPayer:0,
    numCheque:0,
    modeReglement:0,
  }

  getDate(date){
    return formatDate(new Date(date), 'dd/MM/yyyy', 'en')
  }

  getModeReglement(id){
    let modes = this.allModeReglement.filter(x => x.id == id)
    if(modes.length > 0){
      return modes[0].libelle
    }
    return ""
  }

  //fixed chiffre after vergule
  showInput(event){
    this.fonctionPartagesService.showInput(event)
    setTimeout(() => {
      this.fixedVerguleNumbers()
    }, 100)
  }

  showInput2(event) {
    this.fonctionPartagesService.showInput2(event)
    setTimeout(() => {
      this.fixedVerguleNumbers()
    }, 100)
  }

  fixedVerguleNumbers(){
    for(let i = 0; i < this.reglements.length; i++){
      this.reglements[i].montant = Number(this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(this.reglements[i].montant))
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
    
    //this.orderByDocuments()
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
