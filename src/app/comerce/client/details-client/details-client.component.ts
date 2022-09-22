import {Component, OnInit, Input, Output, EventEmitter,  ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { Client } from 'src/app/model/modelComerce/client/client';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';

@Component({
  selector: 'app-details-client',
  templateUrl: './details-client.component.html',
  styleUrls: ['./details-client.component.scss']
})
export class DetailsClientComponent implements OnInit {
  @Input() lienGetById = "/clients/getByIdWithTypeTiersModeReglementSecteur/"
  @Input() titre = "Details Client"
  @Input() isPopup = false

  @Output() closeModal = new EventEmitter<string>();

  @Input() isOpenModal = false

  @ViewChild('conteneurClient2') conteneurClient2: HTMLElement;
  
  autreAdresse = []
  contacts = []
  complements = []

  @Input() id="";
  objectKeys = Object.keys;

  request = new Client()

  client = new Client()

  constructor(private http: HttpClient,
    public informationGenerale: InformationsService,
    private route: ActivatedRoute,
    private tokenStorageService:TokenStorageService,
    public fonctionPartages:FonctionPartagesService) {
  }

  isLoading = false

  getClient(id) {
    this.isLoading = true
    this.http.get(this.informationGenerale.baseUrl + this.lienGetById+id,this.tokenStorageService.getHeader()).subscribe(

      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          this.request = response.resultat
          for (let key in this.client) {
            this.client[key] = this.request[key]
          }
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  ngOnInit(): void {
    if(!this.isPopup){
      this.id = this.route.snapshot.paramMap.get('id');
    }
   
    if(this.id != null && this.id.length > 1){
      this.getClient(this.id)
    }
  }
}

