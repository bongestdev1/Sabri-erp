import { Component, OnInit, Input, SimpleChanges , Output, EventEmitter, AfterContentChecked,  VERSION, Renderer2 } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ChangeDetectorRef } from '@angular/core';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-auto-complete-input',
  templateUrl: './auto-complete-input.component.html',
  styleUrls: ['./auto-complete-input.component.scss']
})
export class AutoCompleteInputComponent implements OnInit {

  @Input() items = {
    code: "Code",
    raisonSociale: "Raison Sociale",
  }
  
  objectKeys = Object.keys;

  constructor(
    public informationGenerale: InformationsService,
    public fonctionPartagesService: FonctionPartagesService,
    private renderer: Renderer2,
    private modalService: NgbModal,
    ) {
      this.renderer.listen('window', 'click', (e: Event) => {
        if(!this.mouseInFilter && this.isOpen) {
          setTimeout(() => {
           // this.resetValeurAutoComplete()
            this.isOpen = false
          });
        }
      });
  }

  

  mouseInFilter = false

  onMouseOutFilter(e){
    this.mouseInFilter = false;
  }

  onMouseEnterFilter(e) {
    this.mouseInFilter = true;
  }

  @Output() addElementEvent = new EventEmitter<string>();
  @Output() detailsElementEvent = new EventEmitter<string>();
  @Output() listElementEvent = new EventEmitter<string>();

  detailsElement(){
    this.detailsElementEvent.emit()
  }
   
  listElement(){
    this.listElementEvent.emit()
  }

  autocompleteValue = ""
  autocompleteValue2 = ""
  
  idAutocomplete="autocomplete"
  idAutocompleteItems = "autocomplete-items"
  idAutocompleteUpDown = "autocomplete-up-down"
  idMyInput = "myInput"
  idAutocompleteTable = "autocomplete-table"
  idItemListAutocomplete = "item-list-autocomplete"

  @Input() modeLoading = false
  
  @Input() pageDetails = null

  @Input() bordureRed = false

  @Input() modeMultiSortie = false

  @Input() shemaMultiSortie = {id:"1", name:"article1", description:"description1"}

  @Input() isLoading = false

  @Input() idHtml = "1"

  @Input() keySelected="name"

  @Input() idSelected=""


  isOpen = false

  @Input() articles = [
    {id:"1", name:"article1", description:"description1", categorie:"categorie1"},
    {id:"2", name:"article2", description:"description2", categorie:"categorie2"},
    {id:"3", name:"article3", description:"description3", categorie:"categorie3"},
    {id:"4", name:"article4", description:"description4", categorie:"categorie4"},
    {id:"5", name:"article5", description:"description5", categorie:"categorie5"},
    {id:"6", name:"article6", description:"description6", categorie:"categorie6"},
    {id:"7", name:"article7", description:"description7", categorie:"categorie7"},
    {id:"8", name:"article8", description:"description8", categorie:"categorie8"},
    {id:"9", name:"barticle1", description:"description1", categorie:"categorie1"},
    {id:"10", name:"barticle2", description:"description2", categorie:"categorie2"},
    {id:"11", name:"barticle3", description:"description3", categorie:"categorie3"},
    {id:"12", name:"barticle4", description:"description4", categorie:"categorie4"},
    {id:"13", name:"barticle5", description:"description5", categorie:"categorie5"},
    {id:"14", name:"barticle6", description:"description6", categorie:"categorie6"},
    {id:"15", name:"barticle7", description:"description7", categorie:"categorie7"},
    {id:"16", name:"barticle8", description:"description8", categorie:"categorie8"}
  ]

  addElement() {
    this.addElementEvent.emit();
  }

  id="myInput"
  articlesFilter=[]


  ngOnInit(): void {
    this.idAutocomplete += this.idHtml
    this.idAutocompleteItems += this.idHtml
    this.idAutocompleteUpDown += this.idHtml
    this.idMyInput += this.idHtml
    this.idAutocompleteTable += this.idHtml
    this.idItemListAutocomplete += this.idHtml

    this.fonctionPartagesService.getValue().subscribe((value) => {
      if(this.idAutocompleteItems != value){
          setTimeout(() => {
            //this.resetValeurAutoComplete()
            this.isOpen = false
          })
      }
    });
  }

