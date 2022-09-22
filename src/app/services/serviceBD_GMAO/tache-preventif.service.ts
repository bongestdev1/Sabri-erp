import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class TachePreventifService {
  host = this.informationGenerale.baseUrl + "/tachePreventifs/"
 
  constructor(private http: HttpClient,
    public informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listTachePreventifs", request);
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`);
  }

  create(tachePreventif,request): Observable<any> {
    for (let key in tachePreventif) {
      request[key] = tachePreventif[key]
    }
    return this.http.post(this.host + "newTachePreventif", request);
  }

  update(id, tachePreventif,request): Observable<any> {
    for (let key in tachePreventif) {
      request[key] = tachePreventif[key]
      if (key == 'id') {
        id = request[key]
      }
    }
    return this.http.post(`${this.host + "modifierTachePreventif"}/${id}`, request);
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deleteTachePreventif" }/${id}`, {});
  }

  parametre(id): Observable<any> {
    return this.http.get(`${this.host+ "getAllParametres"}/${id}`);
  }
}
