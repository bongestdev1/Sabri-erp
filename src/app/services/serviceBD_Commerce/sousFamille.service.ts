import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../authentication/token-storage.service';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class SousFamilleService {
  host = this.informationGenerale.baseUrl + "/sousfamilles/"
 
  constructor(private http: HttpClient,
    private informationGenerale: InformationsService,
    private tokenStorageService: TokenStorageService,) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listSousFamilles", request, this.tokenStorageService.getHeader());
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`, this.tokenStorageService.getHeader());
  }

  create(request): Observable<any> {
    return this.http.post(this.host + "newSousfamille", request, this.tokenStorageService.getHeader());
  }

  update(id, request): Observable<any> {
    return this.http.post(`${this.host + "modifierSousFamille"}/${id}`, request, this.tokenStorageService.getHeader());
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deleteSousFamille" }/${id}`, {}, this.tokenStorageService.getHeader());
  }

  parametre(id): Observable<any> {
    return this.http.get(`${this.host + "getAllParametres"}/${id}`, this.tokenStorageService.getHeader());
  }
}
