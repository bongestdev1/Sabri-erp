import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { CategorieService } from 'src/app/services/serviceBD_Commerce/categorie.service';

@Component({
  selector: 'app-details-categories',
  templateUrl: './details-categories.component.html',
  styleUrls: ['./details-categories.component.scss']
})
export class DetailsCategoriesComponent implements OnInit {

  id="";
  objectKeys = Object.keys;

  request = {
    libelle: "",
    ordre: "",
    familles: "",
  }

  categorie = {
    libelle: "",
    ordre: "",
    familles: "",
  }

  constructor(
    private categorieSer: CategorieService,
    public informationGenerale: InformationsService,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  
  isLoading = false
  getCategorie(id) {
    this.isLoading = true
    this.categorieSer.get(id)
    .subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          this.request = response.resultat
            console.log(response.resultat)
          for (let key in this.categorie) {
            this.categorie[key] = this.request[key]
          }
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      });

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id.length > 1){
      this.getCategorie(this.id)
    }
  }

}
