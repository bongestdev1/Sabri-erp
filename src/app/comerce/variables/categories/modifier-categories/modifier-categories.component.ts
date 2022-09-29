import { Categorie } from './../../../../model/modelCommerce/categorie';
import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { CategorieService } from 'src/app/services/serviceBD_Commerce/categorie.service';
import { FamilleService } from 'src/app/services/serviceBD_Commerce/famille.service';

@Component({
  selector: 'app-modifier-categories',
  templateUrl: './modifier-categories.component.html',
  styleUrls: ['./modifier-categories.component.scss']
})
export class ModifierCategoriesComponent implements OnInit {
  categorieFormGroup: FormGroup;

  @Output() closeModalModifierCategorie = new EventEmitter<string>();

  @Input() id = ""

  @Input() isOpenModalModifierCategorie = false

  closeModifierCategorie(){
    this.closeModalModifierCategorie.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalModifierCategorie == true){
      for (let key in this.erreurCategorie) {
        this.erreurCategorie[key] = ""
        
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.remove("border-erreur")
        }
      }

      for (let key in this.categorie) {
        this.categorie[key] = ""
      }

      if (this.id.length > 1) {
        this.getCategorie(this.id)
      }
    }
  }

  objectKeys = Object.keys;

  request = {
    libelle:"",
    order:0,
    familles:[]
  }

  categorie = new Categorie()

  erreurCategorie = {
    libelle:""
  }

  constructor(
    private familleSer: FamilleService,
    private categorieSer: CategorieService,
    private fonctionPartagesService:FonctionPartagesService, 
    public informationGenerale: InformationsService,
    private notificationToast:ToastNotificationService) {
  }

  getCategorie(id) {
    this.famillesSelected = []
        
    this.isLoading = true
    this.categorieSer.get(id)
    .subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          this.request = response.resultat
          for (let key in this.categorie) {
            this.categorie[key] = this.request[key]
          }

          for (let i= 0;i < response.familles.length; i++) {
            this.famillesSelected.push({id:response.familles[i].famille._id, libelle:response.familles[i].famille.libelle})
          }

          this.getFamilles()
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      });

  }

  ngOnInit(): void {
    this.getAllParametres()
  }

  controleInputs() {

    for (let key in this.erreurCategorie) {
      this.erreurCategorie[key] = ""
      if(document.getElementById(key) != null){
        document.getElementById(key).classList.remove("border-erreur")
      }
    }

    var isValid = true

    for (let key in this.erreurCategorie) {
      if (this.categorie[key] == "") {
        this.erreurCategorie[key] = "Veuillez remplir ce champ"
        isValid = false
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.add("border-erreur")
        }
      }
    }
    if(this.categorie.libelle != ""){
      if(this.allCategories.filter(x => x.libelle == this.categorie.libelle && x.id != this.id).length > 0){
        this.erreurCategorie.libelle = "Cette libelle est déjà utilisée !!"
        isValid = false
        if(document.getElementById('libelle') != null){
          document.getElementById('libelle').classList.add("border-erreur")
        }
      
      }
    }
    return isValid
  }

  isLoading = false

  modifierCategorie() {
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    } 

    for (let key in this.categorie) {
      this.request[key] = this.categorie[key]
    }

    var listId = []
    for(let i = 0; i < this.famillesSelected.length; i++){
      listId.push({id:this.famillesSelected[i].id})
    }

    if (this.isLoading) {
      return
    }

    this.isLoading = true

    this.request.familles = listId
    this.categorieSer.update(this.id,this.request)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
             this.notificationToast.showSuccess("Votre Categorie est bien modifiée !")
             this.closeModifierCategorie()
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      });

  }

  reseteFormulaire() {
    for (let key in this.erreurCategorie) {
      this.categorie[key] = ""
    }
  }


  //add famille
  familles = []
  famillesSelected = []
  allFamilles = []

  addFamille(item){
    this.famillesSelected.push(item)
    this.familles = this.familles.filter(x => x.id != item.id)
  }

  removeFamille(item){
    this.famillesSelected = this.famillesSelected.filter(x => x.id != item.id)
  }

  addFamilleSelected(item){
    this.familles.push(item)
  }

  removeFamilleSelected(item){
    this.famillesSelected = this.famillesSelected.filter(x => x.id != item.id)
    this.familles.push(item)
  }

  motRecherche = ""

  recherche(){
     if(this.motRecherche != ""){
      this.familles = this.allFamilles.filter(x => x.libelle.toUpperCase().indexOf(this.motRecherche.toUpperCase()) == 0)
     }else{
      this.familles = this.allFamilles
     }

     for (let i= 0;i < this.famillesSelected.length; i++) {
      this.familles = this.familles.filter( x => x.id != this.famillesSelected[i].id)
    }
  }

  isCheked(item){
    if(this.famillesSelected.filter(x => x.id == item.id).length == 1){
      return true
    }
    return false
  }

  checkAllSelect()
  {
    this.familles.push.apply( this.familles,this.famillesSelected)
    this.famillesSelected = []
  }

  checkAll(){
    this.famillesSelected.push.apply(this.famillesSelected,this.familles)
    this.familles = []
  }

  getFamilles() {

    if (this.isLoading) {
      return
    }
    
    let requestFamilles = {
      page:1,
      limit:100000,
      search:{},
      orderBy:{},
      societe:this.informationGenerale.idSocieteCurrent
    }
    
    this.isLoading = true
    this.familleSer.getAll(requestFamilles)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.familles = resultat.resultat.docs
          this.allFamilles = resultat.resultat.docs
          for (let i = 0; i < this.famillesSelected.length; i++) {
            this.familles = this.familles.filter(x => x.id != this.famillesSelected[i].id)
          }
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      });
  }

 //open modal ajout Element
 isOpenModalAjoutElement = false
 idAjoutElementModal = ""
 typeElement
 
 closeModalAjoutElement(){
   this.isOpenModalAjoutElement = false
   this.getFamilles()
 }
 
 openModalAjout(){
   this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterFamille
   this.isOpenModalAjoutElement = true
 }

   //Get parametre of TypeCompte
   tabLibelle = []
   allCategories = []
   getAllParametres() {
     this.categorieSer.parametre(this.informationGenerale.idSocieteCurrent)
       .subscribe(
         res => {
           let resultat: any = res
           if (resultat.status) {
             this.allCategories = resultat.categories
             for (let item of this.allCategories) {
               this.tabLibelle.push(item.libelle)
             }
           }
         },
         error => {
           this.isLoading = false
           alert("Désole, ilya un problème de connexion internet")
         });
   }

}
