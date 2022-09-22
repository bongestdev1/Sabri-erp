import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ImpressionDocumentService } from 'src/app/services/impression-document.service';
import { Client } from 'src/app/model/modelComerce/client/client';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';
import { BonLivraison } from '../models/bon-livraison';
import { FonctionsBonLivraisonService } from '../services/fonctions-bon-livraison.service';
import { GenerationPdfFactureService } from 'src/app/services/generation-pdf-facture.service';
import { saveAs } from 'file-saver';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-bon-livraison',
  templateUrl: './input-bon-livraison.component.html',
  styleUrls: ['./input-bon-livraison.component.scss']
})
export class InputBonLivraisonComponent implements OnInit {

  public isCollapsed: boolean;
  public isCollapsed2: boolean;
  public multiCollapsed1: boolean;
  public multiCollapsed2: boolean;

  bonLivraisonFormGroup: FormGroup;

  @Output() closeModalModifier = new EventEmitter<string>();
  
  @Input() id

  @Input() isPopup = false

  @Input() lienAjoute = "/bonLivraisons/newBonLivraison"

  @Input() lienGetDocuments = "/bonLivraisons/getCommandes/"

  @Input() lienupload = "/bonLivraisons/upload"

  @Input() apiList = "/bonLivraisons/listBonLivraisons"

  @Input() apiParametres = "/bonlivraisons/getAllParametres"

  @Input() lienModifie = "/bonLivraisons/modifierBonLivraison/"

  @Input() lienGetById = "/bonLivraisons/getById/"

  @Input() lienGetByIdDocumentPrecedent = "/commandes/getById/"

  @Input() apiAjouteReception = "/bonCommandes/addReception/"

  @Input() titreDocument = this.fonctionPartagesService.titreDocuments.bonLivraison

  @Input() titreDocumentPrecedent = null

  @Input() titreDocumentTransfert = this.fonctionPartagesService.titreDocuments.bonLivraison

  @Input() modeTiere = this.fonctionPartagesService.modeTiere.client

  @Input() titreCrud = this.fonctionPartagesService.titreCrud.ajouter

  @Input() pageList = "/bonLivraison/list"

  @Input() receptions = []

  ancienReglements = []

  modeTransfert = false

  articles = []
  allArticles = []
  allClients = []

  reglements = []
  allModeReglement = []
  allSituationReglement = []
  allTransporteurs = []

  objectKeys = Object.keys;

  request = new BonLivraison()

  bonLivraison = new BonLivraison()

  tabNumbers = ["totalDC", "montantEscompte", "tFiscale", "montantPaye", "restPaye", "totalRedevance", "totalFodec"]

  erreurBonLivraison = {
    client: "",
    date: "",
    totalHT: "",
  }

  @Output() closeModal = new EventEmitter<string>();

  @Input() isOpenModal = false

  documentDeTransfert

  uniteMesures = []

  charges = []
  chargesArticle = []
  allCharges = []
  chargeGlobals = []

  constructor(
    private notificationToast: ToastNotificationService,
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    public informationGenerale: InformationsService,
    public fonctionPartagesService: FonctionPartagesService,
    private route: ActivatedRoute,
    private router: Router,
    private impressionDocument: ImpressionDocumentService,
    private fonctionsBL: FonctionsBonLivraisonService,
    public generationPdfFacture: GenerationPdfFactureService) {

  }

  ngOnChanges(changes: SimpleChanges) {

  }

  clickImpression() {
    /*  var client = null
      var clients = this.allClients.filter(x => x.id == this.bonLivraison.client)
      if (clients.length > 0) {
        client = clients[0]
      }
      this.impressionDocument.generatePDF(this.titreDocument, this.bonLivraison, this.articles, client)
    */
  }

