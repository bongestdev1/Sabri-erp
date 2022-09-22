import { Component, OnInit,  Input, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { Article } from 'src/app/model/modelComerce/article/article';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-details-article',
  templateUrl: './details-article.component.html',
  styleUrls: ['./details-article.component.scss']
})
export class DetailsArticleComponent implements OnInit {

  articleFormGroup: FormGroup;

  lienModifie = "/articles/modifierArticle/"
  lienGetById = "/articles/getById/"
  lienGetCodeBarre = "/articles/getCodeBare/"

  objectKeys = Object.keys;
  

  public isCollapsed: boolean;
  public multiCollapsed1: boolean;
  public multiCollapsed2: boolean;

  request = new Article()

  article = new Article()

  erreurArticle = {
    reference: "",
    codeBarre: "",
    designation: "",
    categorie: "",
    prixFourn: "",
  }

  listFrais=[]

  prixWithQuantites = []
  typeTiers = []

  @Output() closeModal = new EventEmitter<string>();

  @Input() isPopup = false

  @Input() isOpenModal = false
  
  @Input() id="";

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModal){
      this.getAllParametres()
    }
  }
  
  closeAjoutArticle(){
    this.closeModal.emit();
  }
  
  constructor(private http: HttpClient,
    public informationGenerale: InformationsService,
    private tokenStorageService:TokenStorageService,
    public fonctionPartagesService: FonctionPartagesService,
    private route: ActivatedRoute, private notificationToast:ToastNotificationService) 
  {

  }

  getArticle(id) {   
    this.isLoading = true
    this.http.get(this.informationGenerale.baseUrl + this.lienGetById + this.informationGenerale.idSocieteCurrent + "/" + id,this.tokenStorageService.getHeader()).subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          for (let key in this.article) {
            this.article[key] = response.resultat[key]
          }

          this.listFrais = response.resultat.frais
          this.prixWithQuantites = response.resultat.prixWithQuantites

          this.initialiserParametres()
          this.changePrixVHT()
        }
        this.getAllParametres()
  
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  initialiserParametres(){
    this.famillesCurrent = []
    this.sousFamillesCurrent = []
   
    var categorieFamillesSelected = this.categorieFamilles.filter(x => x.categorie == this.article.categorie)
    for(let i = 0; i < categorieFamillesSelected.length; i++){
       var familles = this.familles.filter(x => x.id == categorieFamillesSelected[i].famille)
       if(familles.length > 0){
         this.famillesCurrent.push(familles[0])
       }
    }

    var familleSousFamillesSelected = this.familleSousFamilles.filter(x => x.famille == this.article.famille)
    for(let i = 0; i < familleSousFamillesSelected.length; i++){
       var sousFamilles = this.sousFamilles.filter(x => x.id == familleSousFamillesSelected[i].sousFamille)
       if(sousFamilles.length > 0){
         this.sousFamillesCurrent.push(sousFamilles[0])
       }
    }

    this.modelesCurrent = this.modeles.filter(x => x.marque == this.article.marque)
  }

  ngOnInit(): void {
    this.isCollapsed = true;
    this.multiCollapsed1 = true;
    this.multiCollapsed2 = true;

    if(!this.isPopup){
      this.id = this.route.snapshot.paramMap.get('id');
    }
   
    if(this.id != null && this.id.length > 1){
      this.getArticle(this.id)
    }

  }

  controleInputs() {
   
    for(let key in this.erreurArticle){
      this.erreurArticle[key] = ""
    }
    
    var isValid = true

    if(this.article.reference != ""){
      if(this.listArticles.filter(x => x.reference == this.article.reference && x.id != this.id).length > 0){
        this.erreurArticle.reference = "Cette référence est déjà utilisée !!"
        isValid = false
      }
    }

    if(this.article.designation != ""){
      if(this.listArticles.filter(x => x.designation == this.article.designation && x.id != this.id).length > 0){
        this.erreurArticle.designation = "Cette designation est déjà utilisée !!"
        isValid = false
      }
    }

    if(this.article.codeBarre != ""){
      if(this.listArticles.filter(x => x.codeBarre == this.article.codeBarre && x.id != this.id).length > 0){
        this.erreurArticle.codeBarre = "Ce code-barre est déjà utilisée !!"
        isValid = false
      }
    }


    for(let key in this.erreurArticle){
      if(this.article[key] == ""){
        this.erreurArticle[key] = "Veuillez remplir ce champ"
        isValid = false
      }
    }   

    return isValid
  }

  isLoading = false

  
  isNumberInput(value) {
    var numberValue = Number(value);
    if(numberValue == NaN){
      return false
    }
    return true;
  }

  //getAllParametres

  listArticles = []

  getAllParametres() {
    this.isLoading = true
    this.http.get(this.informationGenerale.baseUrl + "/articles/getAllParametres/"+this.informationGenerale.idSocieteCurrent,this.tokenStorageService.getHeader()).subscribe(
      res => {
        let resultat: any = res
        this.isLoading = false
        if (resultat.status) {
          this.categories = resultat.categories
          this.familles = resultat.familles
          this.sousFamilles = resultat.sousFamilles
          this.categorieFamilles = resultat.categorieFamilles
          this.familleSousFamilles = resultat.familleSousFamilles
          this.marques = resultat.marques
          this.modeles = resultat.modeles
          this.tauxTVAs = resultat.tauxTVAs
          this.frais = resultat.frais
          this.uniteMesures = resultat.uniteMesures
          this.listArticles = resultat.articles
          this.typeTiers = resultat.typeTiers
          this.initialiserParametres()
        }
      }, err => {
        this.isLoading = false
      }
    );
  }

  uniteMesures = []

  categories = []
  
  familles = []
  famillesCurrent = []
  
  sousFamilles = []
  sousFamillesCurrent = []

  categorieFamilles = []
  familleSousFamilles = []
  
  marques = []
  
  modeles = []
  modelesCurrent = []

  tauxTVAs = []
  tauxTVAsCurrent = []

  frais = []

  //autocomplete categorie
  keySelectedCategorie = "libelle"
  objetCategorie = { libelle: "Libelle" }
  setCategorieID(id){
    this.sousFamillesCurrent = []
    this.famillesCurrent = []
    this.article.categorie = id
    var categorieFamillesSelected = this.categorieFamilles.filter(x => x.categorie == id)
    for (let i = 0; i < categorieFamillesSelected.length; i++) {
      var familles = this.familles.filter(x => x.id == categorieFamillesSelected[i].famille)
      if (familles.length > 0) {
        this.famillesCurrent.push(familles[0])
      }
    }
    this.article.famille = ""
    this.article.sousFamille = ""
  }

  //autocomplete famille
  keySelectedFamille = "libelle"
  objetFamille = { libelle: "Libelle" }
  setFamilleID(id) {
    this.sousFamillesCurrent = []
    this.article.famille = id
    var familleSousFamillesSelected = this.familleSousFamilles.filter(x => x.famille == id)
    for (let i = 0; i < familleSousFamillesSelected.length; i++) {
      var sousFamilles = this.sousFamilles.filter(x => x.id == familleSousFamillesSelected[i].sousFamille)
      if (sousFamilles.length > 0) {
        this.sousFamillesCurrent.push(sousFamilles[0])
      }
    }
    this.article.sousFamille = ""
  }

  //autocomplete sousfamille
  keySelectedSousFamille = "libelle"
  objetSousFamille = { libelle: "Libelle" }
  setSousFamilleID(id) {
    this.article.sousFamille = id
  }

  //autocomplete marque
  keySelectedMarque = "libelle"
  objetMarque = { libelle: "Libelle" }
  setMarqueID(id) {
    this.article.marque = id
    this.modelesCurrent = this.modeles.filter(x => x.marque == id)
    this.article.modele = ""
  }

  //autocomplete modele
  keySelectedModele = "libelle"
  objetModele = { libelle: "Libelle" }
  setModeleID(id) {
    this.article.modele = id
  }

  //autocomplete uniteMesure
  keySelectedUniteMesure = "libelle"
  objetUniteMesure = { libelle: "Libelle" }
  setUniteMesureID1(id) {
    this.article.unite1 = id
  }

  //autocomplete uniteMesure
  setUniteMesureID2(id) {
    this.article.unite2 = id
  }

  listAutoComplete = ['categorie', 'famille', 'sousFamille', 'marque', 'modele', 'unite1', 'unite2']

  getNumber(float) {
    return this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(float)
  }

  tabNumbers = ['prixVenteHT', 'tauxRemise', 'quantiteVente', 'tauxDC', 'redevance']

  fixedVerguleNumbers() {
    console.log("fixedVerguleNumbers")

    for (let j = 0; j < this.tabNumbers.length; j++) {
      this.article[this.tabNumbers[j]] = this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(this.article[this.tabNumbers[j]])
    }
  }

  showInput(event) {
    this.fonctionPartagesService.showInput(event)
    setTimeout(() => {
      this.fixedVerguleNumbers()
    }, 100)
  }

  verifieCheck() {
    var radios = document.getElementsByTagName('input');
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].type === 'radio'&& radios[i].checked)
      {
        console.log("step 1", radios[i].checked , radios[i].name, radios[i].id, radios[i].value)
        if(radios[i].name=="typeArticle")
        {
          this.article.typeArticle = radios[i].value
        }
        if(radios[i].name=="vente")
        {
          this.article.enVente = radios[i].value
        }
        if(radios[i].name=="achat")
        {
          this.article.enAchat = radios[i].value
        }
        if(radios[i].name=="achat")
        {
          this.article.enAchat = radios[i].value
        }
        if(radios[i].name=="lotActive")
        {
          this.article.lotActive = radios[i].value
        }
        if(radios[i].name=="enDisponible")
        {
          this.article.enDisponible = radios[i].value
        }
        if(radios[i].name=="enArchive")
        {
          this.article.enArchive = radios[i].value
        }
        if(radios[i].name=="promotion")
        {
          this.article.enPromotion = radios[i].value
        }
        if(radios[i].name=="nouveau")
        {
          this.article.enNouveau = radios[i].value
        }
        if(radios[i].name=="balance")
        {
          this.article.enBalance = radios[i].value
        }
        if(radios[i].name=="vedette")
        {
          this.article.enVedette = radios[i].value
        }
        if(radios[i].name=="liquidation")
        {
          this.article.enLiquidation = radios[i].value
        }
      }
    }
  }

  changePrixVHT() {
    var prixAchat = Number(this.getNumber(this.article.prixFourn - this.article.prixFourn * this.article.remiseF / 100))
    var marge = Number(this.getNumber(this.article.marge))
    
    this.article.totalFrais = 0
    for(let i = 0; i < this.listFrais.length; i++){
      this.article.totalFrais += Number(this.listFrais[i].montant)
    }
    this.article.totalFrais = Number(this.getNumber(this.article.totalFrais))
    
    this.article.prixDC = Number(this.getNumber(prixAchat * this.article.tauxDC / 100)) 
    
    if(this.article.isFodec == "oui"){
      this.article.prixFodec = Number(this.getNumber(prixAchat * this.fonctionPartagesService.parametres.tauxFodec / 100)) 
    }else{
      this.article.prixFodec = Number(this.getNumber(0)) 
    }
      
    this.article.prixAchat = Number(this.getNumber( prixAchat + this.article.prixDC + this.article.prixFodec))
    
    var prixRevient =  Number(this.article.prixAchat) + Number(this.article.totalFrais)

    var prixVenteHT = Number(prixRevient) + marge * prixRevient / 100

    this.article.prixVenteHT = Number(this.getNumber(prixVenteHT))

    this.article.montantTVA = Number(this.getNumber(this.article.prixVenteHT * this.article.tauxTVA / 100))

    this.article.prixTTC = Number(this.getNumber(Number(this.article.montantTVA) + Number(this.article.prixVenteHT)))

  }

  changePrixTTC(){
    var rest = Number(this.article.prixTTC) - Number(this.article.montantTVA) - Number(this.article.totalFrais) - Number(this.article.prixAchat)
    
    if(this.article.prixAchat != 0){
      var marge =  rest / this.article.prixAchat * 100
      this.article.marge = Number(this.getNumber(marge))
    }else{
      this.article.marge = Number(this.getNumber(0))
    }
  }

   
   //open modal ajout famille
   isOpenModalAjoutFamille = false
   idAjoutFamilleModal = ""
 
   closeModalAjoutFamille(){
     this.isOpenModalAjoutFamille = false
     this.getAllParametres()
   }
 
   openModalAjoutFamille(){
      this.isOpenModalAjoutFamille = true
   }

   //open modal ajout sous famille
   isOpenModalAjoutSousFamille = false
   idAjoutSousFamilleModal = ""
 
   closeModalAjoutSousFamille(){
     this.isOpenModalAjoutSousFamille = false
     this.getAllParametres()
   }
 
   openModalAjoutSousFamille(){
      this.isOpenModalAjoutSousFamille = true
   }
 
   //open modal ajout Element
   isOpenModalAjoutElement = false
   idAjoutElementModal = ""
   typeElement

   closeModalAjoutElement(){
     this.isOpenModalAjoutElement = false
     this.getAllParametres()
   }
 
   openModalAjoutUniteMesure(){
      this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterUniteMesure
      this.isOpenModalAjoutElement = true
   }

   openModalAjoutCategorie(){
      this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterCategorie
      this.isOpenModalAjoutElement = true
   }

   openModalAjoutMarque(){
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterMarque
    this.isOpenModalAjoutElement = true
   }

   openModalAjoutModele(){
     this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterModele
     this.isOpenModalAjoutElement = true
   }
   
  

    clickIsFodec(){
      if(this.article.isFodec == "oui"){
        this.article.isFodec = "non"
      }else{
        this.article.isFodec = "oui"
      }
  
      this.changePrixVHT()
    }
}