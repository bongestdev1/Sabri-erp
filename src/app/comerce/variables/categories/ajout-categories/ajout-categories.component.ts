import { CategorieService } from './../../../../services/serviceBD_Commerce/categorie.service';
import { Categorie } from './../../../../model/modelCommerce/categorie';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { Output, EventEmitter } from '@angular/core';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';
import { FamilleService } from 'src/app/services/serviceBD_Commerce/famille.service';

@Component({
  selector: 'app-ajout-categories',
  templateUrl: './ajout-categories.component.html',
  styleUrls: ['./ajout-categories.component.scss']
})
export class AjoutCategoriesComponent implements OnInit {
  categorieFormGroup: FormGroup;

  objectKeys = Object.keys;

  request = {
    libelle: "",
    order: 0,
    familles: [],
    societe: ""
  }

  categorie = new Categorie()

  erreurCategorie = {
    libelle: ""
  }

  @Output() closeModalAjoutCategorie = new EventEmitter<string>();

  @Input() isPopup = false

  @Input() isOpenModalAjoutCategorie = false

  titre = "categorie"
  ngOnChanges(changes: SimpleChanges) {
    if (this.isOpenModalAjoutCategorie) {
      this.getFamilles()

      for (let key in this.erreurCategorie) {
        this.erreurCategorie[key] = ""

        if (document.getElementById(this.titre + key) != null) {
          document.getElementById(this.titre + key).classList.remove("border-erreur")
        }
      }

      for (let key in this.categorie) {
        this.categorie[key] = ""
      }
    }

  }

  closeAjoutCategorie() {
    this.closeModalAjoutCategorie.emit();
  }

  constructor(
    private categorieSer: CategorieService,
    private familleSer: FamilleService,
    private fonctionPartagesService: FonctionPartagesService,
    private notificationToast: ToastNotificationService,
    private fnctModel: FnctModelService,
    public informationGenerale: InformationsService) { }

  ngOnInit(): void {
    this.getAllParametres()
  }

  isLoading = false
  ajoutCategorie() {
    if (!this.fnctModel.controleInputs(this.erreurCategorie, this.categorie, this.tabLibelle, 'libelle')) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }

    for (let key in this.categorie) {
      this.request[key] = this.categorie[key]
    }

    var listId = []
    for (let i = 0; i < this.famillesSelected.length; i++) {
      listId.push({ id: this.famillesSelected[i].id })
    }

    if (this.isLoading) {
      return
    }

    this.isLoading = true

    this.request.familles = listId
    this.request.societe = this.informationGenerale.idSocieteCurrent
    this.categorieSer.create(this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.notificationToast.showSuccess("Votre categorie est bien enregistrée !")
            this.closeAjoutCategorie()
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  familles = []
  famillesSelected = []
  allFamilles = []

  addFamille(item) {
    this.famillesSelected.push(item)
    this.familles = this.familles.filter(x => x.id != item.id)
  }

  removeFamille(item) {
    this.famillesSelected = this.famillesSelected.filter(x => x.id != item.id)
  }

  addFamilleSelected(item) {
    this.familles.push(item)
  }

  removeFamilleSelected(item) {
    this.famillesSelected = this.famillesSelected.filter(x => x.id != item.id)
    this.familles.push(item)
  }

  motRecherche = ""

  recherche() {
    if (this.motRecherche != "") {
      this.familles = this.allFamilles.filter(x => x.libelle.toUpperCase().indexOf(this.motRecherche.toUpperCase()) == 0)
    } else {
      this.familles = this.allFamilles
    }

    for (let i = 0; i < this.famillesSelected.length; i++) {
      this.familles = this.familles.filter(x => x.id != this.famillesSelected[i].id)
    }
  }

  isCheked(item) {
    if (this.famillesSelected.filter(x => x.id == item.id).length == 1) {
      return true
    }
    return false
  }

  checkAllSelect() {
    this.familles.push.apply(this.familles, this.famillesSelected)
    this.famillesSelected = []
  }

  checkAll() {
    this.famillesSelected.push.apply(this.famillesSelected, this.familles)
    this.familles = []
  }

  getFamilles() {

    if (this.isLoading) {
      return
    }
    this.familles = []

    let requestFamilles = {
      page: 1,
      limit: 100000,
      search: {},
      orderBy: {},
      societe: this.informationGenerale.idSocieteCurrent
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

  reseteFormulaire() {
    for (let key in this.erreurCategorie) {
      this.categorie[key] = ""
    }
  }

  //open modal ajout Element
  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  typeElement

  closeModalAjoutElement() {
    this.isOpenModalAjoutElement = false
    this.getFamilles()
  }

  openModalAjout() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterFamille
    this.isOpenModalAjoutElement = true
  }

  //Get parametre of Categorie
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
