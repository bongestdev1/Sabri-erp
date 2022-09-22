import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../authentication/token-storage.service';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class ProjetInterneService {
  host = this.informationGenerale.baseUrl + "/projetInternes/"
 
  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    public informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listProjetInternes", request, this.tokenStorageService.getHeader());
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`, this.tokenStorageService.getHeader());
  }

  create(projetInterne,request): Observable<any> {
    return this.http.post(this.host + "newProjetInterne", request, this.tokenStorageService.getHeader());
  }

  update(id, projetInterne,request): Observable<any> {
    return this.http.post(`${this.host + "modifierProjetInterne"}/${id}`, request, this.tokenStorageService.getHeader());
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deleteProjetInterne" }/${id}`, {}, this.tokenStorageService.getHeader());
  }

  parametre(request): Observable<any> {
    return this.http.post(this.host + "getAllParametres", request, this.tokenStorageService.getHeader());
  }
}
