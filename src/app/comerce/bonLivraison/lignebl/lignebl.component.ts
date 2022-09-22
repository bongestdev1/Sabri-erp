import { Article } from 'src/app/model/modelComerce/article/article';
import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';
import { TotalsDocument } from './models/totals-document'
import { ShemaItemArticleSelected } from './models/shema-item-article-selected';
import { ShemaItemArticleSelectedAchat } from './models/shema-item-article-selected-achat';
import { ShemaArticle } from './models/shema-article';
import { ShemaArticleAchat } from './models/shema-article-achat';
import { ShemaArticle2 } from './models/shema-article2';
import { ShemaArticle2Achat } from './models/shema-article2-achat';
import { ShemaArticle2Number } from './models/shema-article2-number';
import { ShemaArticle2Quantite } from './models/shema-article2-quantite';
import { ShemaMultiSortieArticle } from './models/shema-multi-sortie-article';
import { ShemaMultiSortieArticleAchat } from './models/shema-multi-sortie-article-achat';
import { UtilesBonLivraisonService } from './services/utiles-bon-livraison.service';
import { InputBonLivraisonComponent } from '../input-bon-livraison/input-bon-livraison.component';

@Component({
  selector: 'app-lignebl',
  templateUrl: './lignebl.component.html',
  styleUrls: ['./lignebl.component.scss'],
  providers: [InputBonLivraisonComponent]
})
export class LigneblComponent implements OnInit {

  articleFormGroup: FormGroup;

  lienAjoute = "/articles/newArticle"

  objectKeys = Object.keys;

  erreurArticle = {
    quantiteVente: "",
    reference: "",
    prixVenteHTReel: "",
  }

  // begin autocomplete articles
  keySelectedArticle = "reference"

  @Input() articles

  @Input() uniteMesures = []

  @Input() bonLivraison
  @Input() articlesSelected

  @Output() changePrixTotalEvent = new EventEmitter<string>();

  @Output() getAllParametresEvent = new EventEmitter<string>();

  @Input() client

  @Input() isDetails = "non"
  @Input() titreDocument

  @Input() titreCrud = this.fonctionPartagesService.titreCrud.ajouter

  modifierPrixTotalBL() {
    this.changePrixTotalEvent.emit();

    var totals = new TotalsDocument()

    for (let i = 0; i < this.articlesSelected.length; i++) {
      var quantite = 0
      if (this.isPrixVenteNotPrixAchat()) {
        quantite = this.articlesSelected[i].quantiteVente
      } else {
        quantite = this.articlesSelected[i].quantiteAchat
      }

      totals.totalTTC += this.articlesSelected[i].totalTTC
      totals.totalRemise += this.articlesSelected[i].totalRemise
      totals.totalTVA += this.articlesSelected[i].totalTVA
      totals.totalHT += this.articlesSelected[i].totalHT
      if (this.isPrixVenteNotPrixAchat()) {
        totals.totalGainCommerciale += this.articlesSelected[i].totalGainCommerciale
        totals.totalGainReel += this.articlesSelected[i].totalGainReel
      }
      totals.totalFodec += this.articlesSelected[i].prixFodec * quantite * (1 + this.articlesSelected[i].tauxTVA / 100)
      totals.totalDC += this.articlesSelected[i].prixDC * quantite * (1 + this.articlesSelected[i].tauxTVA / 100)
      totals.totalRedevance += this.articlesSelected[i].redevance * quantite
    }

    this.bonLivraison.timbreFiscale = this.fonctionPartagesService.parametres.prixTimbreFiscale

    if (this.client && this.isPrixVenteNotPrixAchat()) {
      if (this.client.exemptTimbreFiscale == "oui" || (this.titreDocument == this.fonctionPartagesService.titreDocuments.bonLivraison && this.fonctionPartagesService.parametres.validationTimbreFiscaleBonLiv == "non")) {
        this.bonLivraison.timbreFiscale = 0
      }
    }


    if (!this.isPrixVenteNotPrixAchat()) {
      var societe = this.informationGenerale.getSocieteCurrentObject()
      this.client.exemptTimbreFiscale == societe.exemptTimbreFiscale

      if (this.client.exemptTimbreFiscale == "oui" || (this.titreDocument == this.fonctionPartagesService.titreDocuments.bonReception && this.fonctionPartagesService.parametres.validationTimbreFiscaleBonRec == "non")) {
        this.bonLivraison.timbreFiscale = 0
      }
    }

    for (let key in totals) {
      this.bonLivraison[key] = totals[key]
    }

    var montantPaye = Number(this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(this.bonLivraison.montantPaye))
    this.bonLivraison.montantTotal = Number(this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(totals.totalTTC + this.bonLivraison.timbreFiscale))

    if (!this.isPrixVenteNotPrixAchat()) {
      this.bonLivraison.totalTTC = this.bonLivraison.totalTTC + this.bonLivraison.totalFodec + this.bonLivraison.totalDC + this.bonLivraison.timbreFiscale
      this.bonLivraison.montantTotal = this.bonLivraison.totalTTC
    }

    //this.bonLivraison.montantTotal = this.calculeRemise(this.bonLivraison.montantTotal)

    //this.bonLivraison.totalTTC = this.bonLivraison.montantTotal
    this.bonLivraison.restPayer = Number(this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(this.bonLivraison.montantTotal - montantPaye))

  }

