import { Component, OnInit, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-client-html',
  templateUrl: './client-html.component.html',
  styleUrls: ['./client-html.component.scss']
})
export class ClientHtmlComponent implements OnInit {

  constructor(
    public fonctionPartagesService: FonctionPartagesService) {
  }

  ngOnInit(): void {
  }

  @Output() getAllParametres = new EventEmitter<string>();

  @Input() isLoading = false
  @Input() allPersonnels = []
  @Input() allSecteurs = []
  @Input() allModeReglements = []
  @Input() allTypeTiers = []
  @Input() allClients = []
  @Input() allTypeContacts = []
  @Input() tabCode = []
  @Input() tabMatricule = []
  @Input() tabRaisonSociale = []
  @Input() allConditionReglements = []
  @Input() autreAdresse
  @Input() contacts
  @Input() complements
  @Input() request: any
  @Input() client: any
  @Input() erreurClient

  @Input() isModifier = true
  
  @Input() modeTiere = this.fonctionPartagesService.modeTiere.client

  getCodeFunction() {
    if (this.isModifier == true) {
      this.client.code = this.request.code
    } else {
      this.getAllParametres.emit()
    }
  }

  showInput(event) {
    this.fonctionPartagesService.showInput(event)
    setTimeout(() => {
      this.client.plafondCredit = Number(this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(this.client.plafondCredit))
    }, 100)
  }

  clickExemptTimbreFiscale() {
    if (this.client.exemptTimbreFiscale == "oui") {
      this.client.exemptTimbreFiscale = "non"
    } else {
      this.client.exemptTimbreFiscale = "oui"
    }
  }

  clickExemptTVA() {
    if (this.client.exemptTVA == "oui") {
      this.client.exemptTVA = "non"
    } else {
      this.client.exemptTVA = "oui"
    }
  }
  clickFacture()
  {
    if (this.client.facture == "oui") {
      this.client.facture = "non"
    } else {
      this.client.facture = "oui"
    }
  }

  //autocomplete SecteurActivite
  keySelectedSecteurActivite = "typeS"
  objetSecteurActivite = {
    typeS: "active",
  }
  setSecteurActiviteID(id) {
    this.client.secteur = id
  }

  //autocomplete ModeReglement
  keySelectedModeReglement = "libelle"
  objetModeReglement = {
    libelle: "Libelle",
    ordre: "Ordre",
    valeurRetiree: "Valeur Retiree",
    tierNecessaire: "Tier Necessaire",
  }
  setModeReglementID(id) {
    this.client.modeReglement = id
  }

  //autocomplete Agent Premier Contact
  keySelectedAgentPremierContact = "nom"
  objetAgentPremierContact = {
    nom: "Nom",
    prenom: "Prenom",
    role: "Role",
    email: "Email",
  }
  setAgentPremierContactID(id) {
    this.client.agentPremierContact = id
  }

  //autocomplete Agent Commercial
  keySelectedAgentCommercial = "nom"
  objetAgentCommercial = {
    nom: "Nom",
    prenom: "Prenom",
    role: "Role",
    email: "Email",
  }
  setAgentCommercialID(id) {
    this.client.agentCommercial = id
  }

  //autocomplete Agent Recouvrement
  keySelectedAgentRecouvrement = "nom"
  objetAgentRecouvrement = {
    nom: "Nom",
    prenom: "Prenom",
    role: "Role",
    email: "Email",
  }
  setAgentRecouvrementID(id) {
    this.client.agentRecouvrement = id
  }

  //start modal ajout Element
  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  typeElement = ""

  closeModalAjoutElement() {
    this.isOpenModalAjoutElement = false
    this.getAllParametres.emit()
  }

  openModalAjoutSecteur() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterSecteur
    this.isOpenModalAjoutElement = true
  }

  openModalAjoutModeReglement() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterModeReglement
    this.isOpenModalAjoutElement = true
  }

  openModalAjoutAgentPremierContact() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterAgentPremierContact
    this.isOpenModalAjoutElement = true
  }

  openModalAjoutAgentCommercial() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterAgentCommercial
    this.isOpenModalAjoutElement = true
  }

  openModalAjoutAgentRecouvrement() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterAgentRecouvrement
    this.isOpenModalAjoutElement = true
  }

  changePrixRisque()
  {
    this.client.plafondRisque = this.client.plafondCredit + this.client.plafondEnCours
  }
}
