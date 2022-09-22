import { ProjetClientService } from 'src/app/services/serviceBD_Commerce/projetClient.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-list-projet',
  templateUrl: './list-projet.component.html',
  styleUrls: ['./list-projet.component.scss']
})
export class ListProjetComponent implements OnInit {

  formC: FormGroup

  apiDelete = "/projets/deleteProjet"
  apiList = "/projets/listProjets"

  pageDetails = "client/projet/details/"
  pageModifie = "client/projet/modifier/"
  pageAjoute = "client/projet/ajout"

  isOpenModalDelete = false
  idDeleteModal = ""
  params1Delete = ""
  params2Delete = ""

  deleteItem() {

    if (this.isLoading) {
      return
    }

    this.isLoading = true
    this.projetSer.delete(this.idDeleteModal)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.getProjets()
          this.closeModalDelete()
          this.notificationToast.showSuccess("Votre Projet est bien supprimée !")
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
    this.params1Delete = "L'projet "
    this.params2Delete = params2
  }

  closeModalDelete() {
    this.isOpenModalDelete = false
  }


  constructor(
    private projetSer : ProjetClientService,
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    public informationGenerale: InformationsService,
    private notificationToast: ToastNotificationService,
    public fonctionPartages: FonctionPartagesService
    ) {

    this.formC = this.fb.group({
      libelle: [''],
      enCours: [''],
      budjet: [''],
      totalVente: [''],
      totalReglement: [''],
      client: [''],
      adresse:[''],
      limit: 10
    })
    this.getProjets()
  }

  gotToAdd() {
    this.router.navigate(['client/projet/ajout']);
  }

  goToModifier(id){
    this.router.navigate([this.pageModifie+id]);
  }

  objectKeys = Object.keys;

  itemsNotShowSearch = {
    libelle: "active",
    enCours: "active",
    budjet: "active",
    totalVente: "active",
    totalReglement: "active",
    adresse:"Adresse",
    client: "active",
  }

  items = {
    libelle: "active",
    enCours: "active",
    budjet: "active",
    totalVente: "active",
    totalReglement: "active",
    adresse:"Adresse",
    client: "active",
  };

  itemsVariable = {
    libelle: "active",
    enCours: "active",
    budjet: "active",
    totalVente: "active",
    totalReglement: "active",
    client: "active",
  };

  request = {
    search: {
      libelle: "",
      enCours: "",
      budjet: "",
      totalVente: "",
      totalReglement: "",
      adresse:"",
      client: "",
    },
    orderBy: {
      libelle: 0,
      enCours: 0,
      budjet: 0,
      totalVente: 0,
      totalReglement: 0,
      adresse:0,
      client: 0,
    },
    limit: 10,
    page: 1
  }

  oldRequest = {
    search: {
      libelle: "",
      enCours: "",
      budjet: "",
      totalVente: "",
      totalReglement: "",
      client: "",
      adresse:"",
    },
    orderBy: {
      libelle: 0,
      enCours: 0,
      budjet: 0,
      totalVente: 0,
      totalReglement: 0,
      adresse:0,
      client: 0,
    },
    limit: 10,
    page: 1
  }

  ngOnInit(): void {
  }

  isLoading = false

  projets = []

  getProjets() {

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
    this.projetSer.getAll(this.request)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.projets = resultat.resultat.docs
          this.totalPage = resultat.resultat.pages
          this.oldRequest = resultat.request
          if (!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page)) {
            this.getProjets()
          }
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }); 
  }

  testSyncronisation(request1, request2) {
    for (let key in request1.search) {
      if (request1.search[key] != request2.search[key]) {
        return false
      }
    }

    for (let key in request1.orderBy) {
      if (request1.orderBy[key] != request2.orderBy[key]) {
        return false
      }
    }

    if (request1.limit != request2.limit) {
      return false
    }

    return true;
  }



  totalPage = 1

  setLimitPage(newLimitPage: number) {
    this.request.limit = newLimitPage
    this.request.page = 1
    this.getProjets()
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getProjets()
  }

  printout() {
    var newWindow = window.open();
    var chaine = this.getDataToHtml()
    newWindow.document.write(chaine);
    newWindow.print();
    // window.print();
  }

  stringToHtml(str) {
    const el = document.createElement('div');
    el.innerHTML = str;
    return el;
  };

  wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }

  generatePDF() {
    var data = window.document.getElementById("output");

    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf();
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('newPDF.pdf');
    });
  }
  getDataToHtml() {
    var chaine = ""

    chaine = `
    
    <html id="monitor">
    
    <head>
        <meta charset="utf-8">
        <title>liste projet</title>
    
        <style>
            th,
            td {
              margin-left:10px;
            }
            table{
              width:100%;
            }
            body {
                padding: 50px;
            }
            h1 {
                text-align: center;
                margin : 20px;
            }
            .align-right{
              float:left;
            }
            strong{
              margin: 10px;
            }
        </style>
    </head>
    
    <body>
        <h1> Tableaux des projets </h1>
        <table>
            `
    for (let i = 0; i < this.projets.length; i++) {
      chaine += `
        <tr>
          <td><strong>Projet `+ (i+1) + `: libelle: </strong>` + this.projets[i].libelle + `</td>
          <td class="align-right"><strong>Libelle: </strong>`+ this.projets[i].libelle + `</td>
        </tr>
        <tr>
          <td><strong>Budjet: </strong>`+ this.projets[i].budjet + `</td>
          <td class="align-right"><strong>totalVente: </strong>`+ this.projets[i].totalVente + `</td>
        </tr>
        <tr>
          <td><strong>TotalReglement: </strong>`+ this.projets[i].totalReglement + `</td>
          <td class="align-right"><strong>Client: </strong>`+ this.projets[i].client + `</td>
        </tr>
        <tr>
          <td>
           <hr>
          </td>
          <td>
           <hr>
          </td>
        </tr>
        `
    }
    chaine += `
        </table>
    </body>
    </html>`

    return chaine;
  }

  fileName = 'ExcelSheet.xlsx';

  exportexcel() {
    /* table id is passed over here */
    let element = document.getElementById('output');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
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

    this.getProjets()
  }

  activationCroissante(buttons1, buttons2) {
    var buttons = document.getElementsByClassName("croissante");

    for (let i = 0; i < buttons.length; i++) {
      var classList = buttons[i].getAttribute("class")
      classList = classList.replace("active-buttons-croissante", "")
      buttons[i].setAttribute("class", classList)
    }

    classList = buttons2.getAttribute("class")
    classList = classList.replace("active-buttons-croissante", "")
    classList += " active-buttons-croissante"
    buttons2.setAttribute("class", classList)
  }

  getShowInput(key) {
    for (let key2 in this.itemsNotShowSearch) {
      if (key2 == key) {
        return true
      }
    }
    return true
  }


}
