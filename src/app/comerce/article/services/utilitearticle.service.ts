import { Injectable } from '@angular/core';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx'; 
import jspdf from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class UtilitearticleService {

  constructor(private fonctionPartages:FonctionPartagesService) { }

  

  objetArticle = {
    reference: "Référence",
    codeBarre: "Code_Barre",
    designation: "Désignation",
    qteEnStock: "Quantité en stock",
    qteTheorique: "Quantité théorique",
    prixFourn: "Prix fournisseur",
    remiseF: "Remise fournisseur (%)",
    marge: "Marge (%)",
    prixAchat: "PrixAchat",
    prixTTC: "Prix TTC",
    categorie: "Catégorie",
    marque: "Marque",
    modele: "Modele"
  }

  getDataToHtml(clients) {
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
    for (let i = 0; i < clients.length; i++) {
      chaine +=  `
        <tr>
          <td><strong>Article `+ (i+1) + `: Réference: </strong>`+ clients[i].reference + `</td>
          <td class="align-right"><strong>Code Barre: </strong>`+ clients[i].codeBarre + `</td>
        </tr>
        <tr>
          <td><strong>Désignation: </strong>`+ clients[i].designation + `</td>
          <td class="align-right"><strong>Type Article: </strong>`+ clients[i].typeArticle + `</td>
        </tr>
        <tr>
          <td><strong>PrixFourn: </strong>`+ clients[i].prixFourn + `</td>
          <td class="align-right"><strong>Catégorie: </strong>`+ clients[i].categorie + `</td>
        </tr>
        <tr>
          <td><strong>Famille: </strong>`+ clients[i].famille + `</td>
          <td class="align-right"><strong>SousFamille: </strong>`+ clients[i].sousFamille + `</td>
        </tr>
        <tr>
          <td><strong>Marque: </strong>`+ clients[i].marque + `</td>
          <td class="align-right"><strong>Modéle: </strong>`+ clients[i].modele + `</td>
        </tr>
        <tr>
          <td><strong>RemiseF: </strong>`+ clients[i].remiseF + `</td>
          <td class="align-right"><strong>PrixVenteHT: </strong>`+ clients[i].prixVenteHT + `</td>
        </tr>
        <tr>
          <td><strong>TauxTVA: </strong>`+ clients[i].tauxTVA + `</td>
          <td class="align-right"><strong>MontantTVA: </strong>`+ clients[i].montantTVA + `</td>
        </tr>
        <tr>
          <td><strong>PrixAchat: </strong>`+ clients[i].prixAchat + `</td>
          <td class="align-right"><strong>ValeurStock: </strong>`+ clients[i].valeurStock + `</td>
        </tr>
        <tr>
          <td><strong>QteEnStock: </strong>`+ clients[i].QteEnStock + `</td>
          <td class="align-right"><strong>PlafondRemise: </strong>`+ clients[i].plafondRemise + `</td>
        </tr>
        <tr>
          <td><strong>PVenteConseille: </strong>`+ clients[i].pVenteConseille + `</td>
          <td class="align-right"><strong>EnVente: </strong>`+ clients[i].enVente + `</td>
        </tr>
        <tr>
          <td><strong>EnAchat: </strong>`+ clients[i].enAchat + `</td>
          <td class="align-right"><strong>RefFournisseur: </strong>`+ clients[i].refFournisseur + `</td>
        </tr>
        <tr>
          <td><strong>Redevance: </strong>`+ clients[i].redevance + `</td>
          <td class="align-right"><strong>EnBalance: </strong>`+ clients[i].enBalance + `</td>
        </tr>
        <tr>
          <td><strong>EnPromotion: </strong>`+ clients[i].enPromotion + `</td>
          <td class="align-right"><strong>EnNouveau: </strong>`+ clients[i].enNouveau + `</td>
        </tr>
        <tr>
          <td><strong>Longueur: </strong>`+ clients[i].longueur + `</td>
          <td class="align-right"><strong>Largeur: </strong>`+ clients[i].largeur + `</td>
        </tr>
        <tr>
          <td><strong>Hauteur: </strong>`+ clients[i].hauteur + `</td>
          <td class="align-right"><strong>Surface: </strong>`+ clients[i].surface + `</td>
        </tr>
        <tr>
          <td><strong>Volume: </strong>`+ clients[i].volume + `</td>
          <td class="align-right"><strong>EnDisponible: </strong>`+ clients[i].enDisponible + `</td>
        </tr>
        <tr>
          <td><strong>EnArchive: </strong>`+ clients[i].enArchive + `</td>
          <td class="align-right"><strong>EnVedette: </strong>`+ clients[i].enVedette + `</td>
        </tr>
        <tr>
          <td><strong>EnLiquidation: </strong>`+ clients[i].enLiquidation + `</td>
          <td class="align-right"><strong>Description: </strong>`+ clients[i].description + `</td>
        </tr>
        <tr>
          <td><strong>Observations: </strong>`+ clients[i].observations + `</td>
          <td class="align-right"><strong>Poids: </strong>`+ clients[i].poids + `</td>
        </tr>
        <tr>
          <td><strong>Couleur: </strong>`+ clients[i].couleur + `</td>
          <td class="align-right"><strong>Unite1: </strong>`+ clients[i].unite1 + `</td>
        </tr>
        <tr>
          <td><strong>Unite2: </strong>`+ clients[i].unite2 + `</td>
          <td class="align-right"><strong>Coefficient: </strong>`+ clients[i].coefficient + `</td>
        </tr>
        <tr>
          <td><strong>Emplacement: </strong>`+ clients[i].emplacement + `</td>
          <td class="align-right"><strong>RaccourciPLU: </strong>`+ clients[i].raccourciPLU + `</td>
        </tr>
        <tr>
          <td><strong>PrixVenteHT2: </strong>`+ clients[i].prixVenteHT2 + `</td>
          <td class="align-right"><strong>PrixVenteHT3: </strong>`+ clients[i].prixVenteHT3 + `</td>
        </tr>
        <tr>
          <td><strong>SeuilAlerteQTS: </strong>`+ clients[i].seuilAlerteQTS + `</td>
          <td class="align-right"><strong>SeuilRearpQTS</strong>`+ clients[i].seuilRearpQTS + `</td>
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

  getDataToHtml2(clients) {
    var chaine = ""

    chaine = `
    
    <html id="tablepdf">
    
    <head>
        <meta charset="utf-8">
        <title>liste Article</title>
    
        <style>
            table,
            th,
            td {
              padding: 10px;
              border: 1px solid black;
              border-collapse: collapse;
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
        <thead>
           <tr>`
           for (let key in this.objetArticle) {
            chaine +=  `
             <th>
              `+this.objetArticle[key]+` 
             </th>`
           }
             chaine += `
           </tr>
        </thead>
        <tbody
            `
    for (let i = 0; i < clients.length; i++) {
      chaine +=  `
      <tr>`
      for (let key in this.objetArticle) {
       chaine +=  `
        <th>
         `
         if(clients[i][key] != undefined){
           if(this.fonctionPartages.colonnesQuantites.includes(key)){
             chaine += `<span style="float:right;">`+ this.fonctionPartages.getFormaThreeAfterVerguleNomber(clients[i][key])+`</span>`
           }else if(this.fonctionPartages.colonnesPrix.includes(key)){
             chaine += `<span style="float:right;">`+ this.fonctionPartages.getFormaThreeAfterVerguleQuantite(clients[i][key])+`</span>`
           }else if(this.fonctionPartages.colonnesDates.includes(key)){
             chaine += `<span style="text-align: center; display: block;">`+ this.fonctionPartages.getDate(clients[i][key], 'yyyy-MM-dd')+`</span>`
           }else if(this.fonctionPartages.colonnesOuiNon.includes(key)){
             chaine += ` <span style="text-align: center; display: block;">`+ clients[i][key] +`</span>`
           }else if(!(this.fonctionPartages.colonnesDates.includes(key) || this.fonctionPartages.colonnesQuantites.includes(key) || this.fonctionPartages.colonnesPrix.includes(key) || this.fonctionPartages.colonnesOuiNon.includes(key))){
             chaine += `<span>`+ clients[i][key]+`</span>`
           }
         }
        
         chaine +=` 
        </th>`
      }
      chaine += `
      </tr>
          `
    }

    chaine += `
          </tbody>
        </table>
    </body>
    </html>`

    return chaine;
  }

  printout(clients) {
    var newWindow = window.open();
    var chaine = this.getDataToHtml2(clients)
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

  generatePDF(clients) {
    var newWindow = window.open();
    var chaine = this.getDataToHtml2(clients)
    newWindow.document.write(chaine);
    newWindow.open()

    setTimeout( () => {
   
    var data = newWindow.document.getElementById("tablepdf")
     
    html2canvas(data).then(canvas => {
      newWindow.close()
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf();
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('newPDF.pdf');
    });

    },30)
  }

  fileName = 'ExcelSheet.xlsx';

  exportexcel(clients) {
    /* table id is passed over here */

    var newWindow = window.open();
    var chaine = this.getDataToHtml2(clients)
    newWindow.document.write(chaine);
    newWindow.open()

    setTimeout( () => {
   
       var element = newWindow.document.getElementById("tablepdf")

       const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
   
       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
   
       newWindow.close()
   
       /* save to file */
       XLSX.writeFile(wb, this.fileName);
    },30)
  }

  
}
