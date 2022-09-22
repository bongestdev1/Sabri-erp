import { HttpClient, HttpResponse,HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { Societe } from "src/app/demo/dashboard/interface/Societe.interface";
import { InformationsService } from '../informations.service';



@Injectable({
  providedIn: "root",
})
export class StockService {
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private http: HttpClient,
    private informationGeneral: InformationsService) {}

    getDataStock(societe : Societe) : Observable<Societe> {

      var url = '/articles/calculValeurStock'
      let API_URL = this.informationGeneral.baseUrl + url;
      console.log(societe);

      return this.http.post<Societe>(API_URL, societe ,{ headers: this.httpHeaders } )
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


