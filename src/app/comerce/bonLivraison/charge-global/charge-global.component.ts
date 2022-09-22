import { Component, OnInit, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-charge-global',
  templateUrl: './charge-global.component.html',
  styleUrls: ['./charge-global.component.scss']
})
export class ChargeGlobalComponent implements OnInit {

  @Output() getAllParametres = new EventEmitter<string>();
  @Input() allCharges: any
  @Input() charges: any
  @Input() isLoading: any
  @Input() bonLivraison: any

  itemsVariableG = {
    charge: "Charge",
    montant: "Montant",
  }

  itemsVariableGOrderby = {
    charge: 0,
    montant: 0,
  }

  getAllParametres2() {
    this.getAllParametres.emit()
  }

  constructor(
    private modalService: NgbModal,
    public fonctionPartagesService: FonctionPartagesService) { }

  modalReference: NgbModalRef;
  public visible = false;
  closeResult = '';
  open(content) {
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  joinAndClose() {
    this.modalReference.close();
  }

  objectKeys = Object.keys;

  ngOnInit(): void {
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

  //autocomplete charge
  keySelectedCharge = "libelle"
  objetCharge = { libelle: "Libelle" }
  charge ={
    id : "",
    libelle : "",
    montant : 0,
  } 
  setChargeID(id){
    this.charge.id = id
  }
  ajoutCharge()
  {
    this.charge.libelle = this.allCharges.filter(x => x.id == this.charge.id)[0].libelle
    this.charges.push(this.charge)
    this.allCharges = this.allCharges.filter(x => x.id != this.charge.id) 
    this.joinAndClose()  
    this.charge ={
      id : "",
      libelle : "",
      montant : 0,
    }
    this.getAllParametres.emit()
  }

  //open modal ajout Element
  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  typeElement
  openModalAjoutCharge(){
     this.typeElement = this.fonctionPartagesService.titreOfModal.ajoutCharge
     this.isOpenModalAjoutElement = true
  }

  closeModalAjoutElement(){
    this.isOpenModalAjoutElement = false
    this.getAllParametres.emit()
  }
}
