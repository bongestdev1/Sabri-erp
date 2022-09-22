import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import {formatDate} from '@angular/common';
import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modifier-bon-livraison',
  templateUrl: './modifier-bon-livraison.component.html',
  styleUrls: ['./modifier-bon-livraison.component.scss']
})
export class ModifierBonLivraisonComponent implements OnInit {
  bonLivraisonFormGroup: FormGroup;

  lienModifie = "/bonLivraisons/modifierBonLivraison/"
  lienGetById = "/bonLivraisons/getById/"
  pageList = "/bonLivraison/list"
 
  @Output() closeModalModifier = new EventEmitter<string>();
  @Input() id
  @Input() isPopup

  constructor(
    private http: HttpClient,
    public informationGenerale:InformationsService, 
    public fonctionPartagesService:FonctionPartagesService,
    private router:Router
    ) {

   
  }

  closeModalModifierEvent(){
    this.closeModalModifier.emit()
  }


  ngOnInit(): void {
    if(this.router.url.indexOf("venteComptoire") > -1){
      this.pageList = "/venteComptoire/list"
    }

  }

}
