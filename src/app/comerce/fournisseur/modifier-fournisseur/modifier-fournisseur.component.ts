import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, SimpleChanges , Output, EventEmitter, AfterContentChecked,  VERSION, Renderer2 } from '@angular/core';


@Component({
  selector: 'app-modifier-fournisseur',
  templateUrl: './modifier-fournisseur.component.html',
  styleUrls: ['./modifier-fournisseur.component.scss']
})
export class ModifierFournisseurComponent implements OnInit {
 
  constructor(){}

  ngOnInit(): void {
  }

  @Input() id = ""

  @Output() closeModal = new EventEmitter<string>();

  @Input() isPopup = false

  @Input() isOpenModal = false
  
  @Input() modeTiere = "fournisseur"
  closeModalFunction(){
    this.closeModal.emit();
  }
}
