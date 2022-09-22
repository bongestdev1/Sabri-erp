import { Component, OnInit, Input, SimpleChanges , Output, EventEmitter } from '@angular/core';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-frais-article',
  templateUrl: './frais-article.component.html',
  styleUrls: ['./frais-article.component.scss']
})
export class FraisArticleComponent implements OnInit {

  @Output() changePrixVHT = new EventEmitter<string>();

  @Input() listFrais = []

  @Input() allFrais=[]

  @Input() isModifiable = "oui"

  constructor(private fonctionPartagesService: FonctionPartagesService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("this.listFrais",this.listFrais, this.allFrais)
    for(let i = 0; i < this.allFrais.length; i++){
       if(this.listFrais.filter(x => x.frais == this.allFrais[i].id).length == 0){
         this.listFrais.push({frais:this.allFrais[i].id, montant:0 })
       }
    }
  }

  changePrix(){
    this.changePrixVHT.emit()
  }

  getNumber(float){
    return this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(float)
  }

  fixedVerguleNumbers(){
  
    for(let j = 0; j < this.listFrais.length; j++){
      this.listFrais[j].montant = this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(this.listFrais[j].montant) 
    }

  }

  showInput2(event){
    this.fonctionPartagesService.showInput2(event)
    setTimeout( () => { 
      this.fixedVerguleNumbers()
    },100)
  }

  showInput(event){
    this.fonctionPartagesService.showInput(event)
    setTimeout( () => { 
      this.fixedVerguleNumbers()
    },100)
  }

  getType(id){
    for(let j = 0; j < this.allFrais.length; j++){
      if(this.allFrais[j].id == id){
        return this.allFrais[j].type
      }
    }
  }

  getTaux(id){
    for(let j = 0; j < this.allFrais.length; j++){
      if(this.allFrais[j].id == id){
        return this.allFrais[j].tauxTVA
      }
    }
  }

  getMontantTTC(id, montant){
    for(let j = 0; j < this.allFrais.length; j++){
      if(this.allFrais[j].id == id){
        return montant + montant * this.allFrais[j].tauxTVA / 100
      }
    }
  }

}