  calculeRemise(x) {
    if (this.client.remise == undefined) {
      this.client.remise = 0
      return (x)
    }
    return (x * (1 - this.client.remise / 100))
  }

  getUniteById(id) {
    var libelle = ""
    var unites = this.uniteMesures.filter(x => x.id == id)

    if (unites.length > 0) {
      return unites[0].libelle
    }

    return libelle
  }

  sousProduits = []
  stocks = []
  changeSousProduit() {

  }

  itemArticleSelected: any = new ShemaItemArticleSelected()

  shemaArticle: any = new ShemaArticle()

  shemaMultiSortie: any = new ShemaMultiSortieArticle()
  shemaArticle2: any = new ShemaArticle2()

  shemaArticle2Number = new ShemaArticle2Number()

  shemaArticle2Quantite = new ShemaArticle2Quantite()

  isLoading = false

  isPrixVenteNotPrixAchat() {
    if (this.titreDocument == this.fonctionPartagesService.titreDocuments.bonRetourClient || this.titreDocument == this.fonctionPartagesService.titreDocuments.devis || this.titreDocument == this.fonctionPartagesService.titreDocuments.bonLivraison || this.titreDocument == this.fonctionPartagesService.titreDocuments.commande) {
      return true
    }
    return false
  }

  resetItemSelecte() {
    if (this.isPrixVenteNotPrixAchat()) {
      this.itemArticleSelected = new ShemaItemArticleSelected()
    } else {
      this.itemArticleSelected = new ShemaItemArticleSelectedAchat()
    }
  }

  setArticleID(id) {

    if (this.client.raisonSociale == undefined) {
      this.itemArticleSelected.article = ""
      this.openInsererClientDabord()
      this.resetItemSelecte()
      return
    }

    var articles = this.articles.filter(x => x.id == id)
    if (articles.length > 0) {
      if (Number(articles[0].qteEnStock) < 0 && this.isPrixVenteNotPrixAchat() && articles[0].venteAvecStockNegative && articles[0].venteAvecStockNegative === "non") {
        this.openBlockedStockNegative()
        this.itemArticleSelected.article = ""
        this.resetItemSelecte()
        return
      }

      var element = articles[0]
      for (let key in element) {
        if (this.itemArticleSelected[key] != undefined) {
          if (Number.isFinite(this.itemArticleSelected[key])) {
            this.itemArticleSelected[key] = Number(element[key])
          } else {
            this.itemArticleSelected[key] = element[key]
          }
        }
      }

      if (!this.isPrixVenteNotPrixAchat()) {
        this.itemArticleSelected.prixAchatHTReel = Number(element.prixFourn) - Number(element.remiseF) / 100 * element.prixFourn
        this.itemArticleSelected.prixTTC = Number(element.prixAchatTTC)
        this.itemArticleSelected.quantiteAchat = 1
        this.itemArticleSelected.tauxRemise = this.itemArticleSelected.remiseF
        this.itemArticleSelected.prixAchatHTReel2 = this.itemArticleSelected.prixAchatHTReel * this.itemArticleSelected.coefficient
        this.itemArticleSelected.quantiteAchat2 = 1 * this.itemArticleSelected.coefficient
      } else {
        this.itemArticleSelected.prixVenteHT = Number(element.prixVenteHT)
        this.itemArticleSelected.prixVenteHTReel = Number(element.prixVenteHT)
        if (articles.length > 0) {
          this.itemArticleSelected.prixVenteHTReel = this.setPrixVenteSelonQuantiteAndClient(1, articles[0], this.client)
        }

        this.itemArticleSelected.prixTTC = Number(element.prixTTC) + Number(this.itemArticleSelected.redevance)
        this.itemArticleSelected.quantiteVente = 1
        this.itemArticleSelected.tauxRemise = (this.itemArticleSelected.prixVenteHT - this.itemArticleSelected.prixVenteHTReel) / this.itemArticleSelected.prixVenteHT * 100
        this.itemArticleSelected.prixVenteHTReel2 = this.itemArticleSelected.prixVenteHT * this.itemArticleSelected.coefficient
        this.itemArticleSelected.quantiteVente2 = 1 * this.itemArticleSelected.coefficient
      }

      this.sousProduits = element.sousProduits
      this.stocks = element.stocks

      this.itemArticleSelected.totalTTC = 0
      this.itemArticleSelected.totalTVA = 0
      this.itemArticleSelected.totalHT = 0
      this.itemArticleSelected.article = id

      if (this.isPrixVenteNotPrixAchat()) {
        this.changeQuantiteVente()
      }

      this.changePrixTotal()
    } else {
      this.resetItemSelecte()
    }
  }

