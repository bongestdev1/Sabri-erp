import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class PointageCompteurService {
  host = this.informationGenerale.baseUrl + "/pointageCompteurs/"
 
  constructor(private http: HttpClient,
    public informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listPointageCompteurs", request);
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`);
  }

  create(pointageCompteur,request): Observable<any> {
    for (let key in pointageCompteur) {
      request[key] = pointageCompteur[key]
    }
    return this.http.post(this.host + "newPointageCompteur", request);
  }

  update(id, pointageCompteur,request): Observable<any> {
    return this.http.post(`${this.host + "modifierPointageCompteur"}/${id}`, pointageCompteur);
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deletePointageCompteur" }/${id}`, {});
  }

  parametre(id): Observable<any> {
    return this.http.get(`${this.host+ "getAllParametres"}/${id}`);
  }
}