  currentFocus = -1;

  focusoutInput(){ 
    if(!this.mouseInFilter && this.isOpen){
      setTimeout(() => {
         this.isOpen = false
         this.resetValeurAutoComplete()
      },10)
    }
  }

  resetValeurAutoComplete(){
    if(this.autocompleteValue === ""){
      this.setValeurNull()
      return
    }
    
    let article = this.articles.filter(x => x.id == this.idSelected)
   
    if(article.length > 0){
      this.autocompleteValue = article[0][this.keySelected]
      this.autocompleteValue2 = this.autocompleteValue
    }else{
      this.setValeurNull()
    }
  }

  clickSearch(){
    setTimeout( () => {
      this.isOpen = !this.isOpen
      setTimeout( () => {
        if(this.isOpen){
          this.fonctionPartagesService.setValue(this.idAutocompleteItems)
        } 
      })
    },30)
  }

  openSearch(){
    if(!this.isOpen){
      this.clickSearch()
    }
  }

  closeSearch(){
    if(this.isOpen){
      this.clickSearch()
      this.resetValeurAutoComplete()
    }
  }

  clickInList = false
  
  resetClassList(){
    var elementsItems = document.getElementsByClassName('autocomplete-items-active')
    for(let i = 0; i < elementsItems.length; i++){
      if(elementsItems[i].id != this.idAutocompleteItems){
        elementsItems[i].setAttribute("class","autocomplete-items")
      }
    }
    var elementsItems2 = document.getElementsByClassName('autocomplete-items')
  }

