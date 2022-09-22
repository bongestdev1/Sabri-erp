import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})

export class OperationPreventifService {
  host = this.informationGenerale.baseUrl + "/operationPreventifs/"
 
  constructor(private http: HttpClient,
    public informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listOperationPreventifs", request);
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`);
  }

  create(operationPreventif,request): Observable<any> {
    for (let key in operationPreventif) {
      request[key] = operationPreventif[key]
    }
    return this.http.post(this.host + "newOperationPreventif", request);
  }

  update(id, operationPreventif,request): Observable<any> {
    for (let key in operationPreventif) {
      request[key] = operationPreventif[key]
      if (key == 'id') {
        id = request[key]
      }
    }
    return this.http.post(`${this.host + "modifierOperationPreventif"}/${id}`, request);
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deleteOperationPreventif" }/${id}`, {});
  }

  parametre(id): Observable<any> {
    return this.http.get(`${this.host+ "getAllParametres"}/${id}`);
  }

}
