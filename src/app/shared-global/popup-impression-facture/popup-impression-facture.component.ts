import { Component, OnInit, Input, ViewChild, SimpleChanges, ElementRef } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
//import { UserService } from '../../../services/user/user.service';
import { Router, Event } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { GenerationPdfFactureService } from 'src/app/services/generation-pdf-facture.service';

@Component({
  selector: 'app-popup-impression-facture',
  templateUrl: './popup-impression-facture.component.html',
  styleUrls: ['./popup-impression-facture.component.scss']
})
export class PopupImpressionFactureComponent implements OnInit {

  

  constructor(
    public generationPdfFacture: GenerationPdfFactureService, 
    private router:Router,  
    private http: HttpClient,
    public fonctionPartagesService:FonctionPartagesService){ 
  
  }
  
  ngOnInit(): void {
   
  }

}