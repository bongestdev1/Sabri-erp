import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InformationsService } from '../../../services/informations.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { Clientshow } from 'src/app/model/modelComerce/client/clientshow';
import { UtiliteService } from 'src/app/services/utilite.service';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})
export class ListClientComponent implements OnInit {

  //start popup
  @Output() closeModal = new EventEmitter<string>();

  @Output() selectionLigne = new EventEmitter<string>();

  @Input() isPopup = false

  @Input() isOpenModal = false
  
  closeModalFunction(){
    this.closeModal.emit();
  }

  selectionLigneFunction(id){
    this.selectionLigne.emit(id)
  }
  //end popup

  formC: FormGroup

  @Input() apiDelete = "/clients/deleteClient"
  @Input() apiList = "/clients/listClients"
  @Input() titre = "Liste Clients"
  @Input() titre2 = "Client"

  @Input() pageDetails = "/client/details/"
  @Input() pageModifie = "/client/modifier/"
  @Input() pageAjoute = "/client/ajout"

  @Input() titreFile = "Liste de clients"
  @Input() nameFile = "liste_Clients"

  @Input() modeTiere = this.fonctionPartages.modeTiere.client

  isOpenModalDelete = false
  idDeleteModal = ""
  params1Delete = ""
  params2Delete = ""

  objetFile = {
    email: "Email",
    telephone: "Téléphone",
    code: "Code",
    raisonSociale: "Raison Sociale",
    matriculeFiscale: "Matricule Fiscale",
    plafondCredit: "Plafond Crédit",
    mobiles: "Mobiles",
    siteWeb: "site Web",
    conditionReglement: "Condition Reglement",
    typeTiers: "Type Tiers",
    fax: "Fax",
    statusProspection: "Status Prospection",
    modeReglement: "Mode Reglement",
    secteur: "Secteur",
  }

