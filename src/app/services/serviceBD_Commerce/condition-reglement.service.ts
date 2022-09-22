import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../authentication/token-storage.service';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class ConditionReglementService {
  host = this.informationGenerale.baseUrl + "/conditionReglements/"
 
  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    public informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listConditionReglements", request, this.tokenStorageService.getHeader());
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`, this.tokenStorageService.getHeader());
  }

  create(conditionReglement,request): Observable<any> {
    for (let key in conditionReglement) {
      request[key] = conditionReglement[key]
    }
    return this.http.post(this.host + "newConditionReglement", request, this.tokenStorageService.getHeader());
  }

  update(id, conditionReglement,request): Observable<any> {
    for (let key in conditionReglement) {
      request[key] = conditionReglement[key]
      if (key == 'id') {
        id = request[key]
      }
    }
    return this.http.post(`${this.host + "modifierConditionReglement"}/${id}`, request, this.tokenStorageService.getHeader());
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deleteConditionReglement" }/${id}`, {}, this.tokenStorageService.getHeader());
  }

  parametre(id): Observable<any> {
    return this.http.get(`${this.host+ "getAllParametres"}/${id}`, this.tokenStorageService.getHeader());
  }
}
