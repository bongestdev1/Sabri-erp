
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { InformationsService } from '../informations.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class Bonlivraison {

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient,
    private informationGeneral: InformationsService) { }


  GetBonLivraison(): Observable<any> {
    let API_URL = `http://erp.b2bservices.tn/bonLivraisons/getById/62d5098c578e2d727c4dec24`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {

        console.log("res", res)

        return res || {}
      }),
        catchError(this.handleError)
      )
  }


  GetDocument(idDocument, url): Observable<any> {
    let API_URL = this.informationGeneral.baseUrl + url + idDocument;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {

        console.log("res", res)

        return res || {}
      }),
        catchError(this.handleError)
      )
  }

  inisialiserParamliv(): Observable<any> {
    let API_URL = this.informationGeneral.baseUrl + "/paramliv/initialiserlistParamliv/" + this.informationGeneral.idSocieteCurrent;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {

        console.log("res", res)

        return res || {}
      }),
        catchError(this.handleError)
      )
  }

  deleteParamliv(): Observable<any> {
    let API_URL = this.informationGeneral.baseUrl + "/paramliv/deletelistParamliv/" + this.informationGeneral.idSocieteCurrent;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {

        console.log("res", res)

        return res || {}
      }),
        catchError(this.handleError)
      )
  }



  // Error 
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
