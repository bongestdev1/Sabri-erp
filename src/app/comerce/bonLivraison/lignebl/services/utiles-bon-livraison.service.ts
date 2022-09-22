import { InformationsService } from 'src/app/services/informations.service';
import { Injectable } from '@angular/core';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { TotalsDocument } from '../models/totals-document';
import { LigneblComponent } from '../lignebl.component';

@Injectable({
  providedIn: 'root'
})
export class UtilesBonLivraisonService {

  constructor(
    private informationGenerale:InformationsService, 
    private fonctionPartagesService:FonctionPartagesService){ 
  }

  getNumber(float) {
    return this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(float)
  }

  getTauxTVA(articles, idArticle){
    for(let i = 0; i < articles.length; i++){
       if(articles[i].id == idArticle){
         return Number(articles[i].tauxTVA)
       } 
    }
    return 0
  }

  calculTotalsVente(item, client, articles) {
    if (client) {
      if (client.exemptTVA == "non") {
        item.tauxTVA = this.getTauxTVA(articles, item.article)
      }else{
        item.tauxTVA = 0
      }
    }

    var quantiteVente = Number(this.getNumber(item.quantiteVente))
    var tauxRemise = Number(item.tauxRemise.toFixed(5))
    var remiseParMontant2 = Number(item.remiseParMontant2.toFixed(5))

    /*if (tauxRemise > item.plafondRemise && item.plafondRemise > 0) {
      tauxRemise = item.plafondRemise
      item.tauxRemise = tauxRemise
      this.openConfirmationPlafondRemise()
    }*/

    var totalRemise = (Number(item.prixVenteHT) * tauxRemise / 100 + remiseParMontant2) * quantiteVente
    var newPrixVenteHt = Number(item.prixVenteHT) - (Number(item.prixVenteHT) * tauxRemise / 100) - remiseParMontant2
    var totalHT = newPrixVenteHt * quantiteVente

    var totalTVA = totalHT * item.tauxTVA / 100
    
    item.prixTTC = Number(newPrixVenteHt * (1 + item.tauxTVA / 100)) + Number(item.redevance)
    
    var totalTTC = item.prixTTC * quantiteVente

    item.prixVenteHTReel = Number(this.getNumber(newPrixVenteHt))
    item.totalRemise = Number(this.getNumber(totalRemise))
    
    item.montantRemise = Number(item.prixVenteHT) * tauxRemise / 100 + Number(remiseParMontant2)
    
    item.totalHT = Number(this.getNumber(totalHT))
    item.totalTVA = Number(this.getNumber(totalTVA))
    item.totalTTC = Number(this.getNumber(totalTTC))

    item.prixVenteHTReel2 = item.prixVenteHTReel / item.coefficient
    item.quantiteVente2 = item.quantiteVente * item.coefficient
    item.totalRedevance = Number(item.redevance * quantiteVente)

    item.totalGainCommerciale = Number(this.getNumber((newPrixVenteHt - item.prixAchat) * quantiteVente))
    item.totalGainReel = Number(this.getNumber((newPrixVenteHt - (item.prixAchat+item.totalFrais)) * quantiteVente))

    return item
  }

  calculTotalsAchat(item, client, articles) {
    var societe = this.informationGenerale.getSocieteCurrentObject() 
    client.exemptTVA = societe.exemptTVA
      
    if (client) {
      if (client.exemptTVA == "non") {
        item.tauxTVA = this.getTauxTVA(articles, item.article)
      }else{
        item.tauxTVA = 0
      }
    }

    var tauxRemise = Number(item.tauxRemise.toFixed(5))
    item.remiseF = tauxRemise
    
    item.prixAchatHTReel = Number(item.prixFourn) - Number(item.prixFourn) * Number(item.remiseF / 100) - Number(item.remiseParMontant)
    
    item.prixDC = Number(this.getNumber(item.prixAchatHTReel * item.tauxDC / 100)) 
    
    if(item.isFodec == "oui"){
      item.prixFodec = Number(this.getNumber(item.prixAchatHTReel * this.fonctionPartagesService.parametres.tauxFodec / 100)) 
    }else{
      item.prixFodec = Number(this.getNumber(0)) 
    }
      
    var prixAchatHT = Number(item.prixAchatHTReel) + Number(item.prixFodec) + Number(item.prixDC)
   
    item.prixTTC = Number(this.getNumber(item.prixAchatHTReel + item.prixAchatHTReel * item.tauxTVA / 100)) + item.redevance

    var quantiteAchat = Number(this.getNumber(item.quantiteAchat))
    item.totalRemise = (Number(item.prixFourn) * Number(item.remiseF / 100) + Number(item.remiseParMontant)) * quantiteAchat
    item.montantRemise = Number(item.prixFourn) * Number(item.remiseF / 100) + Number(item.remiseParMontant)

    var totalHT = item.prixAchatHTReel * quantiteAchat

    var totalTVA = totalHT * item.tauxTVA / 100
    var totalTTC = item.prixTTC * quantiteAchat

    item.totalHT = Number(this.getNumber(totalHT))
    item.totalTVA = Number(this.getNumber(totalTVA))
    item.totalTTC = Number(this.getNumber(totalTTC))
    item.totalRedevance = Number(item.redevance * quantiteAchat)

    item.prixRevient =  Number(item['prixAchat']) + Number(item['totalFrais'])

    item.prixAchatHTReel2 = item.prixAchatHTReel / item.coefficient
    item.quantiteAchat2 = item.quantiteAchat * item.coefficient
    
    return item
  }


