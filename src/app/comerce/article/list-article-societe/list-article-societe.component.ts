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
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';

@Component({
  selector: 'app-list-article-societe',
  templateUrl: './list-article-societe.component.html',
  styleUrls: ['./list-article-societe.component.scss']
})
export class ListArticleSocieteComponent implements OnInit {

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
          this.getClients()
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
    private tokenStorageService:TokenStorageService,private router: Router, private http: HttpClient, public informationGenerale: InformationsService, private notificationToast: ToastNotificationService) {


    this.formC = this.fb.group({

      reference: [''],
      codeBarre: [''],
      designation: [''],
      typeArticle: [''],
      categorie: [''],
      famille: [''],
      sousFamille: [''],
      marque: [''],
      modele: [''],
      prixFourn: [''],
      remiseF: [''],
      marge: [''],
      prixVenteHT: [''],
      tauxTVA: [''],
      montantTVA: [''],
      prixAchat: [''],
      valeurStock: [''],
      qteEnStock: [''],
      prixTTC: [''],
      plafondRemise: [''],
      pVenteConseille: [''],
      enVente: [''],
      enAchat: [''],
      refFournisseur: [''],
      redevance: [''],
      enBalance: [''],
      enPromotion: [''],
      enNouveau: [''],
      longueur: [''],
      largeur: [''],
      hauteur: [''],
      surface: [''],
      volume: [''],
      enDisponible: [''],
      enArchive: [''],
      enVedette: [''],
      enLiquidation: [''],
      description: [''],
      observations: [''],
      poids: [''],
      couleur: [''],
      unite1: [''],
      unite2: [''],
      coefficient: [''],
      emplacement: [''],
      raccourciPLU: [''],
      prixVenteHT2: [''],
      prixVenteHT3: [''],
      seuilAlerteQTS: [''],
      seuilRearpQTS: [''],
      qteTheorique: [''],

      limit: 10
    })

    this.getClients()

  }

  gotToAdd() {
    this.router.navigate(['/article/ajout']);
  }

  objectKeys = Object.keys;

  itemsNotShowSearch = {
    prixFourn: "active",
    remiseF: "active",
    marge: "active",
    prixVenteHT: "active",
    tauxTVA: "active",
    montantTVA: "active",
    prixAchat: "active",
    valeurStock: "active",
    qteEnStock: "active",
    prixTTC: "active",
    plafondRemise: "active",
    pVenteConseille: "active",
    enVente: "active",
    enAchat: "active",
    enBalance: "active",
    enPromotion: "active",
    enNouveau: "active",
    longueur: "active",
    largeur: "active",
    hauteur: "active",
    surface: "active",
    volume: "active",
    enDisponible: "active",
    enArchive: "active",
    enVedette: "active",
    enLiquidation: "active",
    poids: "active",
    prixVenteHT2: "active",
    prixVenteHT3: "active",
    coefficient: "active",
    seuilAlerteQTS: "active",
    seuilRearpQTS: "active",
    qteTheorique: "active"
  }

  items = {
    reference: "active",
    codeBarre: "active",
    designation: "active",
    qteEnStock: "active",
    qteTheorique: "active",
    typeArticle: "active",
    prixFourn: "active",
    remiseF: "active",
    marge: "active",
    prixVenteHT: "active",
    tauxTVA: "active",
    montantTVA: "active",
    prixAchat: "active",
    valeurStock: "active",
    prixTTC: "active",
    plafondRemise: "active",
    pVenteConseille: "active",
    enVente: "active",
    enAchat: "active",
    refFournisseur: "active",
    redevance: "active",
    enBalance: "active",
    enPromotion: "active",
    enNouveau: "active",
    longueur: "active",
    largeur: "active",
    hauteur: "active",
    surface: "active",
    volume: "active",
    enDisponible: "active",
    enArchive: "active",
    enVedette: "active",
    enLiquidation: "active",
    description: "active",
    observations: "active",
    poids: "active",
    couleur: "active",
    unite1: "active",
    unite2: "active",
    coefficient: "active",
    emplacement: "active",
    raccourciPLU: "active",
    prixVenteHT2: "active",
    prixVenteHT3: "active",
    categorie: "active",
    famille: "active",
    sousFamille: "active",
    marque: "active",
    modele: "active",
    seuilAlerteQTS: "active",
    seuilRearpQTS: "active",
  };

  itemsVariable = {
    reference: "active",
    codeBarre: "active",
    designation: "active",
    qteEnStock: "active",
    qteTheorique: "active",
    typeArticle: "active",
    prixFourn: "active",
    remiseF: "active",
    marge: "active",
    prixVenteHT: "active",
    tauxTVA: "active",
    montantTVA: "active",
    prixAchat: "active",
    valeurStock: "active",
    prixTTC: "active",
    plafondRemise: "active",
    pVenteConseille: "active",
    enVente: "active",
    enAchat: "active",
    refFournisseur: "active",
    redevance: "active",
    enBalance: "active",
    enPromotion: "active",
    enNouveau: "active",
    longueur: "active",
    largeur: "active",
    hauteur: "active",
    surface: "active",
    volume: "active",
    enDisponible: "active",
    enArchive: "active",
    enVedette: "active",
    enLiquidation: "active",
    description: "active",
    observations: "active",
    poids: "active",
    couleur: "active",
    unite1: "active",
    unite2: "active",
    coefficient: "active",
    emplacement: "active",
    raccourciPLU: "active",
    prixVenteHT2: "active",
    prixVenteHT3: "active",
    categorie: "active",
    famille: "active",
    sousFamille: "active",
    marque: "active",
    modele: "active",
    seuilAlerteQTS: "active",
    seuilRearpQTS: "active"
  };

  request = {
    search: {
      reference: "",
      codeBarre: "",
      designation: "",
      typeArticle: "",
      categorie: "",
      famille: "",
      sousFamille: "",
      marque: "",
      modele: "",
      prixFourn: "",
      remiseF: "",
      marge: "",
      prixVenteHT: "",
      tauxTVA: "",
      montantTVA: "",
      prixAchat: "",
      valeurStock: "",
      qteEnStock: "",
      prixTTC: "",
      plafondRemise: "",
      pVenteConseille: "",
      enVente: "",
      enAchat: "",
      refFournisseur: "",
      redevance: "",
      enBalance: "",
      enPromotion: "",
      enNouveau: "",
      longueur: "",
      largeur: "",
      hauteur: "",
      surface: "",
      volume: "",
      enDisponible: "",
      enArchive: "",
      enVedette: "",
      enLiquidation: "",
      description: "",
      observations: "",
      poids: "",
      couleur: "",
      unite1: "",
      unite2: "",
      coefficient: "",
      emplacement: "",
      raccourciPLU: "",
      prixVenteHT2: "",
      prixVenteHT3: "",
      seuilAlerteQTS: "",
      seuilRearpQTS: "",
      qteTheorique: ""
    },
    orderBy: {
      reference: 0,
      codeBarre: 0,
      designation: 0,
      typeArticle: 0,
      categorie: 0,
      famille: 0,
      sousFamille: 0,
      marque: 0,
      modele: 0,
      prixFourn: 0,
      remiseF: 0,
      marge: 0,
      prixVenteHT: 0,
      tauxTVA: 0,
      montantTVA: 0,
      prixAchat: 0,
      valeurStock: 0,
      QteEnStock: 0,
      prixTTC: 0,
      plafondRemise: 0,
      pVenteConseille: 0,
      enVente: 0,
      enAchat: 0,
      refFournisseur: 0,
      redevance: 0,
      enBalance: 0,
      enPromotion: 0,
      enNouveau: 0,
      longueur: 0,
      largeur: 0,
      hauteur: 0,
      surface: 0,
      volume: 0,
      enDisponible: 0,
      enArchive: 0,
      enVedette: 0,
      enLiquidation: 0,
      description: 0,
      observations: 0,
      poids: 0,
      couleur: 0,
      unite1: 0,
      unite2: 0,
      coefficient: 0,
      emplacement: 0,
      raccourciPLU: 0,
      prixVenteHT2: 0,
      prixVenteHT3: 0,
      seuilAlerteQTS: 0,
      seuilRearpQTS: 0,
      qteTheorique: 0
    },
    limit: 10,
    page: 1,
    societe:""
  }

  oldRequest = {
    search: {
      reference: "",
      codeBarre: "",
      designation: "",
      typeArticle: "",
      categorie: "",
      famille: "",
      sousFamille: "",
      marque: "",
      modele: "",
      prixFourn: "",
      remiseF: "",
      marge: "",
      prixVenteHT: "",
      tauxTVA: "",
      montantTVA: "",
      prixAchat: "",
      valeurStock: "",
      qteEnStock: "",
      prixTTC: "",
      plafondRemise: "",
      pVenteConseille: "",
      enVente: "",
      enAchat: "",
      refFournisseur: "",
      redevance: "",
      enBalance: "",
      enPromotion: "",
      enNouveau: "",
      longueur: "",
      largeur: "",
      hauteur: "",
      surface: "",
      volume: "",
      enDisponible: "",
      enArchive: "",
      enVedette: "",
      enLiquidation: "",
      description: "",
      observations: "",
      poids: "",
      couleur: "",
      unite1: "",
      unite2: "",
      coefficient: "",
      emplacement: "",
      raccourciPLU: "",
      prixVenteHT2: "",
      prixVenteHT3: "",
      seuilAlerteQTS: "",
      seuilRearpQTS: "",
      qteTheorique: ""
    },
    orderBy: {
      reference: 0,
      codeBarre: 0,
      designation: 0,
      typeArticle: 0,
      categorie: 0,
      famille: 0,
      sousFamille: 0,
      marque: 0,
      modele: 0,
      prixFourn: 0,
      remiseF: 0,
      marge: 0,
      prixVenteHT: 0,
      tauxTVA: 0,
      montantTVA: 0,
      prixAchat: 0,
      valeurStock: 0,
      qteEnStock: 0,
      prixTTC: 0,
      plafondRemise: 0,
      pVenteConseille: 0,
      enVente: 0,
      enAchat: 0,
      refFournisseur: 0,
      redevance: 0,
      enBalance: 0,
      enPromotion: 0,
      enNouveau: 0,
      longueur: 0,
      largeur: 0,
      hauteur: 0,
      surface: 0,
      volume: 0,
      enDisponible: 0,
      enArchive: 0,
      enVedette: 0,
      enLiquidation: 0,
      description: 0,
      observations: 0,
      poids: 0,
      couleur: 0,
      unite1: 0,
      unite2: 0,
      coefficient: 0,
      emplacement: 0,
      raccourciPLU: 0,
      prixVenteHT2: 0,
      prixVenteHT3: 0,
      seuilAlerteQTS: 0,
      seuilRearpQTS: 0,
      qteTheorique: 0
    },
    limit: 10,
    page: 1,
    societe:""
  }

  ngOnInit(): void {
  }

  isLoading = false

  clients = []

  getClients() {

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
          this.clients = resultat.resultat.docs
          this.totalPage = resultat.resultat.pages
          this.oldRequest = resultat.request
          if (!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page)) {
            this.getClients()
          }
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
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
    this.getClients()
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getClients()
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
        <title>liste Article</title>
    
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
        <h1> Tableaux des articles </h1>
        <table>
            `
    for (let i = 0; i < this.clients.length; i++) {
      chaine +=  `
        <tr>
          <td><strong>Article `+ (i+1) + `: Réference: </strong>`+ this.clients[i].reference + `</td>
          <td class="align-right"><strong>Code Barre: </strong>`+ this.clients[i].codeBarre + `</td>
        </tr>
        <tr>
          <td><strong>Désignation: </strong>`+ this.clients[i].designation + `</td>
          <td class="align-right"><strong>Type Article: </strong>`+ this.clients[i].typeArticle + `</td>
        </tr>
        <tr>
          <td><strong>PrixFourn: </strong>`+ this.clients[i].prixFourn + `</td>
          <td class="align-right"><strong>Catégorie: </strong>`+ this.clients[i].categorie + `</td>
        </tr>
        <tr>
          <td><strong>Famille: </strong>`+ this.clients[i].famille + `</td>
          <td class="align-right"><strong>SousFamille: </strong>`+ this.clients[i].sousFamille + `</td>
        </tr>
        <tr>
          <td><strong>Marque: </strong>`+ this.clients[i].marque + `</td>
          <td class="align-right"><strong>Modéle: </strong>`+ this.clients[i].modele + `</td>
        </tr>
        <tr>
          <td><strong>RemiseF: </strong>`+ this.clients[i].remiseF + `</td>
          <td class="align-right"><strong>PrixVenteHT: </strong>`+ this.clients[i].prixVenteHT + `</td>
        </tr>
        <tr>
          <td><strong>TauxTVA: </strong>`+ this.clients[i].tauxTVA + `</td>
          <td class="align-right"><strong>MontantTVA: </strong>`+ this.clients[i].montantTVA + `</td>
        </tr>
        <tr>
          <td><strong>PrixAchat: </strong>`+ this.clients[i].prixAchat + `</td>
          <td class="align-right"><strong>ValeurStock: </strong>`+ this.clients[i].valeurStock + `</td>
        </tr>
        <tr>
          <td><strong>QteEnStock: </strong>`+ this.clients[i].QteEnStock + `</td>
          <td class="align-right"><strong>PlafondRemise: </strong>`+ this.clients[i].plafondRemise + `</td>
        </tr>
        <tr>
          <td><strong>PVenteConseille: </strong>`+ this.clients[i].pVenteConseille + `</td>
          <td class="align-right"><strong>EnVente: </strong>`+ this.clients[i].enVente + `</td>
        </tr>
        <tr>
          <td><strong>EnAchat: </strong>`+ this.clients[i].enAchat + `</td>
          <td class="align-right"><strong>RefFournisseur: </strong>`+ this.clients[i].refFournisseur + `</td>
        </tr>
        <tr>
          <td><strong>Redevance: </strong>`+ this.clients[i].redevance + `</td>
          <td class="align-right"><strong>EnBalance: </strong>`+ this.clients[i].enBalance + `</td>
        </tr>
        <tr>
          <td><strong>EnPromotion: </strong>`+ this.clients[i].enPromotion + `</td>
          <td class="align-right"><strong>EnNouveau: </strong>`+ this.clients[i].enNouveau + `</td>
        </tr>
        <tr>
          <td><strong>Longueur: </strong>`+ this.clients[i].longueur + `</td>
          <td class="align-right"><strong>Largeur: </strong>`+ this.clients[i].largeur + `</td>
        </tr>
        <tr>
          <td><strong>Hauteur: </strong>`+ this.clients[i].hauteur + `</td>
          <td class="align-right"><strong>Surface: </strong>`+ this.clients[i].surface + `</td>
        </tr>
        <tr>
          <td><strong>Volume: </strong>`+ this.clients[i].volume + `</td>
          <td class="align-right"><strong>EnDisponible: </strong>`+ this.clients[i].enDisponible + `</td>
        </tr>
        <tr>
          <td><strong>EnArchive: </strong>`+ this.clients[i].enArchive + `</td>
          <td class="align-right"><strong>EnVedette: </strong>`+ this.clients[i].enVedette + `</td>
        </tr>
        <tr>
          <td><strong>EnLiquidation: </strong>`+ this.clients[i].enLiquidation + `</td>
          <td class="align-right"><strong>Description: </strong>`+ this.clients[i].description + `</td>
        </tr>
        <tr>
          <td><strong>Observations: </strong>`+ this.clients[i].observations + `</td>
          <td class="align-right"><strong>Poids: </strong>`+ this.clients[i].poids + `</td>
        </tr>
        <tr>
          <td><strong>Couleur: </strong>`+ this.clients[i].couleur + `</td>
          <td class="align-right"><strong>Unite1: </strong>`+ this.clients[i].unite1 + `</td>
        </tr>
        <tr>
          <td><strong>Unite2: </strong>`+ this.clients[i].unite2 + `</td>
          <td class="align-right"><strong>Coefficient: </strong>`+ this.clients[i].coefficient + `</td>
        </tr>
        <tr>
          <td><strong>Emplacement: </strong>`+ this.clients[i].emplacement + `</td>
          <td class="align-right"><strong>RaccourciPLU: </strong>`+ this.clients[i].raccourciPLU + `</td>
        </tr>
        <tr>
          <td><strong>PrixVenteHT2: </strong>`+ this.clients[i].prixVenteHT2 + `</td>
          <td class="align-right"><strong>PrixVenteHT3: </strong>`+ this.clients[i].prixVenteHT3 + `</td>
        </tr>
        <tr>
          <td><strong>SeuilAlerteQTS: </strong>`+ this.clients[i].seuilAlerteQTS + `</td>
          <td class="align-right"><strong>SeuilRearpQTS</strong>`+ this.clients[i].seuilRearpQTS + `</td>
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

    this.getClients()
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
        return false
      }
    }
    return true
  }

}