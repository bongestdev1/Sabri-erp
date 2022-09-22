import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {TokenStorageService} from '../../services/authentication/token-storage.service';
import { InformationsService } from '../informations.service';



const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ApiAuthenticationService {

  AUTH_API = ""

  constructor(public informationGenerale: InformationsService, private http: HttpClient, private tokenStorageService: TokenStorageService) {
    this.AUTH_API = informationGenerale.baseUrl
  }

  login(request): Observable<any> {
    return this.http.post(this.AUTH_API + '/utilisateurs/login', request, httpOptions);
  }

  loginAdmin(request): Observable<any> {
    return this.http.post(this.AUTH_API + '/utilisateurs/loginAdmin', request, httpOptions);
  }

  modifierMotPasse(request): Observable<any> {
    return this.http.post(this.AUTH_API + '/emails/emailMotPasseEmail', request, httpOptions);
  }

  renisialiserMotPasse(request): Observable<any> {
    return this.http.post(this.AUTH_API + '/utilisateurs/newPassword', request, httpOptions);
  }

}

