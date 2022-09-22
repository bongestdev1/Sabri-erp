import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { Router } from '@angular/router';
import { FonctionPartagesService } from '../services/fonction-partages.service';
import { Output, EventEmitter } from '@angular/core';
import { TokenStorageService } from '../services/authentication/token-storage.service';

@Component({
  selector: 'app-parametres-page',
  templateUrl: './parametres-page.component.html',
  styleUrls: ['./parametres-page.component.scss']
})
export class ParametresPageComponent implements OnInit {

  fraisFormGroup: FormGroup;
  lienAjoute = "/parametres/setConfiguration"
  lienGet = "/parametres/getConfiguration/"

  objectKeys = Object.keys;

  request = {
    nombreChiffresApresVerguleNormale: 3,
    nombreChiffresApresVerguleQuantite: 3,
    prixTimbreFiscale: 0.6,
    tauxFodec: 1,
    coefficientRetenueImpot: 1.5,
    societe: "",
    clientPardefault: "",
    modeReglementPardefault : "",
    validationStockBonAchat:"non",
    uniteMesurePardefault:"",
    validationUpdatePrixAchatFromBonAchat:"",
    validationTimbreFiscaleBonRec:"oui",
    validationTimbreFiscaleBonLiv:"oui",
    logo:"",
    societeTransport:""
  }

  parametres = {
    nombreChiffresApresVerguleNormale: 3,
    nombreChiffresApresVerguleQuantite: 3,
    prixTimbreFiscale: 0.6,
    tauxFodec: 1,
    coefficientRetenueImpot: 1.5,
    societe: "",
    clientPardefault: "",
    modeReglementPardefault:"",
    validationStockBonAchat:"non",
    uniteMesurePardefault:"",
    validationUpdatePrixAchatFromBonAchat:"",
    validationTimbreFiscaleBonRec:"oui",
    validationTimbreFiscaleBonLiv:"oui",
    logo:"",
    societeTransport:""
  }

  erreurParametres = {
    nombreChiffresApresVerguleNormale: "",
    nombreChiffresApresVerguleQuantite: "",
    prixTimbreFiscale: "",
    tauxFodec: "",
    coefficientRetenueImpot: "",
  }

  variableGlobal = {
    exerciceSelectionner: 0,
  }

  exercices = []

  constructor(
    private tokenStorageService: TokenStorageService,
    private notificationToast: ToastNotificationService,
    private http: HttpClient,
    private router: Router,
    public informationGenerale: InformationsService,
    private fonctionPartagesService: FonctionPartagesService) {
    this.getConfiguration()
  }

  ngOnInit(): void {
    this.variableGlobal.exerciceSelectionner = this.informationGenerale.exerciceCurrent
    this.getAllParametres()
    this.uniteMesure = this.informationGenerale.getUniteParDefaut()
  }

  isLoading = false

