import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../authentication/token-storage.service';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class OrdreMissionService {
  host = this.informationGenerale.baseUrl + "/ordreEmissions/"
 
  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listOrdreEmissions", request, this.tokenStorageService.getHeader());
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`, this.tokenStorageService.getHeader());
  }

  create(ordreMission,request): Observable<any> {
    return this.http.post(this.host + "newOrdreEmission", request, this.tokenStorageService.getHeader());
  }

  update(id, ordreMission,request): Observable<any> {
    return this.http.post(`${this.host + "modifierOrdreEmission"}/${id}`, request, this.tokenStorageService.getHeader());
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deleteOrdreEmission" }/${id}`, {}, this.tokenStorageService.getHeader());
  }

  parametre(request): Observable<any> {
    return this.http.post(this.host + "getAllParametres", request, this.tokenStorageService.getHeader());
  }
  
  achats(request): Observable<any> {
    return this.http.post(this.informationGenerale.baseUrl +"/bonAchats/listBonAchats", request, this.tokenStorageService.getHeader());
  }  

  articles(request): Observable<any> {
    return this.http.post(this.informationGenerale.baseUrl +"/bonAchats/getBAArticles", request, this.tokenStorageService.getHeader());
  }
}
