import { Injectable } from '@angular/core';
import { ToastNotificationService } from '../toast-notification.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { InformationsService } from '../informations.service';
import { Router } from '@angular/router';

const TOKEN_KEY = 'auth-token';
const USER_PSEUDO_KEY = 'auth-pseudo';
const USER_KEY = 'auth-user';
const USER_ROLE = 'auth-role';
const ROLE_SUPER_ADMIN = '14sqqs78za879899899';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor(private router:Router, private toastNotificationService:ToastNotificationService) {
    this.getUserFromLocalStorage()
    this.getTokenFromLocalStorage()
  }

  signOut(): void {
    //window.sessionStorage.removeItem(TOKEN_KEY);
    //window.sessionStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(USER_ROLE);
    this.token = ""
  }

  token = ""
  dashboard = "client"

  setDashboard(dashboard){
    this.dashboard = dashboard
  }

  public saveToken(token: string, user): void {
    this.token = token
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
    this.toastNotificationService.showSuccessSmall("Bienvenue "+user.nom+" !!")
  }

  public getToken(): string | null {
    if(!this.isConnected()){
       if(this.dashboard === "client"){
        this.router.navigate(['/authentication/login'])
       }else{
        this.router.navigate(['/authentication/login-admin'])
       }  
    }

    return  this.token;
  }

  public getTokenFromLocalStorage(){
    this.token = localStorage.getItem(TOKEN_KEY)
    return this.token
  }

  public isConnected(){
    if(this.getTokenFromLocalStorage() === null){
      return false
    }
    return true
  }

  public saveUser(user: any): void {
    this.userObject = user
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public saveRoleSuperAdmin(): void {
    localStorage.removeItem(USER_ROLE);
    localStorage.setItem(USER_ROLE, ROLE_SUPER_ADMIN);
  }

  public isRoleSuperAdmin(): boolean | null{
    return localStorage.getItem(USER_ROLE) == ROLE_SUPER_ADMIN;
  }

  public getUser(): any {
    return this.userObject;
  }
  
  userObject = {}

  public getUserFromLocalStorage(): any {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      this.userObject = JSON.parse(user);
    }else{
      this.userObject = {};
      console.log(this.userObject)
    }
  }

  getHeader(){
    let headers = new HttpHeaders()

    headers = headers.set('Authorization',  `Bearer ${this.getToken()}`)

  
    var header = {
      headers: headers
    }

    return header
  }

 
}