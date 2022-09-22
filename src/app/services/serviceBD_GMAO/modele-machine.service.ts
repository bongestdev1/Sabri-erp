import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class ModeleMachineService {
  host = this.informationGenerale.baseUrl + "/modeleMachines/"
 
  constructor(private http: HttpClient,
    public informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listModeleMachines", request);
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`);
  }

  create(modeleMachine,request): Observable<any> {
    for (let key in modeleMachine) {
      request[key] = modeleMachine[key]
    }
    return this.http.post(this.host + "newModeleMachine", request);
  }

  update(id, modeleMachine,request): Observable<any> {
    for (let key in modeleMachine) {
      request[key] = modeleMachine[key]
      if (key == 'id') {
        id = request[key]
      }
    }
    return this.http.post(`${this.host + "modifierModeleMachine"}/${id}`, request);
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deleteModeleMachine" }/${id}`, {});
  }

  parametre(id): Observable<any> {
    return this.http.get(`${this.host+ "getAllParametres"}/${id}`);
  }

}
