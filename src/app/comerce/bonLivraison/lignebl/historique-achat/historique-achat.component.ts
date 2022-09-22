import { formatDate } from '@angular/common';
import { Component, Input, OnInit ,SimpleChanges} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { FctListService } from 'src/app/services/fonctionList/fct-list.service';
import { InformationsService } from 'src/app/services/informations.service';
import { HistoriqueArticleAchatService } from 'src/app/services/serviceBD_Commerce/historiqueArticleAchat.service';

@Component({
  selector: 'app-historique-achat',
  templateUrl: './historique-achat.component.html',
  styleUrls: ['./historique-achat.component.scss']
})
export class HistoriqueAchatComponent implements OnInit {

  formC: FormGroup
  
  @Input() id = ""

  @Input() idFour = ""

  @Input() isOpenModalVoirHistorique = false

  @Input() typeDocument = ""
  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalVoirHistorique == true){
      if (this.id.length > 1) {
        this.voirHistoriqueAchat(this.id,this.idFour,this.typeDocument)
      }
    }
  }


  constructor(
    private fb: FormBuilder,
    public informationGenerale: InformationsService,
    public fonctionPartagesService: FonctionPartagesService,
    private historiqArticleAchatServ: HistoriqueArticleAchatService,
    private fctList: FctListService,) {
      
    this.formC = this.fb.group({
      reference: [''],
      designation: [''],
      date: [''],
      numero: [''],
      nomFournisseur: [''],
      quantite: [''],
      prixVenteHT: [''],
      totalTTC: [''],
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
    nomFournisseur: "active",
    quantite: "active",
    prixVenteHT: "active",
    totalTTC: "active",
  };

  itemsVariable = {
    reference: "active",
    designation: "active",
    date: "active",
    numero: "active",
    nomFournisseur: "active",
    quantite: "active",
    prixVenteHT: "active",
    totalTTC: "active",
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
      nomFournisseur: "",
      quantite: "",
      prixVenteHT: "",
      totalTTC: "",
      typeDocument:""
    },
    orderBy: {
      date: 1
    },
    societe: this.informationGenerale.idSocieteCurrent,
    limit: 10,
    page: 1,
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

    this.voirHistoriqueAchat(this.id,this.idFour,this.typeDocument)
  }

  isLoading= true
  historiques = []
  voirHistoriqueAchat(idArticle: string,idFour, typeDocument) {
    this.request.search.idArticle = idArticle
    this.request.search.nomFournisseur = idFour
    this.request.search.typeDocument = typeDocument
    this.historiqArticleAchatServ.articles(idArticle, this.request)
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
}