  setMargePrix(item, marge, margePourcentage) {
    var prixAchat = Number(item.prixAchat)
    if(item.margeAppliqueeSur !== "Achat" && item.prixRevient){
      prixAchat = Number(item.prixRevient)
    }

    var prixSpecifique = prixAchat + margePourcentage * 0.01 * prixAchat +  Number(marge)
    return prixSpecifique
  }

  setPrixVenteSelonQuantiteAndClient(qte, article, client) {

    var prixVenteReel = 0

    if (client.id == undefined) {
      return article.prixVenteHT
    }

    var prixWithQuantitesWithClient = article.prixSpecifiques.filter(x => x.client == client.id && x.quantiteMax != 0 && x.quantiteMin != 0)

    for (let i = 0; i < prixWithQuantitesWithClient.length; i++) {
      if (qte >= prixWithQuantitesWithClient[i].quantiteMin && qte <= prixWithQuantitesWithClient[i].quantiteMax) {
        prixVenteReel = this.setMargePrix(article, prixWithQuantitesWithClient[i].marge, prixWithQuantitesWithClient[i].margePourcentage)
      }
    }

    var prixWithQuantitesWithClient = article.prixSpecifiques.filter(x => x.client == client.id && x.quantiteMax == 0 && x.quantiteMin == 0)

    if (prixVenteReel == 0) {
      for (let i = 0; i < prixWithQuantitesWithClient.length; i++) {
        prixVenteReel = this.setMargePrix(article, prixWithQuantitesWithClient[i].marge, prixWithQuantitesWithClient[i].margePourcentage)
      }
    }

    if (prixVenteReel == 0) {
      var prixWithQuantitesSansClient = article.prixSpecifiques.filter(x => x.client == null && x.quantiteMax != 0 && x.quantiteMin != 0)
      for (let i = 0; i < prixWithQuantitesSansClient.length; i++) {
        if (qte >= prixWithQuantitesSansClient[i].quantiteMin && qte <= prixWithQuantitesSansClient[i].quantiteMax) {
          prixVenteReel = this.setMargePrix(article, prixWithQuantitesSansClient[i].marge, prixWithQuantitesSansClient[i].margePourcentage)
        }
      }
    }

    if (prixVenteReel == 0) {
      var prixWithQuantitesSansClient = article.prixSpecifiques.filter(x => x.client == null && x.quantiteMax == 0 && x.quantiteMin == 0)
      for (let i = 0; i < prixWithQuantitesSansClient.length; i++) {
        prixVenteReel = this.setMargePrix(article, prixWithQuantitesSansClient[i].marge, prixWithQuantitesSansClient[i].margePourcentage)
      }
    }

    if (prixVenteReel == 0) {
      prixVenteReel = article.prixVenteHT
    }

    return prixVenteReel
  }


  changePrixTotal() {
    var articles = this.articles.filter(x => x.id == this.itemArticleSelected.article)

    if (articles.length > 0) {

      if (this.isPrixVenteNotPrixAchat()) {
        if (articles[0].sansRemise == "oui") {
          //this.itemArticleSelected.prixVenteHTReel = this.setPrixVenteSelonQuantiteAndClient(this.itemArticleSelected.quantiteVente, articles[0], this.client)
          this.itemArticleSelected.tauxRemise = (this.itemArticleSelected.prixVenteHT - this.itemArticleSelected.prixVenteHTReel) / this.itemArticleSelected.prixVenteHT * 100
        }
      }

      if (this.titreDocument === this.fonctionPartagesService.titreDocuments.bonReception || this.titreDocument === this.fonctionPartagesService.titreDocuments.bonCommande) {
        var resultatVerifieStockMax = this.verifierStockMax(this.itemArticleSelected.article)
        if (!resultatVerifieStockMax.isValid) {
          this.typeAction = this.listTypeAction.changePrixTotal
          this.openStockMax(resultatVerifieStockMax.stockMax, resultatVerifieStockMax.qteDiff)
          return
        }
      }

    }

    this.itemArticleSelected = this.calculTotals(this.itemArticleSelected)
    document.getElementById("affichePrixTotal").setAttribute("class", "")
    setTimeout(() => {
      document.getElementById("affichePrixTotal").setAttribute("class", "headtext")
    }, 20)
  }

