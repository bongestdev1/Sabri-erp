import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, Event } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';

import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { ApiAuthenticationService } from 'src/app/services/authentication/api-authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mot-passe-oublier',
  templateUrl: './mot-passe-oublier.component.html',
  styleUrls: ['./mot-passe-oublier.component.scss']
})
export class MotPasseOublierComponent implements OnInit { 

  formC:FormGroup
  isLoading = false;
  
  erreurLogin = {
    email:""
  }

  isErreurs = false;

  message 
  
  constructor(private toastNotificationService:ToastNotificationService, private apiAuthenticationService:ApiAuthenticationService, private fb:FormBuilder, private informationsService:InformationsService, private http: HttpClient, private router:Router) { 
      this.formC = this.fb.group({
        email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      })
  }

  ngOnInit(): void {
   
   }

   chargerErreurs(){

    for(let key in this.erreurLogin){
        this.erreurLogin[key] = ""
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.remove("border-erreur")
        }
    }

    this.isErreurs = false
  
    if(this.formC.controls.email.status != "VALID"){
      this.erreurLogin.email = "Veuillez inserer votre email !"
      if(document.getElementById('email') != null){
        document.getElementById('email').classList.add("border-erreur")
      }
      this.isErreurs = true
    }
    
    return this.isErreurs
  }

  envoyer(){
   
    if (this.chargerErreurs()) {
      return
    }
  
    if(this.isLoading){
      return 
    }

    this.isLoading = true;

    let request = {email:this.formC.value.email, baseUrl:this.informationsService.baseURLAngular+ "/authentication/RenitialiserMotdePasseOublie"}
    
    this.apiAuthenticationService.modifierMotPasse(request).subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if(response.status){
          this.toastNotificationService.showSuccessSmall("Votre email est envoyé avec succès !!")
          this.router.navigate(['/authentication/login'])  
        }else{
          this.toastNotificationService.showErrorSmall("Veuillez vérifier votre email !!")
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
    
      }
    );
  }

}

