import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InformationsService } from '../../../services/informations.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { data } from 'jquery';

import * as XLSX from 'xlsx';
import { Router, RouterModule } from '@angular/router';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { Articlelist } from 'src/app/model/modelComerce/article/Articlelist';
import { Articleshow } from 'src/app/model/modelComerce/article/Articleshow';
import { Articleform } from 'src/app/model/modelComerce/article/Articleform';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';

@Component({
  selector: 'app-alerte-liste',
  templateUrl: './alerte-liste.component.html',
  styleUrls: ['./alerte-liste.component.scss']
})
export class AlerteListeComponent implements OnInit {

  formC: FormGroup

  apiDelete = "/articles/deleteArticle"
  apiList = "/articles/listArticlesSociete"


  pageDetails = "/article/details/"
  pageModifie = "/article/modifier/"
  pageAjoute = "/article/ajout"

  isOpenModalDelete = false
  idDeleteModal = ""
  params1Delete = ""
  params2Delete = ""

  deleteItem() {

    if (this.isLoading) {
      return
    }

    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.apiDelete + "/" + this.idDeleteModal, {},this.tokenStorageService.getHeader()).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.getArticles()
          this.closeModalDelete()
          this.notificationToast.showSuccess("Votre client est bien supprimée !")
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }

  openModalDelete(id, params2) {
    this.idDeleteModal = id
    this.isOpenModalDelete = true
    this.params1Delete = "L'article "
    this.params2Delete = params2
  }

  closeModalDelete() {
    this.isOpenModalDelete = false
  }


  constructor(private fb: FormBuilder,
    private tokenStorageService:TokenStorageService, private router: Router, private http: HttpClient, public informationGenerale: InformationsService, private notificationToast: ToastNotificationService, public fonctionPartages:FonctionPartagesService) {
    var form = new Articleform()
    this.formC = this.fb.group(form.getForm())
    this.getArticles()
  }

  gotToAdd(){
    this.router.navigate(['/article/ajout']);
  }

  objectKeys = Object.keys;

  items = new Articleshow()

  itemsVariable = new Articleshow()

  request = new Articlelist()

  oldRequest = new Articlelist()

  ngOnInit(): void {
  }

  isLoading = false

  articles = []

  getArticles(){

    if (this.isLoading) {
      return
    }

    for (let key in this.request.search) {
      this.request.search[key] = this.formC.value[key]
    }
    
    this.request.limit = this.formC.value.limit
    this.request.societe = this.informationGenerale.idSocieteCurrent

    if (!this.testSyncronisation(this.request, this.oldRequest)) {
      this.request.page = 1
    }

    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.apiList, this.request,this.tokenStorageService.getHeader()).subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.verifierStock(resultat.resultat.docs)
          this.totalPage = resultat.resultat.pages
          this.oldRequest = resultat.request
          if (!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page)) {
            this.getArticles()
          }
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  tabSAlerteQTS = []
  tabSRearpQTS = []
  verifierStock(arts) {
    this.tabSAlerteQTS = []
    this.tabSRearpQTS = []
    var texte1 = document.getElementById("test1")
    var texte2 = document.getElementById("test2")
    for (let i in arts) {
      if (arts[i].seuilAlerteQTS == 1) {
        this.tabSAlerteQTS.push(arts[i])
        texte1.setAttribute("style", "background-color: #fbeebc;");
      } else if (arts[i].seuilRearpQTS == 0) {
        this.tabSRearpQTS.push(arts[i])
        texte2.setAttribute("style", "background-color: #f8cdc8;");
      }
    }
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
    this.getArticles()
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getArticles()
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
    /*
    var newWindow = window.open();
    var chaine = this.getDataToHtml()
    newWindow.document.write(chaine);
    */
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
    <title>Ma page de test</title>

    <style>
    th,td{
      text-align:center;
      border: black 1px solid;
    } 
    body{
      padding:50px;
    }

    h1{
      text-align:center;
    }
    </style>
  </head>
  <body>

  <h1> Tableaux de Articles </h1>

  <table style="width:100%">
  <tr>
    <th>#</th>
    <th>Nom</th>
    <th>Téléphone</th>
    <th>Email</th>
  </tr>
  `

    for (let i = 0; i < this.articles.length; i++) {
      chaine +=
        `<tr>
        <td>`+ this.articles[i].num + `</td>
        <td>`+ this.articles[i].nom + `</td>
        <td>`+ this.articles[i].telephone + `</td>
        <td>`+ this.articles[i].email + `</td>
      </tr>`
    }

    chaine += `
  </table>
</body>
</html>

`
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

    this.getArticles()
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

}
