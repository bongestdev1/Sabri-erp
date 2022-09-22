import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../authentication/token-storage.service';
import { InformationsService } from '../informations.service';


@Injectable({
  providedIn: 'root'
})
export class HistoriqueArticleAchatService {
  host = this.informationGenerale.baseUrl + "/historiqueArticleAchats/";

  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    public informationGenerale: InformationsService) {
  }

  getAll(request): Observable<any> {
    return this.http.post(this.host + "listHistoriqueArticleAchats", request, this.tokenStorageService.getHeader());
  }

  get(id): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${id}`, this.tokenStorageService.getHeader());
  }

  create(historiqueArticle, request): Observable<any> {
    for (let key in historiqueArticle) {
      request[key] = historiqueArticle[key];
    }
    return this.http.post(this.host + "newHistoriqueArticleAchat", request, this.tokenStorageService.getHeader());
  }

  update(id, historiqueArticle, request): Observable<any> {
    for (let key in historiqueArticle) {
      request[key] = historiqueArticle[key];
      if (key == 'id') {
        id = request[key];
      }
    }
    return this.http.post(`${this.host + "modifierHistoriqueArticleAchat"}/${id}`, request, this.tokenStorageService.getHeader());
  }

  delete(id): Observable<any> {
    return this.http.post(`${this.host + "deleteHistoriqueArticleAchat"}/${id}`, {}, this.tokenStorageService.getHeader());
  }

  parametre(id): Observable<any> {
    return this.http.get(`${this.host + "getAllParametres"}/${id}`, this.tokenStorageService.getHeader());
  }

  articles(id, request): Observable<any> {
    return this.http.post(this.host + "getByIdArticle", request, this.tokenStorageService.getHeader());
  }
}
