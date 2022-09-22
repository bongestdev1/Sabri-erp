import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { InformationsService } from 'src/app/services/informations.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { UtiliteService } from 'src/app/services/utilite.service';
import { Paramliv } from 'src/app/services/serviceBD_Commerce/paramliv.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Bonlivraison } from 'src/app/services/serviceBD_Commerce/Bonlivraison.service';


import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

import { paramliv } from 'src/app/model/modelCommerce/paramliv';
import { ParampdfService } from 'src/app/services/serviceBD_Commerce/parampdf.service';

import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { TokenStorageService } from './authentication/token-storage.service';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class GenerationPdfFactureService {
  getId: any;

  //open popup impression

  classCss = "modalAjoutElement"
  lienGetById = "/societes/getById/"

  modeTier = "Client"

  isLoading = false

  openPopup(idDocument, titreDocument) {
    this.idDocument = idDocument
    this.typeDoc = titreDocument

    if (!this.fonctionPartagesService.checkDocumentIsVente(titreDocument)) {
      this.modeTier = "Fournisseur"
    }

    this.classCss = "modalAjoutElement modalAjoutElement-open"
  }

  imprimerPdf() {
    this.generatePdf()
  }

  closePopup() {
    this.classCss = "modalAjoutElement"
  }

  setFormat(format = "A4") {
    this.idFormat = format
  }

  typeOrgannisation = 0

  setTypeOrgannisation(typeOrgannisation = 0) {
    this.typeOrgannisation = typeOrgannisation
  }

  //close popup impression

  title = 'appBootstrap';
  formC: FormGroup
  helloObject = "hello test";
  currentId = "";
  currentTr = "";
  Tr;
  objectKeys = Object.keys;

  request = {
    search: {
      idFormat: "",
      typeDoc: "",
    },
    orderBy: {
      idFormat: 0,
      typeDoc: 0,
    },
    limit: 1000,
    page: 1,
  }

  closeResult: string;

  constructor(
    private bonlivraison: Bonlivraison,
    private router: Router,
    private utilite: UtiliteService,
    private fonctionPartagesService: FonctionPartagesService,
    private fb: FormBuilder,
    private paramlivraison: Paramliv,
    // private ParamHeader: ParampdfService,
    public informationGenerale: InformationsService,
    private modalService: NgbModal,
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {
    this.getId = "62dfe0d858cdfe1514520866"
  }

  idDocument = ""
  urlGetByID = ""


  async getSociete() {
    if (this.isLoading) {
      return
    }

    this.tabTVA = [];
    this.TabGener = [];
    this.client = [];
    this.parampdf = [];
    this.lignesBonLivraison = {}
    this.i1 = 0;
    this.i2 = 0;

    this.isLoading = true

    var id = this.informationGenerale.idSocieteCurrent
    return new Promise(resolve => {
      this.http.get(this.informationGenerale.baseUrl + this.lienGetById + id, this.tokenStorageService.getHeader()).subscribe(
        res => {
          this.isLoading = false

          let response: any = res
          if (response.status) {
            //this.reseteFormulaire()
            this.parampdf = response.resultat

            console.log("parampdf", this.parampdf)

            resolve(null)
    

          }

        }, err => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        }
      );
    })

  }

  param = new paramliv()
  idFormat = "A4"
  typeDoc = ""

  parametre: any = [];

  ngOnInit(): void {

  }

  paramliv = []
  async getPramliv() {
    if (this.isLoading) {
      return
    }

    this.isLoading = true

    this.request.search.idFormat = this.idFormat
    this.request.search.typeDoc = this.typeDoc

    return new Promise(resolve => {

      this.paramlivraison.getAll(this.request)
        .subscribe(
          res => {
            this.isLoading = false
            let resultat: any = res
            if (resultat.status) {
              this.paramliv = resultat.resultat.docs
              resolve(null)
            }
          },
          error => {
            this.isLoading = false
            alert("Désole, ilya un problème de connexion internet")
          });
    })


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
  client: any = [];
  parampdf: any = [];
  lignesBonLivraison: any = {}
  i1 = 0;
  i2 = 0;

  getTransporteurNom() {
    if (this.transporteur && this.transporteur.nom) {
      return this.transporteur.nom
    }
    return ""
  }

  getTransporteurVehicule() {
    if (this.transporteur && this.transporteur.numVehicule) {
      return this.transporteur.numVehicule
    }
    return ""
  }

  getUrl() {

    switch (this.typeDoc) {
      case this.fonctionPartagesService.titreDocuments.bonLivraison:
        return "/bonLivraisons/getByIdImpression/"
        break;
      case this.fonctionPartagesService.titreDocuments.factureVente:
        return "/factureVentes/getByIdImpression/"
        break;
      case this.fonctionPartagesService.titreDocuments.commande:
        return "/commandes/getByIdImpression/"
        break;
      case this.fonctionPartagesService.titreDocuments.devis:
        return "/devis/getByIdImpression/"
        break;
      case this.fonctionPartagesService.titreDocuments.bonRetourClient:
        return "/bonRetourClients/getByIdImpression/"
        break;
      case this.fonctionPartagesService.titreDocuments.factureAchat:
        return "/factureAchats/getByIdImpression/"
        break;
      case this.fonctionPartagesService.titreDocuments.devisAchat:
        return "/devisAchats/getByIdImpression/"
        break;
      case this.fonctionPartagesService.titreDocuments.bonCommande:
        return "/bonCommandes/getByIdImpression/"
        break;
      case this.fonctionPartagesService.titreDocuments.bonReception:
        return "/bonReceptions/getByIdImpression/"
        break;
      case this.fonctionPartagesService.titreDocuments.bonRetourFournisseur:
        return "/bonRetourFournisseurs/getByIdImpression/"
        break;
      case this.fonctionPartagesService.titreDocuments.demandeOffrePrix:
        return "/demandeOffrePrix/getByIdImpression/"
        break;
    }

    return false
  }

  transporteur = null
  async generatePDF3() {

    if (this.isLoading) {
      return
    }

    var url = this.getUrl()

    if (!url) {
      alert("this type not found !!")
      return
    }

    this.isLoading = true
    return new Promise(resolve => {
      this.bonlivraison.GetDocument(this.idDocument, url).subscribe(res => {
        this.isLoading = false
        var resultat: any = res
        if (this.typeDoc != this.fonctionPartagesService.titreDocuments.factureVente && this.typeDoc != this.fonctionPartagesService.titreDocuments.factureAchat) {
          this.factureNormale(res)
        } else if (this.typeDoc != this.fonctionPartagesService.titreDocuments.factureVente) {
          this.basculerSelonTypeOrganisation(res)
        } else if (this.typeDoc != this.fonctionPartagesService.titreDocuments.factureAchat) {
          this.basculerSelonTypeOrganisation(res)
        }
        resolve(null)
      });

    })


  }

  genererColonnes() {
    for (let i4 = 0; i4 < this.paramliv.length; i4++) {
      if (this.paramliv[i4].visibilite === "oui" && this.paramliv[i4].typeDoc === this.typeDoc && this.idFormat === this.paramliv[i4].idFormat) {
        this.TabGener.push({ champ: this.paramliv[i4].champ, libelle: this.paramliv[i4].libelle, width: this.paramliv[i4].width, ordre: this.paramliv[i4].ordre, alignm: this.paramliv[i4].alignement })
      }
    }

    var ch
    for (let j4 = 0; j4 < this.TabGener.length - 1; j4++) {
      for (let j3 = 0; j3 < this.TabGener.length - 1 - j4; j3++) {
        if (this.TabGener[j3].ordre > this.TabGener[j3 + 1].ordre) {

          ch = this.TabGener[j3]
          this.TabGener[j3] = this.TabGener[j3 + 1]
          this.TabGener[j3 + 1] = ch

        }

      }
    }
  }

  genererTableTVA2(res) {
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
  }

  genererTableTva(lignesBonLivraison) {
    for (let i = 0; i < lignesBonLivraison.length; i++) {
      var isExiste = false
      lignesBonLivraison[i].prixTTC = lignesBonLivraison[i].prixTTC.toFixed(3)
      for (let j = 0; j < this.tabTVA.length; j++) {
        if (lignesBonLivraison[i].tauxTVA === this.tabTVA[j].tauxTVA) {
          isExiste = true
          this.tabTVA[j].montantTVA += lignesBonLivraison[i].tauxTVA / 100 * lignesBonLivraison[i].totalHT
          this.tabTVA[j].totalHT += lignesBonLivraison[i].totalHT

        }
      }

      if (!isExiste) {
        this.tabTVA.push({ tauxTVA: lignesBonLivraison[i].tauxTVA, montantTVA: lignesBonLivraison[i].tauxTVA / 100 * lignesBonLivraison[i].totalHT, totalHT: lignesBonLivraison[i].totalHT })
      }

      for (let key in lignesBonLivraison[i]) {
        if (this.fonctionPartagesService.colonnesQuantites.includes(key)) {
          lignesBonLivraison[i][key] = this.fonctionPartagesService.getFormaThreeAfterVerguleQuantite(lignesBonLivraison[i][key])
        } else if (this.fonctionPartagesService.colonnesPrix.includes(key)) {
          lignesBonLivraison[i][key] = this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(lignesBonLivraison[i][key])
        } else if (key === "unite1" && lignesBonLivraison[i][key]) {
          lignesBonLivraison[i][key] = lignesBonLivraison[i][key].libelle
        }
      }

    }

    return lignesBonLivraison
  }

  basculerSelonTypeOrganisation(res) {
    console.log(this.typeOrgannisation)

    switch (this.typeOrgannisation) {
      case 0:
        this.factureMultipleNormale(res)
        break

      case 2:
        this.factureMultipleAvecAddition(res)
        break

      case 1:
        this.factureMultipleSansAddition(res)
        break
    }
  }

  bonLivraisons = []
  facture: any = {}

  factureNormale(res) {

    this.facture = res.resultat

    if (res.resultat.client)
      this.client = res.resultat.client

    if (res.resultat.fournisseur)
      this.client = res.resultat.fournisseur

    if (res.resultat.transporteur) {
      this.transporteur = res.resultat.transporteur
    }
    this.lignesBonLivraison = res.articles

    this.lignesBonLivraison = this.genererTableTva(this.lignesBonLivraison)

    this.genererTableTVA2(res)

    this.genererColonnes()

    this.tabLignes = []
    var ligne = []

    this.TabGener.forEach(element => {
      ligne.push({ text: element.libelle, fontSize: 9, alignment: 'center', bold: 'true', })
    });
    this.tabLignes.push(ligne)

    for (let itemLigne of this.lignesBonLivraison) {
      ligne = []
      this.TabGener.forEach(element => {
        if (this.fonctionPartagesService.colonnesPrix.includes(element.champ)) {
          ligne.push({ text: this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(itemLigne[element.champ]), fontSize: 9, alignment: 'right', })
        } else if (this.fonctionPartagesService.colonnesQuantites.includes(element.champ)) {
          ligne.push({ text: this.fonctionPartagesService.getFormaThreeAfterVerguleQuantite(itemLigne[element.champ]), fontSize: 9, alignment: 'right', })
        } else if (this.fonctionPartagesService.colonnesTaux.includes(element.champ)) {
          ligne.push({ text: itemLigne[element.champ].toFixed(2), fontSize: 9, alignment: 'right', })
        } else {
          ligne.push({ text: itemLigne[element.champ], fontSize: 9, alignment: '' + element.alignement, })
        }
      });
      this.tabLignes.push(ligne)
    }

  }

  factureMultipleNormale(res) {
    this.facture = res.resultat

    if (res.resultat.client)
      this.client = res.resultat.client

    if (res.resultat.fournisseur)
      this.client = res.resultat.fournisseur

    this.bonLivraisons = res.bonLivraisons
    console.log(this.bonLivraisons)
    for (let i = 0; i < this.bonLivraisons.length; i++) {
      this.bonLivraisons[i].lignesBonLivraison = this.genererTableTva(this.bonLivraisons[i].lignesBonLivraison)
    }

    this.genererTableTVA2(res)

    this.genererColonnes()

    this.tabLignes = []
    var ligne = []

    for (let itemBon of this.bonLivraisons) {

      ligne = []
      for (let i = 0; i < this.TabGener.length; i++) {
        if (i === 0) {
          ligne.push({ text: itemBon.bonLivraison.numero, colSpan: this.TabGener.length, alignment: 'center', bold: 'true', })
        } else {
          ligne.push({})
        }
      }
      this.tabLignes.push(ligne)

      ligne = []
      this.TabGener.forEach(element => {
        ligne.push({ text: element.libelle, fontSize: 9, alignment: 'center', bold: 'true', })
      });
      this.tabLignes.push(ligne)

      for (let itemLigne of itemBon.lignesBonLivraison) {
        ligne = []
        this.TabGener.forEach(element => {
          if (this.fonctionPartagesService.colonnesPrix.includes(element.champ)) {
            ligne.push({ text: this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(itemLigne[element.champ]), fontSize: 9, alignment: 'right', })
          } else if (this.fonctionPartagesService.colonnesQuantites.includes(element.champ)) {
            ligne.push({ text: this.fonctionPartagesService.getFormaThreeAfterVerguleQuantite(itemLigne[element.champ]), fontSize: 9, alignment: 'right', })
          } else if (this.fonctionPartagesService.colonnesTaux.includes(element.champ)) {
            ligne.push({ text: itemLigne[element.champ].toFixed(2), fontSize: 9, alignment: 'right', })
          } else {
            ligne.push({ text: itemLigne[element.champ], fontSize: 9, alignment: '' + element.alignement, })
          }
        });
        this.tabLignes.push(ligne)
      }

      ligne = []
      for (let i = 0; i < this.TabGener.length; i++) {
        if (i === 0) {
          ligne.push({ text: "totalTTC : " + this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(itemBon.bonLivraison.totalTTC), colSpan: this.TabGener.length, alignment: 'right', bold: 'true', fontSize: 9 })
        } else {
          ligne.push({})
        }
      }
      this.tabLignes.push(ligne)
    }

  }

  tabLignes = []

  factureMultipleAvecAddition(res) {
    this.facture = res.resultat

    if (res.resultat.client)
      this.client = res.resultat.client

    if (res.resultat.fournisseur)
      this.client = res.resultat.fournisseur

    this.bonLivraisons = res.bonLivraisons
    console.log(this.bonLivraisons)
    for (let i = 0; i < this.bonLivraisons.length; i++) {
      this.bonLivraisons[i].lignesBonLivraison = this.genererTableTva(this.bonLivraisons[i].lignesBonLivraison)
    }

    this.genererTableTVA2(res)

    this.genererColonnes()

    this.tabLignes = []
    var ligne = []

    var newLigneBonLivraisons = []

    for (let itemBon of this.bonLivraisons) {

      for (let itemLigne of itemBon.lignesBonLivraison) {
        var pos = -1
        var j = 0

        while (pos === -1 && j < newLigneBonLivraisons.length) {

          console.log(pos)

          if (itemLigne.article && itemLigne.article._id === newLigneBonLivraisons[j].article._id) {
            pos = j
          }
          j++
        }

        if (pos === -1) {
          for (let key in itemLigne) {
            if (this.fonctionPartagesService.colonnesQuantites.includes(key) || this.fonctionPartagesService.colonnesQuantites.includes(key)) {
              itemLigne[key] = Number(itemLigne[key])
            }
          }
          newLigneBonLivraisons.push(itemLigne)
        } else {
          if (itemLigne.quantiteVente) {
            newLigneBonLivraisons[pos].quantiteVente += Number(itemLigne.quantiteVente)
          } else {
            newLigneBonLivraisons[pos].quantiteAchat += Number(itemLigne.quantiteAchat)
          }
        }
      }

    }

    ligne = []
    this.TabGener.forEach(element => {
      ligne.push({ text: element.libelle, fontSize: 9, alignment: 'center', bold: 'true', })
    });
    this.tabLignes.push(ligne)

    for (let itemLigne of newLigneBonLivraisons) {
      ligne = []
      this.TabGener.forEach(element => {
        if (this.fonctionPartagesService.colonnesPrix.includes(element.champ)) {
          ligne.push({ text: this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(itemLigne[element.champ]), fontSize: 9, alignment: 'right', })
        } else if (this.fonctionPartagesService.colonnesQuantites.includes(element.champ)) {
          ligne.push({ text: this.fonctionPartagesService.getFormaThreeAfterVerguleQuantite(itemLigne[element.champ]), fontSize: 9, alignment: 'right', })
        } else if (this.fonctionPartagesService.colonnesTaux.includes(element.champ)) {
          ligne.push({ text: itemLigne[element.champ].toFixed(2), fontSize: 9, alignment: 'right', })
        } else {
          ligne.push({ text: itemLigne[element.champ], fontSize: 9, alignment: '' + element.alignement, })
        }
      });
      this.tabLignes.push(ligne)
    }

  }

  factureMultipleSansAddition(res) {
    this.facture = res.resultat

    if (res.resultat.client)
      this.client = res.resultat.client

    if (res.resultat.fournisseur)
      this.client = res.resultat.fournisseur

    this.bonLivraisons = res.bonLivraisons
    console.log(this.bonLivraisons)
    for (let i = 0; i < this.bonLivraisons.length; i++) {
      this.bonLivraisons[i].lignesBonLivraison = this.genererTableTva(this.bonLivraisons[i].lignesBonLivraison)
    }

    this.genererTableTVA2(res)

    this.genererColonnes()

    this.tabLignes = []
    var ligne = []

    ligne = []
    this.TabGener.forEach(element => {
      ligne.push({ text: element.libelle, fontSize: 9, alignment: 'center', bold: 'true', })
    });
    this.tabLignes.push(ligne)

    for (let itemBon of this.bonLivraisons) {

      for (let itemLigne of itemBon.lignesBonLivraison) {
        ligne = []
        this.TabGener.forEach(element => {
          if (this.fonctionPartagesService.colonnesPrix.includes(element.champ)) {
            ligne.push({ text: this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(itemLigne[element.champ]), fontSize: 9, alignment: 'right', })
          } else if (this.fonctionPartagesService.colonnesQuantites.includes(element.champ)) {
            ligne.push({ text: this.fonctionPartagesService.getFormaThreeAfterVerguleQuantite(itemLigne[element.champ]), fontSize: 9, alignment: 'right', })
          } else if (this.fonctionPartagesService.colonnesTaux.includes(element.champ)) {
            ligne.push({ text: itemLigne[element.champ].toFixed(2), fontSize: 9, alignment: 'right', })
          } else {
            ligne.push({ text: itemLigne[element.champ], fontSize: 9, alignment: '' + element.alignement, })
          }
        });
        this.tabLignes.push(ligne)
      }

    }


  }

  async generatePdf(action = 'open') {

    await this.getSociete()

    await this.getPramliv()

    await this.generatePDF3()

    let docDefinition = {

      pageSize: this.idFormat,
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
              image: this.parampdf.imagePath.length > 2 ? await this.getBase64ImageFromURL(this.informationGenerale.baseUrl + this.parampdf.imagePath) : this.parampdf.imagePath,
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

                  { text: this.parampdf.raisonSociale + ':' + '\t' + this.parampdf.adresse, alignment: 'center', fontSize: 8, margin: [-100, 0, -20, 0] },
                  { text: 'Tel:' + this.parampdf.telephones + '\t\t' + 'Fix:' + this.parampdf.mobiles + '\t\t' + 'Fix:' + this.parampdf.fax + '\t\t' + 'Email:' + this.parampdf.email, alignment: 'center', fontSize: 8, margin: [-200, 0, -100, 0] },
                  { text: 'Matricule Fiscale:' + this.parampdf.matriculeFiscale + '\t' + '/' + '\t' + 'RIB:' + this.parampdf.rib, alignment: 'center', fontSize: 8, margin: [-200, 0, -100, 0] }],


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
                        text: this.typeDoc,
                        style: 'sectionHeader',

                      },
                      {
                        text: this.fonctionPartagesService.getDateFormatStandart(this.facture.date),
                        style: 'sectionHeader',

                      },
                      {
                        text: 'Numéro :' + ' ' + this.facture.numero,

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
                margin: [0, -45, -39, 10],

                table: {

                  widths: ['*', 10, 10],
                  body: [
                    [
                      [{
                        text: this.modeTier + ' :' + ' ' + this.client.code + '\n\n',
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
          columns: [
            [
              [
                {
                  text: this.transporteur ? "Transporteur:" + this.getTransporteurNom() + " Vehicule: " + this.getTransporteurVehicule() + " ." : "",
                  fontSize: 9,
                }

              ],
              [

              ]
            ],
            [

            ]
          ],
          margin: [0, 0, 0, 10],

        },


        {

          table: {

            headerRows: 1,
            widths: [

              ...this.TabGener.map(p => (p.width + '%'
              )),

            ],

            body: this.tabLignes
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
                      { text: this.fonctionPartagesService.getFormaTwoAfterVerguleTaux(p.tauxTVA) + '%', alignment: 'right', fontSize: 9 },
                      { text: p.montantTVA.toFixed(3), alignment: 'right', fontSize: 9 }])),
                    [{ text: 'Total TVA', colSpan: 3, alignment: 'left', fontSize: 9 }, {}, {}, { text: this.tabTVA.reduce((sum, p) => sum + (p.montantTVA), 0).toFixed(3), alignment: 'right' }],


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
                    { text: this.facture.totalFodec.toFixed(3), alignment: 'right', fontSize: 9 },
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
                    { text: this.facture.totalHT.toFixed(3), alignment: 'right', fontSize: 9, },
                  ],
                  [
                    { text: 'Montant T.V.A', fontSize: 8 },
                    { text: this.facture.totalTVA.toFixed(3), alignment: 'right', fontSize: 9 },
                  ],
                  [
                    { text: 'Timbre Fiscale', fontSize: 8 },
                    { text: this.facture.timbreFiscale.toFixed(3), alignment: 'right', fontSize: 9 },
                  ],
                  [
                    { text: 'TOTAL', fontSize: 8 },
                    { text: this.facture.montantTotal.toFixed(3), alignment: 'right', fontSize: 12 },
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
          margin: [0, 2, 0, 5]
        }
      }
    };

    if (action === 'download') {
      pdfMake.createPdf(docDefinition).download();
    } else if (action === 'print') {
      pdfMake.createPdf(docDefinition).print();
    } else {
      pdfMake.createPdf(docDefinition).open();
    }

  }


  async generatePdfDemandeOffrePrix(demandeOffrePrix) {

    this.typeDoc = this.fonctionPartagesService.titreDocuments.demandeOffrePrix
    this.idDocument = demandeOffrePrix.id

    await this.getSociete()

    await this.getPramliv()

    await this.generatePDF3()

    let docDefinition = {

      pageSize: this.idFormat,
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
              image: this.parampdf.imagePath.length > 2 ? await this.getBase64ImageFromURL(this.informationGenerale.baseUrl + this.parampdf.imagePath) : this.parampdf.imagePath,
              alignment: 'left',
              height: 60,
              width: 100,
              margin: [0, 5, 0, 0],
            }
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

                  { text: this.parampdf.raisonSociale + ':' + '\t' + this.parampdf.adresse, alignment: 'center', fontSize: 8, margin: [-100, 0, -20, 0] },
                  { text: 'Tel:' + this.parampdf.telephones + '\t\t' + 'Fix:' + this.parampdf.mobiles + '\t\t' + 'Fix:' + this.parampdf.fax + '\t\t' + 'Email:' + this.parampdf.email, alignment: 'center', fontSize: 8, margin: [-200, 0, -100, 0] },
                  { text: 'Matricule Fiscale:' + this.parampdf.matriculeFiscale + '\t' + '/' + '\t' + 'RIB:' + this.parampdf.rib, alignment: 'center', fontSize: 8, margin: [-200, 0, -100, 0] }],


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
                        text: this.typeDoc,
                        style: 'sectionHeader',

                      },
                      {
                        text: this.fonctionPartagesService.getDateFormatStandart(this.facture.date),
                        style: 'sectionHeader',

                      },
                      {
                        text: 'Numéro :' + ' ' + this.facture.numero,

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


            ]
          ]
        },

        {
          columns: [
            [
              [
                {
                  text: this.transporteur ? "Transporteur:" + this.getTransporteurNom() + " Vehicule: " + this.getTransporteurVehicule() + " ." : "",
                  fontSize: 9,
                }

              ],
              [

              ]
            ],
            [

            ]
          ],
          margin: [0, 0, 0, 10],

        },


        {

          table: {

            headerRows: 1,
            widths: [

              ...this.TabGener.map(p => (p.width + '%'
              )),

            ],

            body: this.tabLignes
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


            ],

            [

            ],


            [
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
          margin: [0, 2, 0, 5]
        }
      }
    };

    return new Promise(resolve => {
      const pdfDocGenerator = pdfMake.createPdf(docDefinition);
      pdfDocGenerator.getBlob((data) => {
        resolve(data);
      });
    })
   
  }

}
