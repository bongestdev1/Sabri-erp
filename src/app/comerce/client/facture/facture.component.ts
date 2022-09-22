import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent implements OnInit {

  @Input() facture = []
  isLoading = false
  page = 1
  idAutomatique = 0
  idCurrent = 0
  public visible = false;
  closeResult = '';

  constructor() { }

  ngOnInit(): void {
  }

  controleInputs() {
   
    var isValid = true

   
    return isValid
  }

  enregistrerFacture()
  {
    if (!this.controleInputs()) {
      return
    }
    this.idAutomatique++;
    this.facture.push({ id: this.idAutomatique, });
  }
}
