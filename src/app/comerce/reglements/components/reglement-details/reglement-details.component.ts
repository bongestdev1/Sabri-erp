import { Component, OnInit ,  Input, SimpleChanges } from '@angular/core';
import {formatDate} from '@angular/common';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reglement-details',
  templateUrl: './reglement-details.component.html',
  styleUrls: ['./reglement-details.component.scss']
})
export class ReglementDetailsComponent implements OnInit {

  objectKeys = Object.keys;
  @Input() reglement:any
  @Input() isLoading:any
  @Input() parametres:any
  @Input() parametres2:any
  
  constructor(
    public fonctionPartagesService:FonctionPartagesService,
    private route: ActivatedRoute ) { }

  ngOnInit(): void {
  }

  getDate(date){
    if(date != null){
      return formatDate(new Date(date), 'dd/MM/yyyy', 'en')
    }else{
      return ""
    }
  }

  getClientRaisonSociale(id){
    let client = this.parametres.allClients.filter(x => x.id == id)
    if(client.length > 0){
      return client[0].raisonSociale
    }
 }

 getModeReglementLibelle(id){
  let modeReglement = this.parametres.allModeReglements.filter(x => x.id == id)
  if(modeReglement.length > 0){
    return modeReglement[0].libelle
  }
 }

  itemsVariableG = {
    numero:"Numéro",
    date:"Date",
    montantTotal:"Montant total",
    montantPaye:"Montant paye",
    restPayer:"Reste à payer",
    montantAPayer:"Montant à payer",
    isPayee:"payee"
  }

}
