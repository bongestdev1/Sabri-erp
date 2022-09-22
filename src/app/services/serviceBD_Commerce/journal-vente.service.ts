import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../authentication/token-storage.service';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class JournalVenteService {
  host = this.informationGenerale.baseUrl + "/journalVente/"
 
  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private informationGenerale: InformationsService) {
  }


  journalVentes(request): Observable<any> {
    return this.http.post(this.host + "journalVentes", request, this.tokenStorageService.getHeader());
  }

  getALLParametresjournalVentes(request): Observable<any> {
    return this.http.post(this.host + "getALLParametresJournalVentes", request, this.tokenStorageService.getHeader());
  }
  
}
