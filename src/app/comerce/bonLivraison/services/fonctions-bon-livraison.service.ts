import { Injectable } from '@angular/core';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Injectable({
  providedIn: 'root'
})
export class FonctionsBonLivraisonService {

  constructor(
    public fonctionPartagesService: FonctionPartagesService
  ) { }

  controleInputs(bonLivraison, erreurBonLivraison) {
    for (let key in erreurBonLivraison) {
      erreurBonLivraison[key] = ""
    }

    var isValid = true
    if (bonLivraison['totalHT'] == 0) {
      erreurBonLivraison['totalHT'] = "Veuillez ajouter votres articles"
      isValid = false
    }

    if (bonLivraison['client'] == "") {
      erreurBonLivraison['client'] = "Veuillez remplir ce champ"
      isValid = false
    }

    if (bonLivraison['date'] == "") {
      erreurBonLivraison['date'] = "Veuillez ajouter votre date"
      isValid = false
    }

    return { isValid: isValid, erreurBonLivraison: erreurBonLivraison }
  }


  checkTransferDocument(titreDocument, resultat) {
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
    } else if (titreDocument == this.fonctionPartagesService.titreDocuments.bonReception) {
      modeTransfert = true
    }else if (titreDocument == this.fonctionPartagesService.titreDocuments.devisAchat) {
      modeTransfert = true
    }

    return modeTransfert

  }

  getRequestDocumentTransfert(id, titreDocumentTransfer, request) {
    var request: any
    request = request
    if (titreDocumentTransfer == this.fonctionPartagesService.titreDocuments.devis) {
      request.idTypeTransfert = id
      request.typeTransfert = "Devis"
      return request
    } else if (titreDocumentTransfer == this.fonctionPartagesService.titreDocuments.commande) {
      request.idTypeTransfert = id
      request.typeTransfert = "Commande"
      return request
    } else if (titreDocumentTransfer == this.fonctionPartagesService.titreDocuments.bonCommande) {
      request.idTypeTransfert = id
      request.typeTransfert = "BonCommande"
      return request
    } else if (titreDocumentTransfer == this.fonctionPartagesService.titreDocuments.bonLivraison) {
      request.idTypeTransfert = id
      request.typeTransfert = "BonLivraison"
      return request
    } else if (titreDocumentTransfer == this.fonctionPartagesService.titreDocuments.bonAchat) {
      request.idTypeTransfert = id
      request.typeTransfert = "BonAchat"
      return request
    } else if (titreDocumentTransfer == this.fonctionPartagesService.titreDocuments.devisAchat){
      request.devisAchat = id
      return request
    } else if (titreDocumentTransfer == this.fonctionPartagesService.titreDocuments.bonReception) {
      request.transfertBonReception = id
      return request
    }
    return request
  }


  organiserArtticlesSelonNumero(articles) {
    var articlesOrdonnees = []
    for (let i = 0; i < articles.length; i++) {
      articlesOrdonnees.push(articles.filter(x => x.numero == (i + 1))[0])
    }
    return articlesOrdonnees
  }

  verifierClient(client){
    var isOpenModalBlockerClient = false
    var messageBlockerClient = ""

    if (client.plafondCredit && client.plafondCredit < (-1 * client.credit) && client.plafondCredit != 0) {
      messageBlockerClient = "Le crédit de ce client passe le plafond !!"
    }else if (client.plafondEnCours && client.plafondEnCours != 0 && client.plafondEnCours < client.reglementEnCoursActual) {
      messageBlockerClient = "Le reglement en cours de ce client passe le plafond !!"
    }else  if (client.plafondRisque && client.plafondRisque != 0 && client.plafondRisque < client.reglementRisqueActual) {
      messageBlockerClient = "Le risque de ce client passe le plafond !!"
    }else if (client.nbFactureNonPaye && client.nbFactureNonPaye != 0 && client.nbFactureNonPaye < client.nbFactureNonPayeActual) {
      messageBlockerClient = "Le nombre de bon de livraison non soldée de ce client passe le plafond !!"
    }

    if (messageBlockerClient != "") {
      isOpenModalBlockerClient = true
    }

    return {
      isOpenModalBlockerClient: isOpenModalBlockerClient,
      messageBlockerClient: messageBlockerClient
    }

  }



}
