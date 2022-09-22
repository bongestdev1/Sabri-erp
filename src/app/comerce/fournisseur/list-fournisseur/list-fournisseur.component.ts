import { Component, OnInit, Input, SimpleChanges , Output, EventEmitter, AfterContentChecked,  VERSION, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-fournisseur',
  templateUrl: './list-fournisseur.component.html',
  styleUrls: ['./list-fournisseur.component.scss']
})
export class ListFournisseurComponent implements OnInit {

  constructor(){}

  ngOnInit(): void {
      console.log(this.isPopup)
  }

  @Output() closeModal = new EventEmitter<string>();

  @Input() isPopup = false

  @Input() isOpenModal = false
  
  @Output() selectionLigne = new EventEmitter<string>();
  
  @Input() modeTiere = "fournisseur"
  closeModalFunction(){
    this.closeModal.emit();
  }

  selectionLigneFunction(id){
    this.selectionLigne.emit(id)
  }

}