  clickkeydown(e){
    
    setTimeout( () => { 
        
        if(document.getElementById(this.idAutocompleteItems) == null){
          return
        }

        if(document.getElementById(this.idAutocompleteItems).getAttribute("class").indexOf("autocomplete-items-active") == -1){
          document.getElementById(this.idAutocompleteItems).classList.add("autocomplete-items-active")
          document.getElementById(this.idAutocompleteUpDown).classList.remove("fa-caret-down")
          document.getElementById(this.idAutocompleteUpDown).classList.remove("fa-caret-up")
        }

        var element:any = document.getElementById(this.idMyInput)
        this.autocompleteValue = element.value
    
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          this.currentFocus++;
          /*and and make the current item more visible:*/
          this.activeItem()
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          this.currentFocus--;
          /*and and make the current item more visible:*/
          this.activeItem()
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
             this.clickEntrer()      
        }else{
          this.filterElements()
          this.currentFocus = -1; 
        }

    }, 10 );
  
  }

  filterElements(){
    this.articlesFilter = this.articles.filter(x => this.getFilteration(x))
   
   /* if(this.modeLoading){
      this.getElementsEvent.emit(this.autocompleteValue)
    }else{
      this.articlesFilter = this.articles.filter(x => this.getFilteration(x))
    }*/
  }

  getFilteration(x):Boolean{
    for(let key in this.items){
      if (typeof x[key] === 'string' || x[key] instanceof String){
        if(x[key].toUpperCase().indexOf(this.autocompleteValue.toUpperCase()) > -1){
          return true
        }
      }
    }
    return false
  }

  setValeurNull(){
    this.currentFocus = -1;
    this.addElementEvent.emit("");
    this.autocompleteValue = ""
    this.autocompleteValue2 = this.autocompleteValue
    this.closeSearch()
  }

  clickEntrer(){
    if(document.getElementById(this.idAutocompleteItems) == null){
      return
    }

    var childrens= document.getElementById(this.idItemListAutocomplete).children
   
    if(this.autocompleteValue == ""){
      this.setValeurNull()
    }

    if(this.currentFocus > -1 && this.currentFocus < childrens.length){
      this.addElementEvent.emit(this.articlesFilter[this.currentFocus].id);
      this.setValueInput()
      this.resetList()
    }else{
      this.currentFocus = -1;
    }
  }

  clickItem(item){
    if(this.modeMultiSortie){
      var chaine = ""
      for(let key in this.shemaMultiSortie){
        chaine += " / "+this.shemaMultiSortie[key] + " : "+item[key]
      }
      chaine = chaine.replace("/","")
      this.autocompleteValue = chaine
    }else{
      this.autocompleteValue = item[this.keySelected]
    }

    this.autocompleteValue2 = this.autocompleteValue 
    this.addElementEvent.emit(item.id);
    this.resetList()
    for(let i = 0; i < this.articlesFilter.length; i++){
      if(this.articlesFilter[i].id == item.id){
        this.currentFocus = i
      }
    }
    this.activeItem()
  }

  resetList(){
    this.currentFocus = -1;
    this.articlesFilter = this.articles
  
    this.clickSearch()
  }

  setValueInput(){
    
    if(this.modeMultiSortie){
      var chaine = ""
      for(let key in this.shemaMultiSortie){
        chaine += " / "+this.shemaMultiSortie[key] + " : "+this.articlesFilter[this.currentFocus][key]
      }
      chaine = chaine.replace("/","")
      this.autocompleteValue = chaine
    }else{
      this.autocompleteValue = this.articlesFilter[this.currentFocus][this.keySelected]
    }

    this.autocompleteValue2 = this.autocompleteValue 
  }


  activeItem(){
    var childrens= document.getElementById(this.idItemListAutocomplete).children
    if(this.currentFocus > -1 && this.currentFocus < childrens.length){
       for(let i = 0; i < childrens.length; i++){
           if(i == this.currentFocus){
             this.setValueInput()
             childrens[i].setAttribute("class","item-list-autocomplete autocomplete-active");
             //childrens[i].scrollIntoView();
             var table = document.getElementById(this.idAutocompleteTable);
             var topTable = table.getBoundingClientRect().top;
             var topLine = childrens[i].getBoundingClientRect().top;
           
             table.scrollTop += (topLine - topTable)
           }else{
             childrens[i].setAttribute("class","item-list-autocomplete");
           }
       }
    }else{
      if(childrens.length > 0){
        if(this.currentFocus == -1){
          this.currentFocus = 0;
        }else{
          this.currentFocus = childrens.length-1
        }
      }
    }
  }

  getStyleItemAutoComplete(id){
    if(id == this.idSelected){
      return "item-list-autocomplete autocomplete-active"
    }else{
      return "item-list-autocomplete"
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.articlesFilter=this.articles
    var listFiltree = this.articles.filter(x => x.id == this.idSelected)

    if(this.bordureRed){
      if(document.getElementById(this.idMyInput) != null){
        document.getElementById(this.idMyInput).classList.add("border-erreur")
      }
    }else{
      if(document.getElementById(this.idMyInput) != null){
        document.getElementById(this.idMyInput).classList.remove("border-erreur")
      }
    }

    if(this.idSelected === ""){
      this.autocompleteValue = ""
      this.autocompleteValue2 = ""
    }
    
    setTimeout( () => { 
      
      if(listFiltree.length > 0){
        this.autocompleteValue = listFiltree[0][this.keySelected]
        
        for(let i = 0; i < this.articlesFilter.length; i++){
          if(this.articlesFilter[i].id == this.idSelected){
            this.currentFocus = i
          }
        }

        if(this.modeMultiSortie){
          var chaine = ""
          for(let key in this.shemaMultiSortie){
            chaine += " / "+this.shemaMultiSortie[key] + " : "+listFiltree[0][key]
          }
          chaine = chaine.replace("/","")
          this.autocompleteValue = chaine
        }else{
          this.autocompleteValue = listFiltree[0][this.keySelected]
        }
      }else{
        this.autocompleteValue = ""
        this.currentFocus = -1;
        if(document.getElementById(this.idItemListAutocomplete) != null){
          var childrens= document.getElementById(this.idItemListAutocomplete).children
          for(let i = 0; i < childrens.length; i++){
              childrens[i].setAttribute("class","item-list-autocomplete");
          }
        }
      }

      this.autocompleteValue2 = this.autocompleteValue
    })
  }

  checkLastElment(key, items){
    var pos = 0
    var isValid = false
    for(let key2 in items){
       if(key !== key2 && !isValid){
         pos++ 
       }else if(key === key2){
         isValid = true
       }
    }

    if(pos === this.objectKeys(items).length-1)
    return false
    
    return true 
  }

}

