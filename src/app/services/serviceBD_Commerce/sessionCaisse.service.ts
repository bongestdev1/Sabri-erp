import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../authentication/token-storage.service';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class SessionCaisseService {
  host = this.informationGenerale.baseUrl + "/sessionCaisses/"
 
  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listSessionCaisses", request, this.tokenStorageService.getHeader());
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`, this.tokenStorageService.getHeader());
  }

  create(request): Observable<any> {
    return this.http.post(this.host + "newSessionCaisse", request, this.tokenStorageService.getHeader());
  }

  update(id,request): Observable<any> {
    return this.http.post(`${this.host + "modifierSessionCaisse"}/${id}`, request, this.tokenStorageService.getHeader());
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deleteSessionCaisse" }/${id}`, {}, this.tokenStorageService.getHeader());
  }

  parametre(request): Observable<any> {
    return this.http.post(this.host + "getAllParametres", request, this.tokenStorageService.getHeader());
  }
  
  reglements(request): Observable<any> {
    return this.http.post(this.host+ "/reglements", request, this.tokenStorageService.getHeader());
  }  

  charges(request): Observable<any> {
    return this.http.post(this.host+ "/charges", request, this.tokenStorageService.getHeader());
  }
  
  utilisateur(id): Observable<any> {
    return this.http.get(`${this.host + "utilisateur"}/${id}`, this.tokenStorageService.getHeader());
  }
}
