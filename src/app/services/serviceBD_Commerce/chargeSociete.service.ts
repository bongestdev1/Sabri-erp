import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../authentication/token-storage.service';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class ChargeSocieteService {
  host = this.informationGenerale.baseUrl + "/chargeSocietes/"
 
  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listChargeSocietes", request, this.tokenStorageService.getHeader());
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`, this.tokenStorageService.getHeader());
  }

  create(request): Observable<any> {
    return this.http.post(this.host + "newChargeSociete", request, this.tokenStorageService.getHeader());
  }

  update(id,request): Observable<any> {
    return this.http.post(`${this.host + "modifierChargeSociete"}/${id}`, request, this.tokenStorageService.getHeader());
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deleteChargeSociete" }/${id}`, {}, this.tokenStorageService.getHeader());
  }

  parametre(id): Observable<any> {
    return this.http.get(`${this.host + "getAllParametres"}/${id}`, this.tokenStorageService.getHeader());
  }
  
}
