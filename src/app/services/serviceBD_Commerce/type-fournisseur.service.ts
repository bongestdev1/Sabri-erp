import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../authentication/token-storage.service';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class TypeFournisseurService {
  host = this.informationGenerale.baseUrl + "/typeFournisseurs/"
 
  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    public informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listTypeFournisseurs", request, this.tokenStorageService.getHeader());
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`, this.tokenStorageService.getHeader());
  }

  create(typeFournisseur,request): Observable<any> {
    for (let key in typeFournisseur) {
      request[key] = typeFournisseur[key]
    }
    return this.http.post(this.host + "newTypeFournisseur", request, this.tokenStorageService.getHeader());
  }

  update(id, typeFournisseur,request): Observable<any> {
    for (let key in typeFournisseur) {
      request[key] = typeFournisseur[key]
      if (key == 'id') {
        id = request[key]
      }
    }
    return this.http.post(`${this.host + "modifierTypeFournisseur"}/${id}`, request, this.tokenStorageService.getHeader());
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deleteTypeFournisseur" }/${id}`, {}, this.tokenStorageService.getHeader());
  }

  parametre(id): Observable<any> {
    return this.http.get(`${this.host+ "getAllParametres"}/${id}`, this.tokenStorageService.getHeader());
  }
}
