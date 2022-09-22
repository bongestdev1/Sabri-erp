import { Component, OnInit, Input,  SimpleChanges, VERSION, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-showelements',
  templateUrl: './showelements.component.html',
  styleUrls: ['./showelements.component.scss']
})
export class ShowelementsComponent implements OnInit {

  @Input() items
  @Input() itemsVariable

  @Input() numero = 0
  
  @Input() isAutoComplete = "non"

  isOpen = false

  stringLocalhost = "ShowsElements"

  objectKeys = Object.keys;

  constructor(private renderer: Renderer2) { 
    this.renderer.listen('window', 'click', (e: Event) => {
      if( !this.mouseInFilter && this.isOpen){
         this.isOpen = !this.isOpen
      }
    });
  }

  mouseInFilter = false

  onMouseOutFilter(e) {
    this.mouseInFilter = false;
  }

  onMouseEnterFilter(e) {
    this.mouseInFilter = true;
  }

  ngOnInit(): void {

    setTimeout( () => { 
      for(let key in this.items){
        this.stringLocalhost += key
      }
       
      if(JSON.parse(localStorage.getItem(this.stringLocalhost)) != undefined){
        var newitemsVariable = JSON.parse(localStorage.getItem(this.stringLocalhost))
        for(let key in this.itemsVariable){
          if(newitemsVariable[key] == undefined){
            delete this.itemsVariable[key]
          }
        }
      }
  
    },100)

  }

  clickButton(newkey){
      
    if(this.itemsVariable[newkey] == undefined){
      this.itemsVariable[newkey] = this.items[newkey]
    }else{
      delete this.itemsVariable[newkey]
    }

    var newItemsVariable = {}
    for(let key in this.items){
      if(this.itemsVariable[key]){
        newItemsVariable[key] = this.items[key]
      } 
    }

    for(let key in this.itemsVariable){
        delete this.itemsVariable[key]
    }

    for(let key in newItemsVariable){
        this.itemsVariable[key] = this.items[key]
    }
    
    localStorage.setItem(this.stringLocalhost, JSON.stringify(this.itemsVariable));
  }

  showList(){
    this.isOpen = !this.isOpen
  }

  ngOnChanges(changes: SimpleChanges) {
    
  }

}
