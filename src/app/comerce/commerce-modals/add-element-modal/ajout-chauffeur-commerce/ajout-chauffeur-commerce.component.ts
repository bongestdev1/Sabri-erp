import { ChauffeurService } from '../../../../services/serviceBD_GMAO/chauffeur.service';
import { Chauffeur } from '../../../../model/modelGMAO/chauffeur.model';
import { Component, OnInit, Input, SimpleChanges  } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';

@Component({
  selector: 'app-ajout-chauffeur-commerce',
  templateUrl: './ajout-chauffeur-commerce.component.html',
  styleUrls: ['./ajout-chauffeur-commerce.component.scss']
})
export class AjoutChauffeurCommerceComponent implements OnInit {

  chauffeurFormGroup: FormGroup;
  lienAjoute = "/chauffeurs/newChauffeur"
  objectKeys = Object.keys;

  @Output() closeModalAjoutChauffeur = new EventEmitter<string>();

  @Input() isPopup = false

  @Input() isOpenModalAjoutChauffeur = false

  request = {
    nom: "",
    prenom: "",
    role: "",
    email: "",
    telephone: "",
    adresse: "",
    societeRacine: this.informationGenerale.idSocieteCurrent,
  }

  chauffeur : Chauffeur = {
    nom: "",
    prenom: "",
    role: "",
    email: "",
    telephone: "",
    adresse: "",
    societeRacine: this.informationGenerale.idSocieteCurrent,
  }

  erreurChauffeur = {
    nom: "",
    prenom: "",
    role: "",
    email: "",
    telephone: "",
    adresse: "",
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalAjoutChauffeur){
      this.getAllParametres()
    }
  }
  
  closeAjoutChauffeur(){
    this.closeModalAjoutChauffeur.emit();
  }

  constructor(
    private notificationToast: ToastNotificationService,
    private router: Router,
    public informationGenerale: InformationsService,
    private chauffeurServ : ChauffeurService,
    private fnctModel:FnctModelService) 
    {
      this.getAllParametres()
    }

  ngOnInit(): void {
    this.getAllParametres() 
  }

  isLoading = false
  ajoutChauffeur() {
    if (!this.fnctModel.controleInputs(this.erreurChauffeur, this.chauffeur,this.tabEmails, 'email')) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    for (let key in this.chauffeur) {
      this.request[key] = this.chauffeur[key]
    } 
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.chauffeurServ.create(this.chauffeur, this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.notificationToast.showSuccess("Votre chauffeur est bien enregistrée !")            
            if(this.isPopup){
              this.closeAjoutChauffeur()
            }else{
              this.router.navigate(['gmao/chauffeur/list']);
            }
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  reseteFormulaire() {
    for (let key in this.erreurChauffeur) {
      this.chauffeur[key] = ""
    }
  }

  allRoles = []
  allEmails = []
  tabEmails = []
  getAllParametres() {
    this.chauffeurServ.parametre(this.informationGenerale.idSocieteCurrent)
      .subscribe(
        res => {
          let resultat: any = res
          if (resultat.status) {
            this.allRoles = resultat.roles
            this.allEmails = resultat.chauffeurs
            for (let item of this.allEmails) {
              this.tabEmails.push(item.email)
            }
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }
}
