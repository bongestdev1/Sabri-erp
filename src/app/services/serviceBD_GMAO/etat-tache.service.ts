import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class EtatTacheService {
  host = this.informationGenerale.baseUrl + "/etatTaches/"
 
  constructor(private http: HttpClient,
    public informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listEtatTaches", request);
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`);
  }

  create(etatTache,request): Observable<any> {
    for (let key in etatTache) {
      request[key] = etatTache[key]
    }
    return this.http.post(this.host + "newEtatTache", request);
  }

  update(id, etatTache,request): Observable<any> {
    for (let key in etatTache) {
      request[key] = etatTache[key]
      if (key == 'id') {
        id = request[key]
      }
    }
    return this.http.post(`${this.host + "modifierEtatTache"}/${id}`, request);
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deleteEtatTache" }/${id}`, {});
  }

  parametre(id): Observable<any> {
    return this.http.get(`${this.host+ "getAllParametres"}/${id}`);
  }
}
