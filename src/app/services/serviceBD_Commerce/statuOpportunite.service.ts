import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../authentication/token-storage.service';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class StatuOpportuniteService {
  host = this.informationGenerale.baseUrl + "/statuOpportunites/"
 
  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listStatuOpportunites", request, this.tokenStorageService.getHeader());
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`, this.tokenStorageService.getHeader());
  }

  create(request): Observable<any> {
    return this.http.post(this.host + "newStatuOpportunite", request, this.tokenStorageService.getHeader());
  }

  update(id, request): Observable<any> {
    return this.http.post(`${this.host + "modifierStatuOpportunite"}/${id}`, request, this.tokenStorageService.getHeader());
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deleteStatuOpportunite" }/${id}`, {}, this.tokenStorageService.getHeader());
  }

  parametre(id): Observable<any> {
    return this.http.get(`${this.host + "getAllParametres"}/${id}`, this.tokenStorageService.getHeader());
  }
}
