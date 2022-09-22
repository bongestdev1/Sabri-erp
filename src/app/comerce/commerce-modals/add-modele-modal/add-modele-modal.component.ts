import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
//import { UserService } from '../../../services/user/user.service';
import { Router, Event } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-modele-modal',
  templateUrl: './add-modele-modal.component.html',
  styleUrls: ['./add-modele-modal.component.scss']
})
export class AddModeleModalComponent implements OnInit {

  @Input() isOpenModalAjoutModele = false

  @Input() isLoading = false

  @Input() idAjoutModeleModal
  
  @Input() params1AjoutModele

  @Input() params2AjoutModele

  classCss = "modalAjoutModele"

  @Output() closeModalAjoutModele = new EventEmitter<string>();

  constructor( private router:Router,  private http: HttpClient){ 
   
  }

  closeAjoutModele(){
    this.closeModalAjoutModele.emit();
  }
  
  ngOnInit(): void {
   
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalAjoutModele){
      this.classCss = "modalAjoutModele modalAjoutModele-open"
    }else{
      this.classCss = "modalAjoutModele"
    }
  }

}
