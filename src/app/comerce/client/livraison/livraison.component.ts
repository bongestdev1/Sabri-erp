import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.component.html',
  styleUrls: ['./livraison.component.scss']
})
export class LivraisonComponent implements OnInit {
  
  @Input() livraison = []
  isLoading = false
  page = 1
  idAutomatique = 0
  idCurrent = 0
  public visible = false;
  
  

  constructor() { }

  ngOnInit(): void {
  }

  controleInputs() {
   
    var isValid = true

  
    return isValid
  }

  enregistrerLivraison()
  {
    if (!this.controleInputs()) {
      return
    }
    this.idAutomatique++;
    this.livraison.push({ id: this.idAutomatique, });
  }

}
