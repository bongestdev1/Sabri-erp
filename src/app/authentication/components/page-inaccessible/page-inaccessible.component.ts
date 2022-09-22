import { Component, OnInit } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

@Component({
  selector: 'app-page-inaccessible',
  templateUrl: './page-inaccessible.component.html',
  styleUrls: ['./page-inaccessible.component.scss']
})
export class PageInaccessibleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.getElementsByTagName('html')[0].setAttribute("style","background-color:white;")
    document.getElementsByTagName('body')[0].setAttribute("style","")
 
    var clientHeight = document.getElementById('slider-1').clientHeight;
    var windowsHeight = window.innerHeight;;
    var marginTop = (windowsHeight - clientHeight) / 2
    if(marginTop > 0){
      document.getElementById('slider-1').setAttribute("style", "margin-top:"+marginTop+"px;")
      
    }
  }

}
