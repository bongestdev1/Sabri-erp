import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { InformationsService } from 'src/app/services/informations.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { UtiliteService } from 'src/app/services/utilite.service';
import { Paramliv } from 'src/app/services/serviceBD_Commerce/paramliv.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModifierlistparamComponent } from '../modifierlistparam/modifierlistparam.component';
import { Bonlivraison } from 'src/app/services/serviceBD_Commerce/Bonlivraison.service';
//import pdfMake from 'pdfmake/build/pdfmake';
//import pdfFonts from 'pdfmake/build/vfs_fonts';
import { paramliv } from 'src/app/model/modelCommerce/paramliv';
import { ModifierParamComponent } from '../../parametrelivraison/modifier-param/modifier-param.component';
import { ParampdfService } from 'src/app/services/serviceBD_Commerce/parampdf.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
//pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-listparamlivraison',
  templateUrl: './listparamlivraison.component.html',
  styleUrls: ['./listparamlivraison.component.scss'],
  providers: [ModifierParamComponent]
})
export class ListparamlivraisonComponent implements OnInit {
  getId: any;

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
    private ParametreGeneral: ModifierParamComponent,
    private paramlivraison: Paramliv,
    private ParamHeader: ParampdfService,
    public informationGenerale: InformationsService,
    private modalService: NgbModal,
    private toast:ToastNotificationService


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

