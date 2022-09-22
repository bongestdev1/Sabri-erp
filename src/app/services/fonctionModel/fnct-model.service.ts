import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class FnctModelService {

  closeResult = '';
  modalReference: NgbModalRef;

  constructor(
    private modalService: NgbModal) { }

  open(content) {
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  openModifier(content, contact) {
    this.modalReference = this.modalService.open(content, contact);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  JoinAndClose() {
    this.modalReference.close();
  }

  //Controller les champs de saisies si vide
  controleInput(erreurTab, tab) {
    for (let key in erreurTab) {
      erreurTab[key] = ""
      if (document.getElementById(key) != null) {
        document.getElementById(key).classList.remove("border-erreur")
      }
    }
    var isValid = true
    for (let key in erreurTab) {
      if (tab[key] == "") {
        if (document.getElementById(key) != null) {
          document.getElementById(key).classList.add("border-erreur")
        }
        erreurTab[key] = "Veuillez remplir ce champ"
        isValid = false
      }
    }
    return isValid
  }
  testExit(mot, tab) {
    for (let i = 0; i < tab.length; i++) {
      if (mot == tab[i]) {
        return true
      }
    }
    return false
  }
  controleInputs(erreurTab, tab, tabLibelle, varr) {
    for (let key in erreurTab) {
      erreurTab[key] = ""
      if (document.getElementById(key) != null) {
        document.getElementById(key).classList.remove("border-erreur")
      }
    }
    var isValid = true
    for (let key in erreurTab) {
      if (tab[key] == "") {
        if (document.getElementById(key) != null) {
          document.getElementById(key).classList.add("border-erreur")
        }
        erreurTab[key] = "Veuillez remplir ce champ"
        isValid = false
      }
      if (this.testExit(tab[key], tabLibelle)) {
        erreurTab[key] = "Votre " + varr + " existe déja"
        isValid = false
      }
    }

    return isValid
  }
  //Controller les champs de saisies si champs est negative
  controleInputN(erreurTab, tab) {
    for (let key in erreurTab) {
      erreurTab[key] = ""
      if (document.getElementById(key) != null) {
        document.getElementById(key).classList.remove("border-erreur")
      }
    }
    var isValid = true
    for (let key in erreurTab) {
      if (tab[key] == "") {
        if (document.getElementById(key) != null) {
          document.getElementById(key).classList.add("border-erreur")
        }
        erreurTab[key] = "Veuillez remplir ce champ"
        isValid = false
        return isValid
      } else if (tab[key] < 0) {
        if (document.getElementById(key) != null) {
          document.getElementById(key).classList.add("border-erreur")
        }
        erreurTab[key] = "Veuillez saisir un nombre positive"
        isValid = false
        return isValid
      }
    }
    return isValid
  }
  controleInputsModifer(erreurTab, tab, tabLibelle) {
    for (let key in erreurTab) {
      erreurTab[key] = ""
    }
    var isValid = true
    for (let key in erreurTab) {
      if (tab[key] == "") {
        erreurTab[key] = "Veuillez remplir ce champ"
        isValid = false
      }
    }
    var x = tab.libelle
    var tabMod = []
    tabLibelle = tabLibelle.filter((x) => x != tab.libelle)
    tabMod = tabLibelle.filter((x) => x == tab.libelle)
    for (let i = 0; i < tabLibelle.length; i++) {
      if (tabMod == tabLibelle[i]) {
        erreurTab.libelle = "Votre libelle existe déja"
        isValid = false
        break;
      }
    }
    return isValid
  }

}
