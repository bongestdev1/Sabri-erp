import { Component, OnInit, Input, SimpleChanges , Output, EventEmitter, AfterContentChecked,  VERSION, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details-fournisseur',
  templateUrl: './details-fournisseur.component.html',
  styleUrls: ['./details-fournisseur.component.scss']
})
export class DetailsFournisseurComponent implements OnInit {
 
  constructor(){}

  ngOnInit(): void {}

  @Input() id = ""

  @Output() closeModal = new EventEmitter<string>();

  @Input() isPopup = false

  @Input() isOpenModal = false
  
  closeModalFunction(){
    this.closeModal.emit();
  }



}
