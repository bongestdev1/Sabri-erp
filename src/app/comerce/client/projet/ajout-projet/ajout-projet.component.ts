import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { ProjetClient } from 'src/app/model/modelCommerce/projetClient';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';
import { ProjetClientService } from 'src/app/services/serviceBD_Commerce/projetClient.service';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ajout-projet',
  templateUrl: './ajout-projet.component.html',
  styleUrls: ['./ajout-projet.component.scss']
})
export class AjoutProjetComponent implements OnInit {
  projetFormGroup: FormGroup;

  objectKeys = Object.keys;

  projets = []

  request = new ProjetClient()

  projet = new ProjetClient()

  erreurProjet = {
    libelle: "",
    adresse: "",
    enCours: "",
    client : "",
    budjet: "",
   
  }

  @Output() closeModal = new EventEmitter<string>();

  @Input() isPopup = false

  @Input() isOpenModalAjoutElement = false

  constructor(
    private notificationToast: ToastNotificationService,
    public informationGenerale: InformationsService,
    private fonctionPartagesService: FonctionPartagesService,
    private fnctModel: FnctModelService,
    private projetCliSer: ProjetClientService,
    private router: Router,) { }

  ngOnInit(): void {
    this.getAllParametres()
  }

  isLoading = false
  pageList = "client/projet/list"
  ajoutProjet() {
    if (!this.fnctModel.controleInputs(this.erreurProjet, this.projet, this.tabLibelle, 'libelle')) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    if (!this.fnctModel.controleInputs(this.erreurProjet, this.projet, this.tabAdresse, 'adresse')) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    for (let key in this.projet) {
      this.request[key] = this.projet[key]
    } 
    this.request.societe = this.informationGenerale.idSocieteCurrent
    this.projetCliSer.create(this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.notificationToast.showSuccess("Votre projet est bien enregistrée !")  
           if(!this.isPopup){
            this.router.navigate([this.pageList]);
           }else{
            this.closeModal.emit()  
           }
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }
  //Get parametre of Projet Client
  tabLibelle = []
  tabAdresse = []
  allProjets = []
  getAllParametres() {
    this.projetCliSer.parametre(this.informationGenerale.idSocieteCurrent)
      .subscribe(
        res => {
          let resultat: any = res
          if (resultat.status) {
            this.clients = resultat.clients
            this.allProjets = resultat.projets
            console.log("this.allProjets",this.allProjets)
            for (let item of this.allProjets) {
              this.tabLibelle.push(item.libelle)
            }
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  clients = []
  //autocomplete client
  keySelectedClient = "raisonSociale"
  objetClient = {
    email: "Email",
    telephone: "Téléphone",
    code: "Code",
    raisonSociale: "Raison Sociale",
    matriculeFiscale: "Matricule Fiscale",
    classement: "Classement",
    plafondCredit: "Plafond Crédit",
    mobiles: "Mobiles",
    siteWeb: "Site Web",
    conditionReglement: "Condition Reglement",
    typeTiers: "Type Tiers",
    credit: "Crédit",
    fax: "Fax",
    statusProspection: "Status Prospection",
    modeReglement: "Mode Reglement",
    paysFacturation: "Pays Facturation",
    gouvernoratFacturation: "Gouvernorat Facturation",
    delegationFacturation: "Délégation Facturation",
    localiteFacturation: "Localite Facturation",
    codePostaleFacturation: "Code Postale Facturation",
    adresseFacturation: "Adresse Facturation",
    paysLivraison: "Pays Livraison",
    gouvernoratLivraison: "Gouvernorat Livraison",
    delegationLivraison: "Délégation Livraison",
    localiteLivraison: "Localite Livraison",
    codePostaleLivraison: "Code Postale Livraison",
    adresseLivraison: "Adresse Livraison",
  }
  setClientID(id) {
    this.projet.client = id
  }
  //open modal ajout Client
  isOpenModalAjoutClient = false
  idAjoutClientModal = ""
  typeElement
  closeModalAjoutClient() {
    this.isOpenModalAjoutClient = false
    this.getAllParametres()
  }
  openModalAjoutClient() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterClient
    this.isOpenModalAjoutClient = true
  }
}
