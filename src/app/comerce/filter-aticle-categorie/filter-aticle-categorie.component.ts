import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { InformationsService } from 'src/app/services/informations.service';
import { ShemaArticle2 } from '../bonLivraison/lignebl/models/shema-article2';
import { ShemaItemArticleSelected } from '../bonLivraison/lignebl/models/shema-item-article-selected';

@Component({
  selector: 'app-filter-aticle-categorie',
  templateUrl: './filter-aticle-categorie.component.html',
  styleUrls: ['./filter-aticle-categorie.component.scss']
})
export class FilterAticleCategorieComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    public informationGenerale: InformationsService,
    public fonctionPartagesService: FonctionPartagesService,) {
    this.getAllParametres()
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  sousFamillesCurrent = []
  famillesCurrent = []

  @Input() article

  @Output() envoitList = new EventEmitter<Object>();

  categorieFamilles = []
  familles = []
  familleSousFamilles = []
  sousFamilles = []
  categories = []

  isLoading = false
  getAllParametres() {
    this.isLoading = true
    this.http.get(this.informationGenerale.baseUrl + "/articles/getAllParametres/" + this.informationGenerale.idSocieteCurrent, this.tokenStorageService.getHeader()).subscribe(
      res => {
        let resultat: any = res
        this.isLoading = false
        if (resultat.status) {
          this.categories = resultat.categories
          this.familles = resultat.familles
          this.sousFamilles = resultat.sousFamilles
          this.categorieFamilles = resultat.categorieFamilles
          this.familleSousFamilles = resultat.familleSousFamilles
          this.allArticles = resultat.articles
          this.initialiserParametres()
        }
      }, err => {
        this.isLoading = false
      }
    );


  }

  initialiserParametres() {
    this.famillesCurrent = []
    this.sousFamillesCurrent = []

    var categorieFamillesSelected = this.categorieFamilles.filter(x => x.categorie == this.article.categorie)
    for (let i = 0; i < categorieFamillesSelected.length; i++) {
      var familles = this.familles.filter(x => x.id == categorieFamillesSelected[i].famille)
      if (familles.length > 0) {
        this.famillesCurrent.push(familles[0])
      }
    }

    var familleSousFamillesSelected = this.familleSousFamilles.filter(x => x.famille == this.article.famille)
    for (let i = 0; i < familleSousFamillesSelected.length; i++) {
      var sousFamilles = this.sousFamilles.filter(x => x.id == familleSousFamillesSelected[i].sousFamille)
      if (sousFamilles.length > 0) {
        this.sousFamillesCurrent.push(sousFamilles[0])
      }
    }
  }

  allArticles = []
  request = {
    categorie: "",
    societe: this.informationGenerale.idSocieteCurrent
  }
  //autocomplete categorie
  keySelectedCategorie = "libelle"
  objetCategorie = { libelle: "Libelle" }
  setCategorieID(id) {
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
    this.article.sousArticle = ""

    this.request.categorie = this.article.categorie
    this.http.post(this.informationGenerale.baseUrl + "/articles/getArticlesByIdCategorie", this.request, this.tokenStorageService.getHeader()).subscribe(
      res => {
        let resultat: any = res
        this.isLoading = false
        if (resultat.status) {
          this.allArticles = resultat.resultat
        }
      }, err => {
        this.isLoading = false
      }
    );

    this.envoitList.emit({ items: this.article })
  }

  //autocomplete famille
  keySelectedFamille = "libelle"
  objetFamille = { libelle: "Libelle" }
  setFamilleID(id) {
    this.sousFamillesCurrent = []
    this.article.famille = id
    var familleSousFamillesSelected = this.familleSousFamilles.filter(x => x.famille == id)
    if (familleSousFamillesSelected.length > 0) {
      for (let i = 0; i < familleSousFamillesSelected.length; i++) {
        var sousFamilles = this.sousFamilles.filter(x => x.id == familleSousFamillesSelected[i].sousFamille)
        if (sousFamilles.length > 0) {
          this.sousFamillesCurrent.push(sousFamilles[0])
        }
      }
      this.article.sousFamille = ""
      this.article.sousArticle = ""
    }

    this.envoitList.emit({ items: this.article })
  }

  //autocomplete sousfamille
  keySelectedSousFamille = "libelle"
  objetSousFamille = { libelle: "Libelle" }
  setSousFamilleID(id) {
    this.article.sousFamille = id
    this.article.sousArticle = ""
    this.envoitList.emit({ items: this.article })
  }

  // begin autocomplete articles
  keySelectedArticle = "reference"
  shemaMultiSortie = {
    designation: "Désignation",
    reference: "Réference"
  }
  shemaArticle2: any = new ShemaArticle2()
  itemArticleSelected: any = new ShemaItemArticleSelected()

  setArticleID(id) {
    this.article.sousArticle = id
    this.envoitList.emit({ items: this.article })
  }

  //open modal ajout Element
  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  typeElement
  closeModalAjoutElement() {
    this.isOpenModalAjoutElement = false
    this.getAllParametres()
  }

  //open modal ajout famille
  isOpenModalAjoutFamille = false
  idAjoutFamilleModal = ""
  openModalAjoutFamille() {
    this.isOpenModalAjoutFamille = true
  }

  closeModalAjoutFamille() {
    this.isOpenModalAjoutFamille = false
    this.getAllParametres()
  }
  openModalAjoutCategorie() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterCategorie
    this.isOpenModalAjoutElement = true
  }

  //open modal ajout sous famille
  isOpenModalAjoutSousFamille = false
  idAjoutSousFamilleModal = ""

  openModalAjoutSousFamille() {
    this.isOpenModalAjoutSousFamille = true
  }

  closeModalAjoutSousFamille() {
    this.isOpenModalAjoutSousFamille = false
    this.getAllParametres()
  }

  //open modal ajout Article
  isOpenModalAjoutArticle = false
  idAjoutArticleModal = ""

  closeModalAjoutArticle() {
    this.isOpenModalAjoutArticle = false
    this.getAllParametres()
  }

  openModalAjoutArticle() {
    this.isOpenModalAjoutArticle = true
  }
}
