import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, Event } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';

import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { ApiAuthenticationService } from 'src/app/services/authentication/api-authentication.service';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';

const USER_ADMIN_KEY = 'USER_ADMIN_KEY';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit {

  formC:FormGroup
  isLoading = false;
 
  erreurLogin = {
    email:"",
    password:""
  }
 
  isErreurs = false;

  message 
 
  constructor(private tokenStorageService:TokenStorageService, private fb:FormBuilder, private notificationToast: ToastNotificationService , private informationsService:InformationsService, private http: HttpClient, private router:Router, private apiAuthenticationService:ApiAuthenticationService ) { 
    this.formC = this.fb.group({
        email: ['', [Validators.required, Validators.min(2)]],
        password:['',[Validators.required, Validators.min(2)]],
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
    
    if(this.formC.value.password.length < 2){
      this.erreurLogin.password = "Veuillez inserer votre mot de passe !"
      if(document.getElementById('password') != null){
        document.getElementById('password').classList.add("border-erreur")
      }
      this.isErreurs = true
    }

    return this.isErreurs
  }


  login(){
   
    if(this.chargerErreurs()) {
      this.notificationToast.showErrorSmall("Veuillez remplir les champs obligatoires !")
      return
    }
  
    if(this.isLoading){
      return 
    }

    this.isLoading = true;
    let request = {email:this.formC.value.email, password:this.formC.value.password}
    
    this.apiAuthenticationService.loginAdmin(request).subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if(response.status){
          this.saveToken(response.token)
          this.router.navigate(['/dashboard-admin/societe'])
          this.notificationToast.showSuccessSmall("Veuillez verifier vos informations !!")
        }else{
          this.informationsService.logout()
          this.isLoading = false
          this.notificationToast.showErrorSmall("Veuillez verifier vos informations !!")
        }
      }, err => {
        this.informationsService.logout()
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  public saveToken(token: any): void {
    this.tokenStorageService.saveToken(token, {})
    this.tokenStorageService.saveRoleSuperAdmin()
  }

}
