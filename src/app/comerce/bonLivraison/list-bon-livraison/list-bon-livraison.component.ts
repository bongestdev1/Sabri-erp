import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { formatDate } from '@angular/common';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { UtiliteService } from 'src/app/services/utilite.service';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';

const S_F_S = "SAVE_FILTER_SESSION_BON_LIVRAISON"

@Component({
  selector: 'app-list-bon-livraison',
  templateUrl: './list-bon-livraison.component.html',
  styleUrls: ['./list-bon-livraison.component.scss']
})
export class ListBonLivraisonComponent implements OnInit {
  formBL: FormGroup

  apiDelete = "/bonLivraisons/deleteBonLivraison"
  apiList = "/bonLivraisons/listBonLivraisons"

  pageDetails = "/bonLivraison/details/"
  pageModifie = "/bonLivraison/modifier/"
  pageAjoute = "/bonLivraison/ajout"

  isOpenModalDelete = false
  idDeleteModal = ""
  params1Delete = ""
  params2Delete = ""

  idItemSelected = ""

  setSaveFilterSession(){
    var request = {request:this.request, idItemSelected:this.idItemSelected }
  
    console.log(request)
   
    localStorage.setItem(S_F_S, JSON.stringify(request))
  } 

  getSaveFilterSession(){
    var request:any = localStorage.getItem(S_F_S)
   
    if(request === undefined || !request){
      return
    }

    request = JSON.parse(request)
    console.log(request)
   
    this.request = request.request
    this.oldRequest = this.request
    this.idItemSelected = request.idItemSelected
    this.formBL.patchValue(this.request.search)

  } 

