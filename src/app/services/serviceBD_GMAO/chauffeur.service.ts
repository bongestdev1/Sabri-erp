import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})

export class ChauffeurService {
  host = this.informationGenerale.baseUrl + "/chauffeurs/"
 
  constructor(private http: HttpClient,
    public informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listChauffeurs", request);
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`);
  }

  create(chauffeur,request): Observable<any> {
    for (let key in chauffeur) {
      request[key] = chauffeur[key]
    }
    return this.http.post(this.host + "newChauffeur", request);
  }

  update(id, chauffeur,request): Observable<any> {
    for (let key in chauffeur) {
      request[key] = chauffeur[key]
      if (key == 'id') {
        id = request[key]
      }
    }
    return this.http.post(`${this.host + "modifierChauffeur"}/${id}`, request);
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deleteChauffeur" }/${id}`, {});
  }

  parametre(id): Observable<any> {
    return this.http.get(`${this.host+ "getAllParametres"}/${id}`);
  }
}

