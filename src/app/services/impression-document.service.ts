import { Injectable } from '@angular/core';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { HttpClient } from '@angular/common/http';

import html2canvas from 'html2canvas';
import jspdf from 'jspdf';

//import pdfMake from "pdfmake/build/pdfmake";
//import pdfFonts from "pdfmake/build/vfs_fonts";
var htmlToPdfmake = require("html-to-pdfmake");

//pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class ImpressionDocumentService {

  constructor(private fonctionPartagesService: FonctionPartagesService, private fonctionPartages: FonctionPartagesService, private http: HttpClient) {

  }

  isPrixVenteNotPrixAchat(titreDocument) {
    if (titreDocument == this.fonctionPartagesService.titreDocuments.bonRetourClient || titreDocument == this.fonctionPartagesService.titreDocuments.devis || titreDocument == this.fonctionPartagesService.titreDocuments.bonLivraison || titreDocument == this.fonctionPartagesService.titreDocuments.commande) {
      return true
    }
    return false
  }


  async getBase64ImageFromUrl(imageUrl) {
    var res = await fetch(imageUrl);
    var blob = await res.blob();

    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        resolve(reader.result);
      }, false);

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    })
  }

  getHtmlClient(client, titreDocument) {
    if (client == null) {
      return ""
    }

    var chaine = ""
    if (this.isPrixVenteNotPrixAchat(titreDocument)) {
      chaine += `<p style="text-align:center;">Client:</p>`
    } else {
      chaine += `<p style="text-align:center;">Fournisseur:</p>`
    }
    chaine += `<hr> <p>Code:` + client.code + `</p>`
    chaine += `<p>Raison Sociale:` + client.raisonSociale + `</p>`
    chaine += `<p>M-Fiscale:` + client.matriculeFiscale + `</p>`
    chaine += `<p>Email:` + client.email + `</p>`
    chaine += `<p>Téléphone:` + client.telephone + `</p>`
    chaine += `<p>Adresse:` + client.adresseFacturation + `</p>`

    return chaine
  }

  getHtmlDocument(document, titreDocument) {
    console.log(document)
    console.log(titreDocument)

    var chaine = ""

    chaine += ` <p style="text-align:center;">` + titreDocument + `</p> <hr>`
    chaine += ` <p> Numéro:` + document.numero + `</p>`
    chaine += `<p>Date:` + document.date + `</p>`


    return chaine
  }

  getHtmlArticle(articles) {

    var chaine = ""

    var tabKeys = {
      reference: "Réference",
      designation: "Désignation",
      tauxRemise: "Taux_Rémise (%)",
      quantiteVente: "Quantité",
      prixVenteHTReel: "P.U HT",
      unite1: "Unité",
      prixTTC: "P.U TTC",
      totalTTC: "Total TTC"
    }

    chaine += `<thead> <tr>`
    for (let key in tabKeys) {
      chaine += `<th>` + tabKeys[key] + `</th>`
    }
    chaine += `</tr> </thead> <tbody>`

    for (let i = 0; i < articles.length; i++) {
      chaine += `<tr>`
      for (let key in tabKeys) {
        chaine += `<td>` + articles[i][key] + `</td>`
      }
      chaine += `</tr>`
    }

    chaine += `</tbody>`
    return chaine
  }


  getDataToHtml2(titre, imageBase64, document, articles, client) {

    var clientHtml = this.getHtmlClient(client, titre)

    var documentInfo = this.getHtmlDocument(document, titre)
    var articlesHTML = this.getHtmlArticle(articles)

    var chaine = ""

    chaine = `
    
    <html id="tablepdf" style="width:2480px; height:3508px; ">

<head>
    <meta charset="utf-8">


    <style>
        body {
        }

        /* client */

        .client {
            display: flex;
            justify-content: space-between;
            flex-direction: row;
        }

        .client table {
            width: 1150px;
            height: 200px;
            text-align: left;
            font-size: 30px;
        }

        .client table, th, td {
            padding: 10px;
            border: 1px solid black;
            border-collapse: collapse;
            vertical-align: top;
        }

        .client p{
          margin-bottom:5px;
          margin-top:5px;
        }

        /* client */

        /* article */

        .article table{
          margin-top: 100px;
          width: 100%;
          padding: 10px;
          border: 1px solid black;
          border-collapse: collapse;
        }

        .article th{
           background-color: rgb(167, 164, 164);
           padding: 10px;
           border: 1px solid black;
           border-collapse: collapse;
           vertical-align: bottom;
           font-size:25px;
        }

        .article td{
            border-top:none;
            border-bottom:none;
            vertical-align: top;
            font-size:25px;
        }
        /* article */
        
        /* footer */
        .footer table,th {
            padding: 10px;
            border: 1px solid black;
            border-collapse: collapse;
            vertical-align: top;
            font-size: 25px;
        }

        .footer{
            margin-top: auto;
        }
        /* footer */

        /* total */
        .total table, th, td {
            padding: 10px;
            border: 1px solid black;
            border-collapse: collapse;
            vertical-align: top;
            font-size: 40px;
        }

        .total table{
           width: 600px;
           margin-left: auto;
        }

        .total{
            margin-top: 100px;
        }

        .total tr td:first-child{
           background-color: rgb(100, 98, 98);
        }
        /* total */

        .image{
          width:100px !important;
        }

    </style>
</head>

<body style="padding:0px;">

    <div>

        <div class="image">
            <img src="`+ imageBase64 +`" style="width:30%">
        </div>

        <div class="client">

            <table>
                <tbody>
                    <tr>
                        <th>`+
      documentInfo
      + `
                        </th>

                    </tr>
                </tbody>
            </table>

            <table>
                <tbody>
                    <tr>

                        <th>`+
      clientHtml
      + `</th>

                    </tr>
                </tbody>
            </table>


        </div>

        <div class="article">
            <table>
            `+ articlesHTML + `
            </table>
        </div>

        <div class="total">

            <table>
                <tbody>
                    <tr>
                        <td>8799999</td>
                        <td>8799999</td>
                    </tr>

                    <tr>
                        <td>8799999</td>
                        <td>8799999</td>
                    </tr>

                    <tr>
                        <td>8799999</td>
                        <td>8799999</td>
                    </tr>

                    <tr>
                        <td>8799999</td>
                        <td>8799999</td>
                    </tr>
                </tbody>
             </table>

        </div>

        <div class="footer">
            <table>
                <tbody>
                    <tr>

                        <th>

                            Structure: How to Write Strong Paragraphs | Grammarly
                            Annonce·
                            https://www.grammarly.com/
                            From Grammar and Spelling To Style and Tone, Eliminate All Kinds Of Writing Mistakes. Write
                            Text That Is Not Just Grammatically Correct Writing, But Clear and Concise. AI Writing
                            Assistant. Improve Word Choice. Eliminate Grammar Errors. Fix Punctuation Errors.

                        </th>

                    </tr>
                </tbody>
            </table>
        </div>




    </div>


</body>

</html>
   
    `

    return chaine;
  }

  generatePDF(titre, bonLivraison, articles, client) {

    this.getBase64ImageFromUrl('http://localhost:5000/uploads/16584836018881.png')
      .then(imageBase64 => {
        this.telechargerPdf(titre, imageBase64, bonLivraison, articles, client)
      })
      .catch(err => {
        console.error(err)
        var image = "data:image/jpeg;base64,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"
        this.telechargerPdf(titre, image, bonLivraison, articles, client)

      });
  }

  products = [
    { name: "Pro1", price: 1.7, qty: 50 },
    { name: "Pro1", price: 1.7, qty: 50 },
    { name: "Pro1", price: 1.7, qty: 50 },
    { name: "Pro1", price: 1.7, qty: 50 },
    { name: "Pro1", price: 1.7, qty: 50 },
  ]

  products2 = [
    { name: "Pro1", price: 1.7, qty: 50 },
    { name: "Pro1", price: 1.7, qty: 50 },
    { name: "Pro1", price: 1.7, qty: 50 },
  ]

  telechargerPdf(titre, imageBase64, bonLivraison, articles, client) {
    let docDefinition = {
      pageMargins: [40, 80, 40, 150],

      content: [
        // Previous configuration  
        {
          columns: [
            [
              {
                text: "Text",
                bold: true
              },
              { text: "Address" },
              { text: "Email" },
              { text: "ContactNo" }
            ],
            [
              {
                text: `Date: ${new Date().toLocaleString()}`,
                alignment: 'right'
              },
              {
                text: `Bill No : ${((Math.random() * 1000).toFixed(0))}`,
                alignment: 'right'
              }
            ]
          ]
        },
        {
          text: 'Order Details',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Product', 'Price', 'Quantity', 'Amount'],
              ...this.products.map(p => ([p.name, p.price, p.qty, (p.price * p.qty).toFixed(2)])),
              ...this.products.map(p => ([p.name, p.price, p.qty, (p.price * p.qty).toFixed(2)])),
              ...this.products.map(p => ([p.name, p.price, p.qty, (p.price * p.qty).toFixed(2)])),
              ...this.products.map(p => ([p.name, p.price, p.qty, (p.price * p.qty).toFixed(2)])),
              ...this.products.map(p => ([p.name, p.price, p.qty, (p.price * p.qty).toFixed(2)])),
              ...this.products.map(p => ([p.name, p.price, p.qty, (p.price * p.qty).toFixed(2)])),
              [{ text: 'Total Amount', colSpan: 3 }, {}, {}, this.products.reduce((sum, p) => sum + (p.qty * p.price), 0).toFixed(2)]
            ]
          }
        },
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 5,
              x2: 515,
              y2: 5,
              lineWidth: 0.5
            }
          ]
        },
        {
          //absolutePosition: {x:100, y:600},
          columns: [
            [
              {
                style: 'tableExample',
                table: {
                  headerRows: 1,
                  widths: ['*', 'auto', 'auto', 'auto'],
                  body: [
                    ['Product', 'Price', 'Quantity', 'Amount'],
                    ...this.products2.map(p => ([p.name, p.price, p.qty, (p.price * p.qty).toFixed(2)])),
                    [{ text: 'Total Amount', colSpan: 3 }, {}, {}, this.products2.reduce((sum, p) => sum + (p.qty * p.price), 0).toFixed(2)]
                  ]
                }
              },
            ],
            [

            ]
          ]
        },

      ],

      footer: (currentPage, pageCount, pageSize) => {
        if(currentPage == pageCount){
          return [
            {
              //absolutePosition: {x:100, y:600},
              columns: [
                [
                  {
                    style:"tableExample",
                    table: {
                      headerRows: 1,
                      widths: ['*', 'auto', 'auto', 'auto'],
                      body: [
                        ['Product', 'Price', 'Quantity', 'Amount'],
                        ...this.products2.map(p => ([p.name, p.price, p.qty, (p.price * p.qty).toFixed(2)])),
                        [{ text: 'Total Amount', colSpan: 3 }, {}, {}, this.products2.reduce((sum, p) => sum + (p.qty * p.price), 0).toFixed(2)]
                      ]
                    }
                  },
                ],
                [
    
                ]
              ]
            },
          ]
        } 
      },

      header: function (currentPage, pageCount, pageSize) {
        // you can apply any logic and return any valid pdfmake element

        return [
          { text: 'simple text', alignment: (currentPage % 2) ? 'left' : 'right' },
          { canvas: [{ type: 'rect', x: 170, y: 32, w: pageSize.width - 170, h: 40 }] }
        ]
      },

      styles: {
        // header: {
        //   fontSize: 18,
        //   bold: true,
        //   margin: [0, 0, 0, 10]
        // },
        // subheader: {
        //   fontSize: 16,
        //   bold: true,
        //   margin: [0, 10, 0, 5]
        // },
        tableExample: {
          fontSize: 8,
          margin: [50, 50, 0, 0]
        },
        tableExampleHide: {
          fontSize: 20,
          hide:true
        },
        footer: {
          fontSize: 6,
          margin: [15, 20, 15, 10]
        }
        // tableHeader: {
        //   bold: true,
        //   fontSize: 13,
        //   color: 'black'
        // }
      },
    }

    //pdfMake.createPdf(docDefinition).open();

    return
    var chaine = this.getDataToHtml2(titre, imageBase64, bonLivraison, articles, client)
    
    console.log(chaine)
    
    var html = htmlToPdfmake(chaine)

    console.log(html)
    
    const documentDefinition = { content: html };
    //pdfMake.createPdf(documentDefinition).open();


    var newWindow = window.open();
    newWindow.document.write(chaine);
    newWindow.open()

    var data = newWindow.document.getElementById("tablepdf")

    html2canvas(data).then(canvas => {
      newWindow.close()
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      window.open(contentDataURL);
      let pdf = new jspdf('p', 'mm', 'a4');
      var position = 0;

      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save(titre + '.pdf');
    });

  }


  getHtmlArticleDevis(articles) {

    var chaine = ""

    var tabKeys = {
      numero: "Numéro",
      reference: "Réference",
      designation: "Désignation",
      quantiteAccepter: "Quantite",
      unite1: "Unite",
      totalHT: "TotalHT"
    }

    chaine += `<thead> <tr>`
    for (let key in tabKeys) {
      chaine += `<th>` + tabKeys[key] + `</th>`
    }
    chaine += `</tr> </thead> <tbody>`

    for (let i = 0; i < articles.length; i++) {
      chaine += `<tr>`
      for (let key in tabKeys) {
        chaine += `<td>` + articles[i][key] + `</td>`
      }
      chaine += `</tr>`
    }

    chaine += `</tbody>`
    return chaine
  }


  getPdf(articles, titre) {

    var articlesHTML = this.getHtmlArticleDevis(articles)

    var chaine = `
    
    <html id="tablepdf">

<head>
    <meta charset="utf-8">


    <style>
        body {
            padding: 50px;
        }

        /* client */

        .client {
            display: flex;
            justify-content: space-between;
            flex-direction: row;
        }

        .client table {
            width: 1150px;
            height: 200px;
            text-align: left;
            font-size: 30px;
        }

        .client table, th, td {
            padding: 10px;
            border: 1px solid black;
            border-collapse: collapse;
            vertical-align: top;
        }

        .client p{
          margin-bottom:5px;
          margin-top:5px;
        }

        /* client */

        /* article */

        .article table{
          margin-top: 100px;
          width: 100%;
          padding: 10px;
          border: 1px solid black;
          border-collapse: collapse;
        }

        .article th{
           background-color: rgb(167, 164, 164);
           padding: 10px;
           border: 1px solid black;
           border-collapse: collapse;
           vertical-align: bottom;
           font-size:25px;
        }

        .article td{
            border-top:none;
            border-bottom:none;
            vertical-align: top;
            font-size:25px;
        }
        /* article */
        
        /* footer */
        .footer table,th {
            padding: 10px;
            border: 1px solid black;
            border-collapse: collapse;
            vertical-align: top;
            font-size: 25px;
        }

        .footer{
            margin-top: auto;
        }
        /* footer */

        /* total */
        .total table, th, td {
            padding: 10px;
            border: 1px solid black;
            border-collapse: collapse;
            vertical-align: top;
            font-size: 40px;
        }

        .total table{
           width: 600px;
           margin-left: auto;
        }

        .total{
            margin-top: 100px;
        }

        .total tr td:first-child{
           background-color: rgb(100, 98, 98);
        }
        /* total */

    </style>
</head>

<body style="padding:0px;">

    <div style="display: flex; flex-direction: column; padding:50px;">

      
        <div class="client">

            <h1 style="text-align:center;"> `+ titre + ` </h1>


        </div>

        <div class="article">
            <table>
            `+ articlesHTML + `
            </table>
        </div>

        <div class="total">

            <table>
                <tbody>
                    <tr>
                        <td>8799999</td>
                        <td>8799999</td>
                    </tr>

                    <tr>
                        <td>8799999</td>
                        <td>8799999</td>
                    </tr>

                    <tr>
                        <td>8799999</td>
                        <td>8799999</td>
                    </tr>

                    <tr>
                        <td>8799999</td>
                        <td>8799999</td>
                    </tr>
                </tbody>
             </table>

        </div>

        <div class="footer">
            <table>
                <tbody>
                    <tr>

                        <th>

                            Structure: How to Write Strong Paragraphs | Grammarly
                            Annonce·
                            https://www.grammarly.com/
                            From Grammar and Spelling To Style and Tone, Eliminate All Kinds Of Writing Mistakes. Write
                            Text That Is Not Just Grammatically Correct Writing, But Clear and Concise. AI Writing
                            Assistant. Improve Word Choice. Eliminate Grammar Errors. Fix Punctuation Errors.

                        </th>

                    </tr>
                </tbody>
            </table>
        </div>




    </div>


</body>

</html>
   
    `

    return chaine

  }

}
