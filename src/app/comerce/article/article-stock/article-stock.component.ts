import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Alert } from 'selenium-webdriver';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';

@Component({
  selector: 'app-article-stock',
  templateUrl: './article-stock.component.html',
  styleUrls: ['./article-stock.component.scss']
})
export class ArticleStockComponent implements OnInit {

  @Input() article:any = {}

  tabStock = []
 
  objectKeys = Object.keys;
  
  items = { 
    reference:"Reference",
    variantes:"Variantes",
    lot:"Lot/Numero_Serie",
    unite:"Unité",
    qteEnStock:"Qte_En_Stock",
    impactPrix:"Impact_Prix",
    impactPoids:"Impact_Poids",
  };

  itemsVariable = {
    reference:"Reference",
    variantes:"Variantes",
    lot:"Lot/Numero_Serie",
    unite:"Unité",
    qteEnStock:"Qte_En_Stock",
    impactPrix:"Impact_Prix",
    impactPoids:"Impact_Poids",
  };
  
  
  tabEmpty = []
  inisialiserEmptyTab(){
    this.inisialiserTabStock()
    this.tabEmpty = []
    if(this.article.stocks){
      for(let i = 0; i < (6 - this.article.stocks.length); i++){
        this.tabEmpty.push({})
      }
    }else{
      for(let i = 0; i < 6; i++){
        this.tabEmpty.push({})
      }
    }

    return true
  }

  inisialiserTabStock(){
    this.tabStock = []
    for(let i = 0; i < this.article.stocks.length; i++){
      var sousProduits = this.article.sousProduits.filter(x => x.id == this.article.stocks[i].sousProduit)
      
      if(sousProduits.length == 0){
        sousProduits = [{ reference: "", variantes:[], impactPrix:0, impactPoids:0}]
      }

      var item = {
        sousProduit:this.article.stocks[i].sousProduit,
        qteEnStock:this.article.stocks[i].qteEnStock,
        qteTheorique:this.article.stocks[i].qteTheorique,
        lot:this.article.stocks[i].lot,
        isSerie:this.article.stocks[i].isSerie,
        reference:this.article.reference+" - "+sousProduits[0].reference,
        variantes:sousProduits[0].variantes,
        impactPrix:sousProduits[0].impactPrix,
        impactPoids:sousProduits[0].impactPoids,
      }
      this.tabStock.push(item)
    }
  }

  constructor(
    private modalService: NgbModal,
    private http: HttpClient, 
    public informationGenerale: InformationsService,
    public fonctionPartagesService:FonctionPartagesService) {

  }

  ngOnInit(): void {

  }
   
}
