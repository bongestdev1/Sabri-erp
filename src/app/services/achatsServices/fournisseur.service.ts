import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse,HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Dashboard } from "src/app/demo/dashboard/interface/dashboard.interface";
import { catchError, map } from 'rxjs/operators';
import { InformationsService } from '../informations.service';
import { Societe } from 'src/app/demo/dashboard/interface/Societe.interface';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    private informationGeneral: InformationsService,


  ) { }





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
