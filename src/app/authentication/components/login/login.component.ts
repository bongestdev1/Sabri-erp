import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, Event } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';

import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { ApiAuthenticationService } from 'src/app/services/authentication/api-authentication.service';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { SessionCaisseService } from 'src/app/services/serviceBD_Commerce/sessionCaisse.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formC:FormGroup
  isLoading = false;
 
  erreurLogin = {
    email:"",
    password:""
  }
 
  isErreurs = false;

  message 
  

  constructor(
    private tokenStorageService:TokenStorageService, 
    private sessionCaisseSer: SessionCaisseService,
    private fb:FormBuilder, private notificationToast: ToastNotificationService , 
    private informationsService:InformationsService, 
    private http: HttpClient, private router:Router, 
    private apiAuthenticationService:ApiAuthenticationService,
    public fonctionPartagesService: FonctionPartagesService, ) { 
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
    
    this.apiAuthenticationService.login(request).subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if(response.status){
          this.tokenStorageService.saveToken(response.token, response.user)
          this.tokenStorageService.saveUser(response.user)
          this.openModalSocietes()
        }else{
          this.isLoading = false
          this.notificationToast.showErrorSmall("Veuillez verifier vos informations !!")
          this.informationsService.logout()
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
        this.informationsService.logout()
      }
    );
  }

  isOpenModalSocietes = false
  openModalSocietes(){
    this.isOpenModalSocietes = true
  }

  closeModalSocietes(){
    this.isOpenModalSocietes = false
    this.openModalExercices()
  }

  isOpenModalExercices = false
  openModalExercices(){
    this.isOpenModalExercices = true
  }

  closeModalExercices(){
    //this.getSessionCaisseUtilisateur() 
    this.router.navigate(['/dashboard/default'])
      
    this.isOpenModalExercices = false
  }

  getSessionCaisseUtilisateur() {
    this.isLoading = true
    let utilisateur = this.tokenStorageService.getUser()
    this.sessionCaisseSer.utilisateur(utilisateur.id)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if( resultat.status == false)
           {
             this.router.navigate(['sessionCaisses/ajout']) 
           }else{
            let sessionCaisse = resultat.resultat
            this.informationsService.setSessionCaisseCurrent(sessionCaisse)
            this.router.navigate(['/dashboard/default'])
           }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      });
  }



}

