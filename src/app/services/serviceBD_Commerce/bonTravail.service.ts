import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InformationsService } from '../informations.service';
import { TokenStorageService } from '../authentication/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class BonTravailService {
  host = this.informationGenerale.baseUrl + "/bonTravails/"
 
  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listBonTravails", request, this.tokenStorageService.getHeader());
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`, this.tokenStorageService.getHeader());
  }

  create(bonTravail,request): Observable<any> {
    return this.http.post(this.host + "newBonTravail", request, this.tokenStorageService.getHeader());
  }

  update(id, bonTravail,request): Observable<any> {
    return this.http.post(`${this.host + "modifierBonTravail"}/${id}`, request, this.tokenStorageService.getHeader());
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deleteBonTravail" }/${id}`, {}, this.tokenStorageService.getHeader());
  }

  parametre(request): Observable<any> {
    return this.http.post(this.host + "getAllParametres", request, this.tokenStorageService.getHeader());
  }
}
