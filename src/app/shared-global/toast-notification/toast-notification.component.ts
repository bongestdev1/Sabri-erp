import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
//import { UserService } from '../../../services/user/user.service';
import { Router, Event } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
@Component({
  selector: 'app-toast-notification',
  templateUrl: './toast-notification.component.html',
  styleUrls: ['./toast-notification.component.scss']
})
export class ToastNotificationComponent implements OnInit {

  isOpenModalToast = false
  
  params1Toast

  params2Toast

  classCss = "modalToast"

  typeToast = "success"
  
  constructor( private router:Router,  private http: HttpClient, private notificationService:ToastNotificationService){ 
    this.notificationService.textToast.subscribe(res =>{
      
      if(this.notificationService.type == "success"){
        if(this.notificationService.isSmall == "non"){
          this.showToastSuccess(res);
        }else{
          this.showToastSuccessSmall(res);
        }
      }else{
        if(this.notificationService.isSmall == "non"){
          this.showToastError(res);
        }else{
          this.showToastErrorSmall(res);
        }
      }
    })
  }

  toast() {
    console.log("toast")
  }

  closeToast(){
    console.log("closeToast")
  }
  
  ngOnInit(): void {
  }
   
  styleWidth = ""

  showToastSuccess(message){
    if(message == ""){
      return
    }

    this.typeToast = "background-color: #1abc9c;"

    var elements = document.getElementsByClassName("pcoded-content");
    var elements2 = document.getElementsByTagName("body");
    
    if(elements.length == 0 || elements2.length == 0){
      this.showToastSuccessSmall(message)
      return
    }

    var width = (elements2[0].clientWidth-elements[0].clientWidth)  / elements2[0].clientWidth * 100
    
    this.styleWidth = "width:"+width+"%;";  
    
    this.params1Toast = message
    if(!this.isOpenModalToast){
      this.classCss = "modalToast modalToast-open"
      this.isOpenModalToast = true
      setTimeout(() => {
        this.classCss = "modalToast"
        this.isOpenModalToast = false
      },  4000);
    }
  }

  showToastError(message){
    if(message == ""){
      return
    }
    
    this.typeToast = "background-color:red;"
    
    var elements = document.getElementsByClassName("pcoded-content");
    var elements2 = document.getElementsByTagName("body");
    
    if(elements.length == 0 || elements2.length == 0){
      this.showToastErrorSmall(message)
      return
    }

    var width = (elements2[0].clientWidth-elements[0].clientWidth)  / elements2[0].clientWidth * 100
    
    this.styleWidth = "width:"+width+"%;";  
    
    this.params1Toast = message
    if(!this.isOpenModalToast){
      this.classCss = "modalToast modalToast-open"
      this.isOpenModalToast = true
      setTimeout(() => {
        this.classCss = "modalToast"
        this.isOpenModalToast = false
      },  4000);
    }
  }

  showToastErrorSmall(message){
    if(message == ""){
      return
    }
    
    this.typeToast = "background-color:red;"
    
   
    this.styleWidth = "width:fit-content;";  
    
    this.params1Toast = message
    if(!this.isOpenModalToast){
      this.classCss = "modalToast modalToast-open"
      this.isOpenModalToast = true
      setTimeout(() => {
        this.classCss = "modalToast"
        this.isOpenModalToast = false
      },  4000);
    }
  }

  showToastSuccessSmall(message){
    if(message == ""){
      return
    }

    this.typeToast = "background-color: #1abc9c;"

    this.styleWidth = "width:fit-content;";    
    
    this.params1Toast = message
    if(!this.isOpenModalToast){
      this.classCss = "modalToast modalToast-open"
      this.isOpenModalToast = true
      setTimeout(() => {
        this.classCss = "modalToast"
        this.isOpenModalToast = false
      },  4000);
    }
  }

}
