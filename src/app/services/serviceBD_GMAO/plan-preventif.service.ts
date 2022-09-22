import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class PlanPreventifService {
  host = this.informationGenerale.baseUrl + "/planPreventifs/"
 
  constructor(private http: HttpClient,
    public informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listPlanPreventifs", request);
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`);
  }

  create(planPreventif,request): Observable<any> {
    for (let key in planPreventif) {
      request[key] = planPreventif[key]
    }
    return this.http.post(this.host + "newPlanPreventif", request);
  }

  update(id, planPreventif,request): Observable<any> {
    console.log("request service",request)
    console.log("planPreventif service",planPreventif)
    for (let key in planPreventif) {
      request.search[key] = planPreventif[key]
    }
    console.log("request service",request)
    console.log("planPreventif service",planPreventif)
    return this.http.post(`${this.host + "modifierPlanPreventif"}/${id}`, request);
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deletePlanPreventif" }/${id}`, {});
  }

  parametre(id): Observable<any> {
    return this.http.get(`${this.host+ "getAllParametres"}/${id}`);
  }

  listeTaches(id): Observable<any> {
    return this.http.get(`${this.host+ "getAllListeTaches"}/${id}`);
  }

  updateTaches(id, listTaches): Observable<any> {
    return this.http.post(`${this.host + "modifierListeTache"}/${id}`, listTaches);
  }
}