  ajoutFrais() {

    this.enregistreVariableGlobal()

    if (this.isLoading) {
      return
    }

    if(this.imageSelectedSource){
      this.importFichierArticles() 
      return
    }
    for (let key in this.parametres) {
      this.request[key] = this.parametres[key]
    }
    this.request.societe = this.informationGenerale.idSocieteCurrent

    
    this.informationGenerale.setExerciceCurrent(this.variableGlobal.exerciceSelectionner, this.parametres.clientPardefault,this.parametres.modeReglementPardefault, this.parametres.validationStockBonAchat)
    this.informationGenerale.setUniteParDefaut(this.parametres.uniteMesurePardefault)
    this.isLoading = true
    this.http.post(this.informationGenerale.baseUrl + this.lienAjoute, this.request,this.tokenStorageService.getHeader()).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.notificationToast.showSuccess("Votre Configuration est bien enregistrée !")
          this.fonctionPartagesService.setParametres(this.request)
        }
      }, err => {
        console.log(err)
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  getConfiguration() {
    if (this.isLoading) {
      return
    }

    this.isLoading = true

    this.http.get(this.informationGenerale.baseUrl + this.lienGet + this.informationGenerale.idSocieteCurrent,this.tokenStorageService.getHeader()).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res

        if (resultat.status) {
          this.parametres = resultat.resultat
          this.exercices = resultat.exercices
          console.log(this.parametres)
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  enregistreVariableGlobal() {
    this.informationGenerale.setExerciceCurrent(this.variableGlobal.exerciceSelectionner, this.parametres.clientPardefault,this.parametres.modeReglementPardefault,this.parametres.validationStockBonAchat)
    this.notificationToast.showSuccess("Votre Configuration est bien enregistrée !")
  }

  //get all Clients
  allClients = []
  allSocietes = []
  allModeReglements = []
  uniteMesures = []
  apiList = "/parametres/getAllParametres/"
  getAllParametres() {
    this.http.get(this.informationGenerale.baseUrl + this.apiList + this.informationGenerale.idSocieteCurrent,this.tokenStorageService.getHeader()).subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.allClients = resultat.clients
            this.allModeReglements = resultat.modereglements
            this.uniteMesures = resultat.uniteMesures
            this.allSocietes = resultat.societes
           console.log(resultat)
          }
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  //autocomplete client
  keySelectedClient = "raisonSociale"
  objetClient = {
    code: "Code",
    raisonSociale: "Raison-Sociale",
    matriculeFiscale: "Matricule-Fiscale",
    email: "Email",
  }
  setClientID(id) {
    this.parametres.clientPardefault = id
  }

  setSocieteID(id) {
    this.parametres.societeTransport = id
  }

  openModalAjoutSociete(){
     
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

  openModalAjoutModeReglement() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterModeReglement
    this.isOpenModalAjoutClient = true
  }

  //autocomplete ModeReglement
  keySelectedModeReglement = "libelle"
  objetModeReglement = {
    libelle: "Libelle",
    ordre: "Ordre",
    valeurRetiree: "Valeur Retiree",
    tierNecessaire: "Tier Necessaire",
  }
  
  setModeReglementID(id) {
    this.parametres.modeReglementPardefault = id
  }

  clickIsValid2(){
    if(this.parametres.validationStockBonAchat == "oui"){
      this.parametres.validationStockBonAchat = "non"
    }else{
      this.parametres.validationStockBonAchat = "oui"
    }
  }

  clickIsvalidationUpdatePrixAchatFromBonAchat(){
    if(this.parametres.validationUpdatePrixAchatFromBonAchat == "oui"){
      this.parametres.validationUpdatePrixAchatFromBonAchat = "non"
    }else{
      this.parametres.validationUpdatePrixAchatFromBonAchat = "oui"
    }
  }

  clickIsTimbreFiscaleBonRec(){
    if(this.parametres.validationTimbreFiscaleBonRec == "oui"){
      this.parametres.validationTimbreFiscaleBonRec = "non"
    }else{
      this.parametres.validationTimbreFiscaleBonRec = "oui"
    }
  }

  clickIsTimbreFiscaleBonLiv(){
    if(this.parametres.validationTimbreFiscaleBonLiv == "oui"){
      this.parametres.validationTimbreFiscaleBonLiv = "non"
    }else{
      this.parametres.validationTimbreFiscaleBonLiv = "oui"
    }
  }

  clickIsValid
  //start UniteMesure
  uniteMesure = ""
  objetUniteMesure = { libelle: "Libelle" }

  setUniteMesureID1(id) {
    this.parametres.uniteMesurePardefault = id
  }

  isOpenModalAjoutElement = false

  openModalAjoutUniteMesure(){
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterUniteMesure
    this.isOpenModalAjoutElement = true
  }
  //end UniteMesure

  //start upload logo

  multiImage
  imageSelected
  imageSelectedSource
  componentField

  selectedM(event) {
    this.multiImage = event.target.files;
    
    var files = event.target.files;
    if (files.length === 0)
    return;

    this.imageSelectedSource = files[0]
    
    var mimeType = files[0].type;
   
    var reader = new FileReader();
    
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imageSelected = reader.result
    }
 }
 // Gestion des photos --fin--

 image = ""
 pathFichier = ""

 importFichierArticles(){
   if(this.isLoading){
     return 
   }
   
   if(this.imageSelectedSource){
     const formData = new FormData();
     this.isLoading = true  
     var json_arr = JSON.stringify(["key","key2"])   
     formData.append('myFiles', this.imageSelectedSource) 
     this.http.post(this.informationGenerale.baseUrl+"/importations/upload", formData,this.tokenStorageService.getHeader()).subscribe(
       res => {   
         var arrayImages: any = res 
         this.isLoading = false;
        
         if(arrayImages.length > 0){
           this.parametres.logo = arrayImages[0]
           this.imageSelectedSource = null
           this.ajoutFrais()
         }
       }, err => {
         this.isLoading = false;
         return 
       }
     );
   }
 }

 //end upload logo

  
}
