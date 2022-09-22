import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class FraisMissionService {
  host = this.informationGenerale.baseUrl + "/fraisMissions/"
 
  constructor(private http: HttpClient,
    public informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listFraisMissions", request);
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`);
  }

  create(fraisMission,request): Observable<any> {
    for (let key in fraisMission) {
      request[key] = fraisMission[key]
    }
    return this.http.post(this.host + "newFraisMission", request);
  }

  update(id, fraisMission,request): Observable<any> {
    for (let key in fraisMission) {
      request[key] = fraisMission[key]
      if (key == 'id') {
        id = request[key]
      }
    }
    return this.http.post(`${this.host + "modifierFraisMission"}/${id}`, request);
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deleteFraisMission" }/${id}`, {});
  }

  parametre(id): Observable<any> {
    return this.http.get(`${this.host+ "getAllParametres"}/${id}`);
  }
}