  verifierStockMax(article) {
    var encienQte = 0
    this.bonLivraison.articles.forEach(x => {
      if (x.article === article) {
        encienQte += x.quantiteAchat
      }
    })

    var newQte = 0
    this.articlesSelected.forEach(x => {
      if (x.article === article) {
        newQte += x.quantiteAchat
      }
    })

    if (this.itemArticleSelected.article === article) {
      newQte += this.itemArticleSelected.quantiteAchat
    }

    var articles = this.articles.filter(x => x.id == article)

    if (articles.length > 0) {
      var qteDiff = (Number(articles[0].stockMax)-Number(articles[0].qteEnStock) - newQte + encienQte )
      if (Number(articles[0].stockMax) != NaN && Number(articles[0].stockMax) != 0 && qteDiff < 0) {
        return { isValid: false, stockMax: articles[0].stockMax, qteDiff: qteDiff }
      }
      return { isValid: true, stockMax: articles[0].stockMax, qteDiff: qteDiff }
    }

    return { isValid: false, stockMax: 0, qteDiff: 0 }

  }

  verifierStockNegative(article) {
    
    var encienQte = 0
    this.bonLivraison.articles.forEach(x => {
      if (x.article === article) {
        encienQte += x.quantiteVente
      }
    })

    var newQte = 0
    this.articlesSelected.forEach(x => {
      if (x.article === article) {
        newQte += x.quantiteVente
      }
    })

    if (this.itemArticleSelected.article === article) {
      newQte += this.itemArticleSelected.quantiteVente
    }

    var articles = this.articles.filter(x => x.id == article)

    if (articles.length > 0) {
      var qteDiff = (Number(articles[0].qteEnStock) - newQte + encienQte)
      if (qteDiff < 0 && articles[0].venteAvecStockNegative && articles[0].venteAvecStockNegative === "non") {
        return { isValid: false, stockMax: articles[0].stockMax, qteDiff: qteDiff }
      }
      return { isValid: true, stockMax: articles[0].stockMax, qteDiff: qteDiff }

    }

    return { isValid: false, stockMax: 0, qteDiff: 0 }

  }

  changeQuantiteVente() {
    var articles = this.articles.filter(x => x.id == this.itemArticleSelected.article)
    if (articles.length > 0) {


      if (this.isPrixVenteNotPrixAchat()) {
        var result = this.verifierStockNegative(this.itemArticleSelected.article)
        if (!result.isValid) {
          this.openBlockedStockNegative()
          this.itemArticleSelected.quantiteVente += (result.qteDiff)
          
          
          if (this.itemArticleSelected.quantiteVente < 0) {
            this.itemArticleSelected.quantiteVente = 0
          }
        }
      }

      //this.itemArticleSelected.prixVenteHTReel = this.setPrixVenteSelonQuantiteAndClient(this.itemArticleSelected.quantiteVente, articles[0], this.client)
      //this.itemArticleSelected.tauxRemise = (this.itemArticleSelected.prixVenteHT - this.itemArticleSelected.prixVenteHTReel) / this.itemArticleSelected.prixVenteHT * 100
      this.changePrixTotal()
    }
  }

  changeQuantiteAchat() {
    var articles = this.articles.filter(x => x.id == this.itemArticleSelected.article)
    if (articles.length > 0) {
      //this.itemArticleSelected.prixVenteHTReel = this.setPrixVenteSelonQuantiteAndClient(this.itemArticleSelected.quantiteVente, articles[0], this.client)
      //this.itemArticleSelected.tauxRemise = (this.itemArticleSelected.prixVenteHT - this.itemArticleSelected.prixVenteHTReel) / this.itemArticleSelected.prixVenteHT * 100
      this.changePrixTotal()
    }
  }


  changeRemiseFournisseur() {
    var articles = this.articles.filter(x => x.id == this.itemArticleSelected.article)
    if (articles.length > 0) {
      this.itemArticleSelected.prixVenteHTReel = this.setPrixVenteSelonQuantiteAndClient(this.itemArticleSelected.quantiteVente, articles[0], this.client)
      //this.itemArticleSelected.tauxRemise = (this.itemArticleSelected.prixVenteHT - this.itemArticleSelected.prixVenteHTReel) / this.itemArticleSelected.prixVenteHT * 100
      this.changePrixTotal()
    }
  }