  deleteItem() {

    if (this.isLoading) {
      return
    }

    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.apiDelete + "/" + this.idDeleteModal, {}, this.tokenStorageService.getHeader()).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.getBonLivraisons(this.request)
          this.closeModalDelete()
          this.notificationToast.showSuccess("Votre BonLivraison est bien supprimée !")
        } else {
          this.notificationToast.showError(this.fonctionPartages.getMessageBackend(resultat.message))
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
    this.params1Delete = "Le BonLivraison"
    this.params2Delete = params2
  }

  closeModalDelete() {
    this.isOpenModalDelete = false
  }

  isVenteContoire = false

  constructor(
    private utilite: UtiliteService,
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    public informationGenerale: InformationsService,
    private tokenStorageService: TokenStorageService,
    private notificationToast: ToastNotificationService,
    public fonctionPartages: FonctionPartagesService) {

    this.formBL = this.fb.group({
      numero: [''],
      date: [''],
      client: [''],
      totalRemise: [''],
      totalHT: [''],
      totalTVA: [''],
      tFiscale: [''],
      totalTTC: [''],
      totalGain: [''],
      isTransfert: ['non'],
      factureVente: [''],
      commande: [''],
      limit: 10
    })


  }

  ngOnInit(): void {
    if (this.router.url.indexOf("venteComptoire") > -1) {
      this.isVenteContoire = true
      this.pageDetails = "/venteComptoire/details/"
      this.pageModifie = "/venteComptoire/modifier/"
      this.pageAjoute = "/venteComptoire/ajout"
    }

    this.request.dateEnd =this.informationGenerale.idDateFinCurrent 
    this.request.dateStart = this.informationGenerale.idDateAujourdCurrent
    
    this.oldRequest = this.request
    
    //this.getSaveFilterSession()

    this.getBonLivraisons(this.request)
   
  }


  gotToAdd() {
    this.router.navigate([this.pageAjoute]);
  }

  objectKeys = Object.keys;

  itemsNotShowInput = ["client", "date"]

  titreFile = "Liste Bon Livraison"
  nameFile = "liste_bon_livraison"

  items = {
    numero: "Numero",
    date: "Date",
    client: "Client",
    totalRemise: "Total_Remise",
    totalHT: "Total_HT",
    totalTVA: "Total_TVA",
    tFiscale: "Timbre_Fiscale",
    totalTTC: "Total_TTC",
    totalGain: "Total_Gain",
    factureVente: "Facture",
    commande: "Commande"
  };


  itemsVariable = {
    numero: "active",
    date: "active",
    client: "active",
    totalRemise: "active",
    totalHT: "active",
    totalTVA: "active",
    tFiscale: "active",
    totalTTC: "active",
    totalGain: "active",
    factureVente: "active",
    commande: "Commande"
  };

  request = {
    dateStart: this.informationGenerale.idDateAujourdCurrent,
    dateEnd: this.informationGenerale.idDateFinCurrent,
    magasin: "",
    search: {
      numero: "",
      client: "",
      date: "",
      tiers: "",
      totalRemise: "",
      totalHT: "",
      totalTVA: "",
      tFiscale: "",
      totalTTC: "",
      totalGain: "",
      isTransfert: "non",
      factureVente: "",
      commande: ""
    },
    orderBy: {
      numero: 0,
      client: 0,
      date: 0,
      tiers: 0,
      totalRemise: 0,
      totalHT: 0,
      totalTVA: 0,
      tFiscale: 0,
      totalTTC: 0,
      totalGain: 0,
      isTransfert: 0,
      factureVente: 0,
      commande: 0
    },
    limit: 10,
    page: 1,
    isVenteContoire: false
  }

  oldRequest = {
    dateStart: this.informationGenerale.idDateAujourdCurrent,
    dateEnd: this.informationGenerale.idDateFinCurrent,
    magasin: "",
    search: {
      numero: "",
      client: "",
      date: "",
      tiers: "",
      totalRemise: "",
      totalHT: "",
      totalTVA: "",
      tFiscale: "",
      totalTTC: "",
      totalGain: "",
      isTransfert: "non",
      factureVente: "",
      commande: ""
    },
    orderBy: {
      numero: 0,
      client: 0,
      date: 0,
      tiers: 0,
      totalRemise: 0,
      totalHT: 0,
      totalTVA: 0,
      tFiscale: 0,
      totalTTC: 0,
      totalGain: 0,
      isTransfert: 0,
      factureVente: 0,
      commande: 0
    },
    limit: 10,
    page: 1,
    isVenteContoire: false
  }

  isLoading = false

  bonLivraisons = []

  getBonLivraisons(request) {

    if (this.isLoading) {
      return
    }

    for (let key in this.request.search) {
      this.request.search[key] = this.formBL.value[key]
    }

    this.request.dateStart = request.dateStart
    this.request.dateEnd = request.dateEnd
    this.request.limit = this.formBL.value.limit
    this.request.magasin = this.informationGenerale.idSocieteCurrent
    this.request.isVenteContoire = this.isVenteContoire
   
   
    if (!this.testSyncronisation(this.request, this.oldRequest)) {
      this.request.page = 1
    }

    this.setSaveFilterSession()
    
    this.isLoading = true
    this.http.post(this.informationGenerale.baseUrl + this.apiList, this.request, this.tokenStorageService.getHeader()).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.bonLivraisons = resultat.resultat.docs

          console.log(this.bonLivraisons)

          this.totalPage = resultat.resultat.pages
          this.oldRequest = resultat.request
          if (this.totalPage < this.request.page && this.request.page != 1) {
            this.request.page = this.totalPage
            this.getBonLivraisons(this.request)
          }

          if (!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page)) {
            this.getBonLivraisons(this.request)
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

    if (request1.dateStart != request2.dateStart || request1.dateEnd != request2.dateEnd) {
      return false
    }

    if (request1.limit != request2.limit) {
      return false
    }

    if (request1.magasin != request2.magasin) {
      return false
    }

    return true;
  }

  totalPage = 1

  getDate(date) {
    return formatDate(new Date(date), 'yyyy-MM-dd', 'en');
  }

  setLimitPage(newLimitPage: number) {
    this.request.limit = newLimitPage
    this.request.page = 1
    this.getBonLivraisons(this.request)
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getBonLivraisons(this.request)
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

    this.getBonLivraisons(this.request)
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

  clickDocument(id) {
    this.formBL.patchValue({ 'isTransfert': id })
    this.getBonLivraisons(this.request)
  }

  //start transfert facture vente
  listCochee = []
  checkBonLivraison(idBonLivraison) {
    for (let i = 0; i < this.listCochee.length; i++) {
      if (idBonLivraison == this.listCochee[i].idBonLivraison) {
        this.listCochee = this.listCochee.filter(x => x.idBonLivraison != idBonLivraison)
        return
      }
    }
    this.listCochee.push({ idBonLivraison: idBonLivraison })
  }

  isCochedBonLivraison(idBonLivraison) {
    for (let i = 0; i < this.listCochee.length; i++) {
      if (idBonLivraison == this.listCochee[i].idBonLivraison) {
        return true
      }
    }
    return false
  }

  transfertFactureVente() {
    if (this.listCochee.length === 0) {
      this.notificationToast.showError("Veuillez cocher votres bons livraisons que les voulez transfert une facture de vente !!")
      return
    }
    var lien = ""
    for (let i = 0; i < this.listCochee.length; i++) {
      if (i == 0) {
        lien += this.listCochee[i].idBonLivraison
      } else {
        lien += "&&" + this.listCochee[i].idBonLivraison
      }
    }

    this.router.navigate(['/factureVente/transfert/' + lien])
  }
  //end transfert facture vente

}
