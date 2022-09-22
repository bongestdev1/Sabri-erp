import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { formatDate } from '@angular/common';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';

@Component({
  selector: 'app-charge-details',
  templateUrl: './charge-details.component.html',
  styleUrls: ['./charge-details.component.scss']
})
export class ChargeDetailsComponent implements OnInit {

  @Output() getAllParametres = new EventEmitter<string>();
  @Input() charges: any
  @Input() isLoading: any
  @Input() articlesSelected: any
  @Input() bonLivraison: any
  @Input() erreurCharge

  itemsVariableG = {
    reference: "Référence",
    designation: "Désignation",
    quantite: "Quantité",
    prixAchat: "Prix achat",
  }

  itemsVariableGOrderby = {
    reference: 0,
    designation: 0,
    quantite: 0,
    prixAchat: 0,
    charge: 0,
    sommeCharge: 0,
  }

  objectKeys = Object.keys;

  constructor(
    private modalService: NgbModal,
    private notificationToast: ToastNotificationService,
    public fonctionPartagesService: FonctionPartagesService) { }

  ngOnInit(): void {
  }

  getAllParametres2() {
    this.getAllParametres.emit()
  }

  listG = []
  listBAC: any = {}
  ngOnChanges(changes: SimpleChanges) {
    for (let i of this.articlesSelected) {
      this.listBAC = {}
      this.listBAC.reference = i.reference,
      this.listBAC.designation = i.designation
      this.listBAC.quantite = i.quantiteVente
      this.listBAC.prixAchat = i.prixAchat
      for (let k of this.charges) {
        this.listBAC[k.libelle] = 0
      }
      this.listBAC.montantTotal = 0
      this.listG.push(this.listBAC)
    }
    console.log("this.listG", this.listG)
  }

  changeMontantTotal(reference, key) {
    this.verifierTotal(reference, key)
    for (let i = 0; i < this.listG.length; i++) {
      this.listG[i].montantTotal = 0
    
      for(let item of this.charges){
        this.listG[i].montantTotal += this.listG[i][item.libelle]
      }
    }
    
  }

  verifierTotal(reference, key) {
     
      let somme = 0
      for (let i = 0; i < this.listG.length; i++) {
        somme += this.listG[i][key]
        let montant = this.getMontantCharge(key)
        if(somme >= montant){
          this.listG[i][key] = this.listG[i][key] - (somme - montant)
          if(this.listG[i][key] < 0){
            this.listG[i][key] = 0
          }
          this.notificationToast.showError("Votre charge doit etre inférieur au charge global !")
        }
      }
   }

  getMontantCharge(libelle){
    return this.charges.filter((x) => x.libelle == libelle)[0].montant
  }


  changeCroissante(key) {
    var classStyle = key + "-croissante";
    var buttons = document.getElementsByClassName(classStyle);
    if (this.itemsVariableGOrderby[key] == 1) {
      this.itemsVariableGOrderby[key] = -1
      this.activationCroissante(buttons[0], buttons[1])
    } else {
      this.itemsVariableGOrderby[key] = 1
      this.activationCroissante(buttons[1], buttons[0])
    }

    for (let varkey in this.itemsVariableGOrderby) {
      if (key != varkey) {
        this.itemsVariableGOrderby[varkey] = 0
      }
    }
  }

  activationCroissante(buttons1, buttons2) {
    var buttons = document.getElementsByClassName("croissante");
    for (let i = 0; i < buttons.length; i++) {
      var classList = buttons[i].getAttribute("class")
      classList = classList.replace("active-buttons-croissante", "")
      buttons[i].setAttribute("class", classList)
    }
    classList = buttons2.getAttribute("class")
    classList = classList.replace("active-buttons-croissante", "")
    classList += " active-buttons-croissante"
    buttons2.setAttribute("class", classList)
  }
}
