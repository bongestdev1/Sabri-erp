
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { formatDate } from '@angular/common';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';


@Component({
  selector: 'app-classement-client',
  templateUrl: './classement-client.component.html',
  styleUrls: ['./classement-client.component.scss']
})
export class ClassementClientComponent implements OnInit {
  formC: FormGroup

  apiList = "/clients/classementClient"
  apiListC = "/clients/listClients"

  constructor(private fb: FormBuilder,
    private router: Router, private http: HttpClient,
    public informationGenerale: InformationsService,
    private tokenStorageService:TokenStorageService,
    private notificationToast: ToastNotificationService,
    public fonctionPartagesService: FonctionPartagesService) {

    this.formC = this.fb.group({
      client: [''],
      nom: [''],
      solde: [''],
      enCours: [''],
      impaye: [''],
      credit: [''],
      type: [''],
      delai: [''],
      nature: [''],
      telephone: [''],
      limit: 3
    })

    this.getAllParametres()
  }

  objectKeys = Object.keys;

  tabNumbers= ['credit', 'impaye', 'enCours', 'solde']

  items = {
    client : "Client",
    nom : "Nom",
    solde: "Solde",
    enCours: "EnCours",
    impaye: "Impaye",
    credit: "Credit",
    type: "Type",
    delai: "Delai",
    nature: "Nature",
    telephone: "Telephone",
  };

  itemsVariable = {
    client : "Client",
    nom : "Nom",
    solde: "Solde",
    enCours: "EnCours",
    impaye: "Impaye",
    credit: "Credit",
    type: "Type",
    delai: "Delai",
    nature: "Nature",
    telephone: "Telephone",
  };


  request = {
    dateStart: this.informationGenerale.idDateAujourdCurrent,
    dateEnd: this.informationGenerale.idDateFinCurrent,
    search: {
      code: "",
      raisonSociale: "",
      solde: "",
      enCours: "",
      credit: "",
      delai: "",
      type: "",
      nature: "",
      telephone: "",
    },
    orderBy: {
      code: 0,
      raisonSociale: 0,
      solde: 0,
      enCours: 0,
      credit: 0,
      delai: 0,
      type: 0,
      nature: 0,
      telephone: 0,
    },
    societe: this.informationGenerale.idSocieteCurrent,
    client: "",
    limit: 3,
    page: 1
  }

  oldRequest = {
    dateStart: this.informationGenerale.idDateAujourdCurrent,
    dateEnd: this.informationGenerale.idDateFinCurrent,
    search: {
      code: "",
      raisonSociale: "",
      solde: "",
      enCours: "",
      credit: "",
      delai: "",
      type: "",
      nature: "",
      telephone: "",
    },
    orderBy: {
      code: 0,
      raisonSociale: 0,
      solde: 0,
      enCours: 0,
      credit: 0,
      delai: 0,
      type: 0,
      nature: 0,
      telephone: 0,
    },
    societe: this.informationGenerale.idSocieteCurrent,
    client: "",
    limit: 3,
    page: 1
  }

  ngOnInit(): void {


  }

  isLoading = false

  clients = []

  listGlEmpty = [{}, {}, {}, {}, {}, {}]
  getClients(request) {

    this.getReleveDate(this.request)


    if (this.isLoading) {
      return
    }

    for (let key in this.request.search) {
      this.request.search[key] = this.formC.value[key]
    }

    this.request.limit = this.formC.value.limit

    if (!this.testSyncronisation(this.request, this.oldRequest)) {
      this.request.page = 1
    }

    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.apiList, this.request,this.tokenStorageService.getHeader()).subscribe(

      res => {
        console.log(res);

        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {

          this.clients = resultat.listGL

          this.listGlEmpty = []
          if (this.clients.length < 6) {
            for (let i = this.clients.length; i < 6; i++) {
              this.listGlEmpty.push({})
            }
          }

        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  getReleveDate(request) {
    for (let key in this.request.search) {
      this.request.search[key] = this.formC.value[key]
    }
    this.request.dateStart = request.dateStart
    this.request.dateEnd = request.dateEnd
  }

  //autocomplete client

  keySelectedClient = "raisonSociale"
  objetClient = {
    raisonSociale: "Raison-Sociale",
    matriculeFiscale: "Matricule-Fiscale",
    email: "Email",
    telephone: "Téléphone",
    code: "Code",
    plafondCredit: "Plafond-Credit",
    mobiles: "Mobiles",
    siteWeb: "Site-Web",
    conditionReglement: "Condition-Réglement",
    credit: "Crédit",
    fax: "Fax",
  }
  idClient = ""
  setClientID(id) {
    this.request.client = id
  }
  //open modal ajout Client
  isOpenModalAjoutClient = false
  idAjoutClientModal = ""
  typeElement = ""

  closeModalAjoutClient() {
    this.isOpenModalAjoutClient = false
    this.getAllParametres()
  }
  openModalAjoutClient() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterClient
    this.isOpenModalAjoutClient = true
  }
  allClients = []
  getAllParametres() {
    this.isLoading = true

    let request = { page: 1, limit: 0, search: {}, orderBy: {}, societe: this.informationGenerale.idSocieteCurrent }
    this.http.post(this.informationGenerale.baseUrl + this.apiListC, request,this.tokenStorageService.getHeader()).subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.allClients = resultat.resultat.docs
          this.getClients(this.request)
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

    if (request1.dateStart != request2.dateStart || request1.dateEnd != request2.dateEnd) {
      return false
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
    this.getClients(this.request)
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getClients(this.request)
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

    this.getClients(this.request)
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

  generatePDF(){
    const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
  pdfMake.createPdf(documentDefinition).open();

  }

}