  isPrixVenteNotPrixAchat() {
    if (this.titreDocument == this.fonctionPartagesService.titreDocuments.bonRetourClient || this.titreDocument == this.fonctionPartagesService.titreDocuments.devis || this.titreDocument == this.fonctionPartagesService.titreDocuments.bonLivraison || this.titreDocument == this.fonctionPartagesService.titreDocuments.commande) {
      return true
    }
    return false
  }

  allOrdreEmissions = []
  getAllParametres() {
    let request = {
      societe: this.informationGenerale.idSocieteCurrent,
      exercice: this.informationGenerale.exerciceCurrent,
      isVenteContoire: this.isVenteContoire,
      isRetourVenteContoire: this.isRetourVenteContoire,
      isAchatContoire: this.isAchatContoire,
      isRetourAchatContoire: this.isRetourAchatContoire

    }

    this.isLoading = true
    this.http.post(this.informationGenerale.baseUrl + this.apiParametres, request, this.tokenStorageService.getHeader()).subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.allArticles = resultat.articles
          this.allClients = resultat.clients
          this.allOrdreEmissions = resultat.ordreEmissions

          if (this.allClients.filter(x => x.id == this.bonLivraison.client).length > 0) {
            this.client = this.allClients.filter(x => x.id == this.bonLivraison.client)[0]
          }

          if (this.titreCrud == this.fonctionPartagesService.titreCrud.ajouter) {
            this.bonLivraison.numero = resultat.numeroAutomatique
          } else if (this.titreCrud == this.fonctionPartagesService.titreCrud.transfert) {
            this.bonLivraison.numero = resultat.numeroAutomatique
          }

          this.uniteMesures = resultat.uniteMesures
          if (resultat.modeReglements) {
            this.allModeReglement = resultat.modeReglements
          }

          if (resultat.situationReglements) {
            this.allSituationReglement = resultat.situationReglements
          }

          if (resultat.charges) {
            this.allCharges = resultat.charges
          }

          if (resultat.transporteurs) {
            this.allTransporteurs = resultat.transporteurs
          }

          if (this.bonLivraison.projet || (this.titreDocumentPrecedent && this.bonLivraison.client && this.bonLivraison.client.length > 0)) {
            this.getBonDocuments()
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

  isVenteContoire = false
  isRetourVenteContoire = false
  isAchatContoire = false
  isRetourAchatContoire = false

  ngOnInit(): void {

    if (this.router.url.indexOf("venteComptoire") > -1) {
      this.isVenteContoire = true
    } else if (this.router.url.indexOf("retourVenteComptoire") > -1) {
      this.isRetourVenteContoire = true
    } else if (this.router.url.indexOf("achatComptoire") > -1) {
      this.isAchatContoire = true
    } else if (this.router.url.indexOf("retourAchatComptoire") > -1) {
      this.isRetourAchatContoire = true
    }

    this.isCollapsed = true;
    this.isCollapsed2 = true;
    this.multiCollapsed1 = true;
    this.multiCollapsed2 = true;

    this.bonLivraison.client = this.informationGenerale.clientCurrent

    if (this.titreCrud == this.fonctionPartagesService.titreCrud.ajouter) {
      this.bonLivraison.date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
      this.getAllParametres()
    } else {
      if(!this.isPopup){
        this.id = this.route.snapshot.paramMap.get('id');
      }
      if (this.id.length > 1) {
        this.getBonLivraison(this.id, this.lienGetById)
      }
    }

    if (this.titreDocument == this.fonctionPartagesService.titreDocuments.bonAchat) {
      this.bonLivraison.validationStockBonAchat = this.informationGenerale.valStockBACurrent
    }
  }

  controleInputs() {
    var resultat = this.fonctionsBL.controleInputs(this.bonLivraison, this.erreurBonLivraison)
    this.erreurBonLivraison = resultat.erreurBonLivraison
    return resultat.isValid
  }

  isLoading = false

  checkTransferDocument(titreDocument, resultat) {
    return this.fonctionsBL.checkTransferDocument(titreDocument, resultat)
  }

  getRequestDocumentTransfert(id, titreDocumentTransfer, request) {
    return this.fonctionsBL.getRequestDocumentTransfert(id, titreDocumentTransfer, request)
  }

  getBonLivraison(id, url) {

    if (!id || id.length === 0) {
      return
    }
    this.isLoading = true

    console.log(url)

    this.http.get(this.informationGenerale.baseUrl + url + id, this.tokenStorageService.getHeader()).subscribe(

      res => {
        this.isLoading = false
        let response: any = res

        console.log(response)
        if (response.status) {
          //this.reseteFormulaire()
          if (this.titreCrud == this.fonctionPartagesService.titreCrud.transfert) {
            this.modeTransfert = this.checkTransferDocument(this.titreDocumentTransfert, response.resultat)
          } else {
            this.modeTransfert = this.checkTransferDocument(this.titreDocument, response.resultat)
          }

          this.request = response.resultat

          if (this.titreDocumentTransfert == this.fonctionPartagesService.titreDocuments.commande) {
            if (response.resultat.transfertBonLivraison.length > 1) {
              this.notificationToast.showError("Votre " + this.titreDocumentTransfert + " a déjà été transféré !")
              this.router.navigate([this.pageList]);
            }
          } else if (this.titreDocumentTransfert == this.fonctionPartagesService.titreDocuments.bonCommande) {
            if (response.resultat.transfertBonAchat.length > 1) {
              this.notificationToast.showError("Votre " + this.titreDocumentTransfert + " a déjà été transféré !")
              this.router.navigate([this.pageList]);
            }
          }

          this.request.articles = []
          this.articles = []
          var articles = this.fonctionsBL.organiserArtticlesSelonNumero(response.articles)

          this.request.articles = JSON.parse(JSON.stringify(articles))

          this.articles = JSON.parse(JSON.stringify(articles))

          for (let key in this.bonLivraison) {
            this.bonLivraison[key] = this.request[key]
          }

          this.bonLivraison.date = formatDate(new Date(this.bonLivraison.date), 'yyyy-MM-dd', 'en');

          if (this.modeTiere == this.fonctionPartagesService.modeTiere.fournisseur) {
            this.bonLivraison.client = response.resultat.fournisseur
          }

          if (this.titreDocument == this.fonctionPartagesService.titreDocuments.bonAchat) {
            this.charges = this.request['charges']
          }

          if (response.reglements && this.titreCrud != this.fonctionPartagesService.titreCrud.transfert) {
            this.reglements = response.reglements
            this.ancienReglements = response.reglements
          }

          if (response.receptions) {
            this.receptions = response.receptions
          }

          if (response.documentDeTransfert) {
            this.documentDeTransfert = response.documentDeTransfert
          }

          if (this.titreCrud === this.fonctionPartagesService.titreCrud.transfert || this.titreDocumentPrecedent) {
            this.bonLivraison.montantPaye = 0
            this.bonLivraison.restPayer = this.bonLivraison.montantTotal
            this.receptions = []
            this.charges = []
            this.reglements = []
          }

          this.bonLivraison.date = formatDate(new Date(this.bonLivraison.date), 'yyyy-MM-dd', 'en');
    
          this.getAllParametres()

          if (!this.bonLivraison.coutTransport) {
            this.bonLivraison.coutTransport = 0
          }

        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }

  ajoutImage() {
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }

    if (!this.imageData) {
      this.ajoutBonLivraison()
      return
    }

    if (this.isLoading) {
      return
    }

    var request = new FormData();
    if (this.captureFournisseur) {
      request.append("myFiles", this.captureFournisseur, this.captureFournisseur.filename);
    }

    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.lienupload, request, this.tokenStorageService.getHeader()).subscribe(

      res => {
        this.isLoading = false
        this.bonLivraison.captureBonLivraisonFournisseur = res[0]
        this.ajoutBonLivraison()
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  ajoutBonLivraison() {
    if (this.titreCrud == this.fonctionPartagesService.titreCrud.modifier) {
      this.modifierBonLivraison()
    } else if (this.titreCrud == this.fonctionPartagesService.titreCrud.transfert) {
      if (this.modeTransfert) {
        this.ajoutBonLivraison2()
      } else {
        this.notificationToast.showSuccess("Votre " + this.titreDocumentTransfert + " déjà transféré !")
      }
    } else {
      this.ajoutBonLivraison2()
    }
  }

  ajoutBonLivraison2() {

    if (this.isLoading) {
      return
    }

    if (this.client.nbFactureNonPaye > 0 && this.client.nbFactureNonPaye <= this.nbLivsClientNonPayee && this.titreDocument == this.fonctionPartagesService.titreDocuments.bonLivraison) {
      this.notificationToast.showError("les nombres des bons livraisons non payées atteint le maximum !")
      return
    }

    if (this.client.plafondCredit && this.client.plafondCredit != 0 && Math.abs(this.client.credit - this.bonLivraison.montantTotal) > this.client.plafondCredit && this.titreDocument == this.fonctionPartagesService.titreDocuments.bonLivraison) {
      this.notificationToast.showError("Le crédit du client est passé le plafond!")
      return
    }

    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }

    for (let key in this.bonLivraison) {
      this.request[key] = this.bonLivraison[key]
    }

    this.request.articles = this.articles
    this.request.societe = this.informationGenerale.idSocieteCurrent
    this.request.exercice = this.informationGenerale.exerciceCurrent + ""
    if (this.titreDocument == this.fonctionPartagesService.titreDocuments.bonAchat) {
      this.request['charges'] = this.charges
    }

    let request: any = {}
    request = this.request
    if (this.modeTiere == this.fonctionPartagesService.modeTiere.fournisseur) {
      request.fournisseur = request.client
    }
    request.expeditions = []
    this.isLoading = true

    if (this.titreCrud == this.fonctionPartagesService.titreCrud.transfert && this.idDocument === "") {
      request = this.getRequestDocumentTransfert(this.id, this.titreDocumentTransfert, request)
    }

    if (this.idDocument.length > 0) {
      request = this.getRequestDocumentTransfert(this.idDocument, this.titreDocumentPrecedent, request)
    }

    request.reglements = this.reglements

    request.isVenteContoire = this.isVenteContoire
    request.isRetourVenteContoire = this.isRetourVenteContoire
    request.isAchatContoire = this.isAchatContoire
    request.isRetourAchatContoire = this.isRetourAchatContoire

    if (this.titreCrud == this.fonctionPartagesService.titreCrud.transfert && this.idDocument === "") {
      request = this.getRequestDocumentTransfert(this.id, this.titreDocumentTransfert, request)
    }

    this.http.post(this.informationGenerale.baseUrl + this.lienAjoute, request, this.tokenStorageService.getHeader()).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          //this.reseteFormulaire()
          this.notificationToast.showSuccess("Votre document est bien enregistrée !")
          if (!this.isPopup) {
            this.router.navigate([this.pageList]);
          } else {
            this.closeModal.emit()
          }
        } else {
          this.notificationToast.showError(this.fonctionPartagesService.getMessageBackend(resultat.message))
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }

  modifierBonLivraison() {
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }

    for (let key in this.bonLivraison) {
      this.request[key] = this.bonLivraison[key]
    }

    if (this.request.expeditions) {
      for (let j = 0; j < this.request.articles.length; j++) {
        var sommeQuantite = 0
        for (let i = 0; i < this.request.expeditions.length; i++) {
          for (let k = 0; k < this.request.expeditions[i].articles.length; k++) {
            if (this.request.articles[j].article == this.request.expeditions[i].articles[k].article) {
              sommeQuantite += this.request.expeditions[i].articles[k].quantiteALivree
            }
          }
        }
        this.request.articles[j].quantiteLivree = sommeQuantite
      }
    }

    if (this.titreDocument == this.fonctionPartagesService.titreDocuments.bonAchat) {
      this.request['charges'] = this.charges
    }

    this.request.articles = this.articles
    let request: any = {}
    for (let key in this.request) {
      request[key] = this.request[key]
    }
    request.reglements = this.reglements
    if (this.isLoading) {
      return
    }
    
    this.isLoading = true
    this.http.post(this.informationGenerale.baseUrl + this.lienModifie + this.id, request, this.tokenStorageService.getHeader()).subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res


        if (resultat.status) {
          this.notificationToast.showSuccess("Votre document est bien modifiée !")
          this.request = resultat.resultat
          if (!this.isPopup) {
            this.router.navigate([this.pageList]);
          } else {
            this.closeModal.emit()
          }
        } else {
          this.notificationToast.showError(this.fonctionPartagesService.getMessageBackend(resultat.message))
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }

  reseteFormulaire() {
    for (let key in this.erreurBonLivraison) {
      this.bonLivraison[key] = ""
    }
  }

  calculerRestePayer() {
    var montantPaye = Number(this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(this.bonLivraison.montantPaye))
    var totalTTC = Number(this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(this.bonLivraison.totalTTC))
    this.bonLivraison.restPayer = Number(this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(totalTTC - montantPaye))
  }

  //autocomplete client

  client: any = {}
  setClientID(id) {
    this.bonLivraison.client = id
    let client: any = this.allClients.filter(x => x.id == id)
    if (client.length == 0) {
      this.client = {}
      return
    }
    this.client = new Client()
    for (let key in this.client) {
      if (key != undefined) {
        this.client[key] = client[0][key]
      }
    }

    if (this.titreDocumentPrecedent) {
      this.getBonDocuments()
    }

    if (this.titreDocument == this.fonctionPartagesService.titreDocuments.bonLivraison || this.titreDocument == this.fonctionPartagesService.titreDocuments.commande) {
      this.verifierClient()
    }
    //this.bonLivraisonsClient(id)
  }

  //pour calculer le nombre des bons livraisons non payées par un id client 
  lienBonLivraisonsClient = "/bonLivraisons/bonLivraisonsClient/"
  nbLivsClientNonPayee = 0
  bonLivraisonsClient(idClient) {
    this.http.get(this.informationGenerale.baseUrl + this.lienBonLivraisonsClient + idClient, this.tokenStorageService.getHeader()).subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.nbLivsClientNonPayee = resultat.bonLivraisonsClient
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  //open modal ajout Client
  isOpenModalAjout = false
  idAjoutClientModal = ""
  typeElement
  closeModalAjout() {
    this.isOpenModalAjout = false
    this.typeElement = ""
    this.getAllParametres()
  }

  openModalAjoutClient() {
    if (this.modeTiere == this.fonctionPartagesService.modeTiere.client) {
      this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterClient
    } else {
      this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterFournisseur
    }

    this.isOpenModalAjout = true
  }

  clickIsValid() {
    if (this.bonLivraison.isValid == "oui") {
      this.bonLivraison.isValid = "non"
    } else {
      this.bonLivraison.isValid = "oui"
    }
  }

  clickIsValid2() {
    if (this.bonLivraison.validationStockBonAchat == "oui") {
      this.bonLivraison.validationStockBonAchat = "non"
    } else {
      this.bonLivraison.validationStockBonAchat = "oui"
    }
  }

  //start inserer Client ou fournisseur avant le selectionner article
  verifierClient() {
    var resultat = this.fonctionsBL.verifierClient(this.client)

    this.isOpenModalBlockerClient = resultat.isOpenModalBlockerClient
    this.messageBlockerClient = resultat.messageBlockerClient

    if (resultat.isOpenModalBlockerClient) {
      this.client = {}
      this.bonLivraison.client = ""
    }

    return !resultat.isOpenModalBlockerClient
  }

  isOpenModalBlockerClient = false
  messageBlockerClient = ""
  closeBlockerClient() {
    this.isOpenModalBlockerClient = false
  }

  //end inserer Client ou fournisseur avant le selectionner article

  //autocomplete OM
  keySelectedOM = "numero"
  objetOM = {
    numero: "Numéro",
  }

  setOMID(id) {
    this.bonLivraison.ordreMission = id
  }

  imageData: string;
  captureFournisseur = null

  onFileSelect(event: Event) {
    this.captureFournisseur = (event.target as HTMLInputElement).files[0];
    if (this.captureFournisseur) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };

      console.log(this.imageData)
      reader.readAsDataURL(this.captureFournisseur);
    }
  }

  saveFileFacture() {
    this.http.get(this.informationGenerale.baseUrl + '/' + this.bonLivraison.captureBonLivraisonFournisseur, { responseType: "blob", headers: { 'Accept': 'application/pdf' } })
      .subscribe(blob => {
        console.log(blob)
        saveAs(blob, this.bonLivraison.captureBonLivraisonFournisseur);
      });
  }

  replacePath(chaine) {
    console.log(chaine)
    console.log(chaine.replace('\\', '_'))
    return chaine.replace('\\', '_')
  }

  documents = []
  idDocument = ""

  projetsClient = []

  setProjetID(id) {
    this.bonLivraison.projet = id
  }

  openModalAjoutTransporteur() {
    this.isOpenModalAjout = true
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterTransporteur
  }

  openModalAjoutProjetClient() {
    this.isOpenModalAjout = true
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajoutProjetClient
  }

  getAdresseProjet() {
    if (this.bonLivraison.projet && this.bonLivraison.projet.length > 5) {
      if (this.projetsClient.filter(x => x.id === this.bonLivraison.projet).length > 0) {
        return this.projetsClient.filter(x => x.id === this.bonLivraison.projet)[0].adresse
      }
    }
  }

  getVehiculeTransporteur() {
    if (this.bonLivraison.transporteur && this.bonLivraison.transporteur.length > 5) {
      if (this.allTransporteurs.filter(x => x.id === this.bonLivraison.transporteur).length > 0) {
        return this.allTransporteurs.filter(x => x.id === this.bonLivraison.transporteur)[0].numVehicule
      }
    }
  }

  setTransporteurID(id) {
    this.bonLivraison.transporteur = id
  }

  getBonDocuments() {
    if (this.isLoading) {
      return
    }

    this.documents = []
    this.isLoading = true
    this.http.get(this.informationGenerale.baseUrl + this.lienGetDocuments + this.informationGenerale.idSocieteCurrent + "/" + this.client.id, this.tokenStorageService.getHeader()).subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {

          if (resultat.projetsClient) {
            this.projetsClient = resultat.projetsClient
          }

          this.documents = resultat.documents

          if (this.documents.filter(x => x.id === this.idDocument).length === 0) {
            this.idDocument = ""
          }

          if (resultat.idFournisseur) {
            if (resultat.idFournisseur !== this.client.id) {
              this.getBonDocuments()
            }
          } else {
            if (resultat.idClient !== this.client.id) {
              this.getBonDocuments()
            }
          }
        }
      }, err => {
        this.isLoading = false
        console.log(err)
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }


  setDocumentID(id) {
    if (id && id.length > 0) {
      console.log(id)
      this.idDocument = id
      this.getBonLivraison(this.idDocument, this.lienGetByIdDocumentPrecedent)
    }
  }

  openModalAjoutDocument() {
    this.isOpenModalAjout = true
    this.typeElement = this.fonctionPartagesService.getModalDocument(this.titreDocumentPrecedent)
  }
  

}