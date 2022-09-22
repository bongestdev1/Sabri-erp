import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-details-bon-livraison',
  templateUrl: './details-bon-livraison.component.html',
  styleUrls: ['./details-bon-livraison.component.scss']
})
export class DetailsBonLivraisonComponent implements OnInit {
  apiParametres = "/bonlivraisons/getAllParametres"

  lienGetById = "/bonLivraisons/getById/"

  titreDocument = this.fonctionPartagesService.titreDocuments.bonLivraison
  
  titreDocumentTransfert = this.fonctionPartagesService.titreDocuments.bonLivraison

  modeTiere = this.fonctionPartagesService.modeTiere.client

  titreCrud = this.fonctionPartagesService.titreCrud.modifier
  
  pageList="/bonLivraison/list"

  objectKeys = Object.keys;

  constructor(private http: HttpClient,
    public informationGenerale: InformationsService,
    private route: ActivatedRoute,
    public fonctionPartagesService: FonctionPartagesService) {
    
  }

  
  isLoading = false


  ngOnInit(): void {
    
  }
}
