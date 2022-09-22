import { ActivatedRoute } from '@angular/router';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import {Component, OnInit, Input, Output, EventEmitter,  ViewChild, ElementRef} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { InformationsService } from 'src/app/services/informations.service';

@Component({
  selector: 'app-autocomplete-client',
  templateUrl: './autocomplete-client.component.html',
  styleUrls: ['./autocomplete-client.component.scss']
})
export class AutocompleteClientComponent implements OnInit {

  selected=false;

  ngOnInit() {
  }

  constructor(
    private modalService: NgbModal,
    public informationGenerale: InformationsService,
    private route: ActivatedRoute,
    public fonctionPartages:FonctionPartagesService,
    ) {
  }

  items = {
    code: "Code",
    raisonSociale: "Raison Sociale",
  }

  keySelected = "raisonSociale"

  pageDetails = null

  itemsNumberSimple = {}
  itemsNumberQuantite = {}

  @Input() bordureRed = false

  @Input() idHtml = "1"

  @Input() idSelected=""
  @Output() addElementEvent = new EventEmitter<string>();
  
  @Output() getAllParametres = new EventEmitter<string>()
  
  apiList = "/fournisseurs/listFournisseurs"

  setItem(id){
    this.addElementEvent.emit(id)
  }

  //open modal ajout Element
  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  typeElement

  closeModalAjoutElement(){
    this.isOpenModalAjoutElement = false
    this.typeElement = ""
    this.getAllParametres.emit()
  }

  list(){
    this.typeElement = this.fonctionPartages.titreOfModal.listClient
    this.isOpenModalAjoutElement = true
  }

  selectionLigneFunction(id){
    this.closeModalAjoutElement()
    this.setItem(id)
  }

  detailsItem(){
    if(this.idSelected.length == 0){
      alert("Aucun client sélectionnée")
      return
    } 

    this.idAjoutElementModal = this.idSelected
    this.typeElement = this.fonctionPartages.titreOfModal.detailsClient
    this.isOpenModalAjoutElement = true
  }

  @Input() articles = []
  

}