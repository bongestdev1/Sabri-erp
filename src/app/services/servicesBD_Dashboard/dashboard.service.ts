import { Societe } from 'src/app/demo/dashboard/interface/Societe.interface';
import { HttpClient, HttpResponse,HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { Dashboard } from "src/app/demo/dashboard/interface/dashboard.interface";
import { Client } from "src/app/demo/dashboard/interface/Client.interface";
import { catchError, map } from 'rxjs/operators';
import { InformationsService } from '../informations.service';



@Injectable({
  providedIn: "root",
})
export class DashboardService {
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private http: HttpClient,
    private informationGeneral: InformationsService) {}

  getChiffreAffaireParMois(dashboard : Dashboard) : Observable<Dashboard> {

    var url = '/bonLivraisons/calculChiffreAffaireParMois/'
    let API_URL = this.informationGeneral.baseUrl + url;
    console.log(dashboard);

    return this.http.post<Dashboard>(API_URL, dashboard, { headers: this.httpHeaders } )
      .pipe(map((res: any) => {

        console.log("res", res)

        return res || {}
      }),
      catchError(this.handleError)
      )
  }

  getChiffreAffaireParAns(dashboard : Dashboard) : Observable<Dashboard> {

    var url = '/bonLivraisons/calculChiffreAffaireParAns/'
    let API_URL = this.informationGeneral.baseUrl + url;
    console.log(dashboard);

    return this.http.post<Dashboard>(API_URL, dashboard, { headers: this.httpHeaders } )
      .pipe(map((res: any) => {

        console.log("res", res)

        return res || {}
      }),
      catchError(this.handleError)
      )
  }

  getTopClient(client : Client) : Observable<Client>{

    var url = '/bonLivraisons/calculClientTransactions'
    let API_URL = this.informationGeneral.baseUrl + url;
    console.log(client);
    return this.http.post<Client>(API_URL, client, { headers: this.httpHeaders } )
    .pipe(map((res: any) => {

      console.log("res", res)

      return res || {}
    }),
    catchError(this.handleError)
    )
  }

  getDLMsClients (societe : Societe) : Observable<Societe>{
    console.log(societe.id);
    var url = `/dashboard/getDLMsClients/${societe.id}`
    let API_URL = this.informationGeneral.baseUrl + url;

    return this.http.get<Client>(API_URL)
    .pipe(map((res: any) => {

      console.log("res", res)

      return res || {}
    }),
    catchError(this.handleError)
    )
  }


  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