  changeQuantiteAchat2Array(numero) {
    this.articlesSelected[numero - 1].quantiteAchat = this.articlesSelected[numero - 1].quantiteAchat2 / this.articlesSelected[numero - 1].coefficient
    this.changePrixTotalArray(numero)
  }

  changeQuantite2Array(numero) {
    this.articlesSelected[numero - 1].quantiteVente = this.articlesSelected[numero - 1].quantiteVente2 * this.articlesSelected[numero - 1].coefficient
    this.changePrixTotalArray(numero)
  }

  changePrixVenteHTReelArray(numero) {
    var prixVenteApresTauxRemise = this.articlesSelected[numero - 1].prixVenteHT * (1 - this.articlesSelected[numero - 1].tauxRemise * 100)
    this.articlesSelected[numero - 1].remiseParMontant2 = this.articlesSelected[numero - 1].prixVenteHTReel - prixVenteApresTauxRemise
    this.changePrixTotalArray(numero)
  }

  changePrixVenteHTReel2Array(numero) {
    this.articlesSelected[numero - 1].prixVenteHTReel = this.articlesSelected[numero - 1].prixVenteHTReel2 / this.articlesSelected[numero - 1].coefficient
    this.articlesSelected[numero - 1].tauxRemise = (this.articlesSelected[numero - 1].prixVenteHT - this.articlesSelected[numero - 1].prixVenteHTReel) / this.articlesSelected[numero - 1].prixVenteHT * 100
    this.changePrixTotalArray(numero)
  }

  changePrixTotalArray(numero) {
    if (!this.isPrixVenteNotPrixAchat()) {
      var articles = this.articles.filter(x => x.id == this.articlesSelected[numero - 1].article)
      if (articles.length > 0) {
        if (articles[0].sansRemise == "oui") {
          //this.articlesSelected[numero - 1].prixVenteHTReel = this.setPrixVenteSelonQuantiteAndClient(this.articlesSelected[numero - 1].quantiteVente, articles[0], this.client)
          this.articlesSelected[numero - 1].tauxRemise = (this.articlesSelected[numero - 1].prixVenteHT - this.articlesSelected[numero - 1].prixVenteHTReel) / this.articlesSelected[numero - 1].prixVenteHT * 100
        }
      }
    }

    var articles = this.articles.filter(x => x.id == this.articlesSelected[numero - 1].article)
    if (articles.length > 0) {

      if (this.isPrixVenteNotPrixAchat()) {
        var result = this.verifierStockNegative(this.articlesSelected[numero - 1].article)
        if (!result.isValid) {
          this.openBlockedStockNegative()
          this.articlesSelected[numero - 1].quantiteVente += (result.qteDiff)
          if (this.articlesSelected[numero - 1].quantiteVente < 0) {
            this.articlesSelected[numero - 1].quantiteVente = 0
          }
        }
      }


      if (this.titreDocument === this.fonctionPartagesService.titreDocuments.bonReception || this.titreDocument === this.fonctionPartagesService.titreDocuments.bonCommande) {
        var resultatVerifieStockMax = this.verifierStockMax(articles[0].id)
        if (!resultatVerifieStockMax.isValid) {
          this.typeAction = this.listTypeAction.changePrixTotalArray
          this.openStockMax(resultatVerifieStockMax.stockMax, resultatVerifieStockMax.qteDiff)
          this.parametreStockMax.position = numero - 1
          return
        }
      }


    }

    this.misAJourLigneBL(numero)
  }

  misAJourLigneBL(numero) {
    this.articlesSelected[numero - 1] = this.calculTotals(this.articlesSelected[numero - 1])
    this.modifierPrixTotalBL()
  }

  // start valide le plafond remise
  numeroLigneCheckPlafondRemise = 0
  changeTauxRemise(numero) {
    var articles = this.articles.filter(x => x.id == this.articlesSelected[numero - 1].article)
    if (articles.length > 0) {
      for (let i = 0; i < this.articlesSelected.length; i++) {
        if (this.articlesSelected[i].numero == numero && this.articlesSelected[i].tauxRemise > articles[0].plafondRemise && articles[0].plafondRemise != 0 && this.titreDocument === this.fonctionPartagesService.titreDocuments.bonLivraison) {
          this.numeroLigneCheckPlafondRemise = numero
          this.openConfirmationPlafondRemise()
          return
        }
      }
    }
    this.misAJourLigneBL(numero)
  }

