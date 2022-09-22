import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InformationsService } from 'src/app/services/informations.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx'; 
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';

@Component({
  selector: 'app-societe-admin',
  templateUrl: './societe-admin.component.html',
  styleUrls: ['./societe-admin.component.scss']
})
export class SocieteAdminComponent implements OnInit {

  formC:FormGroup

  lienDelete = "/societes/deleteSociete"
  lienList = "/societes/listSocietes"

  isOpenModalDelete = false
  idDeleteModal = ""
  params1Delete = ""
  params2Delete = ""

  deleteItem(){
     
    if (this.isLoading) {
      return
    }

    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.lienDelete +"/"+this.idDeleteModal, {},this.tokenStorageService.getHeader()).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
            this.getSocietes()
            this.closeModalDelete()
         }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }

  openModalDelete(id, params2){
    this.idDeleteModal = id
    this.isOpenModalDelete = true
    this.params1Delete = "La Societe"
    this.params2Delete = params2
  }

  closeModalDelete(){
    this.isOpenModalDelete = false
  }
  constructor(
    private fb:FormBuilder, 
    private router:Router, 
    private http: HttpClient, 
    private tokenStorageService:TokenStorageService,
    public informationGenerale: InformationsService) {
   
    this.formC = this.fb.group({
      raisonSociale:[''],
      societeParent:[''],
      matriculeFiscale:[''],
      responsable:[''],
      cinResponable:[''],
      telephones:[''],
      mobiles:[''],
      fax:[''],
      email:[''],
      pays:[''],
      gouvernorat:[''],
      delegation:[''],
      localite:[''],
      codePostale:[''],
      limit:10
    })

    this.getSocietes()
  }

  arrayNotShowInput = ["societeParent"]

  gotToAdd(){
    this.router.navigate(['dashboard-admin/AjouterSociete']);
  }

  objectKeys = Object.keys;

  items = {    
    raisonSociale:"active",
    societeParent:"active",
    matriculeFiscale:"active",
    responsable:"active",
    cinResponable:"active",
    telephones:"active",
    mobiles:"active",
    fax:"active",
    email:"active",
    pays:"active",
    gouvernorat:"active",
    delegation:"active",
    localite:"active",
    codePostale:"active"
  };

  itemsVariable = { 
    raisonSociale:"active",
    societeParent:"active",
    matriculeFiscale:"active",
    responsable:"active",
    cinResponable:"active",
    telephones:"active",
    mobiles:"active",
    fax:"active",
    email:"active",
    pays:"active",
    gouvernorat:"active",
    delegation:"active",
    localite:"active",
    codePostale:"active"
  };

  

  request = {
    search:{
      raisonSociale:null,
      societeParent:"",
      matriculeFiscale:"",
      responsable:"",
      cinResponable:"",
      telephones:"",
      mobiles:"",
      fax:"",
      email:"",
      pays:"",
      gouvernorat:"",
      delegation:"",
      localite:"",
      codePostale:"",
    },
    orderBy:{ 
      raisonSociale:0,
      societeParent:0,
      matriculeFiscale:0,
      responsable:0,
      cinResponable:0,
      telephones:0,
      mobiles:0,
      fax:0,
      email:0,
      pays:0,
      gouvernorat:0,
      delegation:0,
      localite:0,
      codePostale:0,
    },
    limit: 10,
    societe:"", 
    page:1
  } 

  oldRequest = { 
    search:{
      raisonSociale:null,
      societeParent:"",
      matriculeFiscale:"",
      responsable:"",
      cinResponable:"",
      telephones:"",
      mobiles:"",
      fax:"",
      email:"",
      pays:"",
      gouvernorat:"",
      delegation:"",
      localite:"",
      codePostale:"",
    },
    orderBy:{ 
      raisonSociale:0,
      societeParent:0,
      matriculeFiscale:0,
      responsable:0,
      cinResponable:0,
      telephones:0,
      mobiles:0,
      fax:0,
      email:0,
      pays:0,
      gouvernorat:0,
      delegation:0,
      localite:0,
      codePostale:0,
    },
    limit: 10,
    societe:"", 
    page:1
  }

  ngOnInit(): void {
  }
  isLoading = false

  societes = []

  getSocietes() {

    if (this.isLoading) {
      return
    }

    for(let key in this.request.search){
      this.request.search[key] = this.formC.value[key]
    }
    this.request.limit = this.formC.value.limit

    if(!this.testSyncronisation(this.request, this.oldRequest)){
      this.request.page = 1
    }

    this.isLoading = true

    console.log("pas 0")

    this.http.post(this.informationGenerale.baseUrl + this.lienList, this.request,this.tokenStorageService.getHeader()).subscribe(

      res => {
        console.log("pas 1")
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.societes = resultat.resultat.docs
          this.totalPage = resultat.resultat.pages
          this.oldRequest = resultat.request
          if(this.totalPage < this.request.page && this.request.page != 1){
            this.request.page = this.totalPage 
            this.getSocietes()
          }

          if(!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page) ){
            this.getSocietes()
          }
        }
      }, err => {
        console.log(err)
      
        this.isLoading = false
        alert("Désole, il y a un problème de connexion internet")
      }
    );
  }

  testSyncronisation(request1, request2){
    for(let key in request1.search){
      if(request1.search[key] != request2.search[key]){
        return false
      }
    }
 
    for(let key in request1.orderBy){
      if(request1.orderBy[key] != request2.orderBy[key]){
        return false
      }
    }
   
    if(request1.limit != request2.limit){
      return false
    }

    return true;
  }

  totalPage = 1

  setLimitPage(newLimitPage: number) {
    this.request.limit = newLimitPage
    this.request.page = 1
    this.getSocietes()
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getSocietes()
  }

  printout() {
    var newWindow = window.open();
    var chaine = this.getDataToHtml()
    newWindow.document.write(chaine);
    newWindow.print();
  }

  stringToHtml(str) {
    const el = document.createElement('div');
    el.innerHTML = str;
    return el;
  };

  wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
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

    for (let i = 0; i < this.societes.length; i++) {
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
  fileName= 'ExcelSheet.xlsx';  
  exportexcel(){
    /* table id is passed over here */   
    let element = document.getElementById('output'); 
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
	}

  changeCroissante(key){
    var classStyle = key+"-croissante";
    var buttons = document.getElementsByClassName(classStyle);
    if(this.request.orderBy[key] == 1){
      this.request.orderBy[key] = -1
      this.activationCroissante(buttons[0], buttons[1])
    }else{
      this.request.orderBy[key] = 1
      this.activationCroissante(buttons[1], buttons[0])
    }

    for(let varkey in  this.request.orderBy){
      if(key != varkey){
         this.request.orderBy[varkey] = 0
      }
    }
    
    this.getSocietes()
  }

  activationCroissante(buttons1, buttons2){
    var buttons = document.getElementsByClassName("croissante");

    for(let i = 0; i < buttons.length; i++){
      var classList = buttons[i].getAttribute("class")
      classList = classList.replace("active-buttons-croissante","")
      buttons[i].setAttribute("class", classList) 
    }
   
    classList = buttons2.getAttribute("class")
    classList = classList.replace("active-buttons-croissante","")
    classList += " active-buttons-croissante"
    buttons2.setAttribute("class", classList)
  }
}
