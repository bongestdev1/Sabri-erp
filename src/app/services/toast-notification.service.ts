import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastNotificationService {

  constructor() { }

  varTextToast=""
  textToast=new BehaviorSubject(this.varTextToast)
  textToastChange=this.textToast.asObservable()  

  type = "success"
  isSmall = "non"

  showSuccess(message){
    this.type = "success"
    this.isSmall = "non"
    this.textToast.next(message)
  }

  showError(message){
    this.type = "error"
    this.isSmall = "non"
    this.textToast.next(message)
  }

  showSuccessSmall(message){
    this.type = "success"
    this.isSmall = "oui"
    this.textToast.next(message)
  }

  showErrorSmall(message){
    this.type = "error"
    this.isSmall = "oui"
    this.textToast.next(message)
  }


}