  /*modifierPrixTotalBL(articlesSelected) {
    
    var totals = new TotalsDocument()

    for (let i = 0; i < articlesSelected.length; i++) {
      var quantite = 0
      if (this.lignebl.isPrixVenteNotPrixAchat()) {
        quantite = articlesSelected[i].quantiteVente
      } else {
        quantite = articlesSelected[i].quantiteAchat
      }

      totals.totalTTC += articlesSelected[i].totalTTC
      totals.totalRemise += articlesSelected[i].totalRemise
      totals.totalTVA += articlesSelected[i].totalTVA
      totals.totalHT += articlesSelected[i].totalHT
      if (this.lignebl.isPrixVenteNotPrixAchat()) {
        totals.totalGainCommerciale += articlesSelected[i].totalGainCommerciale
        totals.totalGainReel += articlesSelected[i].totalGainReel
      }
      totals.totalFodec += articlesSelected[i].prixFodec * quantite * (1 + articlesSelected[i].tauxTVA / 100)
      totals.totalDC += articlesSelected[i].prixDC * quantite * (1 + articlesSelected[i].tauxTVA / 100)
      totals.totalRedevance += articlesSelected[i].redevance * quantite
    }

    this.lignebl.bonLivraison.timbreFiscale = this.fonctionPartagesService.parametres.prixTimbreFiscale

    if (this.lignebl.client && this.lignebl.isPrixVenteNotPrixAchat()) {
      if (this.lignebl.client.exemptTimbreFiscale == "oui" || (this.lignebl.titreDocument == this.fonctionPartagesService.titreDocuments.bonLivraison && this.fonctionPartagesService.parametres.validationTimbreFiscaleBonLiv == "non")) {
        this.lignebl.bonLivraison.timbreFiscale = 0
      }
    }


    if (!this.lignebl.isPrixVenteNotPrixAchat()) {
      var societe = this.informationGenerale.getSocieteCurrentObject()
      this.lignebl.client.exemptTimbreFiscale == societe.exemptTimbreFiscale

      if (this.lignebl.client.exemptTimbreFiscale == "oui" || (this.lignebl.titreDocument == this.fonctionPartagesService.titreDocuments.bonReception && this.fonctionPartagesService.parametres.validationTimbreFiscaleBonRec == "non")) {
        this.lignebl.bonLivraison.timbreFiscale = 0
      }
    }

    for (let key in totals) {
      this.lignebl.bonLivraison[key] = totals[key]
    }

    var montantPaye = Number(this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(this.lignebl.bonLivraison.montantPaye))
    this.lignebl.bonLivraison.montantTotal = Number(this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(totals.totalTTC + this.lignebl.bonLivraison.timbreFiscale))

    if (!this.lignebl.isPrixVenteNotPrixAchat()) {
      this.lignebl.bonLivraison.totalTTC = this.lignebl.bonLivraison.totalTTC + this.lignebl.bonLivraison.totalFodec + this.lignebl.bonLivraison.totalDC + this.lignebl.bonLivraison.timbreFiscale
      this.lignebl.bonLivraison.montantTotal = this.lignebl.bonLivraison.totalTTC
    }

    //this.bonLivraison.montantTotal = this.calculeRemise(this.bonLivraison.montantTotal)

    //this.bonLivraison.totalTTC = this.bonLivraison.montantTotal
    this.lignebl.bonLivraison.restPayer = Number(this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(this.lignebl.bonLivraison.montantTotal - montantPaye))

  }*/

}
