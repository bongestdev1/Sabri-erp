import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../authentication/token-storage.service';
import { InformationsService } from '../informations.service';


@Injectable({
  providedIn: 'root'
})
export class MethodeReglementService {

  host = this.informationGenerale.baseUrl + "/methodeReglements/"
 
  constructor(private http: HttpClient,
    private informationGenerale: InformationsService,
    private tokenStorageService: TokenStorageService,) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listMethodeReglements", request, this.tokenStorageService.getHeader());
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`, this.tokenStorageService.getHeader());
  }

  create(frais,request): Observable<any> {
    return this.http.post(this.host + "newMethodeReglement", request, this.tokenStorageService.getHeader());
  }

  update(id, frais,request): Observable<any> {
    return this.http.post(`${this.host + "modifierMethodeReglement"}/${id}`, request, this.tokenStorageService.getHeader());
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deleteMethodeReglement" }/${id}`, {}, this.tokenStorageService.getHeader());
  }

  parametre(request): Observable<any> {
    return this.http.post(this.host+ "getAllParametres",request, this.tokenStorageService.getHeader());
  }
  
}

