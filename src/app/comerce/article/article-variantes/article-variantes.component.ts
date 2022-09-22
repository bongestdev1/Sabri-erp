import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Alert } from 'selenium-webdriver';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';

@Component({
  selector: 'app-article-variantes',
  templateUrl: './article-variantes.component.html',
  styleUrls: ['./article-variantes.component.scss']
})
export class ArticleVariantesComponent implements OnInit {

  modalReference: NgbModalRef;
  isLoading = false
  page = 1

  lienAjoute = "/sousProduits/newSousProduit/"
  lienModifier = "/sousProduits/updateSousProduit/"
  lienSupprimer = "/sousProduits/deleteSousProduit/"

  titreCrud = "Ajouter"

  @Input() isDetails = "0"
  @Input() article
  @Input() sousProduits
  @Input() variantes = []

  valeurs = []

  objectKeys = Object.keys;
  contactFormGroup: FormGroup;

  itemVariante = {
    variante: "",
    valeur: ""
  }

  items = {
    reference: "reference",
    variantes: "variantes",
    impactPrix: "impact_Prix",
    impactPoids: "impact_Poids"
  };

  itemsVariable = {
    reference: "reference",
    variantes: "variantes",
    impactPrix: "impact_Prix",
    impactPoids: "impact_Poids"
  };

  id = ""
  sousProduit = {
    id: "",
    reference: "",
    variantes: [],
    impactPrix: 0,
    impactPoids: 0
  }

  erreurSousProduit = {
    reference: "",
    variantes: "",
  }

  public visible = false;
  closeResult = '';

  ajouterVariante() {
    if ("" == this.itemVariante.variante || "" == this.itemVariante.valeur) {
      return
    }

    if (this.sousProduit.variantes.filter(x => (x.variante == this.itemVariante.variante && x.valeur == this.itemVariante.valeur)).length > 0) {
      return
    }

    if (this.erreurSousProduit['variantes'].length > 0) {
      this.erreurSousProduit['variantes'] = ""
      if (document.getElementById(this.titre + 'variantes')) {
        document.getElementById(this.titre + 'variantes').classList.remove("border-erreur")
      }
    }

    this.sousProduit.variantes.push({ variante: this.itemVariante.variante, valeur: this.itemVariante.valeur })

    this.itemVariante = {
      variante: "",
      valeur: ""
    }
  }



