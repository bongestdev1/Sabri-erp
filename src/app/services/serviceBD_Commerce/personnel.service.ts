import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../authentication/token-storage.service';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {
  host = this.informationGenerale.baseUrl + "/personnels/"
 
  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listPersonnels", request, this.tokenStorageService.getHeader());
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`, this.tokenStorageService.getHeader());
  }

  create(personnel,request): Observable<any> {
    return this.http.post(this.host + "newPersonnel", request, this.tokenStorageService.getHeader());
  }

  update(id,request): Observable<any> {
    return this.http.post(`${this.host + "modifierPersonnel"}/${id}`, request, this.tokenStorageService.getHeader());
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deletePersonnel" }/${id}`, {}, this.tokenStorageService.getHeader());
  }

  parametre(id): Observable<any> {
    return this.http.get(`${this.host+ "getAllParametres"}/${id}`, this.tokenStorageService.getHeader());
  }
}
