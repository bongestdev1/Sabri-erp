import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { InformationsService } from '../informations.service';
import { ParamHeaderFooterPdf } from 'src/app/model/modelCommerce/ParamHeaderFooterPdf';
import { Subject } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {  HttpHeaders, HttpErrorResponse } from '@angular/common/http';
 
@Injectable({
  providedIn: 'root'
})
export class ParampdfService {
  private ParamHeaderFooterPdfs: ParamHeaderFooterPdf[] = [];
  private ParamHeaderFooterPdfs$ = new Subject<ParamHeaderFooterPdf[]>();
  host = this.informationGenerale.baseUrl + "/parametrePdf/"
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient,
    private informationGenerale: InformationsService) {
  }
  currentID;
  // currentID(idT){
  //   let id = idT;
  //   console.log("idT"+idT);
  //   console.log("test id service current id"+id);
  //   return idT;
  //console.log("id"+id);
  //}

  get(id): Observable<any> {
    console.log("test id service" + id);
    return this.http.get(`${this.host + "getById"}/${'62e29e6800311c10341b4347'}`);
  }

  getParametresGenerale(): Observable<any> {
    return this.http.get(`${this.host + "getById"}/${this.informationGenerale.idSocieteCurrent}`);
  }

  //   create(transporteur,request): Observable<any> {
  //     return this.http.post(this.host + "newTransporteur", request);
  //   }

  update(id:any, data:any): Observable<any> {
    console.log("test id service modifier" + id);
    return this.http.post(`${this.host + "modifierParamPDF"}/${id}`, data,{ headers: this.httpHeaders })
    .pipe(
      catchError(this.handleError)
    )
  }
  //   delete(id): Observable<any> {
  //     return this.http.post(`${this.host+ "deleteTransporteur" }/${id}`, {});
  //   }

  //   parametre(id): Observable<any> {
  //     return this.http.get(`${this.host+ "getAllParametres"}/${id}`);
  //   }

  updateProfile(id:any, nom: string,email: string, tel1: string,tel2: string,fax : string,adresse: string,matricule: string,rib: string, name: string, image: File): void {
    const ParamHeaderFooterPdfData = new FormData();
    ParamHeaderFooterPdfData.append("nomsociale", nom);
    ParamHeaderFooterPdfData.append("adresseEmail", email);
    ParamHeaderFooterPdfData.append("numTel1", tel1);
    ParamHeaderFooterPdfData.append("numTel2", tel2);
     ParamHeaderFooterPdfData.append("numFax", fax);
    ParamHeaderFooterPdfData.append("adresse", adresse);
    ParamHeaderFooterPdfData.append("matriculefisc", matricule);
    ParamHeaderFooterPdfData.append("rib", rib);
    ParamHeaderFooterPdfData.append("name", name);
   
    if(image){
      ParamHeaderFooterPdfData.append("image", image, name);
    }
    
    this.http.post<{ ParamHeaderFooterPdf: ParamHeaderFooterPdf }>(`${this.host + "modifierParamPDF"}/${id}`, ParamHeaderFooterPdfData)
      .subscribe((ParamHeaderFooterPdfData) => {
        console.log(ParamHeaderFooterPdfData)
       /* const ParamHeaderFooterPdf: ParamHeaderFooterPdf = {
          
          nomsociale: ParamHeaderFooterPdfData.ParamHeaderFooterPdf.nomsociale, 
          adresseEmail: ParamHeaderFooterPdfData.ParamHeaderFooterPdf.adresseEmail,
          numTel1: ParamHeaderFooterPdfData.ParamHeaderFooterPdf.numTel1,
          numTel2: ParamHeaderFooterPdfData.ParamHeaderFooterPdf.numTel2,
          numFax: ParamHeaderFooterPdfData.ParamHeaderFooterPdf.numFax,
          adresse: ParamHeaderFooterPdfData.ParamHeaderFooterPdf.adresse,
          matriculefisc: ParamHeaderFooterPdfData.ParamHeaderFooterPdf.matriculefisc,
          rib: ParamHeaderFooterPdfData.ParamHeaderFooterPdf.rib,
          name: ParamHeaderFooterPdfData.ParamHeaderFooterPdf.name,
          imagePath: ParamHeaderFooterPdfData.ParamHeaderFooterPdf.imagePath,
        };
        this.ParamHeaderFooterPdfs.push(ParamHeaderFooterPdf);
        this.ParamHeaderFooterPdfs$.next(this.ParamHeaderFooterPdfs);
      */});
  }

  addProfile(nom: string,email: string, tel1: string,tel2: string,fax : string,adresse: string,matricule: string,rib: string, name: string, image: File): void {
    const ParamHeaderFooterPdfData = new FormData();
    ParamHeaderFooterPdfData.append("nomsociale", nom);
    ParamHeaderFooterPdfData.append("adresseEmail", email);
    ParamHeaderFooterPdfData.append("numTel1", tel1);
    ParamHeaderFooterPdfData.append("numTel2", tel2);
     ParamHeaderFooterPdfData.append("numFax", fax);
    ParamHeaderFooterPdfData.append("adresse", adresse);
    ParamHeaderFooterPdfData.append("matriculefisc", matricule);
    ParamHeaderFooterPdfData.append("rib", rib);
    ParamHeaderFooterPdfData.append("name", name);
    ParamHeaderFooterPdfData.append("image", image, name);
    
    this.http.post<{ ParamHeaderFooterPdf: ParamHeaderFooterPdf }>(`${this.host + "newParamPDF"}`, ParamHeaderFooterPdfData)
      .subscribe((ParamHeaderFooterPdfData) => {
        const ParamHeaderFooterPdf: ParamHeaderFooterPdf = {
          
          nomsociale: ParamHeaderFooterPdfData.ParamHeaderFooterPdf.nomsociale, 
          adresseEmail: ParamHeaderFooterPdfData.ParamHeaderFooterPdf.adresseEmail,
          numTel1: ParamHeaderFooterPdfData.ParamHeaderFooterPdf.numTel1,
          numTel2: ParamHeaderFooterPdfData.ParamHeaderFooterPdf.numTel2,
          numFax: ParamHeaderFooterPdfData.ParamHeaderFooterPdf.numFax,
          adresse: ParamHeaderFooterPdfData.ParamHeaderFooterPdf.adresse,
          matriculefisc: ParamHeaderFooterPdfData.ParamHeaderFooterPdf.matriculefisc,
          rib: ParamHeaderFooterPdfData.ParamHeaderFooterPdf.rib,
          name: ParamHeaderFooterPdfData.ParamHeaderFooterPdf.name,
          imagePath: ParamHeaderFooterPdfData.ParamHeaderFooterPdf.imagePath,
        };
        this.ParamHeaderFooterPdfs.push(ParamHeaderFooterPdf);
        this.ParamHeaderFooterPdfs$.next(this.ParamHeaderFooterPdfs);
      });
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
