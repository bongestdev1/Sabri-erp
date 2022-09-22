import { ChargeSocieteService } from './../../../../../services/serviceBD_Commerce/chargeSociete.service';
import {Component, OnInit} from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavRightComponent implements OnInit {

  user:any = {nom:"", prenom:"", role:{libelle:""}}

  constructor(
    private http: HttpClient, 
    private router:Router,
    public informationsService : InformationsService , 
    public tokenStorageService: TokenStorageService) 
    
    { 
    this.user = this.tokenStorageService.getUser()
    this.getSocietes()
  }

  societes = []

  getSocietes() {
    this.http.get(this.informationsService.baseUrl + "/societes/allSocietesUtilisateur", this.tokenStorageService.getHeader()).subscribe(

      res => {
        let resultat: any = res
        if (resultat.status) {
          var societes = resultat.societes
   
          societes = societes.filter(x => x.id === this.informationsService.idSocieteCurrent)
          if(societes.length > 0){
            this.informationsService.setSocieteCurrentObject(societes[0])
          }
          this.societes = resultat.societes
        }
      }, err => {
      }

    );
  }

  ngOnInit() { }

  reloadPage(){
    window.location.reload()
  }

  logout(){
    this.router.navigate(['/authentication/login']);
    console.log("logout")
    this.informationsService.logout()
  }
}
