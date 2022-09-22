import { Fournisseur } from './../../../model/modelComerce/fournisseur/fournisseur';
import { Component, OnInit, Input, SimpleChanges} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InformationsService } from '../../../services/informations.service';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { Output, EventEmitter } from '@angular/core';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-ajouter-fournisseur',
  templateUrl: './ajouter-fournisseur.component.html',
  styleUrls: ['./ajouter-fournisseur.component.scss']
})
export class AjouterFournisseurComponent implements OnInit {

  lienAjoute = "/fournisseurs/newFournisseur"

  @Output() closeModalAjoutFournisseur = new EventEmitter<string>();

  @Input() isPopup = false

  @Input() isOpenModalAjoutFournisseur = false
  @Input() modeTiere = this.fonctionPartagesService.modeTiere.fournisseur
  closeAjoutClient(){
    this.closeModalAjoutFournisseur.emit();
  }

  constructor(private fonctionPartagesService:FonctionPartagesService){} 

  ngOnInit(): void {
  }

 
  //end modal ajout Element

}

