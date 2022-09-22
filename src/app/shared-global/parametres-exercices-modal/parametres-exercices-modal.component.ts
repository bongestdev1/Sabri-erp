import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
//import { UserService } from '../../../services/user/user.service';
import { Router, Event } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';
import { InformationsService } from 'src/app/services/informations.service';
import { SessionCaisseService } from 'src/app/services/serviceBD_Commerce/sessionCaisse.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-parametres-exercices-modal',
  templateUrl: './parametres-exercices-modal.component.html',
  styleUrls: ['./parametres-exercices-modal.component.scss']
})
export class ParametresExercicesModalComponent implements OnInit {

  objectKeys = Object.keys;

  @Input() isOpenModalAdd = false

  @Input() isLoading = false

  @Input() name = ""

  @Input() request

  @Input() requestErreur

  classCss = "modalParametresExercices"

  @Output() addItem = new EventEmitter<string>();

  @Output() closeModalAdd = new EventEmitter<string>();

  constructor(
    private router: Router,
    private http: HttpClient,
    public informationsServices: InformationsService,
    private tokenStorageService: TokenStorageService,
    public fonctionPartagesService: FonctionPartagesService) {

  }

  add() {
    this.addItem.emit();
  }

  closeAdd() {
    this.closeModalAdd.emit();
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {

    for (let key in this.request) {
      this.request[key] = ""
    }

    if (this.isOpenModalAdd) {
      this.classCss = "modalParametresExercices modalParametresExercices-open"
      this.getExercices()
    } else {
      this.classCss = "modalParametresExercices"
    }
  }


  exercices = []
  exercice = 0

  getExercices() {
    this.isLoading = true
    this.http.get(this.informationsServices.baseUrl + "/societes/allExercicesUtilisateur", this.tokenStorageService.getHeader()).subscribe(

      res => {
        let resultat: any = res
        if (resultat.status) {
          this.isLoading = false
          this.exercices = resultat.exercices

          if (this.exercices.length != 0) {
            this.informationsServices.setExerciceCurrent3(this.exercices[0].exercice)
            this.exercice = this.exercices[0].exercice

            for (let item in this.exercices) {
              var itemA: any = item

              if((new Date()).getFullYear().toString() == itemA.exercice){
                this.informationsServices.setExerciceCurrent3(itemA.exercice)
                
                this.exercice = itemA.exercice
              }
            }

            if(this.exercices.length == 1){
              this.informationsServices.setExerciceCurrent3(this.exercice)
              setTimeout(() => {
                this.closeAdd()
              },1000);
            }

          } else {
            if (!this.informationsServices.verifierAccee('ajouterExercice')) {
              alert("Aucun exercice ne trouvé Veuillez de contacter administrateur pour ajouter des nouveaux exercices!!")
              this.tokenStorageService.signOut()
              window.location.reload();
            } else {
              alert("Aucun exercice ne trouvé Veuillez d'ajouter des nouveaux exercices !!")
            }
          }
        }
      }, err => {
        this.isLoading = false
      }

    );
  }

  changeExercice() {
    this.informationsServices.exerciceCurrent = this.exercice
    this.closeAdd()
  }


}