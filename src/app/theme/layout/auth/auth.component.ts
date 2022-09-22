import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor() {
  
  }

  ngOnInit() {
    document.getElementsByTagName('html')[0].setAttribute("style","background-color:#1abc9c;")
    document.getElementsByTagName('body')[0].setAttribute("style","")
  }

}
