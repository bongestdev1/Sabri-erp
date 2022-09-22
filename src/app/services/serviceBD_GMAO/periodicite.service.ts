import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class PeriodiciteService {
  host = this.informationGenerale.baseUrl + "/periodicites/"
 
  constructor(private http: HttpClient,
    public informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listPeriodicites", request);
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`);
  }

  create(periodicite,request): Observable<any> {
    for (let key in periodicite) {
      request[key] = periodicite[key]
    }
    return this.http.post(this.host + "newPeriodicite", request);
  }

  update(id, periodicite,request): Observable<any> {
    for (let key in periodicite) {
      request[key] = periodicite[key]
      if (key == 'id') {
        id = request[key]
      }
    }
    return this.http.post(`${this.host + "modifierPeriodicite"}/${id}`, request);
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deletePeriodicite" }/${id}`, {});
  }

  parametre(id): Observable<any> {
    return this.http.get(`${this.host+ "getAllParametres"}/${id}`);
  }
}
