import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class EtatCarburantService {
  host = this.informationGenerale.baseUrl + "/etatCarburants/"
 
  constructor(private http: HttpClient,
    public informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listEtatCarburants", request);
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`);
  }

  create(etatCarburant,request): Observable<any> {
    for (let key in etatCarburant) {
      request[key] = etatCarburant[key]
    }
    return this.http.post(this.host + "newEtatCarburant", request);
  }

  update(id, etatCarburant,request): Observable<any> {
    for (let key in etatCarburant) {
      request[key] = etatCarburant[key]
      if (key == 'id') {
        id = request[key]
      }
    }
    return this.http.post(`${this.host + "modifierEtatCarburant"}/${id}`, request);
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deleteEtatCarburant" }/${id}`, {});
  }

  parametre(id): Observable<any> {
    return this.http.get(`${this.host+ "getAllParametres"}/${id}`);
  }
}

