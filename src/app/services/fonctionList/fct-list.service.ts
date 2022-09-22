import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Injectable({
  providedIn: 'root'
})
export class FctListService {

  constructor() { }

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

  wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }

  stringToHtml(str) {
    const el = document.createElement('div');
    el.innerHTML = str;
    return el;
  };

  getDataToHtml(operationPreventifs) {
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

  <h1> Tableaux de clients </h1>

  <table style="width:100%">
  <tr>
  </tr>
  `
    for (let i = 0; i < operationPreventifs.length; i++) {
      chaine +=
        `<tr>
      </tr>`
    }
    chaine += `
  </table>
</body>
</html>
`
    return chaine;
  }

  operationPreventifs = []
  printout() {
    var newWindow = window.open();
    var chaine = this.getDataToHtml(this.operationPreventifs)
    newWindow.document.write(chaine);
    newWindow.print();
  }


}

