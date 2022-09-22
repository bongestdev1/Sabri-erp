import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/model/modelComerce/client/client';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';


@Component({
  selector: 'app-modifier-client',
  templateUrl: './modifier-client.component.html',
  styleUrls: ['./modifier-client.component.scss']
})
export class ModifierClientComponent implements OnInit {
  clientFormGroup: FormGroup;

  //start modal
  @Output() closeModal = new EventEmitter<string>();

  @Input() id = ""

  @Input() isPopup = ""

  @Input() isOpenModal = false

  closeModalFunction(){
    this.closeModal.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModal == true){
      for (let key in this.erreurClient) {
        this.erreurClient[key] = ""
        if (document.getElementById(key) != null) {
          document.getElementById(key).classList.remove("border-erreur")
        }
      }

      this.request = new Client()
      this.client = new Client()
      
      if (this.id != null && this.id.length > 1) {
        this.getClient(this.id)
      }
    }
  }
  //end modal


  @Input() lienModifie = "/clients/modifierClient/"
  @Input() lienGetById = "/clients/getById/"
  @Input() pageList = "/client/list"
  @Input() apiParametres = "/clients/getAllParametres/"
  @Input() titre = "Modifier Client"

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

  constructor(
    private route: ActivatedRoute, 
    private notificationToast:ToastNotificationService,
    private http: HttpClient,
    private tokenStorageService:TokenStorageService,
    private router: Router,
    public informationGenerale: InformationsService,
    private fonctionPartagesService:FonctionPartagesService) {

  }

  getClient(id){  
    this.isLoading = true
    this.http.get(this.informationGenerale.baseUrl + this.lienGetById+id,this.tokenStorageService.getHeader()).subscribe(
      res => {
        this.getAllParametres()
        this.isLoading = false
        let response: any = res
        if (response.status) {
          this.request = response.resultat
          for (let key in this.client) {
            this.client[key] = this.request[key]
          }
          this.contacts = this.request.contacts
          this.complements = this.request.complements
          this.autreAdresse = this.request.autresAdresse
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  ngOnInit(): void {
    this.getAllParametres()

    if(!this.isPopup){
      this.id = this.route.snapshot.paramMap.get('id');
   
      if(this.id != null && this.id.length > 1){
        this.getClient(this.id)
      }
    }
  
  }

  controleInputs() {
    for (let key in this.erreurClient) {
      this.erreurClient[key] = ""
      if (document.getElementById(key) != null) {
        document.getElementById(key).classList.remove("border-erreur")
      }
    }

    var isValid = true

    for (let key in this.erreurClient){
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

  modifierClient(){
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

    if (this.isLoading) {
      return
    }

    this.isLoading = true
    this.http.post(this.informationGenerale.baseUrl + this.lienModifie+this.id, this.request,this.tokenStorageService.getHeader()).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          if(!this.isPopup){
            this.router.navigate([this.pageList]);
          }else{
            this.closeModal.emit();
          }
          this.notificationToast.showSuccess("Votre " + this.modeTiere +" est bien modifiée !")
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
    this.http.get(this.informationGenerale.baseUrl + this.apiParametres +this.informationGenerale.idSocieteCurrent,this.tokenStorageService.getHeader()).subscribe(
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
        //  this.client.code = resultat.numero.numero
        //  this.request.code = resultat.numero.numero
          this.tabCode = []
          this.tabMatricule = []
          this.tabRaisonSociale = []
          for (let item of this.allClients) {
            if(item.id != this.id){
              this.tabCode.push(item.code)
              this.tabMatricule.push(item.matriculeFiscale)
              this.tabRaisonSociale.push(item.raisonSociale)
            }
          }
        }

      }, err => {
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  //end modal ajout Element

}
