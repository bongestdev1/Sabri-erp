import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { Clientshow } from "src/app/model/modelComerce/client/clientshow"
import { TokenStorageService } from '../services/authentication/token-storage.service';
const tables = require("./tables.json");

@Component({
  selector: 'app-parametres-importations-page',
  templateUrl: './parametres-importations-page.component.html',
  styleUrls: ['./parametres-importations-page.component.scss']
})
export class ParametresImportationsPageComponent implements OnInit {
  @ViewChild('outputSelectionner') tableHtml: ElementRef;

  tables = tables

  tableSelectionner = tables[0]

  table = tables[0].table

  parametresCurrent = {}
  parametresRestant = {}

  changerTable() {
    this.tables.forEach(x => {
      if (x.table === this.table) {
        this.tableSelectionner = x
        this.parametresRestant = x.champs
        this.getParametresImportation()
      }
    })
  }

  allchecked() {
    this.parametresCurrent = this.tableSelectionner.champs
    this.parametresRestant = {}
  }

  allRemoved() {
    this.parametresCurrent = {}
    this.parametresRestant = this.tableSelectionner.champs
  }

  constructor(
    private notificationToast: ToastNotificationService,
    private http: HttpClient,
    public informationGenerale: InformationsService,
    private tokenStorageService: TokenStorageService,
    private fonctionPartagesService: FonctionPartagesService,

  ) { }

  lienEnregistrer = "/parametresImportation/setConfiguration/"
  lienGet = "/parametresImportation/getConfiguration/"

  objectKeys = Object.keys;

  parametresImportationArticleCurrent = {}

  parametresImportationClient = new Clientshow()

  parametresImportationClientCurrent = {}

  parametresImportationFournisseur = new Clientshow()

  parametresImportationFournisseurCurrent = {}

  ngOnInit(): void {
    this.getParametresImportation()
  }

  addKey(key) {
    for (let key2 in this.parametresCurrent) {
      if (key === key2) {
        this.notificationToast.showSuccess("Votre colonne existe déja !")
        return
      }
    }

    this.parametresCurrent[key] = this.tableSelectionner.champs[key]
    this.resetTableRestant()
  }

  resetTableRestant(){
    this.parametresRestant = {}
    for (let key in this.tableSelectionner.champs) {
      if (!this.parametresCurrent[key]) {
        this.parametresRestant[key] = this.tableSelectionner.champs[key]
      }
    }
   
    setTimeout(() => {
      this.tableHtml.nativeElement.scrollTo({left: 0 , top: this.tableHtml.nativeElement.scrollHeight, behavior: 'smooth'});
    },10) 
  }

  removeKey(key) {
    var newParametres = {}
    for (let key2 in this.parametresCurrent) {
      if (key !== key2) {
        newParametres[key2] = this.parametresCurrent[key2]
      }
    }

    this.parametresCurrent = newParametres
    this.resetTableRestant()
  }

  isLoading = false

  enregistrerParametresImportation() {

    if (this.isLoading) {
      return
    }

    var parametres: any = {}
    parametres.societe = this.informationGenerale.idSocieteCurrent
    parametres.parametres = JSON.stringify(this.parametresCurrent)

    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.lienEnregistrer + this.table, parametres, this.tokenStorageService.getHeader()).subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.notificationToast.showSuccess("Votre article est bien enregistrée !")
        }
      }, err => {
        console.log(err)
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }

  getParametresImportation() {

    if (this.isLoading) {
      return
    }

    var parametres: any = {}
    parametres.societe = this.informationGenerale.idSocieteCurrent

    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.lienGet + this.table, parametres, this.tokenStorageService.getHeader()).subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.parametresCurrent = JSON.parse(resultat.resultat.parametres)
          this.resetTableRestant()
        }
      }, err => {
        console.log(err)
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }

  deplaceLigne(key, pas) {

    var tab = []
    for (let key2 in this.parametresCurrent) {
      tab.push(key2)
    }

    var p1 = 0
    var p2 = 0

    for (let i = 0; i < tab.length; i++) {
      if (key === tab[i]) {
        p1 = i
        var p = i + pas
        if (p > (tab.length - 1)) {
          p = 0
        } else if (p < 0) {
          p = (tab.length - 1)
        }
        p2 = p
      }
    }

    var aux = tab[p1]
    tab[p1] = tab[p2]
    tab[p2] = aux

    var newParametres = {}
    for (let i = 0; i < tab.length; i++) {
      newParametres[tab[i]] = this.tableSelectionner.champs[tab[i]]
    }

    this.parametresCurrent = newParametres
    return

  }


}
