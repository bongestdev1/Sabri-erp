import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { FonctionPartagesService } from './services/fonction-partages.service';
import { TokenStorageService } from './services/authentication/token-storage.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  lienGet = "/parametres/getConfiguration/"
 
  constructor(
    private http: HttpClient, 
    private router: Router,
    public informationGenerale: InformationsService,
    private fonctionPartagesService:FonctionPartagesService,
    private tokenStorageService: TokenStorageService) {
    
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }

      /*if(this.router.url == "/" || this.router.url == "" || this.router.url == null){
      //   this.router.navigate(['/authentication/login'])
      }
      
      window.scrollTo(0, 0);

      /*if(this.tokenStorageService.getUser()?.id == null || this.tokenStorageService.getUser()?.id == undefined || this.tokenStorageService.getUser()?.id == "" ){
        //this.router.navigate(['/authentication/login'])
      }*/
   
    });
  }
  


  
}
