import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../authentication/token-storage.service';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class MouvementStockService {
  host = this.informationGenerale.baseUrl + "/mouvementStocks/"
 
  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listMouvementStocks", request, this.tokenStorageService.getHeader());
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`, this.tokenStorageService.getHeader());
  }

  create(request): Observable<any> {
    return this.http.post(this.host + "newMouvementStock", request, this.tokenStorageService.getHeader());
  }

  update(id, request): Observable<any> {
    return this.http.post(`${this.host + "modifierMouvementStock"}/${id}`, request, this.tokenStorageService.getHeader());
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host+ "deleteMouvementStock" }/${id}`, {}, this.tokenStorageService.getHeader());
  }

  parametre(id): Observable<any> {
    return this.http.get(`${this.host + "getAllParametres"}/${id}`, this.tokenStorageService.getHeader());
  }

  rappelStock(request): Observable<any> {
    return this.http.post(this.host + "rappelStock", request, this.tokenStorageService.getHeader());
  }

  valeurStock(request): Observable<any> {
    return this.http.post(this.host + "valeurStock", request, this.tokenStorageService.getHeader());
  }

  journalVentes(request): Observable<any> {
    return this.http.post(this.host + "journalVentes", request, this.tokenStorageService.getHeader());
  }

  getALLParametresjournalVentes(request): Observable<any> {
    return this.http.post(this.host + "getALLParametresJournalVentes", request, this.tokenStorageService.getHeader());
  }
  

}
