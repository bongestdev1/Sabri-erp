import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, Event } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';

import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { ApiAuthenticationService } from 'src/app/services/authentication/api-authentication.service';

@Component({
  selector: 'app-renisialiser-mot-passe',
  templateUrl: './renisialiser-mot-passe.component.html',
  styleUrls: ['./renisialiser-mot-passe.component.scss']
})
export class RenisialiserMotPasseComponent implements OnInit {
  formC:FormGroup
  isLoading = false;
  
  erreurLogin = {
    newPassword:"",
    newPasswordValidate:""
  }

  isErreurs = false;

  code=""

  constructor(private toastNotificationService:ToastNotificationService, private _Activatedroute:ActivatedRoute, private apiAuthenticationService :ApiAuthenticationService , private fb:FormBuilder, private http: HttpClient, private router:Router) { 
    console.log("renisialiser mot de passe")
    this.formC = this.fb.group({
      newPassword:['',[Validators.required, Validators.min(6)]],
      newPasswordValidate:['',[Validators.required, Validators.min(6)]],
    })
  }

  ngOnInit(): void { 
    this.code = this._Activatedroute.snapshot.paramMap.get('id');
   }

  chargerErreurs(){
    for(let key in this.erreurLogin){
      this.erreurLogin[key] = ""
      if(document.getElementById(key) != null){
        document.getElementById(key).classList.remove("border-erreur")
      }
    }

    this.isErreurs = false
  
   
    if(this.formC.value.newPassword.length < 6){
      this.erreurLogin.newPassword = "Veuillez inserer votre nouveau mot de passe !"
      if(document.getElementById('newPassword') != null){
        document.getElementById('newPassword').classList.add("border-erreur")
      }
      this.isErreurs = true
    }

    if(this.formC.value.newPassword != "" && this.formC.value.newPassword != this.formC.value.newPasswordValidate){
      this.erreurLogin.newPasswordValidate = "Veuillez repeter votre nouveau mot de passe !"
      if(document.getElementById('newPasswordValidate') != null){
        document.getElementById('newPasswordValidate').classList.add("border-erreur")
      }
      this.isErreurs = true
    }

   return this.isErreurs
  }

  envoyer(){
   
    if (this.chargerErreurs()) {
      this.toastNotificationService.showErrorSmall("Veuillez vérifier votre mot de passe !!")
      return
    }
  
    if(this.isLoading){
      return 
    }

    this.isLoading = true;

    let request = {code:this.code, newPassword:this.formC.value.newPassword}
    
    this.apiAuthenticationService.renisialiserMotPasse(request).subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if(response.status){
          this.toastNotificationService.showSuccessSmall("Votre mot de passe est enregistrée!!")
          this.router.navigate(['/'])
        }else{
          this.toastNotificationService.showSuccessSmall("Votre mot de passe est fausse!!")
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
   
      }
    );
  }

}

