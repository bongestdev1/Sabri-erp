import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import {formatDate} from '@angular/common';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';
const parametres = require("../parametres.json");

@Component({
  selector: 'app-details-reglement',
  templateUrl: './details-reglement.component.html',
  styleUrls: ['./details-reglement.component.scss']
})
export class DetailsReglementComponent implements OnInit {
  
  societeFormGroup : FormGroup;
  parametres2 = {typeTier:"", apiGetById:"", titreAjouter:"", apiParametres:"", typeReglement:""}
  id = ""
  objectKeys = Object.keys;
  
  reglement = {
    client:"",
    modeReglement:"",
    tresorerie:"",
    montant:0,
    dateReglement:new Date(),
    numCheque:"",
    dateEcheance:null,
    notes:"",
    societe:"",
    numero:"",
    bonLivraisons:[],
    reste:0
  }

  parametres = {
    bonLivraisons : [],
    allClients:[],
    allModeReglements:[]
  }

  isLoading = false
  
  constructor(private notificationToast:ToastNotificationService, 
    private http: HttpClient, 
    private tokenStorageService:TokenStorageService,
    public informationGenerale: InformationsService,
    public fonctionPartagesService:FonctionPartagesService,
    private route: ActivatedRoute,
    private router:Router ) { }

  ngOnInit(): void {
    var key = this.router.url.replace("/reglement/", "")
    key = key.substring(0, key.indexOf('/'))
    this.parametres2 = parametres[key]
   
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id.length > 1){
      this.getReglement(this.id)
    }
  }

  getReglement(id) {
    this.isLoading = true
    this.http.get(this.informationGenerale.baseUrl + this.parametres2.apiGetById+id,this.tokenStorageService.getHeader()).subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if (response.status){
          for(let key in this.reglement){
                this.reglement[key] = response.resultat[key]  
          }
          
          this.parametres.bonLivraisons = response.bonLivraisons
        
          var docs = []
          for(let key in this.parametres.bonLivraisons){
            if(this.parametres.bonLivraisons[key].montantAPayer != 0){
              docs.push(this.parametres.bonLivraisons[key])
            }
          }
          
          this.parametres.bonLivraisons = docs
           
          this.getAllParametres()
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  itemsVariableG = {
    numero:"Numéro",
    date:"Date",
    montantTotal:"Montant total",
    montantPaye:"Montant paye",
    restPayer:"Reste à payer",
    montantAPayer:"Montant à payer",
    isPayee:"payee"
  }


  getAllParametres() {
    this.http.post(this.informationGenerale.baseUrl + this.parametres2.apiParametres +this.informationGenerale.idSocieteCurrent, {typeReglement:this.parametres2.typeReglement},this.tokenStorageService.getHeader()).subscribe(

      res => {
        let resultat: any = res
        if (resultat.status) {
          this.parametres.allClients = resultat.clients
          this.parametres.allModeReglements = resultat.modeReglements
          this.reglement.numero = resultat.numeroAutomatique
        }
      }, err => {
        console.log(err)
        alert("Désole, il y a un problème de connexion internet")
      }
    );
  }
  
  
}