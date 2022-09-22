import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjetClient } from 'src/app/model/modelCommerce/projetClient';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { ProjetClientService } from 'src/app/services/serviceBD_Commerce/projetClient.service';

@Component({
  selector: 'app-modifier-projet',
  templateUrl: './modifier-projet.component.html',
  styleUrls: ['./modifier-projet.component.scss']
})
export class ModifierProjetComponent implements OnInit {
  projetFormGroup: FormGroup;

  objectKeys = Object.keys;
  id="";

  request = new ProjetClient()

  projet = new ProjetClient()

  erreurProjet = {
    libelle: "",
    adresse: "",
    enCours: "",
    client : "",
    budjet: "",
  }
  
  constructor(
   
    private notificationToast: ToastNotificationService,
    public informationGenerale: InformationsService,
    private fonctionPartagesService: FonctionPartagesService,
    private projetCliSer: ProjetClientService,
    private router: Router,
    private route: ActivatedRoute, ) {
  }

  getProjet(id) {
    
    this.isLoading = true
    this.projetCliSer.get(id)
    .subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          console.log(response)
          for (let key in this.projet) {
            this.projet[key] = response.resultat[key]
          }
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      });

  }

  ngOnInit(): void {
    this.getAllParametres()
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id.length > 1){
      this.getProjet(this.id)
    }
  }

  controleInputs() {
   
    for(let key in this.erreurProjet){
      this.erreurProjet[key] = ""
      if(document.getElementById(key) != null){
        document.getElementById(key).classList.remove("border-erreur")
      }
    }
   
    var isValid = true

    for(let key in this.erreurProjet){
      if(this.projet[key] == ""){
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.add("border-erreur")
        }
        this.erreurProjet[key] = "Veuillez remplir ce champ"
        isValid = false
      }
    }  

    return isValid
  }

  isLoading = false
  pageList = "client/projet/list"
  ModifierProjet()
  { 

    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }   
    
    for (let key in this.projet) {
      this.request[key] = this.projet[key]
    }
    
    if (this.isLoading) {
      return
    }

    for (let key in this.projet) {
      this.request[key] = this.projet[key]
    }
    this.isLoading = true
    this.projetCliSer.update(this.id, this.projet, this.request)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.router.navigate([this.pageList]);
            this.notificationToast.showSuccess("Votre projet est bien modifiée !")
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
