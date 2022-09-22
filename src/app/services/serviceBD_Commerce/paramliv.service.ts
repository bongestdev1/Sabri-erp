import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class Paramliv {
  host = this.informationGenerale.baseUrl + "/paramliv/"

  constructor(private http: HttpClient,
    private informationGenerale: InformationsService) {
  }
  currentID;
  // currentID(idT){
  //   let id = idT;
  //   console.log("idT"+idT);
  //   console.log("test id service current id"+id);
  //   return idT;
  //console.log("id"+id);
  //}

  getAll(request): Observable<any> {
    request.societe = this.informationGenerale.idSocieteCurrent
    return this.http.post(this.host + "listParamliv", request);
  }

  getparam(idFormat, typeDoc, request): Observable<any> {
    request.societe = this.informationGenerale.idSocieteCurrent
     return this.http.post(`${this.host + "getByidFormat"}/${idFormat}/${typeDoc}`, request);
  }

  get(id): Observable<any> {
    console.log("test id service" + id);
    return this.http.get(`${this.host + "getById"}/${id}`);
  }

  //   create(transporteur,request): Observable<any> {
  //     return this.http.post(this.host + "newTransporteur", request);
  //   }

  update(id, paramliv, request): Observable<any> {

    console.log("id:" + id);
    console.log("test update");
    console.log(this.host + "modifierparamliv" + id);
    console.log("request", request);
    return this.http.post(`${this.host + "modifierparamliv"}/${id}`, paramliv);
  }

  //   delete(id): Observable<any> {
  //     return this.http.post(`${this.host+ "deleteTransporteur" }/${id}`, {});
  //   }

  //   parametre(id): Observable<any> {
  //     return this.http.get(`${this.host+ "getAllParametres"}/${id}`);
  //   }
}
