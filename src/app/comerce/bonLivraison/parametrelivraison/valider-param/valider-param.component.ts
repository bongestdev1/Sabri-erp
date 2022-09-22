
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, NgZone } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { paramliv } from 'src/app/model/modelCommerce/paramliv';
import { InformationsService } from 'src/app/services/informations.service';
import { Paramliv } from 'src/app/services/serviceBD_Commerce/paramliv.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ParamHeaderFooterPdf } from 'src/app/model/modelCommerce/ParamHeaderFooterPdf';
import { ParampdfService } from 'src/app/services/serviceBD_Commerce/parampdf.service';
@Component({
  selector: 'app-valider-param',
  templateUrl: './valider-param.component.html',
  styleUrls: ['./valider-param.component.scss'],
  providers: [ParamHeaderFooterPdf]
})
export class ValiderParamComponent implements OnInit {
  request = {
    search: {
      idFormat: "",
      typeDoc: "",
      champ: "",
      libelle: "",
      width: "",
      ordre: "",
      visibilite: "",
      alignement: "",
    },
    orderBy: {
      idFormat: 0,
      typeDoc: 0,
      champ: 0,
      libelle: 0,
      width: 0,
      ordre: 0,
      visibilite: 0,
      alignement: 0,
    },
    limit: 10,
    page: 1,
  }


  items = {
    idFormat: "idFormat",
    typeDoc: "typeDoc",
    champ: "Champ",
    libelle: "Libelle",
    width: "Width",
    ordre: "Ordre",
    visibilite: "Visibilité",
    alignement: "Alignement",
  };
  paramlivraison = new paramliv()

 
  
  constructor(
    private paramlivraiservice: Paramliv,
    public ParamHeaderFooterPdf:ParamHeaderFooterPdf,
    private modalService: NgbModal,
    private ParamHeader : ParampdfService,
   
  ) { }


  

  ngOnInit(): void {
   
  }
  format=""
  doc=""
  paramliv: any = []
  closeResult: string;

  getparamPDF(){}
  
  getParamliv() {
    
    this.paramlivraiservice.getAll(this.request)
      .subscribe(
        res => {
          
          let resultat: any = res
          
            this.paramliv = res.resultat.docs
            console.log("tab",this.paramliv)
           
          });

    return this.paramliv

  }

  modalReference: NgbModalRef

  open(content, format,doc) {

    this.format = format
    this.doc = doc
    console.log(format)
    console.log(doc)
    
    this.modalReference = this.modalService.open(content, {size : 'lg', ariaLabelledBy: 'modal-basic-title' })
    
    this.modalReference.result.then((result) => {
      //this.modalService.open(PopupTransporteurComponent,{ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
      this.closeResult = `Closed with: ${result}`;

      console.log("fffffffffff", result)

    }, (reason) => {

      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      //this.getTransporteurs;



    });


  }

  id="62dfe0d858cdfe1514520866"
  open1(Content,_id) {

    this.modalReference = this.modalService.open(Content, {size : 'lg', ariaLabelledBy: 'modal-basic-title' })
    
    this.modalReference.result.then((result) => {
      //this.modalService.open(PopupTransporteurComponent,{ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
      this.closeResult = `Closed with: ${result}`;

      console.log("fffffffffff", result)

    }, (reason) => {

      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      //this.getTransporteurs;

    });

  }

  closePopupAngular(){
    this.modalReference.close()
  }
  
  private getDismissReason(reason: any): string {

    if (reason === ModalDismissReasons.ESC) {

      return 'by pressing ESC';

    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {

      return 'by clicking on a backdrop';

    } else {

      return `with: ${reason}`;

    }

  }
  
  Valider() {

    this.format = this.paramlivraison.idFormat
    this.doc = this.paramlivraison.typeDoc
   
    console.log(this.format)
    console.log(this.doc)
    this.getParamliv()

  }


 


}
