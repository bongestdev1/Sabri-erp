import { Component, OnInit,  Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InformationsService } from '../../../services/informations.service';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { Output, EventEmitter } from '@angular/core';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { Client } from 'src/app/model/modelComerce/client/client';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';

@Component({
  selector: 'app-ajouter-client',
  templateUrl: './ajouter-client.component.html',
  styleUrls: ['./ajouter-client.component.scss']
})
export class AjouterClientComponent implements OnInit {

  clientFormGroup: FormGroup;

  @Input() lienAjoute = "/clients/newClient"
  @Input() lienParametres = "/clients/getAllParametres/"
  @Input() pageList = "/client/list"
  @Input() titre = "Ajouter Client"

  @Input() modeTiere = this.fonctionPartagesService.modeTiere.client

  autreAdresse = []
  contacts = []
  complements = []

  objectKeys = Object.keys;

  request = new Client()

  client = new Client()

  erreurClient = {
    code: "",
    raisonSociale: "",
  }

  @Output() closeModalAjoutClient = new EventEmitter<string>();

  @Input() isPopup = false

  @Input() isOpenModalAjoutClient = false

  
  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalAjoutClient){
      this.getAllParametres()
    }
  }
  
  closeAjoutClient(){
    this.closeModalAjoutClient.emit();
  }

  constructor(
    private notificationToast: ToastNotificationService,
    private http: HttpClient,
    private tokenStorageService:TokenStorageService,
    private router: Router,
    public informationGenerale: InformationsService,
    private fonctionPartagesService:FonctionPartagesService) {
    
  }

  ngOnInit(): void {
    this.getAllParametres()
    this.client.modeReglement = this.informationGenerale.modeReglCurrent
  }

  controleInputs() {
    for (let key in this.erreurClient) {
      this.erreurClient[key] = ""
      if (document.getElementById(key) != null) {
        document.getElementById(key).classList.remove("border-erreur")
      }
    }

    var isValid = true

    for (let key in this.erreurClient) {
      if (this.client[key] == "") {
        this.erreurClient[key] = "Veuillez remplir ce champ"
        if (document.getElementById(key) != null) {
          document.getElementById(key).classList.add("border-erreur")
        }
        isValid = false
      }
    }
    

    for(let i = 0;i<this.tabCode.length;i++)
    {
      if(this.client.code == this.tabCode[i])
      {
        this.erreurClient.code = "Votre code existe déja"
        if (document.getElementById('raisonSociale') != null) {
          document.getElementById('raisonSociale').classList.add("border-erreur")
        }
        isValid = false
        break;
      }
    }

    
    for(let i = 0;i<this.tabRaisonSociale.length;i++)
    {
      if(this.client.raisonSociale == this.tabRaisonSociale[i])
      {
        this.erreurClient.raisonSociale = "Votre raison sociale existe déja"
        if (document.getElementById('raisonSociale') != null) {
          document.getElementById('raisonSociale').classList.add("border-erreur")
        }
        isValid = false
        break;
      }
    }

    return isValid
  }

  isLoading = false

  ajoutClient() {

    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }

    for (let key in this.client) {
      this.request[key] = this.client[key]
    }
    
    this.request.contacts = this.contacts
    this.request.autresAdresse = this.autreAdresse
    this.request.complements = this.complements
    this.request.societe = this.informationGenerale.idSocieteCurrent

    if (this.isLoading) {
      return
    }

    this.isLoading = true
    this.http.post(this.informationGenerale.baseUrl + this.lienAjoute, this.request,this.tokenStorageService.getHeader()).subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          if(this.isPopup){
            this.closeAjoutClient()
          }else{
            this.router.navigate([this.pageList]);
          }
          this.notificationToast.showSuccess("Votre " + this.modeTiere +" est bien enregistrée !")
        }else{
          this.notificationToast.showError(resultat.message)
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  reseteFormulaire() {
    for (let key in this.erreurClient) {
      this.client[key] = ""
    }
    this.contacts = []
    this.autreAdresse = []
    this.complements = []
  }

  allSecteurs = []
  allModeReglements = []
  allTypeTiers = []
  allTypeContacts = []
  allClients = []
  tabCode = []
  tabMatricule = []
  tabRaisonSociale = []
  allConditionReglements = []
  allPersonnels = []
  getAllParametres() {
    this.isLoading = true
    this.http.get(this.informationGenerale.baseUrl + this.lienParametres + this.informationGenerale.idSocieteCurrent,this.tokenStorageService.getHeader()).subscribe(
      res => {
        let resultat: any = res
        this.isLoading = false
        if (resultat.status) {
          this.allSecteurs = resultat.secteurs
          this.allModeReglements = resultat.modereglements
          this.allTypeTiers = resultat.typeTiers
          this.allTypeContacts = resultat.typeContacts
          this.allClients = resultat.clients
          this.allPersonnels = resultat.personnels
          this.allConditionReglements = resultat.conditionReglements
          this.client.code = resultat.numero.numero
          this.request.code = resultat.numero.numero
          this.tabCode = []
          this.tabMatricule = []
          this.tabRaisonSociale = []
          for (let item of this.allClients) {
            this.tabCode.push(item.code)
            this.tabMatricule.push(item.matriculeFiscale)
            this.tabRaisonSociale.push(item.raisonSociale)
          }
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  getNumero(){
    this.getAllParametres()      
  }


}
