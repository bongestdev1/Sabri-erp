import { UtiliteService } from './../services/utilite.service';
import { Component, OnInit,  Input, ViewChild, SimpleChanges, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { Output, EventEmitter } from '@angular/core';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';
import { TokenStorageService } from '../services/authentication/token-storage.service';
const tables = require("../parametres-importations-page/tables.json");
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-importations-page',
  templateUrl: './importations-page.component.html',
  styleUrls: ['./importations-page.component.scss']
})
export class ImportationsPageComponent implements OnInit {

  @ViewChild('content') content: ElementRef<HTMLInputElement>;
  resultat = {bien:0, erreur:0}

  lienGet = "/parametresImportation/getConfiguration/"
 
  modalReference: NgbModalRef;
  closeResult = '';

  options2: NgbModalOptions = {
    container: '.session-modal-container'
  };

  tables = tables

  tableSelectionner = tables[0]

  table = tables[0].table

  parametresCurrent = {}

  changerTable(){
    this.tables.forEach( x => {
      if(x.table === this.table){
        this.tableSelectionner = x
        this.getParametresImportation()
      }
    })
  }

  getParametresImportation(){
  
    if (this.isLoading) {
      return
    }

    var parametres:any = {} 
    parametres.societe = this.informationGenerale.idSocieteCurrent
    
    this.isLoading = true
    
    this.http.post(this.informationGenerale.baseUrl + this.lienGet + this.table, parametres, this.tokenStorageService.getHeader()).subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.parametresCurrent = JSON.parse(resultat.resultat.parametres)
          this.articles = []
        }
      }, err => {
        console.log(err)
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }


  constructor(private notificationToast:ToastNotificationService, 
    private http: HttpClient, 
    private fnctModel: FnctModelService,
    private tokenStorageService:TokenStorageService,
    public informationGenerale: InformationsService, 
    public fonctionPartagesService:FonctionPartagesService,
    private utiliteServices: UtiliteService,
    private modalService: NgbModal) 
    { 
    }

    open(content) {
     
      this.modalReference = this.modalService.open(content, this.options2);
      this.modalReference.result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
      });
    }

    
  objectKeys = Object.keys;

  shemaArticleExcel = {}
  ngOnInit(): void {
    this.getParametresImportation()
  }

  // Gestion des photos --debut--
  multiImage
  imageSelected
  imageSelectedSource
  componentField

  annulerImage(){
    this.imageSelected = null
    this.imageSelectedSource = null
    this.componentField = null
    this.articles = []
    this.pathFichier = ""
    //document.getElementById('fileInput').setAttribute("value", null)
  }

  selectedM(event) {
     this.multiImage = event.target.files;
     
     var files = event.target.files;
     if (files.length === 0)
     return;

     this.imageSelectedSource = files[0]
     
     var mimeType = files[0].type;
     //if (mimeType.match(/image\/*/) == null) {
     //   this.message = "Only images are supported.";
     //   return;
     //}

     var reader = new FileReader();
     
     reader.readAsDataURL(files[0]); 
     reader.onload = (_event) => { 
       this.imageSelected = reader.result
     }
  }
  // Gestion des photos --fin--

  image = ""
  isLoading = false
  importFichierArticles(){
    if(this.isLoading){
      return 
    }
    
    if(this.imageSelectedSource){
      const formData = new FormData();
      this.isLoading = true  
      var json_arr = JSON.stringify(["key","key2"])   
      formData.append('myFiles', this.imageSelectedSource) 
      this.http.post(this.informationGenerale.baseUrl+"/importations/upload", formData,this.tokenStorageService.getHeader()).subscribe(
        res => {   
          var arrayImages: any = res 
          this.isLoading = false;
         
          if(arrayImages.length > 0){
            this.pathFichier = arrayImages[0]
            this.sendFichierArticles()
          }
        }, err => {
          this.isLoading = false;
          return 
        }
      );
    }
  }

  articles = []
  pathFichier = ""
  sendFichierArticles(){
    if(this.pathFichier == ""){
        alert("aucun fichier sélectionné")     
    }

    if(this.isLoading){
      return 
    }
    
    var request = {
      tauxFodec:this.fonctionPartagesService.parametres.tauxFodec,
      pathFichier:this.pathFichier, 
      table:this.table, 
      shema: this.parametresCurrent,
      societe:this.informationGenerale.idSocieteCurrent
    }

    this.isLoading = true  
    this.http.post(this.informationGenerale.baseUrl+"/importations/extractFromFile", request,this.tokenStorageService.getHeader()).subscribe(
      res => {
        var resultat:any = res        
        this.isLoading = false;
        if(resultat.status){
          this.articles = resultat.articles
        }
      }, err => {
        this.isLoading = false;
        return 
      }
    );
  
  }

  saveFichierArticles(){
    
    if(this.pathFichier == ""){
      alert("aucun fichier sélectionné")     
    }

    if(this.isLoading){
      return 
    }
    

    var request = {
      tauxFodec:this.fonctionPartagesService.parametres.tauxFodec,
      items:this.articles, 
      table:this.table, 
      shema: this.parametresCurrent,
      societe:this.informationGenerale.idSocieteCurrent
    }

    this.isLoading = true  
    this.http.post(this.informationGenerale.baseUrl+"/importations/saveFile", request,this.tokenStorageService.getHeader()).subscribe(
      res => {        
        var resultat:any = res        
        this.isLoading = false;
        if(resultat.status){
          this.resultat = resultat.nbrSave
          this.open(this.content)
          this.annulerImage() 
        }
      }, err => {
        this.isLoading = false;
        return 
      }
    );
  
  }

  telechargerExel(){
    this.utiliteServices.exportexcel([], this.parametresCurrent, "", this.table)
  }

  getStyleOfLigne(message){
    if(message === "bien"){
      return "background-color:green;  color:white"
    }else if(message === "erreur"){
      return "background-color:red;  color:white"
    }else{
      return "background-color:#ff8000; color:white"
    } 
  }

  doublonsSupprimer(){
    this.articles = this.articles.filter(x => x.message != "double")
  }

  erreursSupprimer(){
    this.articles = this.articles.filter(x => x.message != "erreur")
  }

  getLength(etat){
    return this.articles.filter(x => x.message === etat).length
  }



}
