export class Article {
    isFodec = "non"
    prixFodec = 0
    tauxDC = 0
    prixDC=0
    totalFrais=0
    reference= ""
    codeBarre= ""
    designation= ""
    typeArticle= "produit"
    categorie= ""
    famille= ""
    sousFamille= ""
    marque= ""
    modele= ""
    tauxTVA= 0
    prixFourn= 0
    remiseF= 0
    marge= 0
    prixVenteHT= 0
    montantTVA= 0
    prixAchat= 0
    prixAchatTTC= 0
    valeurStock= 0
    QteEnStock= 0
    prixTTC= 0
    plafondRemise= 0
    pVenteConseille= 0
    enVente= "oui"
    enAchat= "oui"
    refFournisseur= ""
    redevance= 0
    enBalance= ""
    enPromotion= ""
    enNouveau= ""
    longueur= 0
    largeur= 0
    hauteur= 0
    surface= 0
    volume= 0
    enDisponible= ""
    enArchive= ""
    sansRemise="non"
    enVedette= ""
    enLiquidation= ""
    lotActive="non"
    description= ""
    observations= ""
    poids= 0
    couleur= ""
    unite1= ""
    unite2= ""
    coefficient= 0
    emplacement= ""
    raccourciPLU= ""
    prixVenteHT2= 0
    prixVenteHT3= 0
    seuilAlerteQTS= 0
    seuilRearpQTS= 0
    societe=""
    fournisseur=""
    frais=[]
    lots=[]

    prixWithQuantites=[]
    sousProduits=[]
    stocks = []
    qteEnStock=0
    
    remiseParMontant=0

    venteAvecStockNegative= "non"

    stockMax = 0

    sousArticles= []

    margeAppliqueeSur = "Achat"

    prixRevient = 0
    prixRevientTTC = 0
}
