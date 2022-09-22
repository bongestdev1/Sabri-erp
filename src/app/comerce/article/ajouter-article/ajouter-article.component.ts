import { element } from 'protractor';
import { Component, OnInit,  Input, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { Output, EventEmitter } from '@angular/core';
import { Article } from 'src/app/model/modelComerce/article/article';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';

@Component({
  selector: 'app-ajouter-article',
  templateUrl: './ajouter-article.component.html',
  styleUrls: ['./ajouter-article.component.scss']
})
export class AjouterArticleComponent implements OnInit {
  
  articleFormGroup: FormGroup;
  lienAjoute = "/articles/newArticle"
  lienGetCodeBarre = "/articles/getCodeBare/"
  pageList = "/article/list"
  lienModifie = "/articles/modifierArticle/"
  lienGetById = "/articles/getById/"

  titreCrud = this.fonctionPartagesService.titreCrud.ajouter

  objectKeys = Object.keys;

  fournisseurs = []
  uniteMesures = []
  typeTiers = []

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
  
  request = new Article()

  article = new Article()

  prixWithQuantites = []

  isLoading = false

  erreurArticle = {
    reference: "",
    designation: "",
    categorie: "",
    prixFourn: "",
    unite1:"",
    unite2:"",
    coefficient:""
  }

  listFrais=[]
  listArticles = []
  variantes = []

  sousProduits = []

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

  constructor(private notificationToast: ToastNotificationService,
    private http: HttpClient,
    public informationGenerale: InformationsService,
    private tokenStorageService:TokenStorageService,
    private fonctionPartagesService: FonctionPartagesService,
    private router: Router,
    private route: ActivatedRoute, 
    ) { }



  getArticle(id) {   
    console.log(id)
    this.isLoading = true
    this.http.get(this.informationGenerale.baseUrl + this.lienGetById + this.informationGenerale.idSocieteCurrent + "/" + id,this.tokenStorageService.getHeader()).subscribe(
      res => {
        this.isLoading = false
        this.getAllParametres()
        let response: any = res
        if (response.status) {
          for (let key in this.article){
            this.article[key] = response.resultat[key]
          }
          this.listFrais = response.resultat.frais
          if(response.resultat.prixWithQuantites){
            this.prixWithQuantites = response.resultat.prixWithQuantites
          }

          if(response.resultat.sousProduits){
            this.sousProduits = response.resultat.sousProduits
          }

          this.changePrixVHT()
        }
      }, err => {
        this.isLoading = false
        console.log(err)
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  
  ngOnInit(): void {
    
    var id = this.route.snapshot.paramMap.get('id');
    if(this.id.length > 1){
      this.titreCrud = this.fonctionPartagesService.titreCrud.modifier
      this.getArticle(this.id)
    }else if(id != null && id.length > 1){
      this.titreCrud = this.fonctionPartagesService.titreCrud.modifier
      this.getArticle(id)
      this.id = id
    }else{
      this.article.unite1 = this.informationGenerale.getUniteParDefaut()
      this.getAllParametres()
    }

  }

  controleInputsAjout() {

    for (let key in this.erreurArticle) {
      this.erreurArticle[key] = ""
      if(document.getElementById(key) != null){
        document.getElementById(key).classList.remove("border-erreur")
      }
    }

    var isValid = true

    for (let key in this.erreurArticle) {
      if (this.article[key] == "" && key != "unite2" && key != "coefficient" ){
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.add("border-erreur")
        }
        this.erreurArticle[key] = "Veuillez remplir ce champ"
        isValid = false
      }
    }

    if(this.article.reference != ""){
      if(this.listArticles.filter(x => x.reference == this.article.reference).length > 0){
        this.erreurArticle.reference = "Cette référence est déjà utilisée !!"
        isValid = false
        if(document.getElementById('reference') != null){
          document.getElementById('reference').classList.add("border-erreur")
        }
      }
    }

    if(this.article.designation != ""){
      if(this.listArticles.filter(x => x.designation == this.article.designation).length > 0){
        this.erreurArticle.designation = "Cette designation est déjà utilisée !!"
        isValid = false
        if(document.getElementById('designation') != null){
          document.getElementById('designation').classList.add("border-erreur")
        }
      }
    }

    if(this.article.coefficient != 0){
      if(this.article.unite2 == ""){
         this.erreurArticle.unite2 = "Veuillez à insérer la deuxième unité !!"
         isValid = false
      }
    }

    if(this.article.unite2 != "" && this.article.unite2 != null){
      if(this.article.coefficient == 0){
         this.erreurArticle.coefficient = "Veuillez à insérer le coefficient de deuxième unité !!"
         isValid = false
      }
    }
    return isValid
  }

  ajoutArticle() {
    if(this.id.length > 1){
      this.modifierArticle()
      return
    }

    if(!this.controleInputsAjout()) {
       this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
       return
    }

    if (this.isLoading) {
      return
    }

    this.isLoading = true

    this.article.societe = this.informationGenerale.idSocieteCurrent
    this.article.frais = this.listFrais
    this.article.prixWithQuantites = this.prixWithQuantites
    this.article.sousProduits = this.sousProduits

    this.http.post(this.informationGenerale.baseUrl + this.lienAjoute, this.article,this.tokenStorageService.getHeader()).subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.notificationToast.showSuccess("Votre article est bien enregistrée !")
          if(this.isPopup){
            this.closeAjoutArticle()
          }else{
            this.router.navigate([this.pageList]);
          }
        }else{
          this.notificationToast.showError(resultat.message)
       
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  //modifier
  controleInputsModifier() {
   
    for(let key in this.erreurArticle){
      this.erreurArticle[key] = ""
      if(document.getElementById(key) != null){
        document.getElementById(key).classList.remove("border-erreur")
      }
    }
    
    var isValid = true

    for(let key in this.erreurArticle){
      if(this.article[key] == "" && key != "unite2" && key != "coefficient" ){
        this.erreurArticle[key] = "Veuillez remplir ce champ"
        isValid = false
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.add("border-erreur")
        }
      }
    } 

    if(this.article.reference != ""){
      if(this.listArticles.filter(x => x.reference == this.article.reference && x.id != this.id).length > 0){
        this.erreurArticle.reference = "Cette référence est déjà utilisée !!"
        isValid = false
        if(document.getElementById('reference') != null){
          document.getElementById('reference').classList.add("border-erreur")
        }
      
      }
    }

    if(this.article.designation != ""){
      if(this.listArticles.filter(x => x.designation == this.article.designation && x.id != this.id).length > 0){
        this.erreurArticle.designation = "Cette designation est déjà utilisée !!"
        isValid = false
        if(document.getElementById('designation') != null){
          document.getElementById('designation').classList.add("border-erreur")
        }
      }
    }

    if(this.article.coefficient != 0){
      if(this.article.unite2 == ""){
         this.erreurArticle.unite2 = "Veuillez à insérer la deuxième unité !!"
         isValid = false
      }
    }

    if(this.article.unite2 != "" && this.article.unite2 != null){
      if(this.article.coefficient == 0){
         this.erreurArticle.coefficient = "Veuillez à insérer le coefficient de deuxième unité !!"
         isValid = false
      }
    }


    return isValid
  }

  modifierArticle()
  { 
    if (!this.controleInputsModifier()) {
       this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
       return
    }   
    
    this.article.frais = this.listFrais
    this.article.prixWithQuantites = this.prixWithQuantites
    this.article.sousProduits = this.sousProduits
    if (this.isLoading) {
      return
    }
    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.lienModifie+this.id, this.article,this.tokenStorageService.getHeader()).subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
            this.notificationToast.showSuccess("Votre article est bien modifiée !")
            this.router.navigate([this.pageList]);
        }else{
            this.notificationToast.showError(resultat.message)
        }

      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );  
  }

  getCodeBarre(){
    if (this.isLoading) {
      return
    }
 
    this.isLoading = true
 
    this.article.societe = this.informationGenerale.idSocieteCurrent
    
    this.http.get(this.informationGenerale.baseUrl + this.lienGetCodeBarre + this.informationGenerale.idSocieteCurrent,this.tokenStorageService.getHeader()).subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.article.codeBarre = resultat.codeBarre
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

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
          this.fournisseurs = resultat.fournisseurs
          this.typeTiers = resultat.typeTiers
          this.variantes = resultat.variantes
          this.initialiserParametres()
        }
      }, err => {
        this.isLoading = false
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
  
    var newListFrai = []
    for(let i = 0; i < this.listFrais.length; i++){
      if(this.frais.filter( x => x.id == this.listFrais[i].frais).length > 0){
        newListFrai.push(this.listFrais[i])
      }
    }

    this.listFrais = newListFrai
  }

  changePrixVHT() {

    var prixAchat = Number(this.article.prixFourn) - Number(this.article.prixFourn) * Number(this.article.remiseF / 100) - this.article.remiseParMontant
    
    var marge = Number(this.article.marge)
    
    this.article.prixDC = Number(this.getNumber(prixAchat * this.article.tauxDC / 100)) 
    
    if(this.article.isFodec == "oui"){
      this.article.prixFodec = Number(this.getNumber(prixAchat * this.fonctionPartagesService.parametres.tauxFodec / 100)) 
    }else{
      this.article.prixFodec = Number(this.getNumber(0)) 
    }
      
    this.article.prixAchat = Number(this.getNumber( prixAchat + this.article.prixDC + this.article.prixFodec))
     
    this.article.prixAchatTTC = Number(this.getNumber(this.article.prixAchat + this.article.prixAchat * this.article.tauxTVA / 100))

    if(this.article.margeAppliqueeSur == "Revient"){
      var prixRevient =  Number(this.article.prixAchat) + Number(this.article.totalFrais)
      this.article.prixVenteHT = Number(prixRevient) + marge * prixRevient / 100
    }else{
      this.article.prixVenteHT = Number(this.article.prixAchat) + marge * this.article.prixAchat / 100
    }

    this.article.montantTVA = Number(this.getNumber(this.article.prixVenteHT * this.article.tauxTVA / 100))

    this.article.prixTTC = Number(this.getNumber(Number(this.article.montantTVA) + Number(this.article.prixVenteHT))) + this.article.redevance
    
  }

  getNumber(float) {
    return this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(float)
  }
   
  
}
