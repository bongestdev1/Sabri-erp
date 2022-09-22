import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../authentication/token-storage.service';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  host = this.informationGenerale.baseUrl + "/categories/"
 
  constructor(private http: HttpClient,
    private informationGenerale: InformationsService,
    private tokenStorageService: TokenStorageService,) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listCategories", request, this.tokenStorageService.getHeader());
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`, this.tokenStorageService.getHeader());
  }

  create(request): Observable<any> {
    return this.http.post(this.host + "newCategorie", request, this.tokenStorageService.getHeader());
  }

  update(id, request): Observable<any> {
    return this.http.post(`${this.host + "modifierCategorie"}/${id}`, request, this.tokenStorageService.getHeader());
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deleteCategorie" }/${id}`, {}, this.tokenStorageService.getHeader());
  }

  parametre(id): Observable<any> {
    return this.http.get(`${this.host + "getAllParametres"}/${id}`, this.tokenStorageService.getHeader());
  }
}
