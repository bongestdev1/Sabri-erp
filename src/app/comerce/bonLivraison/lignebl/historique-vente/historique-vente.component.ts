import { formatDate } from '@angular/common';
import { Component, Input, OnInit ,SimpleChanges} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { FctListService } from 'src/app/services/fonctionList/fct-list.service';
import { InformationsService } from 'src/app/services/informations.service';
import { HistoriqueArticleVenteService } from 'src/app/services/serviceBD_Commerce/historiqueArticleVente.service';

@Component({
  selector: 'app-historique-vente',
  templateUrl: './historique-vente.component.html',
  styleUrls: ['./historique-vente.component.scss']
})
export class HistoriqueVenteComponent implements OnInit {

  formC: FormGroup
  
  @Input() id = ""

  @Input() idClient = ""

  @Input() isOpenModalVoirHistorique = false

  @Input() typeDocument = ""

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalVoirHistorique == true){
      if (this.id.length > 1) {
        this.voirHistoriqueVente(this.id,this.idClient,this.typeDocument)
      }
    }
  }


  constructor(
    private fb: FormBuilder,
    public informationGenerale: InformationsService,
    public fonctionPartagesService: FonctionPartagesService,
    private historiqArticleVenteServ: HistoriqueArticleVenteService,
    private fctList: FctListService,) {
      
    this.formC = this.fb.group({
      reference: [''],
      designation: [''],
      date: [''],
      numero: [''],
      nomClient: [''],
      quantite: [''],
      prixVenteHT: [''],
      totalHT: [''],
      prixTTC: [''],
      limit: 10
    })
   }

  ngOnInit(): void {
  }
  
  objectKeys = Object.keys;
  items = {
    reference: "active",
    designation: "active",
    date: "active",
    numero: "active",
    nomClient: "active",
    quantite: "active",
    prixTTC: "active",
    prixVenteHT: "active",
    totalHT: "active",
  };

  itemsVariable = {
    reference: "active",
    designation: "active",
    date: "active",
    numero: "active",
    nomClient: "active",
    quantite: "active",
    prixTTC: "active",
    prixVenteHT: "active",
    totalHT: "active",
  };

  request = {
    dateStart: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    dateEnd: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    search: {
      idArticle: "",
      reference: "",
      designation: "",
      date: "",
      numero: "",
      nomClient: "",
      quantite: "",
      prixVenteHT: "",
      totalHT: "",
      prixTTC: "",
      typeDocument:""
    },
    orderBy: {
      date: -1,
    },
    societe: this.informationGenerale.idSocieteCurrent,
    limit: 10,
    page: 1,
  }

  isLoading= true
  historiques = []
  voirHistoriqueVente(idArticle: string, idClient, typeDocument) {
    this.request.search.idArticle = idArticle
    this.request.search.nomClient = idClient
    this.request.search.typeDocument = typeDocument
    this.historiqArticleVenteServ.articles(idArticle, this.request)
      .subscribe(
        res => {
          let resultat: any = res
          if (resultat.status) {
            this.historiques = resultat.resultat.docs
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

    //pour changer croissante des variables
    activationCroissante(buttons1, buttons2) {
      this.fctList.activationCroissante(buttons1, buttons2)
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
  
      this.voirHistoriqueVente(this.id,this.idClient,this.typeDocument)
    }
}
