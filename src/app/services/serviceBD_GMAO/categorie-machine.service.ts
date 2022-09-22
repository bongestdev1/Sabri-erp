import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class CategorieMachineService {
  host = this.informationGenerale.baseUrl + "/categorieMachines/"
 
  constructor(private http: HttpClient,
    public informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listCategorieMachines", request);
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`);
  }

  create(categorieMachine,request): Observable<any> {
    for (let key in categorieMachine) {
      request[key] = categorieMachine[key]
    }
    return this.http.post(this.host + "newCategorieMachine", request);
  }

  update(id, categorieMachine,request): Observable<any> {
    for (let key in categorieMachine) {
      request[key] = categorieMachine[key]
      if (key == 'id') {
        id = request[key]
      }
    }
    return this.http.post(`${this.host + "modifierCategorieMachine"}/${id}`, request);
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deleteCategorieMachine" }/${id}`, {});
  }

  parametre(id): Observable<any> {
    return this.http.get(`${this.host+ "getAllParametres"}/${id}`);
  }
}
