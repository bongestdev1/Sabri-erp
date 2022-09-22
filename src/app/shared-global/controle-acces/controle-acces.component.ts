import { Component, OnInit, Input, SimpleChanges , Output, EventEmitter, AfterContentChecked,  VERSION, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';

@Component({
  selector: 'app-controle-acces',
  templateUrl: './controle-acces.component.html',
  styleUrls: ['./controle-acces.component.scss']
})
export class ControleAccesComponent implements OnInit {

  @Input() avoirAccee

  constructor(
    private tokenStorageService:TokenStorageService,
    private router:Router,
    private notificationToast:ToastNotificationService
  ) { 
  }

  ngOnInit(): void {

    
  }

  
}
