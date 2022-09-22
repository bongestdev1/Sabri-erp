import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { formatDate } from '@angular/common';
import { Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timeStamp } from 'console';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';
import { BonLivraison } from '../models/bon-livraison';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.scss']
})
export class DocumentDetailsComponent implements OnInit {

  
  public isCollapsed: boolean;
  public isCollapsed2: boolean;
  public multiCollapsed1: boolean;
  public multiCollapsed2: boolean;

  bonLivraisonFormGroup: FormGroup;

  @Input() apiParametres = "/bonlivraisons/getAllParametres"

  @Input() lienGetById = "/bonLivraisons/getById/"

  @Input() titreDocument = this.fonctionPartagesService.titreDocuments.bonLivraison
  
  @Input() titreDocumentTransfert = this.fonctionPartagesService.titreDocuments.bonLivraison

  @Input() modeTiere = this.fonctionPartagesService.modeTiere.client

  @Input() titreCrud = this.fonctionPartagesService.titreCrud.ajouter
  
  @Input() pageList="/bonLivraison/list"

  client: any = {}

  modeTransfert = false

  id = ""

  articles = []
  allArticles = []
  allClients = []
  
  reglements = []
  allModeReglement = []

  objectKeys = Object.keys;

  request = new BonLivraison()

  bonLivraison = new BonLivraison()

  tabNumbers = ["totalDC", "montantEscompte", "tFiscale", "montantPaye", "restPaye", "totalRedevance", "totalFodec"]

  erreurBonLivraison = {
    client: "",
    date: "",
    totalHT: "",
  }

  uniteMesures = []

  constructor(
    private notificationToast: ToastNotificationService,
    private http: HttpClient,
    private tokenStorageService:TokenStorageService,
    public informationGenerale: InformationsService,
    public fonctionPartagesService: FonctionPartagesService,
    private route: ActivatedRoute,
    private router: Router,) {

  }

  ngOnChanges(changes: SimpleChanges) {

  }

  getClientById(id){
    var clientSelectionners = this.allClients.filter(x => x.id == id)

    if(clientSelectionners.length > 0){
      this.client = clientSelectionners[0]
      return this.client.raisonSociale
    }

    return ""
  }

  getAllParametres() {
    let request = {
      societe: this.informationGenerale.idSocieteCurrent,
      exercice: this.informationGenerale.exerciceCurrent
    }

    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.apiParametres, request,this.tokenStorageService.getHeader()).subscribe(
      res => {
        let resultat: any = res
        this.isLoading = false
        if (resultat.status) {

          this.allArticles = resultat.articles
          this.allClients = resultat.clients
          
          if (this.titreCrud == this.fonctionPartagesService.titreCrud.ajouter) {
            this.bonLivraison.numero = resultat.numeroAutomatique
          }else if (this.titreCrud == this.fonctionPartagesService.titreCrud.transfert) {
            this.bonLivraison.numero = resultat.numeroAutomatique
          }

          this.uniteMesures = resultat.uniteMesures
          if(resultat.modeReglements){
            this.allModeReglement = resultat.modeReglements
          }
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  changePrixTotalEvent() {
  }

  ngOnInit(): void {
    this.isCollapsed = true;
    this.isCollapsed2 = true;
    this.multiCollapsed1 = true;
    this.multiCollapsed2 = true;
    if (this.titreCrud == this.fonctionPartagesService.titreCrud.ajouter) {
      this.bonLivraison.date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    } else {
      this.id = this.route.snapshot.paramMap.get('id');
      if (this.id.length > 1) {
        this.getBonLivraison(this.id)
      }
    }
  }

  
  isLoading = false

  checkTransferDocument(titreDocument,resultat) {

    var modeTransfert = false

    if (titreDocument == this.fonctionPartagesService.titreDocuments.devis) {
      if (resultat.transfertBonLivraison != "") {
        modeTransfert = resultat.transfertBonLivraison == ""
      } else {
        modeTransfert = resultat.transfertCommande == ""
      }
    } else if (titreDocument == this.fonctionPartagesService.titreDocuments.commande) {
      modeTransfert = resultat.transfertBonLivraison == ""
    } else if (titreDocument == this.fonctionPartagesService.titreDocuments.bonCommande) {
      modeTransfert = resultat.transfertBonAchat == ""
    } else if (titreDocument == this.fonctionPartagesService.titreDocuments.bonAchat) {
      modeTransfert = true
    } else if (titreDocument == this.fonctionPartagesService.titreDocuments.bonLivraison) {
      modeTransfert = true
    }

    return modeTransfert

  }

  getRequestDocumentTransfert(titreDocumentTransfer,request) {
    var request : any 

    request = this.request
    if(titreDocumentTransfer == this.fonctionPartagesService.titreDocuments.devis){
      request.idTypeTransfert = this.id
      request.typeTransfert = "Devis"
      return request
    }else if(titreDocumentTransfer == this.fonctionPartagesService.titreDocuments.commande){
      request.idTypeTransfert = this.id
      request.typeTransfert = "Commande"
      return request
    }else if(titreDocumentTransfer == this.fonctionPartagesService.titreDocuments.bonCommande){
      request.idTypeTransfert = this.id
      request.typeTransfert = "BonCommande"
      return request
    }else if(titreDocumentTransfer == this.fonctionPartagesService.titreDocuments.bonLivraison){
      request.idTypeTransfert = this.id
      request.typeTransfert = "BonLivraison"
      return request
    }else if(titreDocumentTransfer == this.fonctionPartagesService.titreDocuments.bonAchat){
      request.idTypeTransfert = this.id
      request.typeTransfert = "BonAchat"
      return request
    }
    return request
  }

  organiserArtticlesSelonNumero(articles){
    var articlesOrdonnees = []
    for(let i = 0; i < articles.length; i++){
      articlesOrdonnees.push(articles.filter(x => x.numero == (i+1))[0])
    }
    return articlesOrdonnees
  }

  getBonLivraison(id) {

    this.isLoading = true

    this.http.get(this.informationGenerale.baseUrl + this.lienGetById + id,this.tokenStorageService.getHeader()).subscribe(

      res => {
        this.isLoading = false
        let response: any = res

        console.log(response)

        if (response.status) {
          //this.reseteFormulaire()
          if(this.titreCrud == this.fonctionPartagesService.titreCrud.transfert){
            this.modeTransfert = this.checkTransferDocument(this.titreDocumentTransfert, response.resultat)
          }else{
            this.modeTransfert = this.checkTransferDocument(this.titreDocument, response.resultat)
          }
          
          this.request = response.resultat
          this.request.articles = this.organiserArtticlesSelonNumero(response.articles)
          for (let key in this.bonLivraison) {
            this.bonLivraison[key] = this.request[key]
          }
          this.bonLivraison.date = formatDate(new Date(this.bonLivraison.date), 'yyyy-MM-dd', 'en');
          this.articles = this.request.articles
          if (this.modeTiere == this.fonctionPartagesService.modeTiere.fournisseur) {
            this.bonLivraison.client = response.resultat.fournisseur
          }

          if(response.reglements){
            this.reglements = response.reglements
          }

          this.getAllParametres()
   
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }


  

  

}