    this.getPramliv()
    this.getId = "62dfe0d858cdfe1514520866"
    this.ParamHeader.get(this.getId).subscribe(res => {
      this.parampdf = res.resultat
      console.log("hhhhhhhhh", this.parampdf)

    });
  }

  param = new paramliv()
  idFormat = ""
  typeDoc = ""

  parametre: any = [];

  ngOnInit(): void {




  }




  isLoading = false
  paramliv = []
  getPramliv() {
    if (this.isLoading) {
      return
    }
    for (let key in this.request.search) {
      this.request.search[key] = this.formC.value[key]
    }
    this.request.limit = 1000
    if (!this.testSyncronisation(this.request, this.oldRequest)) {
      this.request.page = 1
    }
    this.isLoading = true
    console.log("this.request", this.request)
    this.paramlivraison.getAll(this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.paramliv = resultat.resultat.docs
            console.log(resultat)
            this.totalPage = resultat.resultat.pages
            this.oldRequest = resultat.request
            if (this.totalPage < this.request.page && this.request.page != 1) {
              this.request.page = this.totalPage
              this.getPramliv()
            }

            if (!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page)) {
              this.getPramliv()
            }
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
    this.getPramliv()
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getPramliv()
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
    this.getPramliv()
  }

  openModalAjoutTransporteur() {
    console.log(this.typeElement);
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterTransporteur
    this.isOpenModalAjoutElement = true
  }

  openModalModifierparamliv(id) {
    console.log("edit najla");
    console.log(this.idAjoutElementModal);
    this.idAjoutElementModal = id
    console.log(this.typeElement);

    this.typeElement = this.fonctionPartagesService.titreOfModal.modifierParamliv
    console.log(this.typeElement);
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

    this.getPramliv()
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
    console.log("najla is here!")
    this.router.navigateByUrl('/transporteur/ajout');
  }

  ouvrirFenetreModifier(id) {
    //console.log("item!"+item);
    //console.log(id);
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
          console.log(resultat)
          console.log(this.currentTr)
        }
      });
    console.log(this.Tr);




  }

  id = ""

  closeModal:any

  closePopupModifier(){
    this.closeModal.close()
  }

  open(content, id) {

    this.id = id
    console.log(id)

    this.closeModal = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  
    this.getPramliv()
      
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


  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
  }

  // ********************************************Generate PDF***********************************************************



  tabTVA: any = [];
  TabGener: any = [];
  bonLiv: any = [];
  client: any = [];
  parampdf: any = [];
  lignesBonLivraison: any = {}
  i1 = 0;
  i2 = 0;


  async generatePDF(action = 'open') {
    
    let docDefinition = {

      pageSize: 'A4',
      pageMargins: [12, 90, 12, 35],

      header: function (page) {
        if (page != 1)
          return {
            margin: 12,

            columns: [

              [
              ],
              [
                {
                  text: `${new Date().toLocaleDateString('en-GB')}`,
                  cellFilter: 'date:\'MM/dd/yyyy\'',
                  alignment: 'left',
                  margin: [210, 5, 0, 0],
                  fontSize: 9,
                  italics: true,
                }
              ]


            ]
          }


      },



      header1: {
        margin: 10,

        columns: [

          [
            {
              headerRows: 1,
              image: await this.getBase64ImageFromURL(this.informationGenerale.baseUrl + this.parampdf.imagePath),
              alignment: 'left',
              height: 60,
              width: 100,
              margin: [0, 5, 0, 0],

            }],
          [
            {
              text: `${new Date().toLocaleDateString('en-GB')}`,
              cellFilter: 'date:\'MM/dd/yyyy\'',
              alignment: 'left',
              margin: [210, 5, 0, 0],
              fontSize: 9,
              italics: true,
            }
          ]


        ]
      },

      footer: (currentPage, pageCount, pageSize) => {
        return [{
          margin: [31, 0, 31],
          layout: {
            hLineColor: (i) => (i === 0) ? 'lightgray' : '',
            vLineWidth: (i) => 0,
            hLineWidth: (i) => (i === 0) ? 1 : 0
          },


          table: {

            widths: ['*', 160, 160],
            body: [
              [
                {},

                [

                  { text: this.parampdf.nomsociale + ':' + '\t' + this.parampdf.adresse, alignment: 'center', fontSize: 8, margin: [-100, 0, -20, 0] },
                  { text: 'Tel:' + this.parampdf.numTel1 + '\t\t' + 'Fix:' + this.parampdf.numTel2 + '\t\t' + 'Fix:' + this.parampdf.numFax + '\t\t' + 'Email:' + this.parampdf.adresseEmail, alignment: 'center', fontSize: 8, margin: [-200, 0, -100, 0] },
                  { text: 'Matricule Fiscale:' + this.parampdf.matriculefisc + '\t' + '/' + '\t' + 'RIB:' + this.parampdf.rib, alignment: 'center', fontSize: 8, margin: [-200, 0, -100, 0] }],


                { text: `${currentPage}/${pageCount}`, alignment: 'right' }
              ]
            ]



          }
        }];
      },


      content: [


        {
          layout: "noBorders",
          margin: [0, -90, 0, 0],
          table: {
            widths: ["*", "50%",],
            headerRows: 0,
            body: [
              [
                {
                  image: await this.getBase64ImageFromURL(this.informationGenerale.baseUrl + this.parampdf.imagePath),
                  alignment: 'left',
                  height: 60,
                  width: 100,
                  margin: [0, 5, 0, 0],
                },

                {
                  text: `${new Date().toLocaleDateString('en-GB')}`,
                  cellFilter: 'date:\'MM/dd/yyyy\'',
                  alignment: 'left',
                  margin: [227, 5, 0, 0],
                  fontSize: 9,
                  italics: true,
                },
              ],

            ]
          }
        },


        {
          columns: [

            [

              {
                margin: [0, 15, 0, 0],
                table: {
                  bold: 'false',
                  widths: ['*', 20, 30,],
                  body: [
                    [
                      [{
                        text: 'Bon De Livraison',
                        style: 'sectionHeader',

                      },
                      {
                        text: 'Numéro :' + ' ' + this.bonLiv.numero,

                      },
                      ],

                    ],
                  ]
                },
                layout: {
                  hLineWidth: function (i, node) {
                    return (i === 0 || i === node.table.body.length) ? 2 : 2;
                  },
                  vLineWidth: function (i, node) {
                    return (i === 0 || i === node.table.widths.length) ? 2 : 2;
                  },
                  hLineColor: function (i, node) {
                    return (i === 0 || i === node.table.body.length) ? 'gray' : 'gray';
                  },
                  vLineColor: function (i, node) {
                    return (i === 0 || i === node.table.widths.length) ? 'gray' : 'gray';
                  },
                }

              },
            ],
            [
              {
                margin: [0, -45, -39, 30],

                table: {

                  widths: ['*', 10, 10],
                  body: [
                    [
                      [{
                        text: 'code client :' + ' ' + this.client.code + '\n\n',
                        fontSize: 9,


                      },

                      {
                        text: this.client.raisonSociale + '\n\n',
                        bold: 'Courier-Bold',
                        fontSize: 16,

                      },
                      {
                        text: 'Adresse :' + ' ' + this.client.adresseLivraison + '\n\n',
                        fontSize: 9,

                      },
                      {
                        text: 'télephone :' + ' ' + this.client.telephone + '\n\n',
                        fontSize: 9,

                      },
                      {
                        text: 'Matricule Fiscale :' + ' ' + this.client.matriculeFiscale + '\n\n',
                        fontSize: 9,

                      }
                      ],

                    ],
                  ]
                },
                layout: {
                  hLineWidth: function (i, node) {
                    return (i === 0 || i === node.table.body.length) ? 2 : 2;
                  },
                  vLineWidth: function (i, node) {
                    return (i === 0 || i === node.table.widths.length) ? 2 : 2;
                  },
                  hLineColor: function (i, node) {
                    return (i === 0 || i === node.table.body.length) ? 'gray' : 'gray';
                  },
                  vLineColor: function (i, node) {
                    return (i === 0 || i === node.table.widths.length) ? 'gray' : 'gray';
                  },
                }


              },

            ]
          ]
        },


        {

          table: {

            headerRows: 1,
            widths: [


              ...this.TabGener.map(p => (p.width + '%'
              )),

            ],

            body: [
              [
                ...this.TabGener.map(p => ([{ text: p.libelle, fontSize: 9, alignment: 'center' }
                ])),
              ],
              ...this.lignesBonLivraison.map(p => ([

                ...this.TabGener.map(c => ([
                  { text: p[c.champ], fontSize: 9, alignment: '' + c.alignm, },

                ]))

              ])),


            ]
          },
          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 0.5 : 0.5;

            },

            vLineWidth: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 0.5 : 0.5;
            },

          },

          // pageBreak : ()=>{

          //  return[{text: '', pageBreak: 'before', }] ;
          // },

        },

        {

          unbreakable: true,

          columns: [

            [

              {
                margin: [0, 35, 10, -15],
                table: {



                  widths: ['auto', 'auto', 'auto', 'auto',],
                  fontSize: 8,
                  body: [

                    [{ text: 'N°', fontSize: 8 }, { text: 'Base HT ', fontSize: 8 }, { text: 'Taux TVA ', fontSize: 8 }, { text: ' Montant TVA', fontSize: 8 }],
                    ...this.tabTVA.map(p => ([
                      { text: this.i1++, i2: this.i2 = this.i1 + 2, alignment: 'right', fontSize: 9 },
                      { text: p.totalHT.toFixed(3), alignment: 'right', fontSize: 9 },
                      { text: p.tauxTVA + '%', alignment: 'right', fontSize: 9 },
                      { text: p.montantTVA.toFixed(3), alignment: 'right', fontSize: 9 }])),
                    [{ text: 'Total TVA', colSpan: 3, alignment: 'left', fontSize: 9 }, {}, {}, this.tabTVA.reduce((sum, p) => sum + (p.montantTVA), 0).toFixed(3)],


                  ],


                  headerRows: this.i2,
                  keepWithHeaderRows: true,

                },

              },


            ],

            [{

              margin: [10, 35, 0, -15],
              table: {

                headerRows: 3,
                keepWithHeaderRows: true,


                body: [
                  [
                    { text: 'D.Consommation', fontSize: 8 },
                    { text: '0.000 ', margin: [40, 0, 0, 0], alignment: 'right', fontSize: 9 },
                  ],
                  [
                    { text: 'FODEC', fontSize: 8 },
                    { text: this.bonLiv.totalFodec.toFixed(3), alignment: 'right', fontSize: 9 },
                  ],
                  [
                    { text: 'Escompte', fontSize: 8 },
                    { text: ' 0.000', alignment: 'right', fontSize: 9 },
                  ],



                ]
              },
            }





            ],


            [{

              margin: [0, 35, 0, -15],
              table: {

                headerRows: 4,
                keepWithHeaderRows: true,

                widths: [68, 82],


                body: [
                  [

                    { text: 'TOTAL NET HT', fontSize: 8 },
                    { text: this.bonLiv.totalHT.toFixed(3), alignment: 'right', fontSize: 9, },
                  ],
                  [
                    { text: 'Montant T.V.A', fontSize: 8 },
                    { text: this.bonLiv.totalTVA.toFixed(3), alignment: 'right', fontSize: 9 },
                  ],
                  [
                    { text: 'Timbre Fiscale', fontSize: 8 },
                    { text: this.bonLiv.timbreFiscale.toFixed(3), alignment: 'right', fontSize: 9 },
                  ],
                  [
                    { text: 'TOTAL', fontSize: 8 },
                    { text: this.bonLiv.totalTTC.toFixed(3), alignment: 'right', fontSize: 12 },
                  ],


                ]
              },
            }





            ],




          ],

        },

        [{ text: 'Cachet et signature', alignment: 'right', italics: true, decoration: 'underline', margin: [0, 60, 50, 0], fontSize: 10 }],


      ],

      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15]
        }
      }
    };

   /* if (action === 'download') {
      pdfMake.createPdf(docDefinition).download();
    } else if (action === 'print') {
      pdfMake.createPdf(docDefinition).print();
    } else {
      pdfMake.createPdf(docDefinition).open();
    }*/

  }

  deleteparamliv() {
    if(this.isLoading){
      return
    }
    
    console.log("deleteParamliv")
    this.isLoading = true
    this.bonlivraison.deleteParamliv().subscribe(res => {
      this.isLoading = false
      this.toast.showSuccess("Supprimer avec succès")
      this.getPramliv()
    })
  }

  iniialiserparamliv() {
    if(this.isLoading){
      return
    }
    this.isLoading = true
    this.bonlivraison.inisialiserParamliv().subscribe(res => {
      this.isLoading = false
      this.toast.showSuccess("initialiser avec success")
      this.getPramliv()
    })
  }

  generatePDF3() {
    
    this.isLoading = true

    this.bonlivraison.GetBonLivraison().subscribe(res => {
    
      this.isLoading = false

      var resultat: any = res
      this.client = res.client
      this.bonLiv = res.resultat
      this.lignesBonLivraison = res.articles

      for (let i = 0; i < this.lignesBonLivraison.length; i++) {
        var isExiste = false
        this.lignesBonLivraison[i].prixTTC = this.lignesBonLivraison[i].prixTTC.toFixed(3)
        for (let j = 0; j < this.tabTVA.length; j++) {

          if (this.lignesBonLivraison[i].tauxTVA === this.tabTVA[j].tauxTVA) {
            isExiste = true
            this.tabTVA[j].montantTVA += this.lignesBonLivraison[i].tauxTVA / 100 * this.lignesBonLivraison[i].totalHT
            this.tabTVA[j].totalHT += this.lignesBonLivraison[i].totalHT

          }
        }

        if (!isExiste) {
          this.tabTVA.push({ tauxTVA: this.lignesBonLivraison[i].tauxTVA, montantTVA: this.lignesBonLivraison[i].tauxTVA / 100 * this.lignesBonLivraison[i].totalHT, totalHT: this.lignesBonLivraison[i].totalHT })

        }

      }
      var v: any = res
      for (let j2 = 0; j2 < this.tabTVA.length - 1; j2++) {
        for (let j1 = 0; j1 < this.tabTVA.length - 1 - j2; j1++) {
          if (this.tabTVA[j1].tauxTVA > this.tabTVA[j1 + 1].tauxTVA) {

            v = this.tabTVA[j1].tauxTVA
            this.tabTVA[j1].tauxTVA = this.tabTVA[j1 + 1].tauxTVA
            this.tabTVA[j1 + 1].tauxTVA = v

          }

        }
      }

      this.idFormat = this.param.idFormat
      this.typeDoc = "BL"


      for (let i4 = 0; i4 < this.paramliv.length; i4++) {

        if (this.paramliv[i4].visibilite === "oui" && this.paramliv[i4].idFormat === this.idFormat && this.paramliv[i4].typeDoc === this.typeDoc) {
           this.TabGener.push({ champ: this.paramliv[i4].champ, libelle: this.paramliv[i4].libelle, width: this.paramliv[i4].width, ordre: this.paramliv[i4].ordre, alignm: this.paramliv[i4].alignement, })
        }

      }

      var ch: any = res
      for (let j4 = 0; j4 < this.TabGener.length - 1; j4++) {
        for (let j3 = 0; j3 < this.TabGener.length - 1 - j4; j3++) {
          if (this.TabGener[j3].ordre > this.TabGener[j3 + 1].ordre) {

            ch = this.TabGener[j3]
            this.TabGener[j3] = this.TabGener[j3 + 1]
            this.TabGener[j3 + 1] = ch

          }

        }
      }


      this.idFormat = this.param.idFormat
      this.typeDoc = "CMD"

      this.generatePDF()

    });


  }






}
