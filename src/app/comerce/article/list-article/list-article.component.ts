import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InformationsService } from '../../../services/informations.service';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';

import { Articlelist } from 'src/app/model/modelComerce/article/Articlelist';
import { Articleshow } from 'src/app/model/modelComerce/article/Articleshow';
import { Articleform } from 'src/app/model/modelComerce/article/Articleform';

import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { UtiliteService } from 'src/app/services/utilite.service';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.scss']
})
export class ListArticleComponent implements OnInit {

  //start popup
  @Output() closeModal = new EventEmitter<string>();

  @Output() selectionLigne = new EventEmitter<string>();

  @Input() isPopup = false

  @Input() isOpenModal = false
  
  closeModalFunction(){
    console.log("close modal")
    this.closeModal.emit();
  }

  selectionLigneFunction(id){
    this.selectionLigne.emit(id)
  }
  //end popup

  formC: FormGroup

  apiDelete = "/articles/deleteArticle"
  apiList = "/articles/listArticlesSociete"

  pageDetails = "/article/details/"
  pageModifie = "/article/modifier/"
  pageAjoute = "/article/ajout"

  isOpenModalDelete = false
  idDeleteModal = ""
  params1Delete = ""
  params2Delete = ""

  objetFile = {
    reference: "Référence",
    codeBarre: "Code_Barre",
    designation: "Désignation",
    qteEnStock: "Quantité en stock",
    qteTheorique: "Quantité théorique",
    prixFourn: "Prix fournisseur",
    remiseF: "Remise fournisseur (%)",
    marge: "Marge (%)",
    prixAchat: "PrixAchat",
    prixTTC: "Prix TTC",
    categorie: "Catégorie",
    marque: "Marque",
    modele: "Modele"
  }

  deleteItem() {

    if (this.isLoading) {
      return
    }

    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.apiDelete + "/" + this.idDeleteModal, {},this.tokenStorageService.getHeader()).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.getClients()
          this.closeModalDelete()
          this.notificationToast.showSuccess("Votre client est bien supprimée !")
        }else{
          this.notificationToast.showError( this.fonctionPartages.getMessageBackend(resultat.message))
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }

  openModalDelete(id, params2) {
    this.idDeleteModal = id
    this.isOpenModalDelete = true
    this.params1Delete = "L'article "
    this.params2Delete = params2
  }

  closeModalDelete() {
    this.isOpenModalDelete = false
  }

  constructor(private utilite:UtiliteService, 
    private tokenStorageService:TokenStorageService,private fb: FormBuilder, private router: Router, private http: HttpClient, public informationGenerale: InformationsService, private notificationToast: ToastNotificationService, public fonctionPartages:FonctionPartagesService) {

    var form = new Articleform()
    this.formC = this.fb.group(form.getForm())

    this.getClients()

  
  }

  gotToAdd() {
    this.router.navigate(['/article/ajout']);
  }

  objectKeys = Object.keys;

  items = new Articleshow()

  itemsVariable = new Articleshow()

  request = new Articlelist()

  oldRequest = new Articlelist()

  ngOnInit(): void {

  }

  isLoading = false

  clients = []

  getClients() {

    if (this.isLoading) {
      return
    }

    for (let key in this.request.search) {
      this.request.search[key] = this.formC.value[key]
    }
    
    this.request.limit = this.formC.value.limit
    this.request.societe = this.informationGenerale.idSocieteCurrent

    if (!this.testSyncronisation(this.request, this.oldRequest)) {
      this.request.page = 1
    }

    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.apiList, this.request,this.tokenStorageService.getHeader()).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          console.log(resultat)
          this.clients = resultat.resultat.docs
          this.totalPage = resultat.resultat.pages
          this.oldRequest = resultat.request
          if (!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page)) {
            this.getClients()
          }
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  testSyncronisation(request1, request2) {
    for (let key in request1.search) {
      if (request1.search[key] != request2.search[key]) {
        return false
      }
    }

    for (let key in request1.orderBy) {
      if (request1.orderBy[key] != request2.orderBy[key]) {
        return false
      }
    }

    if (request1.limit != request2.limit) {
      return false
    }

    return true;
  }



  totalPage = 1

  setLimitPage(newLimitPage: number) {
    this.request.limit = newLimitPage
    this.request.page = 1
    this.getClients()
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getClients()
  }

  titreFile = "Liste d'articles"
  nameFile = "liste_article"
  printout() {
    this.utilite.printout(this.clients, this.objetFile, this.titreFile)
  }

  generatePDF() {
    this.utilite.generatePDF(this.clients, this.objetFile, this.titreFile, this.nameFile)
  }
  
  exportexcel() {
    /* table id is passed over here */
    this.utilite.exportexcel(this.clients, this.objetFile, this.titreFile, this.nameFile)
  }

  changeCroissante(key) {
    var classStyle = key + "-croissante";
    var buttons = document.getElementsByClassName(classStyle);
    if (this.request.orderBy[key] == 1) {
      this.request.orderBy[key] = -1
      this.activationCroissante(buttons[0], buttons[1])
    } else {
      this.request.orderBy[key] = 1
      this.activationCroissante(buttons[1], buttons[0])
    }

    for (let varkey in this.request.orderBy) {
      if (key != varkey) {
        this.request.orderBy[varkey] = 0
      }
    }

    this.getClients()
  }

  activationCroissante(buttons1, buttons2) {
    var buttons = document.getElementsByClassName("croissante");

    for (let i = 0; i < buttons.length; i++) {
      var classList = buttons[i].getAttribute("class")
      classList = classList.replace("active-buttons-croissante", "")
      buttons[i].setAttribute("class", classList)
    }

    classList = buttons2.getAttribute("class")
    classList = classList.replace("active-buttons-croissante", "")
    classList += " active-buttons-croissante"
    buttons2.setAttribute("class", classList)
  }

  //open modal ajout Element
  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  typeElement

  closeModalAjoutElement(){
    this.isOpenModalAjoutElement = false
    this.getClients()
  }

  ajouterArticle(){
    if(!this.isPopup){
      this.router.navigate([this.pageAjoute])
      return 
    }

    this.typeElement = this.fonctionPartages.titreOfModal.ajouterFournisseur
    this.isOpenModalAjoutElement = true
  }

  modifierArticle(idArticle){
    if(!this.isPopup){
      this.router.navigate([this.pageModifie+idArticle])
      return
    }

    this.typeElement = this.fonctionPartages.titreOfModal.modifierArticle
    this.isOpenModalAjoutElement = true
    this.idAjoutElementModal = idArticle
  }
  //end open modal ajout Element

}