  isOpenModalConfirmationPlafondRemise = false
  openConfirmationPlafondRemise() {
    this.isOpenModalConfirmationPlafondRemise = true
  }

  closeConfirmationPlafondRemise() {
    this.isOpenModalConfirmationPlafondRemise = false
  }

  confirmeePlafondRemise() {
    var articles = this.articles.filter(x => x.id == this.articlesSelected[this.numeroLigneCheckPlafondRemise - 1].article)
    if (articles.length > 0) {
      for (let i = 0; i < this.articlesSelected.length; i++) {
        if (this.articlesSelected[i].numero == this.numeroLigneCheckPlafondRemise && this.articlesSelected[i].tauxRemise > articles[0].plafondRemise && articles[0].plafondRemise != 0) {
          this.articlesSelected[i].tauxRemise = articles[0].plafondRemise
          this.misAJourLigneBL(this.numeroLigneCheckPlafondRemise)
        }
      }
    }
    this.closeConfirmationPlafondRemise()
  }

  nonConfirmeePlafondRemise() {
    this.misAJourLigneBL(this.numeroLigneCheckPlafondRemise)
    this.closeConfirmationPlafondRemise()
  }

  // end valide le plafond remise



  calculTotals(item) {
    if (this.isPrixVenteNotPrixAchat()) {
      return this.utiles.calculTotalsVente(item, this.client, this.articles)
    } else {
      return this.utiles.calculTotalsAchat(item, this.client, this.articles)
    }
  }


  getNumber(float) {
    return this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(float)
  }
  // end autocomplete articles
  constructor(
    private notificationToast: ToastNotificationService,
    public informationGenerale: InformationsService,

    public fonctionPartagesService: FonctionPartagesService,
    private fnctModel: FnctModelService,
    private utiles: UtilesBonLivraisonService,
    private inputBonLivraison: InputBonLivraisonComponent) {

  }

  ngOnInit(): void {
    if (!this.isPrixVenteNotPrixAchat()) {
      this.shemaArticle = new ShemaArticleAchat()
      this.shemaMultiSortie = new ShemaMultiSortieArticleAchat()
      this.itemArticleSelected = new ShemaItemArticleSelectedAchat()
      this.shemaArticle2 = new ShemaArticle2Achat()
    }

    this.initialiserVariablesOfShowsElements()
  }

  checkIsInfinity(number) {
    return Number.isFinite(number)
  }

  controleInputs() {
    for (let key in this.erreurArticle) {
      this.erreurArticle[key] = ""
    }

    var isValid = true

    if (this.itemArticleSelected.reference == "") {
      this.erreurArticle.reference = "Veuillez remplir ce champ"
      isValid = false
    }

    if (Number(this.itemArticleSelected.quantiteVente) == 0) {
      this.erreurArticle.quantiteVente = "Veuillez remplir ce champ"
      isValid = false
    }

    return isValid
  }

  ajoutArticle() {
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }


    if (this.titreDocument === this.fonctionPartagesService.titreDocuments.bonCommande || this.titreDocument === this.fonctionPartagesService.titreDocuments.bonReception) {
      var resultatVerifieStockMax = this.verifierStockMax(this.itemArticleSelected.article)
      if (!resultatVerifieStockMax.isValid) {
        this.typeAction = this.listTypeAction.addElment
        this.openStockMax(resultatVerifieStockMax.stockMax, resultatVerifieStockMax.qteDiff)
        return
      }
    }

