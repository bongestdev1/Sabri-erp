import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class TypeFraisService {
  host = this.informationGenerale.baseUrl + "/typeFraiss/"
 
  constructor(private http: HttpClient,
    public informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listTypeFraiss", request);
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`);
  }

  create(typeFrais,request): Observable<any> {
    for (let key in typeFrais) {
      request[key] = typeFrais[key]
    }
    return this.http.post(this.host + "newTypeFrais", request);
  }

  update(id, typeFrais,request): Observable<any> {
    for (let key in typeFrais) {
      request[key] = typeFrais[key]
      if (key == 'id') {
        id = request[key]
      }
    }
    return this.http.post(`${this.host + "modifierTypeFrais"}/${id}`, request);
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deleteTypeFrais" }/${id}`, {});
  }

  parametre(id): Observable<any> {
    return this.http.get(`${this.host+ "getAllParametres"}/${id}`);
  }
}
