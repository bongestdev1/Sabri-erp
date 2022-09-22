import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObjetsAutocompleteService {

  constructor() { }

  objetTransporteur = {
    nom:"Nom",
    numVehicule:"num_Vehicule",
    gsm:"GSM",
    tel:"Tel",
    email:"Email",
  }
}
