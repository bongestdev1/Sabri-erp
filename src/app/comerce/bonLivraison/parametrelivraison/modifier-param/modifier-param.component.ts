
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { InformationsService } from 'src/app/services/informations.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { UtiliteService } from 'src/app/services/utilite.service';
import { Paramliv } from 'src/app/services/serviceBD_Commerce/paramliv.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Bonlivraison } from 'src/app/services/serviceBD_Commerce/Bonlivraison.service';

@Component({
  selector: 'app-modifier-param',
  templateUrl: './modifier-param.component.html',
  styleUrls: ['./modifier-param.component.scss']
})
export class ModifierParamComponent implements OnInit {

  paramlivFormGroup: FormGroup;





  @Output() closeModalModifierParamliv = new EventEmitter<string>();

  @Input() idFormat = ""
  @Input() typeDoc = ""
  @Input() isOpenModalAjoutparamliv = false

  ngOnChanges(changes: SimpleChanges) {

    this.getParamliv(this.idFormat, this.typeDoc)
  }

  title = 'appBootstrap';
  formC: FormGroup
  helloObject = "hello test";
  currentId = "";
  currentTr = "";
  Tr;
  objectKeys = Object.keys;
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

  itemsVariable = {
    idFormat: "active",
    typeDoc: "active",
    champ: "active",
    libelle: "active",
    width: "active",
    ordre: "active",
    visibilite: "active",
    alignement: "active",
  };

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

  oldRequest = {
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
    limit: 15,
    page: 1
  }
  isOpenModalDelete = false
  idDeleteModal = ""
  params1Delete = ""
  params2Delete = ""

  displayStyle = "none";
  
 

  openModalDelete(id, params2) {
    this.idDeleteModal = id
    this.isOpenModalDelete = true
    this.params1Delete = "Le Param liv"
    this.params2Delete = params2
  }

  closeModalDelete() {
    this.isOpenModalDelete = false
  }
  closeResult: string;
  constructor(
    private bonlivraison: Bonlivraison,
    private router: Router,
    private utilite: UtiliteService,
    private fonctionPartagesService: FonctionPartagesService,
    private fb: FormBuilder,
    private paramlivraison: Paramliv,
    public informationGenerale: InformationsService,
    private modalService: NgbModal,
    

  ) {
    this.formC = this.fb.group({
      idFormat: [''],
      typeDoc: [''],
      champ: [''],
      libelle: [''],
      width: [''],
      ordre: [''],
      visibilite: [''],
      alignement: [''],

      limit: 10
    })



  }

  ngOnInit(): void {
  }



  isLoading = false
  paramliv = []
  getParamliv(idFormat, typeDoc) {
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

    this.request.search.idFormat = this.idFormat
    this.request.search.typeDoc = this.typeDoc


    this.paramlivraison.getparam(idFormat, typeDoc, this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.paramliv = resultat.resultat.docs

            this.totalPage = resultat.resultat.pages
            this.oldRequest = resultat.request
            /*if (this.totalPage < this.request.page && this.request.page != 1) {
              this.request.page = this.totalPage
              this.getParamliv(idFormat,typeDoc)
            }*/

            // if (!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page)) {
            //   this.getParamliv(idFormat,typeDoc)
            //  }
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });


    return this.paramliv
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
    this.getParamliv(this.idFormat, this.typeDoc)
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getParamliv(this.idFormat, this.typeDoc)
  }

  titreFile = "Liste de paramliv"
  nameFile = "liste_paramliv"
  printout() {
    this.utilite.printout(this.paramliv, this.items, this.titreFile)
  }



  exportexcel() {
    /* table id is passed over here */
    this.utilite.exportexcel(this.paramliv, this.items, this.titreFile, this.nameFile)
  }

  //open modal ajout Element
  isOpenModalAjoutElement = false;
  idAjoutElementModal = "";
  typeElement

  closeModalAjoutElement() {
    this.isOpenModalAjoutElement = false
    this.getParamliv(this.idFormat, this.typeDoc)
  }

  openModalAjoutTransporteur() {

    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterTransporteur
    this.isOpenModalAjoutElement = true
  }

  openModalModifierparamliv(id) {

    this.idAjoutElementModal = id


    this.typeElement = this.fonctionPartagesService.titreOfModal.modifierParamliv

    this.isOpenModalAjoutElement = true
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

    this.getParamliv(this.idFormat, this.typeDoc)
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
  ouvrirFenetreAjout() {

    this.router.navigateByUrl('/transporteur/ajout');

  }
  ouvrirFenetreModifier(id) {

    //this.router.navigate(['/transporteur/modifier', id]);
    //const ref = this.modalService.open(ModifierTransporteurComponent)
    //ref.componentInstance.item=item;
    // this.router.navigateByUrl('/transporteur/modifier/:id');
    this.currentId = id;
    this.paramlivraison.currentID = this.currentId;
    //this.Tr = new Transporteur();

    this.Tr = this.paramlivraison.get(id).subscribe(
      res => {
        let resultat: any = res
        if (resultat.status) {

          this.currentTr = resultat.resultat.docs

        }
      });





  }

  id = ""
  modalReference: NgbModalRef
  open(content, id) {

    this.id = id


    this.modalReference = this.modalService.open(content, {size : 'lg', ariaLabelledBy: 'modal-basic-title' })
    
    this.modalReference.result.then((result) => {
      //this.modalService.open(PopupTransporteurComponent,{ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.getParamliv(this.idFormat, this.typeDoc)
      this.closeResult = `Closed with: ${result}`;



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




}
