import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajout-bon-livraison',
  templateUrl: './ajout-bon-livraison.component.html',
  styleUrls: ['./ajout-bon-livraison.component.scss']
})
export class AjoutBonLivraisonComponent implements OnInit {
  public isCollapsed: boolean;
  public multiCollapsed1: boolean;
  public multiCollapsed2: boolean;

  bonLivraisonFormGroup: FormGroup;

  lienAjoute = "/bonLivraisons/newBonLivraison"

  apiList = "/bonLivraisons/listBonLivraisons"

  apiParametres = "/bonlivraisons/getAllParametres"

  lienModifie = "/bonLivraisons/modifierBonLivraison/"

  lienGetById = "/bonLivraisons/getById/"

  pageList = "/bonLivraison/list"

  titreDocument = this.fonctionPartagesService.titreDocuments.bonLivraison

  titreDocumentTransfert = this.fonctionPartagesService.titreDocuments.bonLivraison

  modeTiere = this.fonctionPartagesService.modeTiere.client

  titreCrud = this.fonctionPartagesService.titreCrud.ajouter

  @Output() closeModal = new EventEmitter<string>();

  @Input() isPopup = false

  @Input() id = "";

  @Input() isOpenModalAjoutElement = false;

  titreDocumentPrecedent = this.fonctionPartagesService.titreDocuments.commande

  lienGetByIdDocumentPrecedent = "/commandes/getById/"

  lienGetDocuments = "/bonLivraisons/getCommandes/"

  constructor(
    public informationGenerale: InformationsService,
    public fonctionPartagesService: FonctionPartagesService,
    private router: Router
  ) {

    if(this.router.url.indexOf("venteComptoire") > -1){
       this.pageList = "/venteComptoire/list"
    }
 
  }

  ngOnInit(): void {


  }

}

