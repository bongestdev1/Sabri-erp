import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class MarqueMachineService {
  host = this.informationGenerale.baseUrl + "/marqueMachines/"
 
  constructor(private http: HttpClient,
    public informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listMarqueMachines", request);
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`);
  }

  create(marqueMachine,request): Observable<any> {
    for (let key in marqueMachine) {
      request[key] = marqueMachine[key]
    }
    return this.http.post(this.host + "newMarqueMachine", request);
  }

  update(id, marqueMachine,request): Observable<any> {
    for (let key in marqueMachine) {
      request[key] = marqueMachine[key]
      if (key == 'id') {
        id = request[key]
      }
    }
    return this.http.post(`${this.host + "modifierMarqueMachine"}/${id}`, request);
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deleteMarqueMachine" }/${id}`, {});
  }

  parametre(id): Observable<any> {
    return this.http.get(`${this.host+ "getAllParametres"}/${id}`);
  }
}
