import { Component, OnInit,Input } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-complements',
  templateUrl: './complements.component.html',
  styleUrls: ['./complements.component.scss']
})
export class ComplementsComponent implements OnInit {

  @Input() complements

  isLoading = false
  page = 1
  idAutomatique = 0
  idCurrent = 0
  
  id=""
  type = "Tiers"
  valeur = ""
  imprimable = "oui"
  complement = ""

  clickImprimable(){
    if(this.imprimable == 'oui'){
      this.imprimable = 'non'
    }else{
      this.imprimable = 'oui'
    }
  }

  erreurValeur = ""
  erreurComplement = ""

  public visible = false;

  closeResult = '';
  modalReference: NgbModalRef;
  
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  tabEmpty = []
  inisialiserEmptyTab(){
    this.tabEmpty = []
    for(let i = 0; i < (6 - this.complements.length); i++){
      this.tabEmpty.push({})
    }
    return true
  }

  open(content) {
    this.id=""
    this.type = "Tiers"
    this.valeur = ""
    this.imprimable = "oui"
    this.complement = ""

    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  openM(content, complement) {
    this.id = complement.id
    this.type = complement.type
    this.valeur = complement.valeur
    this.imprimable = complement.imprimable
    this.complement = complement.complement
    
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  JoinAndClose() {
    this.modalReference.close();
  }

  controleInputs() {
    this.erreurValeur = ""
    this.erreurComplement = ""
    document.getElementById("complement").classList.remove("border-erreur")
    document.getElementById("valeur").classList.remove("border-erreur")

    var isValid = true

    if (this.valeur == "") {
      document.getElementById("valeur").classList.add("border-erreur")
      this.erreurValeur = "Veuillez remplir ce champ"
      isValid = false
    }

    if (this.complement == "") {
      document.getElementById("complement").classList.add("border-erreur")
      this.erreurComplement = "Veuillez remplir ce champ"
      isValid = false
    }
    return isValid
  }

  enregistrerComplement() {
    if (!this.controleInputs()) {
      return
    }
    
    this.idAutomatique++;
    this.complements.push({ id: this.idAutomatique, type: this.type, valeur: this.valeur, imprimable: this.imprimable, complement:this.complement });
    this.id=""
    this.type = "Tiers"
    this.valeur = ""
    this.imprimable = "oui"
    this.complement = ""

    this.erreurValeur = ""
    this.erreurComplement = ""

    this.JoinAndClose()
  }

  modifierComplement(id) {
    if (!this.controleInputs()) {
      return
    }

    for(let i = 0; i < this.complements.length; i++){
      if(this.complements[i].id == this.id){
        this.complements[i] = { id: this.id, type: this.type, valeur :this.valeur, imprimable: this.imprimable ,complement: this.complement}
      }
    }

    this.JoinAndClose()
  }
  
  supprimerComplement(id) {
    for(let i = 0; i < this.complements.length; i++){
      if(this.complements[i].id == id){
        this.complements.splice(i,1);
      }
    }
  }

}
