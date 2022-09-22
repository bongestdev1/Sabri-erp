import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {TokenStorageService} from '../../authentication/token-storage.service';
import { InformationsService } from '../../informations.service';
import { tokenName } from '@angular/compiler';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiUtilisateurService {

  AUTH_API = ""

  getHeader(){
    return this.tokenStorageService.getHeader()
  }

  constructor(public informationGenerale: InformationsService, private http: HttpClient, private tokenStorageService: TokenStorageService) {
    this.AUTH_API = informationGenerale.baseUrl
  }

  newUser(request): Observable<any> {
    return this.http.post(this.AUTH_API + '/utilisateurs/newUtilisateur', request, this.getHeader());
  }

  modifierUser(id, request): Observable<any> {
    return this.http.post(this.AUTH_API + '/utilisateurs/modifierUtilisateur/'+id, request, this.getHeader());
  }

  modifierMotdePasse(id, request): Observable<any> {
    return this.http.post(this.AUTH_API + '/utilisateurs/modifierMotDePasseUtilisateur/'+id, request, this.getHeader());
  }

  getUser(id): Observable<any> {
    return this.http.get(this.AUTH_API + '/utilisateurs/getById/'+ id, this.getHeader());
  }

  list(request): Observable<any> {
    return this.http.post(this.AUTH_API + '/utilisateurs/listUtilisateurs', request,  this.getHeader());
  }

  delete(id): Observable<any> {
    return this.http.post(this.AUTH_API + '/utilisateurs/deleteUtilisateur/'+id, {}, this.getHeader());
  }

  getAllParametres(request): Observable<any> {
    return this.http.post(this.AUTH_API + '/utilisateurs/getAllParametres', request, this.getHeader());
  }

}


