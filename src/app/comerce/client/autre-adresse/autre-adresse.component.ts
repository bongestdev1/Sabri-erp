import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-autre-adresse',
  templateUrl: './autre-adresse.component.html',
  styleUrls: ['./autre-adresse.component.scss']
})

export class AutreAdresseComponent implements OnInit {
  @Input() autreAdresse
  isLoading = false
  page = 1
  idAutomatique = 0
  idCurrent = 0
  hideModal: any;

  pays = ""
  id = ""
  titre = ""
  gouvernorat = ""
  delegation = ""
  localite = ""
  codePostale = ""
  adresse = ""
  public visible = false;
  closeResult = '';
  
  modalReference: NgbModalRef;
  erreurpays = ""
  erreurtitre = ""
  erreurgouvernorat = ""
  erreurdelegation = ""
  erreurlocalite = ""
  erreurcodePostale = ""
  erreuradresse = ""
  constructor(private modalService: NgbModal) { }
  
  ngOnInit(): void {
  }

  tabEmpty = []
  inisialiserEmptyTab(){
    this.tabEmpty = []
    for(let i = 0; i < (6 - this.autreAdresse.length); i++){
      this.tabEmpty.push({})
    }
    return true
  }

  open(content) {
    this.pays = ""
    this.titre = ""
    this.gouvernorat = ""
    this.delegation = ""
    this.localite = ""
    this.codePostale = ""
    this.adresse = ""
    
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  openM(content, id) {
    var copieAdresse = this.autreAdresse.filter(x => x.id == id);

    var element = {adresse:"", codePostale:"", localite:"", pays:"", titre:"", gouvernorat:"", delegation:"",  }
    if(copieAdresse.length > 0){
      element = copieAdresse[0]
    }else{
      return
    }
    
    this.id = id
    this.pays = element.pays
    this.titre = element.titre
    this.gouvernorat = element.gouvernorat
    this.delegation = element.delegation
    this.localite = element.localite
    this.codePostale = element.codePostale
    this.adresse = element.adresse
    
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
    this.erreurpays = ""
    this.erreurtitre = ""
    this.erreurgouvernorat = ""
    this.erreurdelegation = ""
    this.erreurlocalite = ""
    this.erreurcodePostale = ""
    this.erreuradresse = ""
    var isValid = true

    var tabInput = ["pays", "titre", "gouvernorat", "delegation", "localite", "codePostale", "adresse"]

    for(let i =0; i < tabInput.length; i++){
      document.getElementById(tabInput[i]).classList.remove("border-erreur")
    }

    if (this.pays == ""){
      this.erreurpays = "Veuillez remplir ce champ"
      document.getElementById('pays').classList.add("border-erreur")
      isValid = false
    }
    if (this.titre == "") {
      this.erreurtitre = "Veuillez remplir ce champ"
      document.getElementById('titre').classList.add("border-erreur")
      isValid = false
    }
    if (this.gouvernorat == "") {
      document.getElementById('gouvernorat').classList.add("border-erreur")
      this.erreurgouvernorat = "Veuillez remplir ce champ"
      isValid = false
    }
    
    if (this.delegation == ""){
      document.getElementById('delegation').classList.add("border-erreur")
      this.erreurdelegation = "Veuillez remplir ce champ"
      isValid = false
    }

    if (this.localite == "") {
      document.getElementById('localite').classList.add("border-erreur")
      this.erreurlocalite = "Veuillez remplir ce champ"
      isValid = false
    }
    if (this.codePostale == "") {
      document.getElementById('codePostale').classList.add("border-erreur")
      this.erreurcodePostale = "Veuillez remplir ce champ"
      isValid = false
    }
    if (this.adresse == "") {
      document.getElementById('adresse').classList.add("border-erreur")
      this.erreuradresse = "Veuillez remplir ce champ"
      isValid = false
    }
    return isValid
  }

  enregistrerAdresse() {
    if (!this.controleInputs()) {
      return
    }
    this.idAutomatique++;
    this.autreAdresse.push({ id: this.idAutomatique, pays: this.pays, titre: this.titre, gouvernorat: this.gouvernorat,delegation :  this.delegation, localite: this.localite ,codePostale : this.codePostale, adresse: this. adresse});
    
    this.pays = ""
    this.titre = ""
    this.gouvernorat = ""
    this.delegation = ""
    this.localite = ""
    this.codePostale = ""
    this.adresse = ""

    this.JoinAndClose()
  }

  modifierAdresse(id) {
    if (!this.controleInputs()) {
      return
    }
  
    for(let i = 0; i < this.autreAdresse.length; i++){
      if(this.autreAdresse[i].id == this.id){
        this.autreAdresse[i] = { id: this.id, pays: this.pays, titre: this.titre, gouvernorat: this.gouvernorat,delegation :  this.delegation, localite: this.localite ,codePostale : this.codePostale, adresse: this.adresse}
      }
    }

    this.JoinAndClose()
  }

  supprimerAdresse(id){
    for(let i = 0; i < this.autreAdresse.length; i++){
      if(this.autreAdresse[i].id == id){
        this.autreAdresse.splice(i,1);
      }
    }
  }


}
