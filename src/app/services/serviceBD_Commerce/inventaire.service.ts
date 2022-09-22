import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../authentication/token-storage.service';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class InventaireService {
  host = this.informationGenerale.baseUrl
 
  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "/inventaires/listInventaires", request, this.tokenStorageService.getHeader());
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "/inventaires/getById2"}/${id}`, this.tokenStorageService.getHeader());
  }

  getById(id): Observable<any> {
    return this.http.get(`${this.host + "/inventaires/getById"}/${id}`, this.tokenStorageService.getHeader());
  }

  create(inventaire,request): Observable<any> {
    return this.http.post(this.host + "/inventaires/newInventaire", request, this.tokenStorageService.getHeader());
  }

  update(id, inventaire,request): Observable<any> {
    for (let key in inventaire) {
      request[key] = inventaire[key]
      if (key == 'id') {
        id = request[key]
      }
    }
    return this.http.post(`${this.host + "/inventaires/modifierInventaire"}/${id}`, request, this.tokenStorageService.getHeader());
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "/inventaires/deleteInventaire" }/${id}`, {}, this.tokenStorageService.getHeader());
  }

  parametre(id): Observable<any> {
    return this.http.get(`${this.host+ "/inventaires/getAllParametres"}/${id}`, this.tokenStorageService.getHeader());
  }

  rechercheByCategorie(request): Observable<any> {
    return this.http.post(`${this.host+ "/articles/getArticlesByIdCategorie" }`, request, this.tokenStorageService.getHeader());
  }
}
