import { Component, OnInit,  Input, SimpleChanges } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-input-number-vergule',
  templateUrl: './input-number-vergule.component.html',
  styleUrls: ['./input-number-vergule.component.scss']
})
export class InputNumberVerguleComponent implements OnInit {

  constructor(public fonctionPartagesService:FonctionPartagesService) {
  }

  @Output() change = new EventEmitter<string>();
  @Output() ngModelChange = new EventEmitter<string>();
  @Input() field
  @Input() key = ""
  @Input() idUnique = ""
  @Input() messageErreur = ""
  @Input() isQuantite = "0"
  @Input() isTauxTva = "non"
  @Input() isEditable = true
  
  ngOnInit(): void {
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   console.log(this.field)
  // }

  changeValueFunction(){
    this.change.emit()
  }

  ngModelChangeValueFunction(){
    this.ngModelChange.emit()
  }

  showInput2(event) {
    this.fonctionPartagesService.showInput2(event)
    setTimeout(() => {
      this.fixedVerguleNumber()
    }, 100)
  }

  blurInput2(event) {
    this.fonctionPartagesService.blurInput2(event)
    setTimeout(() => {
      this.fixedVerguleNumber()
    }, 100)
  }

  fixedVerguleNumber(){
    if(this.isTauxTva == "non"){
      if(this.isQuantite == "0"){
        this.field[this.key] = Number(this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(this.field[this.key]))
      }else{
        this.field[this.key] = Number(this.fonctionPartagesService.getFormaThreeAfterVerguleQuantite(this.field[this.key]))
      }
    }else{
      this.field[this.key] = Number(this.getFormaAfterVerguleNomber(2, this.field[this.key]))
    } 
  }

  getFormaAfterVerguleNomber(nbrChiffre, float){
    var number = Number(float);
    return number.toFixed(nbrChiffre)
  }

  getNumberWithVergile(){
    if(this.isTauxTva == "non"){
       if(this.isQuantite == "0"){
         return this.fonctionPartagesService.getNumerWithEspaceEntreTroisChiffre(this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(this.field[this.key]))
       }else{
         return this.fonctionPartagesService.getNumerWithEspaceEntreTroisChiffre(this.fonctionPartagesService.getFormaThreeAfterVerguleQuantite(this.field[this.key]))
       }
    }else{
      return this.getFormaAfterVerguleNomber(2, this.field[this.key])
    }
  }
  
}
