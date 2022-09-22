import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../authentication/token-storage.service';
import { InformationsService } from '../informations.service';

@Injectable({
  providedIn: 'root'
})
export class JournalAchatService {
  host = this.informationGenerale.baseUrl + "/journalAchat/"
 
  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private informationGenerale: InformationsService) {
  }


  journalAchats(request): Observable<any> {
    return this.http.post(this.host + "journalAchats", request, this.tokenStorageService.getHeader());
  }

  getALLParametresjournalAchats(request): Observable<any> {
    return this.http.post(this.host + "getALLParametresJournalAchats", request, this.tokenStorageService.getHeader());
  }
  
}
