import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {
  host = this.informationGenerale.baseUrl + "/classes/"
 
  constructor(private http: HttpClient,
    public informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listClasses", request);
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`);
  }

  create(classe,request): Observable<any> {
    for (let key in classe) {
      request[key] = classe[key]
    }
    return this.http.post(this.host + "newClasse", request);
  }

  update(id, classe,request): Observable<any> {
    for (let key in classe) {
      request[key] = classe[key]
      if (key == 'id') {
        id = request[key]
      }
    }
    return this.http.post(`${this.host + "modifierClasse"}/${id}`, request);
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deleteClasse" }/${id}`, {});
  }

  parametre(id): Observable<any> {
    console.log(this.host+ "getAllParametres/"+id)
    return this.http.get(`${this.host+ "getAllParametres"}/${id}`);
  }
}
