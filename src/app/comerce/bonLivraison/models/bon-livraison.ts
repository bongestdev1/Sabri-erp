export class BonLivraison {

    numero= ""
    date= ""
    client= ""

    totalRemise= 0
    totalHT= 0
    totalTVA= 0
    totalTTC= 0
    totalGainCommerciale= 0
    totalGainReel= 0
    timbreFiscale= 0

    montantTotal= 0
    montantPaye= 0
    totalRedevance= 0
    totalFodec= 0
    montantEscompte= 0
    totalDC= 0
    restPayer= 0

    societe= ""
    exercice= ""

    observation= ""
    isValid= "non"
    validationStockBonAchat= "non"
    articles= []
    expeditions = []
    ordreMission= ""

    numeroBonLivraisonFournisseur=""
    captureBonLivraisonFournisseur=""

    isVenteContoire = false
    isRetourVenteContoire = false
    isAchatContoire = false
    isRetourAchatContoire = false

    projet=""
    transporteur=""
    coutTransport=0
    
}
