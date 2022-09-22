import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
//import { UserService } from '../../../services/user/user.service';
import { Router, Event } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-categorie-modal',
  templateUrl: './add-categorie-modal.component.html',
  styleUrls: ['./add-categorie-modal.component.scss']
})
export class AddCategorieModalComponent implements OnInit {

  @Input() isOpenModalAjoutCategorie = false

  @Input() isLoading = false

  @Input() idAjoutCategorieModal
  
  @Input() params1AjoutCategorie

  @Input() params2AjoutCategorie

  classCss = "modalAjoutCategorie"
  

  @Output() closeModalAjoutCategorie = new EventEmitter<string>();

  constructor( private router:Router,  private http: HttpClient){ 
   
  }

  closeAjoutCategorie(){
    this.closeModalAjoutCategorie.emit();
  }
  
  ngOnInit(): void {
   
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalAjoutCategorie){
      this.classCss = "modalAjoutCategorie modalAjoutCategorie-open"
    }else{
      this.classCss = "modalAjoutCategorie"
    }
  }

}