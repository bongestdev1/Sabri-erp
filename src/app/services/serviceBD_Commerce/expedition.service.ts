import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../authentication/token-storage.service';
import { InformationsService } from '../informations.service';


@Injectable({
  providedIn: 'root'
})
export class ExpeditionService {

  host = this.informationGenerale.baseUrl + "/expeditions/"
 
  constructor(private http: HttpClient,
    private informationGenerale: InformationsService,
    private tokenStorageService: TokenStorageService,) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listExpeditions", request, this.tokenStorageService.getHeader());
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`, this.tokenStorageService.getHeader());
  }

  create(request): Observable<any> {
    return this.http.post(this.host + "newExpedition", request, this.tokenStorageService.getHeader());
  }

  update(id, frais,request): Observable<any> {
    return this.http.post(`${this.host + "modifierExpedition"}/${id}`, request, this.tokenStorageService.getHeader());
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deleteExpedition" }/${id}`, {}, this.tokenStorageService.getHeader());
  }

  parametre(request): Observable<any> {
    return this.http.post(this.host+ "getAllParametres",request, this.tokenStorageService.getHeader());
  }
  
}

