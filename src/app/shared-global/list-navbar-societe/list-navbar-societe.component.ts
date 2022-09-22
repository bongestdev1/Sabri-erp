import { formatDate } from '@angular/common';
import { Component, OnInit, Input, SimpleChanges , Output, EventEmitter } from '@angular/core';
import { InformationsService } from 'src/app/services/informations.service';
@Component({
  selector: 'app-list-navbar-societe',
  templateUrl: './list-navbar-societe.component.html',
  styleUrls: ['./list-navbar-societe.component.scss']
})
export class ListNavbarSocieteComponent implements OnInit {

  day1
  day2
  @Input() id
  @Input() societes = []
  
  @Output() closeModal = new EventEmitter<string>();

  newSocietes = []

  constructor(public informationsService: InformationsService) {
    this.day1 = new Date();
    this.day1 = new Date(this.day1.getFullYear() - 1, 0, 1);
    this.day1 = formatDate(new Date(this.day1), 'yyyy-MM-dd', 'en')
    this.day2 = new Date();
    this.day2.setDate(this.day2.getDate());
    this.day2 = formatDate(new Date(this.day2), 'yyyy-MM-dd', 'en')
  }

  closeModelSelected(){
    this.closeModal.emit()    
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.societes.length > 0){
      this.newSocietes = []
      for(let i = 0; i < this.societes.length; i++){
        if(this.id == "" && this.societes[i].societeParent == null){
          this.newSocietes.push(this.societes[i])    
        }else if(this.societes[i].societeParent != null){
          if(this.id == this.societes[i].societeParent){
            this.newSocietes.push(this.societes[i])    
          }
        }
      }
    }
  }

  displaySousList(event){
  
    var divList = event.target.parentElement.parentElement.children[1]
    var iList = event.target.parentElement.children
     
    if(divList.getAttribute("class").indexOf("navbar-list-societe-desactive") != -1){
      divList.setAttribute("class", "navbar-list-societe-div")
      iList[0].setAttribute("class", "fas fa-plus navbar-list-societe-i navbar-list-societe-desactive")
      iList[1].setAttribute("class", "fas fa-minus navbar-list-societe-i")
    }else{
      divList.setAttribute("class", "navbar-list-societe-div navbar-list-societe-desactive")
      iList[0].setAttribute("class", "fas fa-plus navbar-list-societe-i")
      iList[1].setAttribute("class", "fas fa-minus navbar-list-societe-i navbar-list-societe-desactive")
    }
  
  }

  clickItem(item){
    this.informationsService.setSocieteCurrent(item.id, item.raisonSociale,this.day1,this.day2)
    this.informationsService.setSocieteCurrentObject(item) 
    this.closeModelSelected()
    
  }


}
