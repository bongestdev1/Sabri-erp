import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { formatDate } from '@angular/common';
import { ObjetsAutocompleteService } from 'src/app/services/objets-autocomplete.service';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';

@Component({
  selector: 'app-modifier-reception',
  templateUrl: './modifier-reception.component.html',
  styleUrls: ['./modifier-reception.component.scss']
})
export class ModifierReceptionComponent implements OnInit {

  newReception = {
    transporteur: "",
    idConnecte: "61cc5766dac87021a8bb8a28",
    date: "",
    articles: []
  }

  id = "";
  objectKeys = Object.keys;

  shemaArticle = {
    numero: "Numéro",
    reference: "Réference",
    designation: "Désignation",
    sousProduit: "Sous_Produit",
    lot: "Lot / Numéro Série",
    quantiteAchat: "Quantite",
    quantiteARecevoit: "Quantite à Recevoit",
    quantiteRecevoit: "Quantite Recevoit",
    unite: "Unite",
  }

  tabNumbers= ['quantiteARecevoit']
  allTabNumbers = [ 'quantiteAchat', 'quantiteARecevoit']
  tabNumbersLabel = ['quantiteAchat' ]

  objetSousProduits = {}

  isLoading = false
  constructor(
    private http: HttpClient,
    public informationGenerale: InformationsService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenStorageService:TokenStorageService,
    private notificationToast: ToastNotificationService,
    public fonctionPartagesService: FonctionPartagesService,
    public objetsAutocomplete: ObjetsAutocompleteService) {
  }

  ngOnInit(): void {
    this.getAllParametres()
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id.length > 1){
      this.getReception()
    }
  }

  setTransporteurID(id) {
    this.newReception.transporteur = id
  }

  //open modal ajout Element
  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  typeElement
  openModalAjoutTransporteur() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterTransporteur
    this.isOpenModalAjoutElement = true
  }
  closeModalAjoutElement() {
    this.isOpenModalAjoutElement = false
  }

  allTransporteurs = []
  apiParametres = "/receptions/getAllParametres"
  getAllParametres() {
    let request = {
      societe: this.informationGenerale.idSocieteCurrent,
    }

    this.http.post(this.informationGenerale.baseUrl + this.apiParametres, request,this.tokenStorageService.getHeader()).subscribe(
      res => {
        let resultat: any = res
        if (resultat.status) {
          this.allTransporteurs = resultat.transporteurs
        }}
      );
  }

  changeQuantiteRestant(){
    for(let i = 0; i < this.newReception.articles.length; i++){
      
      if(this.newReception.articles[i].quantiteARecevoit < 0){
        this.newReception.articles[i].quantiteARecevoit = 0
      }else if( this.newReception.articles[i].quantiteARecevoit > (this.newReception.articles[i].quantiteAchat - this.newReception.articles[i].quantiteRecevoit)){
        this.newReception.articles[i].quantiteARecevoit = (this.newReception.articles[i].quantiteAchat - this.newReception.articles[i].quantiteRecevoit)
        this.notificationToast.showError("Veuillez saisir quantité inferieur à quantité vente !")
      }
    }
  }

  getNumber(float){
    return this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(float)
  }
  lienGetById = "/receptions/getById"
  getReception()
  {
    this.isLoading = true
    this.http.get(this.informationGenerale.baseUrl + this.lienGetById + "/" + this.id,this.tokenStorageService.getHeader()).subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          for (let key in this.newReception){
            this.newReception[key] = response.resultat[key]
          }
          this.newReception.date = formatDate(new Date(), 'yyyy-MM-dd', 'en')
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }
  lienModifie = "/receptions/modifierReception/"
  modifierReception()
  {
    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.lienModifie+this.id, this.newReception,this.tokenStorageService.getHeader()).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.router.navigate(["/recepetion/list"]);
          this.notificationToast.showSuccess("Votre reception est bien modifiée !")
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }
}