    this.addLigneDocument()
  }

  addLigneDocument() {
    this.notificationToast.showSuccess("Votre article est ajoutée")

    var item = {}

    for (let key of this.objectKeys(this.itemArticleSelected)) {
      item[key] = this.itemArticleSelected[key]
    }

    item['numero'] = this.articlesSelected.length + 1
    item['societe'] = this.informationGenerale.idSocieteCurrent

    this.articlesSelected.push(item)

    this.resetItemSelecte()
    this.modifierPrixTotalBL()

  }

  reseteFormulaire() {
    for (let key in this.itemArticleSelected) {
      this.itemArticleSelected[key] = ""
    }
  }

  //begin delete item

  isOpenModalDelete = false
  numeroItemDelete = 0
  params1Delete = ""
  params2Delete = ""

  deleteItem() {
    this.notificationToast.showSuccess("Votre article est supprimée")
    this.articlesSelected.forEach((element, index) => {
      if (element.numero === this.numeroItemDelete) {
        this.articlesSelected.splice(index, 1)
      }
    })
    this.closeModalDelete()
    this.modifierPrixTotalBL()
  }

  openModalDelete(numero, params2) {
    this.numeroItemDelete = numero
    this.isOpenModalDelete = true
    this.params1Delete = "L'article "
    this.params2Delete = params2
  }

  closeModalDelete() {
    this.isOpenModalDelete = false
  }

  //fin delete item
  tabNumbersInput = ['remiseParMontant2', 'remiseParMontant', 'prixFourn', 'prixVenteHTReel2', 'prixVenteHTReel', 'tauxRemise', 'quantiteVente', 'quantiteVente2', 'quantiteAchat', 'quantiteAchat2']
  allTabNumbers = ['totalRedevance', 'montantRemise', 'remiseParMontant2', 'remiseParMontant', 'totalRemise', 'redevance', 'totalGainCommerciale', 'totalGainReel', 'prixVenteHTReel2', 'prixVenteHTReel', 'prixAchatHTReel2', 'prixAchatHTReel', 'totalGain', 'pVenteConseille', 'totalTTC', 'prixTTC', 'tauxTVA', 'totalHT', 'prixVente', 'plafondRemise', 'prixVenteHT', 'prixAchat', 'tauxRemise', 'quantiteVente', 'quantiteVente2', 'quantiteAchat', 'quantiteAchat2', 'prixFourn', 'prixFodec', 'prixDC', 'tauxDC']
  tabNumbersLabel = ['totalRedevance', 'montantRemise', 'totalRemise', 'redevance', 'totalGainCommerciale', 'totalGainReel', 'prixAchatHTReel2', 'prixAchatHTReel', 'totalGain', 'pVenteConseille', 'totalTTC', 'prixTTC', 'tauxTVA', 'totalHT', 'prixVente', 'plafondRemise', 'prixVenteHT', 'prixAchat', 'prixFodec', 'prixDC', 'tauxDC']


  deplaceLigne(numero, pas) {
    var newPos = numero + pas
    if (newPos == 0) {
      newPos = 0
    }

    if (newPos > (this.articlesSelected.length - 1)) {
      newPos = this.articlesSelected.length - 1
    }

    var item: any = {}
    item = this.articlesSelected[numero]
    this.articlesSelected[numero] = this.articlesSelected[newPos]
    this.articlesSelected[newPos] = item

    for (let i = 0; i < this.articlesSelected.length; i++) {
      this.articlesSelected[i].numero = i + 1
    }
  }


  getAllParametres() {
    this.getAllParametresEvent.emit()
  }



  ngOnChanges(changes: SimpleChanges) {
    if (changes.client && this.isPrixVenteNotPrixAchat) {
      if (changes.client.previousValue != undefined && changes.client.previousValue.exemptTVA != undefined && changes.client.currentValue.exemptTVA != undefined) {
        if ((changes.client.previousValue.exemptTVA != changes.client.currentValue.exemptTVA) || (changes.client.previousValue.exemptTimbreFiscale != changes.client.currentValue.exemptTimbreFiscale)) {
          this.openConfirmationTVATimbreFiscal()
        }
      }
    }
  }

  //Modal Confirmation TVA Timbre Fiscal
  isOpenModalConfirmationTVATimbreFiscal = false
  confirmeeTVATimbreFiscal() {
    this.client.exemptTimbreFiscale = "oui"
    this.client.exemptTVA = "oui"
    this.closeConfirmationTVATimbreFiscal()
    this.resetLigneBL()
  }

  nonConfirmeeAction() {
    this.client.exemptTimbreFiscale = "non"
    this.client.exemptTVA = "non"
    this.closeConfirmationTVATimbreFiscal()
    this.resetLigneBL()
  }

  openConfirmationTVATimbreFiscal() {
    this.isOpenModalConfirmationTVATimbreFiscal = true
  }

  closeConfirmationTVATimbreFiscal() {
    this.isOpenModalConfirmationTVATimbreFiscal = false
  }

  //Modal-attention-Plafond-credit
  resetLigneBL() {
    for (let i = 0; i < this.articlesSelected.length; i++) {
      this.articlesSelected[i] = this.calculTotals(this.articlesSelected[i])
    }

    this.modifierPrixTotalBL()
  }

  //app-showelements
  itemsShowsElements = {}
  itemsVariableShowsElements = {}

  initialiserVariablesOfShowsElements() {
    for (let key in this.shemaArticle) {
      this.itemsShowsElements[key] = "active"
      this.itemsVariableShowsElements[key] = "active"
    }
  }

  //initialiser le completation de lignes si  
  //les lignes de table est inferieur a 6
  emptyTable = []
  initialisationEmptyTable() {
    this.emptyTable = []
    if (this.articlesSelected.length < 6) {
      for (let i = this.articlesSelected.length; i < 6; i++) {
        this.emptyTable.push({})
      }
      return true
    }
    return false
  }

  //pour tester si les champs client et article n'est pas sélectionné
  testVide() {
    if (this.client.raisonSociale == undefined) {
      this.notificationToast.showError("Veuillez sélectionner un client!")
      return false
    } else if (this.itemArticleSelected.prixVenteHT == 0) {
      this.notificationToast.showError("Veuillez sélectionner un article!")
      return false
    }
    return true
  }

  //open modal ajout Element
  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  idAjoutPersModal = ""
  typeElement
  typeDocument = ""
  openModalHistoriqueAchat() {
    if (!this.testVide()) {
      return
    }
    this.typeElement = this.fonctionPartagesService.titreOfModal.voirHistoriqueAchat
    this.idAjoutElementModal = this.itemArticleSelected.article
    this.idAjoutPersModal = this.client.id
    this.typeDocument = this.titreDocument
    this.isOpenModalAjoutElement = true
  }

  openModalHistoriqueVente() {
    if (!this.testVide()) {
      return
    }
    this.typeElement = this.fonctionPartagesService.titreOfModal.voirHistoriqueVente
    this.idAjoutElementModal = this.itemArticleSelected.article
    this.idAjoutPersModal = this.client.id
    this.typeDocument = this.titreDocument
    this.isOpenModalAjoutElement = true
  }

  closeModalAjoutElement() {
    this.isOpenModalAjoutElement = false
  }

  getReferenceSousProduit(idSousProduit, idArticle) {
    if (idSousProduit == "") {
      return ""
    }
    var elements = this.articles.filter(x => x.id == idArticle)
    if (elements.length > 0) {
      var element = elements[0]
      for (let i = 0; i < element.sousProduits.length; i++) {
        if (element.sousProduits[i].id = idSousProduit) {
          return element.sousProduits[i].reference
        }
      }
    }
  }

  //start inserer Client ou fournisseur avant le selectionner article
  isOpenModalInsererClientDabord = false
  messageInsererClientDabord = "Tout D'abord insérer votre client !!"

  closeInsererClientDabord() {
    this.isOpenModalInsererClientDabord = false
  }

  openInsererClientDabord() {
    this.isOpenModalInsererClientDabord = true
    if (this.isPrixVenteNotPrixAchat()) {
      this.messageInsererClientDabord = "Tout D'abord insérer votre client !!"
    } else {
      this.messageInsererClientDabord = "Tout D'abord insérer votre fournisseur !!"
    }
  }

  //end inserer Client ou fournisseur avant le selectionner article

  //start inserer Client ou fournisseur avant le selectionner article
  isOpenModalStockMax = false
  messageStockMax = ""
  listTypeAction = { changePrixTotalArray: "changePrixTotalArray", vide: "", addElment: "addElment", changePrixTotal:"changePrixTotal" }
  typeAction = this.listTypeAction.vide
  parametreStockMax = {qte:0 , position:0}

  closeStockMax() {
    this.isOpenModalStockMax = false
    this.typeAction = this.listTypeAction.vide
  }

  confirmeeStockMax() {
    this.isOpenModalStockMax = false
    if (this.typeAction === this.listTypeAction.addElment) {
      this.addLigneDocument()
    }else if(this.typeAction === this.listTypeAction.changePrixTotal){
      this.itemArticleSelected.quantiteAchat += this.parametreStockMax.qte
      this.changePrixTotal()
    }else if(this.typeAction === this.listTypeAction.changePrixTotalArray){
      this.articlesSelected[this.parametreStockMax.position].quantiteAchat += this.parametreStockMax.qte
      this.changePrixTotalArray(this.parametreStockMax.position + 1)
    }
    this.typeAction = this.listTypeAction.vide
  }

  openStockMax(stockMax, qte) {
    this.parametreStockMax.qte = qte
    this.isOpenModalStockMax = true
    if (this.typeAction === this.listTypeAction.addElment) {
      this.messageStockMax = "Votre quantité est dépasse le stock maximal (" + stockMax + ") par " + -qte + " , voulez vous ajouter ce article ?"
    } else {
      this.messageStockMax = "Votre quantité est dépasse le stock maximal (" + stockMax + ") par " + -qte + " !!"
    }
  }
  //end inserer Client ou fournisseur avant le selectionner article

  //start bloked stock negative
  isOpenModalBlockedStockNegative = false

  closeBlockedStockNegative() {
    this.isOpenModalBlockedStockNegative = false
  }

  openBlockedStockNegative() {
    this.isOpenModalBlockedStockNegative = true
  }

  //end bloked stock negative

}