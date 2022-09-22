import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';
const USER_ADMIN_KEY = 'USER_ADMIN_KEY';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.scss']
})
export class SuperAdminComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router, private tokenStorageService: TokenStorageService, public informationsService: InformationsService,
    private http: HttpClient,
    private informationGeneral: InformationsService
  ) {
    this.informationGeneral.setDashboard("admin")
  }

  idSociete

  ngOnInit() {
    /*setInterval(()=> { 
      if(this.tokenStorageService.getToken() === ""){
        this.router.navigate(['/authentication/login-admin'])
      }
    }, 5000);*/

    document.getElementsByTagName('html')[0].setAttribute("style", "height:100%; min-height:100%;")
    document.getElementsByTagName('body')[0].setAttribute("style", "height:100%; min-height:100%;")

    var token = this.getToken()
    var role = this.tokenStorageService.isRoleSuperAdmin()
    if (!role) {
      this.deconnexion()
      return
    }

    if (!token) {
      this.deconnexion()
      return
    }

  }

  getToken(): any {
    return this.tokenStorageService.getToken()
  }

  deconnexion(): any {
    this.informationGeneral.logout()
    this.router.navigate(['/authentication/login-admin'])
  }

}