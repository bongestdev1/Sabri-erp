import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../authentication/token-storage.service';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class TacheProjetInterneService {
  host = this.informationGenerale.baseUrl + "/tacheProjetInternes/"
 
  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listTacheProjetInternes", request, this.tokenStorageService.getHeader());
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`, this.tokenStorageService.getHeader());
  }

  create(tacheProjetInterne,request): Observable<any> {
    return this.http.post(this.host + "newTacheProjetInterne", request, this.tokenStorageService.getHeader());
  }

  update(id, tacheProjetInterne,request): Observable<any> {
    return this.http.post(`${this.host + "modifierTacheProjetInterne"}/${id}`, request, this.tokenStorageService.getHeader());
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deleteTacheProjetInterne" }/${id}`, {}, this.tokenStorageService.getHeader());
  }

  parametre(request): Observable<any> {
    return this.http.post(this.host + "getAllParametres", request, this.tokenStorageService.getHeader());
  }
}
