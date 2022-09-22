import { Component, NgZone, OnInit } from '@angular/core';
import { NextConfig } from '../../../app-config';
import { Location } from '@angular/common';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';
import { Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public flatConfig: any;
  public navCollapsed: boolean;
  public navCollapsedMob: boolean;
  public windowWidth: number;

  constructor( 
    private router: Router, 
    private tokenStorageService:TokenStorageService, 
    private zone: NgZone, 
    private location: Location,
    private informationGeneral:InformationsService) {
    
      this.informationGeneral.setDashboard("client")
      
      this.flatConfig = NextConfig.config;
    let currentURL = this.location.path();
    const baseHerf = this.location['_baseHref'];
    
    if (baseHerf) {
      currentURL = baseHerf + this.location.path();
    }

    this.windowWidth = window.innerWidth;

    if (currentURL === baseHerf + '/layout/collapse-menu'
      || currentURL === baseHerf + '/layout/box'
      || (this.windowWidth >= 992 && this.windowWidth <= 1024)) {
      this.flatConfig.collapseMenu = true;
    }

    this.navCollapsed = (this.windowWidth >= 992) ? this.flatConfig.collapseMenu : false;
    this.navCollapsedMob = false;

  }

  ngOnInit() {

    /*setInterval(()=> { 
      console.log(this.tokenStorageService.getTokenFromLocalStorage())
      if(this.tokenStorageService.getToken() === ""){
        this.router.navigate(['/authentication/login'])
      }
    }, 5000);*/

    
    document.getElementsByTagName('html')[0].setAttribute("style","")
    document.getElementsByTagName('body')[0].setAttribute("style","")
   
    if (this.windowWidth < 992) {
      this.flatConfig.layout = 'vertical';
      setTimeout(() => {
        document.querySelector('.pcoded-navbar').classList.add('menupos-static');
        (document.querySelector('#nav-ps-flat-able') as HTMLElement).style.maxHeight = '100%'; // 100% amit
      }, 500);
    }

    setTimeout(() => {
      var token = this.getToken()
      var user = this.tokenStorageService.getUser()
      if(!user.role){
        this.deconnexion()
        return
      }

      if (!token) {
        this.deconnexion()
        return
      }
    },10);

    if(this.informationGeneral.exerciceCurrent == 0){
      this.openModalExercices()
    }
  }

  getToken(): any {
    return this.tokenStorageService.getToken()
  }

  deconnexion(): any {
    this.tokenStorageService.signOut()
    this.router.navigate(['/authentication/login'])
  }

  navMobClick() {
    if (this.windowWidth < 992) {
      if (this.navCollapsedMob && !(document.querySelector('app-navigation.pcoded-navbar').classList.contains('mob-open'))) {
        this.navCollapsedMob = !this.navCollapsedMob;
        setTimeout(() => {
          this.navCollapsedMob = !this.navCollapsedMob;
        }, 100);
      } else {
        this.navCollapsedMob = !this.navCollapsedMob;
      }
    }
  }

  isOpenModalExercices = false
  openModalExercices(){
    this.isOpenModalExercices = true
  }

  closeModalExercices(){
    this.isOpenModalExercices = false
    window.location.reload();
  }
  

}