  deleteItem() {

    if (this.isLoading) {
      return
    }

    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.apiDelete + "/" + this.idDeleteModal, {},this.tokenStorageService.getHeader()).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.getClients()
          this.closeModalDelete()
          this.notificationToast.showSuccess("Votre " + this.modeTiere +" est bien supprimée !")
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }

  openModalDelete(id, params2) {
    this.idDeleteModal = id
    this.isOpenModalDelete = true
    if(this.titre == "Liste Clients"){
      this.params1Delete = "Le client"
    }else{
      this.params1Delete = "Le fournisseur"
    }
    this.params2Delete = params2
  }

  closeModalDelete() {
    this.isOpenModalDelete = false
  }

  constructor(private utilite: UtiliteService, private fb: FormBuilder,
    private router: Router, private http: HttpClient,
    public informationGenerale: InformationsService,
    private tokenStorageService:TokenStorageService,
    private notificationToast: ToastNotificationService,
    public fonctionPartages: FonctionPartagesService) {

    this.formC = this.fb.group({
      email: [''],
      telephone: [''],
      code: [''],
      raisonSociale: [''],
      matriculeFiscale: [''],
      plafondCredit: [''],
      mobiles: [''],
      siteWeb: [''],
      conditionReglement: [''],
      typeTiers: [''],
      fax: [''],
      statusProspection: [''],
      modeReglement: [''],
      secteur: [''],

      agentPremierContact: [''],
      agentCommercial: [''],
      agentRecouvrement: [''],
      remise: [''],
      active: [''],
      nbFactureNonPaye: [''],

      paysFacturation: [''],
      gouvernoratFacturation: [''],
      delegationFacturation: [''],
      localiteFacturation: [''],
      codePostaleFacturation: [''],
      adresseFacturation: [''],

      paysLivraison: [''],
      gouvernoratLivraison: [''],
      delegationLivraison: [''],
      localiteLivraison: [''],
      codePostaleLivraison: [''],
      adresseLivraison: [''],

      limit: 10
    })



  }

  objectKeys = Object.keys;

  items = new Clientshow();

  itemsVariable = new Clientshow();

  request = {
    search: {
      email: "",
      telephone: "",
      code: "",
      raisonSociale: "",
      matriculeFiscale: "",
      plafondCredit: "",
      mobiles: "",
      siteWeb: "",
      conditionReglement: "",
      typeTiers: "",
      fax: "",
      statusProspection: "",
      modeReglement: "",
      secteur: "",

      paysFacturation: "",
      gouvernoratFacturation: "",
      delegationFacturation: "",
      localiteFacturation: "",
      codePostaleFacturation: "",
      adresseFacturation: "",

      paysLivraison: "",
      gouvernoratLivraison: "",
      delegationLivraison: "",
      localiteLivraison: "",
      codePostaleLivraison: "",
      adresseLivraison: "",

    },
    orderBy: {
      email: 0,
      telephone: 0,
      code: 0,
      raisonSociale: 0,
      matriculeFiscale: 0,
      plafondCredit: 0,
      mobiles: 0,
      siteWeb: 0,
      conditionReglement: 0,
      typeTiers: 0,
      fax: 0,
      statusProspection: 0,
      modeReglement: 0,
      secteur: 0,

      paysFacturation: 0,
      gouvernoratFacturation: 0,
      delegationFacturation: 0,
      localiteFacturation: 0,
      codePostaleFacturation: 0,
      adresseFacturation: 0,

      paysLivraison: 0,
      gouvernoratLivraison: 0,
      delegationLivraison: 0,
      localiteLivraison: 0,
      codePostaleLivraison: 0,
      adresseLivraison: 0,
    },
    limit: 10,
    page: 1,
    societe: ""
  }

  oldRequest = {
    search: {
      email: "",
      telephone: "",
      code: "",
      raisonSociale: "",
      matriculeFiscale: "",
      plafondCredit: "",
      mobiles: "",
      siteWeb: "",
      conditionReglement: "",
      typeTiers: "",
      fax: "",
      statusProspection: "",
      modeReglement: "",
      secteur: "",

      paysFacturation: "",
      gouvernoratFacturation: "",
      delegationFacturation: "",
      localiteFacturation: "",
      codePostaleFacturation: "",
      adresseFacturation: "",

      paysLivraison: "",
      gouvernoratLivraison: "",
      delegationLivraison: "",
      localiteLivraison: "",
      codePostaleLivraison: "",
      adresseLivraison: "",
    },
    orderBy: {
      email: 0,
      telephone: 0,
      code: 0,
      raisonSociale: 0,
      matriculeFiscale: 0,
      plafondCredit: 0,
      mobiles: 0,
      siteWeb: 0,
      conditionReglement: 0,
      typeTiers: 0,
      fax: 0,
      statusProspection: 0,
      modeReglement: 0,
      secteur: 0,

      paysFacturation: 0,
      gouvernoratFacturation: 0,
      delegationFacturation: 0,
      localiteFacturation: 0,
      codePostaleFacturation: 0,
      adresseFacturation: 0,

      paysLivraison: 0,
      gouvernoratLivraison: 0,
      delegationLivraison: 0,
      localiteLivraison: 0,
      codePostaleLivraison: 0,
      adresseLivraison: 0,

    },
    limit: 10,
    page: 1,
    societe: ""
  }

  ngOnInit(): void {
    console.log(this.apiList)
    this.getClients()
  }

  isLoading = false

  clients = []

  getClients() {

    if (this.isLoading) {
      return
    }

    for (let key in this.request.search) {
      this.request.search[key] = this.formC.value[key]
    }
    this.request.limit = this.formC.value.limit
    this.request.societe = this.informationGenerale.idSocieteCurrent

    if (!this.testSyncronisation(this.request, this.oldRequest)) {
      this.request.page = 1
    }

    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.apiList, this.request,this.tokenStorageService.getHeader()).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.clients = resultat.resultat.docs
          this.totalPage = resultat.resultat.pages
          this.oldRequest = resultat.request
          if (this.totalPage < this.request.page && this.request.page != 1) {
            this.request.page = this.totalPage
            this.getClients()
          }

          if (!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page)) {
            this.getClients()
          }
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  testSyncronisation(request1, request2) {
    for (let key in request1.search) {
      if (request1.search[key] != request2.search[key]) {
        return false
      }
    }

    for (let key in request1.orderBy) {
      if (request1.orderBy[key] != request2.orderBy[key]) {
        return false
      }
    }

    if (request1.limit != request2.limit) {
      return false
    }

    return true;
  }

  totalPage = 1

  setLimitPage(newLimitPage: number) {
    this.request.limit = newLimitPage
    this.request.page = 1
    this.getClients()
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getClients()
  }

  printout() {
    this.utilite.printout(this.clients, this.objetFile, this.titreFile)
  }

  generatePDF() {
    this.utilite.generatePDF(this.clients, this.objetFile, this.titreFile, this.nameFile)
  }

  exportexcel() {
    /* table id is passed over here */
    this.utilite.exportexcel(this.clients, this.objetFile, this.titreFile, this.nameFile)
  }


  changeCroissante(key) {
    var classStyle = key + "-croissante";
    var buttons = document.getElementsByClassName(classStyle);
    if (this.request.orderBy[key] == 1) {
      this.request.orderBy[key] = -1
      this.activationCroissante(buttons[0], buttons[1])
    } else {
      this.request.orderBy[key] = 1
      this.activationCroissante(buttons[1], buttons[0])
    }

    for (let varkey in this.request.orderBy) {
      if (key != varkey) {
        this.request.orderBy[varkey] = 0
      }
    }

    this.getClients()
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


  //open modal ajout Element
  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  typeElement

  closeModalAjoutElement(){
    this.isOpenModalAjoutElement = false
    this.getClients()
  }

  ajoutClient(){
    if(!this.isPopup){
      this.router.navigate([this.pageAjoute])
      return
    }

    if(this.titre != "Liste Clients"){
      this.typeElement = this.fonctionPartages.titreOfModal.ajouterFournisseur
    }else{
      this.typeElement = this.fonctionPartages.titreOfModal.ajouterClient
    }
    this.isOpenModalAjoutElement = true
  }

  modifierClient(idClient){
    if(!this.isPopup){
      this.router.navigate([this.pageModifie+idClient])
      return    
    }

  
    if(this.titre != "Liste Clients"){
      this.typeElement = this.fonctionPartages.titreOfModal.modifierFournisseur
    }else{
      this.typeElement = this.fonctionPartages.titreOfModal.modifierClient
    }
    this.isOpenModalAjoutElement = true
    this.idAjoutElementModal = idClient
  }

  //end open modal ajout Element

}