import { ClasseService } from './../../services/serviceBD_Comptabilite/classe.service';
import { Classe } from './../../../app/model/modelComptabilite/classe.model';
import { Component, OnInit } from '@angular/core';
import { InformationsService } from 'src/app/services/informations.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';
import { FctListService } from 'src/app/services/fonctionList/fct-list.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.scss']
})
export class ClasseComponent implements OnInit {
  tab = ['1', '2', '3', '4', '5', '6', '7', '8']
  request = {
    dateStart: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    dateEnd: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    search: {
      code: "",
      libelle: "",
      classeParent: "",
    },
    orderBy: {
      libelle: 0,
    },
    societeRacine: this.informationGenerale.idSocieteCurrent,
    limit: 10,
    page: 1,
  }

  oldRequest = {
    dateStart: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    dateEnd: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    search: {
      code: "",
      libelle: "",
      classeParent: "",
    },
    orderBy: {
      libelle: 0,
    },
    societeRacine: this.informationGenerale.idSocieteCurrent,
    limit: 10,
    page: 1,
  }

  classe: Classe;

  erreurClasse = {
    code: "",
    classeParent: "",
    libelle: "",
  }
  objectKeys = Object.keys;

  items = {
    classeParent: "Classe Parent",
    code: "Code",
    libelle: "Libelle",
  };

  itemsVariable = {
    classeParent: "Classe Parent",
    code: "Code",
    libelle: "Libelle",
  };

  formC: FormGroup

  isOpenModalDelete = false
  idDeleteModal = ""
  params1Delete = ""
  params2Delete = ""
  deleteItem() {
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.classeSe.delete(this.idDeleteModal)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.getClasses()
            this.closeModalDelete()
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  openModalDelete(id, params2) {
    this.idDeleteModal = id
    this.isOpenModalDelete = true
    this.params1Delete = "La Classe"
    this.params2Delete = params2
  }

  closeModalDelete() {
    this.isOpenModalDelete = false
  }
  constructor(
    private fb: FormBuilder,
    private notificationToast: ToastNotificationService,
    public informationGenerale: InformationsService,
    private fnctModel: FnctModelService,
    private fctList: FctListService,
    private classeSe: ClasseService,
    public fonctionPartagesService: FonctionPartagesService,
  ) {

    this.formC = this.fb.group({
      libelle: [''],
      code: [''],
      classeParent: [''],
      limit: 10
    })
    this.getClasses()
    this.getAllParametres()

  }

  ngOnInit(): void {
  }

  isLoading = false
  classes = []
  getClasses() {
    if (this.isLoading) {
      return
    }
    for (let key in this.request.search) {
      this.request.search[key] = this.formC.value[key]
    }
    this.request.limit = this.formC.value.limit
    if (!this.testSyncronisation(this.request, this.oldRequest)) {
      this.request.page = 1
    }
    this.isLoading = true
    this.classeSe.getAll(this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.classes = resultat.resultat.docs
            this.totalPage = resultat.resultat.pages
            this.oldRequest = resultat.request
            if (this.totalPage < this.request.page && this.request.page != 1) {
              this.request.page = this.totalPage
              this.getClasses()
            }

            if (!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page)) {
              this.getClasses()
            }
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  controleInputs() {
    for (let key in this.erreurClasse) {
      this.erreurClasse[key] = ""
    }
    var isValid = true
    for (let key in this.erreurClasse) {
      if (this.classe[key] == "") {
        this.erreurClasse[key] = "Veuillez remplir ce champ"
        isValid = false
      }
    }
    for (let i = 0; i < this.tabCode.length; i++) {
      if (this.classe.libelle == this.tabCode[i]) {
        this.erreurClasse.libelle = "Votre code existe déja"
        isValid = false
        break;
      }
    }
    return isValid
  }
  //modifier Classe
  id = ""
  modifierClasse() {
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.classeSe.update(this.id, this.classe, this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.getAllParametres()
            this.getClasses()
            this.notificationToast.showSuccess("Votre Classe est bien modifiée !")
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
    this.JoinAndClose()
  }

  //Save Classe
  enregistrerClasse() {
    if (!this.fnctModel.controleInputs(this.erreurClasse, this.classe, this.tabCode, 'code')) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.classeSe.create(this.classe, this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.getAllParametres()
            this.getClasses()
            this.notificationToast.showSuccess("Votre classe est bien enregistrée !")
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
    this.JoinAndClose()
  }

  //Get parametre of Classe
  tabCode = []
  allClasses = []
  getAllParametres() {
    this.classeSe.parametre(this.informationGenerale.idSocieteCurrent)
      .subscribe(
        res => {
          let resultat: any = res
          if (resultat.status) {
            this.allClasses = resultat.classes
            for (let item of this.allClasses) {
              this.tabCode.push(item.code)
            }
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème  gggggggg de connexion internet")
        });
  }

  //pour rendre chaine to HTML
  printout() {
    return this.fctList.printout()
  }

  //pour rendre chaine to HTML
  getDataToHtml(classes) {
    return this.fctList.getDataToHtml(this.classes)
  }

  //pour rendre chaine to HTML
  stringToHtml(str) {
    return this.fctList.stringToHtml(str)
  }

  //pour faire attendre 
  wait(ms) {
    this.fctList.wait(ms)
  }

  //pour generer un PDF 
  generatePDF() {
    return this.fctList.generatePDF()
  }

  //pour exporter sous format excel 
  exportexcel() {
    return this.fctList.exportexcel()
  }

  //pour verifier la validité de 2 requests 
  testSyncronisation(request1, request2) {
    return this.fctList.testSyncronisation(request1, request2)
  }

  //pour changer croissante des variables
  activationCroissante(buttons1, buttons2) {
    this.fctList.activationCroissante(buttons1, buttons2)
  }

  //pour ouvrir un POP-Up
  open(content) {
    this.classe = {
      id: "",
      libelle: "",
      societeRacine: this.informationGenerale.idSocieteCurrent,
    }
    this.fnctModel.open(content)
  }

  //pour modifier un POP-Up
  openModifier(content, contact) {
    this.classe = contact
    this.fnctModel.openModifier(content, contact)
  }

  //pour fermer un POP-Up
  JoinAndClose() {
    this.fnctModel.JoinAndClose()
  }

  totalPage = 1
  setLimitPage(newLimitPage: number) {
    this.request.limit = newLimitPage
    this.request.page = 1
    this.getClasses()
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getClasses()
  }

  changeCroissante(key) {
    var classStyle = key + "-croissante";
    var buttons = document.getElementsByClassName(classStyle);
    if (this.request.orderBy[key] == 1) {
      this.request.orderBy[key] = -1
      this.activationCroissante(buttons[0], buttons[1])
    } else {
      this.request.orderBy[key] = 1
      this.activationCroissante(buttons[1], buttons[0])
    }

    for (let varkey in this.request.orderBy) {
      if (key != varkey) {
        this.request.orderBy[varkey] = 0
      }
    }
    this.getClasses()
  }


}
