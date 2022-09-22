import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../../authentication/token-storage.service';
import { InformationsService } from '../../informations.service';

@Injectable({
  providedIn: 'root'
})
export class ChargeDirecteService {
  host = this.informationGenerale.baseUrl + "/chargeDirectes/"
 
  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    public informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listChargeDirectes", request, this.tokenStorageService.getHeader());
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`, this.tokenStorageService.getHeader());
  }

  create(chargeDirecte,request): Observable<any> {
    for (let key in chargeDirecte) {
      request[key] = chargeDirecte[key]
    }
    return this.http.post(this.host + "newChargeDirecte", request, this.tokenStorageService.getHeader());
  }

  update(id, chargeDirecte,request): Observable<any> {
    for (let key in chargeDirecte) {
      request[key] = chargeDirecte[key]
      if (key == 'id') {
        id = request[key]
      }
    }
    return this.http.post(`${this.host + "modifierChargeDirecte"}/${id}`, request, this.tokenStorageService.getHeader());
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deleteChargeDirecte" }/${id}`, {}, this.tokenStorageService.getHeader());
  }

  parametre(id): Observable<any> {
    return this.http.get(`${this.host+ "getAllParametres"}/${id}`, this.tokenStorageService.getHeader());
  }
}
