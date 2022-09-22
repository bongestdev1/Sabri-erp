import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from './authentication/token-storage.service';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class InformationsService {

  dashboard = "client"
  setDashboard(dashboard) {
    this.dashboard = dashboard
    this.tokenStorageService.setDashboard(dashboard)
  }

  day1
  day2

  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService) {

    this.getVariableGlobal()
  }

  logout() {
    this.setExerciceCurrent3(0)
    this.setSocieteCurrent2("", "")
    this.tokenStorageService.signOut()
  }

  baseUrl = "http://localhost:5000"
  //baseUrl = "http://51.255.106.29:5000"

  // baseUrl = "https://erp.b2bservices.tn"

  baseURLAngular = "https://erp.b2bservices.tn"

  stringSocieteCurrent = "societeCurrent"
  stringSocieteObject = "societeCurrentObject"
  stringIdSocieteCurrent = "idSocieteCurrent"
  stringExerciceCurrent = "ExerciceCurrent"
  stringClientCurrent = "Client Current"
  stringModeReglCurrent = "Mode Reglement Current"
  stringValStockBACurrent = "Validation Stock BonAchat Current"
  stringIdSessionCaisseCurrent = ""
  stringIdUniteParDefaut = "stringIdUniteParDefaut"

  societeCurrent = ""
  idSocieteCurrent = ""
  idDateAujourdCurrent = ""
  idDateFinCurrent = ""
  sessionCaisseCurrent = ""

  exerciceCurrent = 0
  clientCurrent = ""
  modeReglCurrent = ""
  valStockBACurrent = ""

  setExerciceCurrent(exerciceCurrent, clientCurrent, modeReglCurrent, valStockBACurrent) {
    this.exerciceCurrent = exerciceCurrent
    this.clientCurrent = clientCurrent
    this.modeReglCurrent = modeReglCurrent
    this.valStockBACurrent = valStockBACurrent
    localStorage.setItem(this.stringExerciceCurrent, exerciceCurrent)
    localStorage.setItem(this.stringClientCurrent, clientCurrent)
    localStorage.setItem(this.stringModeReglCurrent, modeReglCurrent)
    localStorage.setItem(this.stringValStockBACurrent, valStockBACurrent)
  }

  setExerciceCurrent3(exerciceCurrent) {
    this.exerciceCurrent = exerciceCurrent
    localStorage.setItem(this.stringExerciceCurrent, exerciceCurrent)
  }

  setUniteParDefaut(unite) {
    localStorage.setItem(this.stringIdUniteParDefaut, unite)
  }

  getUniteParDefaut() {
    var unite = localStorage.getItem(this.stringIdUniteParDefaut)
    if (unite == null || unite == undefined) {
      return ""
    }
    return unite
  }

  setSocieteCurrent(idSociete, raisonSociale, dateAujourd, dateFin) {
    localStorage.setItem(this.stringSocieteCurrent, raisonSociale)
    localStorage.setItem(this.stringIdSocieteCurrent, idSociete)

    this.idSocieteCurrent = idSociete
    this.societeCurrent = raisonSociale
    this.idDateAujourdCurrent = dateAujourd
    this.idDateFinCurrent = dateFin
  }

  setSocieteCurrent2(idSociete, raisonSociale) {
    localStorage.setItem(this.stringSocieteCurrent, raisonSociale)
    localStorage.setItem(this.stringIdSocieteCurrent, idSociete)

    this.idSocieteCurrent = idSociete
    this.societeCurrent = raisonSociale
  }

  setSocieteCurrentObject(societeObject) {
    localStorage.setItem(this.stringSocieteObject, JSON.stringify(societeObject))
  }

  getSocieteCurrentObject() {
    return JSON.parse(localStorage.getItem(this.stringSocieteObject))
  }

  setSessionCaisseCurrent(idSessionCaise) {

    localStorage.removeItem(this.stringIdSessionCaisseCurrent);
    localStorage.setItem(this.stringIdSessionCaisseCurrent, JSON.stringify(idSessionCaise));

    this.sessionCaisseCurrent = idSessionCaise
  }

  getSessionCaisse() {

    const user = localStorage.getItem(this.stringIdSessionCaisseCurrent);
    if (user) {
      return JSON.parse(user);
    }

    return {};

  }

  getVariableGlobal() {
    this.societeCurrent = localStorage.getItem(this.stringSocieteCurrent)
    this.idSocieteCurrent = localStorage.getItem(this.stringIdSocieteCurrent)
    this.exerciceCurrent = Number(localStorage.getItem(this.stringExerciceCurrent))
    this.clientCurrent = localStorage.getItem(this.stringClientCurrent)
    this.modeReglCurrent = localStorage.getItem(this.stringModeReglCurrent)
    this.valStockBACurrent = localStorage.getItem(this.stringValStockBACurrent)


    this.day2 = new Date();
    this.day2 = new Date(this.day2.getFullYear() - 1, 0, 1);
    this.day2 = formatDate(new Date(this.day2), 'yyyy-MM-dd', 'en')
    this.day1 = new Date();
    this.day1.setDate(this.day1.getDate());
    this.day1 = formatDate(new Date(this.day1), 'yyyy-MM-dd', 'en')

    this.idDateAujourdCurrent = this.day2
    this.idDateFinCurrent = this.day1

    if (this.idSocieteCurrent == null) {
      this.societeCurrent = ""
    }

    if (this.exerciceCurrent == NaN) {
      this.exerciceCurrent = 0
    }

    if (this.clientCurrent == null) {
      this.clientCurrent = ""
    }

    if (this.modeReglCurrent == null) {
      this.modeReglCurrent = ""
    }

    if (this.valStockBACurrent == null) {
      this.valStockBACurrent = ""
    }
  }

  societes = []


  newSocietes = []

  orginazeSociete() {
    var allSocietes = []
    var newAllSocietes = []
    allSocietes = this.societes
    newAllSocietes = this.societes
    for (let i = 0; i < allSocietes.length; i++) {
      if (!allSocietes[i].societeParent || allSocietes[i].societeParent == null) {
        this.newSocietes.push({ societe: allSocietes[i].raisonSociale, id: allSocietes[i].id, childrens: [] })
        newAllSocietes = newAllSocietes.filter(x => x.id != allSocietes[i].id)
      }
    }
    allSocietes = newAllSocietes

  }

  verifierAccee(id) {

    const user = this.tokenStorageService.getUser()
    let newNavigationsItems = []

    if (user != undefined && user != null && user.role != null) {
      if (!this.checkIsValide(id, user)) {
        //this.notificationToast.showError("Desole, vous n'avez pas l'accee de visiter cette page !!")
        /*if(this.isPopup == "non"){
          this.router.navigate(['role/list']);
        }else{
          this.closePopup.emit()
        }*/
        return false

      }
    }

    return true

  }

  checkIsValide(id, user) {
    if (user.role.modules.filter(x => x.id == id).length > 0) {
      let module = user.role.modules.filter(x => x.id == id)[0]
      if (module.avoirAccee != "non") {
        return true
      }
    } else {
      return true
    }
    return false
  }

  getSociete(id) {
    this.http.get(this.baseUrl + "/societes/getById/" + id, this.tokenStorageService.getHeader()).subscribe(

      res => {
        let resultat: any = res
        if (resultat.status) {
          let dateAujourd = this.day1, dateFin = this.day2
          this.setSocieteCurrent(resultat.resultat.id, resultat.resultat.raisonSociale, dateAujourd, dateFin)
          this.setSocieteCurrentObject(resultat.resultat)
        }
      }, err => {
        console.log(err)
      }
    );
  }




}