  supprimerVariante(item) {
    this.sousProduit.variantes = this.sousProduit.variantes.filter(x => !(x.variante == item.variante && x.valeur == item.valeur))
  }

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private http: HttpClient,
    public informationGenerale: InformationsService,
    private tokenStorageService: TokenStorageService,
    public fonctionPartagesService: FonctionPartagesService,
    private notificationToast: ToastNotificationService,) {
  }

  selectVariante() {
    for (let i = 0; i < this.variantes.length; i++) {
      if (this.variantes[i].libelle == this.itemVariante.variante) {
        this.valeurs = this.variantes[i].valeurs
        return
      }
    }
    this.valeurs = []
  }

  options2: NgbModalOptions = {
    container: '.session-modal-container'
  };

  open(content) {
    this.itemVariante = {
      variante: "",
      valeur: ""
    }
    this.titreCrud = "Ajouter"
    this.sousProduit = {
      id: "",
      reference: "",
      variantes: [],
      impactPrix: 0,
      impactPoids: 0
    }

    this.erreurSousProduit = {
      reference: "",
      variantes: "",
    }

    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  openModifier(content, sousProduit) {

    this.itemVariante = {
      variante: "",
      valeur: ""
    }

    this.sousProduit = {
      id: "",
      reference: "",
      variantes: [],
      impactPrix: 0,
      impactPoids: 0
    }

    this.titreCrud = "Modifier"

    for (let key in this.sousProduit) {
      if (key != 'variantes') {
        this.sousProduit[key] = sousProduit[key]
      } else {
        for (let key2 in sousProduit[key]) {
          this.sousProduit[key][key2] = sousProduit[key][key2]
        }
      }
    }

    this.erreurSousProduit = {
      reference: "",
      variantes: "",
    }

    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  JoinAndClose() {
    this.modalReference.close();
  }

  ngOnInit(): void {
  }

  titre = "sousProduit"

  controleInputs() {

    for (let key in this.erreurSousProduit) {
      this.erreurSousProduit[key] = ""
      if (document.getElementById(this.titre + key)) {
        document.getElementById(this.titre + key).classList.remove("border-erreur")
      }
    }

    var isValid = true

    if (this.sousProduit.variantes.length == 0) {
      this.erreurSousProduit['variantes'] = "Veuillez inserer Votres variantes !!"
      if (document.getElementById(this.titre + 'variantes')) {
        document.getElementById(this.titre + 'variantes').classList.add("border-erreur")
      }
      isValid = false
    }

    if (this.sousProduit.reference == "") {
      this.erreurSousProduit['reference'] = "Veuillez inserer votre référence !!"
      if (document.getElementById(this.titre + 'reference')) {
        document.getElementById(this.titre + 'reference').classList.add("border-erreur")
      }
      isValid = false
    }

    if (this.titreCrud == "Ajouter") {
      if (this.sousProduits?.filter(x => x.reference == this.sousProduit.reference).length > 0 && this.sousProduit.reference != "") {
        this.erreurSousProduit['reference'] = "Votre référence existe déjà !!"
        if (document.getElementById(this.titre + 'reference')) {
          document.getElementById(this.titre + 'reference').classList.add("border-erreur")
        }
        isValid = false
      }
    } else {
      if (this.sousProduits?.filter(x => x.reference == this.sousProduit.reference && x.id != this.sousProduit.id).length > 0 && this.sousProduit.reference != "") {
        this.erreurSousProduit['reference'] = "Votre référence existe déjà !!"
        if (document.getElementById(this.titre + 'reference')) {
          document.getElementById(this.titre + 'reference').classList.add("border-erreur")
        }
        isValid = false
      }
    }
    return isValid
  }

  enregistrerSousProduit() {
    if (!this.controleInputs()) {
      return
    }

    if (this.isLoading) {
      return
    }
    this.isLoading = true

    var id = this.route.snapshot.paramMap.get('id');

    this.http.post(this.informationGenerale.baseUrl + this.lienAjoute + id, this.sousProduit,this.tokenStorageService.getHeader()).subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.notificationToast.showSuccess("Votre article est bien modifiée !")
          this.affecterList(resultat.resultat)
          this.JoinAndClose()
        } else {
          this.notificationToast.showError(resultat.message)
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }

  tabEmpty = []
  inisialiserEmptyTab() {
    this.tabEmpty = []
    if (this.sousProduits) {
      for (let i = 0; i < (6 - this.sousProduits.length); i++) {
        this.tabEmpty.push({})
      }
    } else {
      for (let i = 0; i < 6; i++) {
        this.tabEmpty.push({})
      }
    }
    return true
  }

  modifierSousProduit() {

    if (!this.controleInputs()) {
      return
    }

    if (this.isLoading) {
      return
    }
    this.isLoading = true

    var id = this.route.snapshot.paramMap.get('id');

    console.log(this.sousProduit.id)

    this.http.post(this.informationGenerale.baseUrl + this.lienModifier + id + '/' + this.sousProduit.id, this.sousProduit, this.tokenStorageService.getHeader()).subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.notificationToast.showSuccess("Votre article est bien modifiée !")
          this.affecterList(resultat.resultat)
          this.JoinAndClose()
        } else {
          this.notificationToast.showError(resultat.message)
        }

      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }

  supprimerSousProduit(id) {
    if (this.isLoading) {
      return
    }
    this.isLoading = true

    var idArticle = this.route.snapshot.paramMap.get('id');

    this.http.post(this.informationGenerale.baseUrl + this.lienSupprimer + idArticle + '/' + id, {}, this.tokenStorageService.getHeader()).subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.notificationToast.showSuccess("Votre article est bien modifiée !")
          this.affecterList(resultat.resultat)
        } else {
          this.notificationToast.showError(resultat.message)
        }

      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }


  //start - Modal-attention-des-intervalles-inclus
  isOpenModalConfirmationIntervallInclus = false
  openConfirmationConfirmationIntervallInclus() {
    this.isOpenModalConfirmationIntervallInclus = true
  }

  closeConfirmationIntervallInclus() {
    this.isOpenModalConfirmationIntervallInclus = false
  }
  //end - Modal-attention-des-intervalles-inclus

  affecterList(newList) {

    while (this.sousProduits.length > 0) {
      this.sousProduits.splice(0, 1);
    }

    for (let i = 0; i < newList.length; i++) {
      this.sousProduits.push(newList[i])
    }

    this.sousProduit = {
      id: "",
      reference: "",
      variantes: [],
      impactPrix: 0,
      impactPoids: 0
    }

  }

  //autocomplete variante
  keySelectedVariante = "libelle"
  objetVariante = { libelle: "Libelle" }
  setVarianteID(id) {
    console.log("variantes", this.variantes, this.itemVariante.variante)
    this.itemVariante.variante = this.variantes.filter((x) => x.id == id)[0].libelle
    this.selectVariante()
  }

  //open modal ajout variante
  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  typeElement
  closeModalAjoutElement(){
    this.isOpenModalAjoutElement = false
  }

  openModalAjoutVariante() {     
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterVariante
    this.isOpenModalAjoutElement = true
  }

}
