import { Component, OnInit,  Input, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { Output, EventEmitter } from '@angular/core';
import { Fournisseurshow } from 'src/app/model/modelComerce/fournisseur/fournisseurshow';

@Component({
  selector: 'app-article-html',
  templateUrl: './article-html.component.html',
  styleUrls: ['./article-html.component.scss']
})
export class ArticleHtmlComponent implements OnInit {

  public isCollapsed: boolean;
  public multiCollapsed1: boolean;
  public multiCollapsed2: boolean;

  @Output() getAllParametres = new EventEmitter<string>();
  @Output() getCodeBarre = new EventEmitter<string>();
  @Output() changePrixVHT = new EventEmitter<string>();
  
  @Input() isLoading

  @Input() idArticle = ""
 
  @Input() prixWithQuantites

  @Input() article:any
  @Input() erreurArticle

  @Input() uniteMesures

  @Input() categories

  @Input() familles 
  @Input() famillesCurrent

  @Input() sousFamilles
  @Input() sousFamillesCurrent

  @Input() categorieFamilles
  @Input() familleSousFamilles

  @Input() marques

  @Input() modeles
  @Input() modelesCurrent

  @Input() tauxTVAs
  @Input() tauxTVAsCurrent

  @Input() frais
  @Input() listFrais

  @Input() fournisseurs

  @Input() typeTiers = []

  @Input() variantes = []
  @Input() sousProduits = []

  @Input() titreCrud = this.fonctionPartagesService.titreCrud.ajouter

  constructor(private notificationToast: ToastNotificationService,
    private http: HttpClient,
    public informationGenerale: InformationsService,
    public fonctionPartagesService: FonctionPartagesService) { }

  ngOnInit(): void {
    this.isCollapsed = true;
    this.multiCollapsed1 = true;
    this.multiCollapsed2 = true;
  }

  getCodeBarreFunction(){
     this.getCodeBarre.emit()
  }

  isNumberInput(value) {
    var numberValue = Number(value);
    if (numberValue == NaN) {
      return false
    }
    return true;
  }

  clickIsFodec(){
    if(this.article.isFodec == "oui"){
      this.article.isFodec = "non"
    }else{
      this.article.isFodec = "oui"
    }

    this.changePrixVHT.emit()
  }

  
  //autocomplete categorie
  keySelectedCategorie = "libelle"
  objetCategorie = { libelle: "Libelle" }
  setCategorieID(id){
    this.sousFamillesCurrent = []
    this.famillesCurrent = []
    this.article.categorie = id
    var categorieFamillesSelected = this.categorieFamilles.filter(x => x.categorie == id)
    for (let i = 0; i < categorieFamillesSelected.length; i++) {
      var familles = this.familles.filter(x => x.id == categorieFamillesSelected[i].famille)
      if (familles.length > 0) {
        this.famillesCurrent.push(familles[0])
      }
    }
    this.article.famille = ""
    this.article.sousFamille = ""
  }

  //autocomplete famille
  keySelectedFamille = "libelle"
  objetFamille = { libelle: "Libelle" }
  setFamilleID(id){
    this.sousFamillesCurrent = []
    this.article.famille = id
    var familleSousFamillesSelected = this.familleSousFamilles.filter(x => x.famille == id)
    for (let i = 0; i < familleSousFamillesSelected.length; i++) {
      var sousFamilles = this.sousFamilles.filter(x => x.id == familleSousFamillesSelected[i].sousFamille)
      if (sousFamilles.length > 0) {
        this.sousFamillesCurrent.push(sousFamilles[0])
      }
    }
    this.article.sousFamille = ""
  }

  //autocomplete sousfamille
  keySelectedSousFamille = "libelle"
  objetSousFamille = { libelle: "Libelle" }
  setSousFamilleID(id) {
    this.article.sousFamille = id
  }

  //autocomplete marque
  keySelectedMarque = "libelle"
  objetMarque = { libelle: "Libelle" }
  setMarqueID(id) {
    this.article.marque = id
    this.modelesCurrent = this.modeles.filter(x => x.marque == id)
    this.article.modele = ""
  }

  //autocomplete modele
  keySelectedModele = "libelle"
  objetModele = { libelle: "Libelle" }
  setModeleID(id) {
    this.article.modele = id
  }

  //autocomplete modele
  keySelectedFournisseur = "raisonSociale"
  objetFournisseur = new Fournisseurshow()
  setFournisseurID(id) {
    this.article.fournisseur = id
  }

  //autocomplete uniteMesure
  keySelectedUniteMesure = "libelle"
  objetUniteMesure = { libelle: "Libelle" }
  setUniteMesureID1(id) {
    this.article.unite1 = id
  }

  //autocomplete uniteMesure
  setUniteMesureID2(id) {
    this.article.unite2 = id
  }

  //autocomplete tauxTVA
  keySelectedTauxTVA = "taux"
  objetTauxTVA = { libelle: "Libelle" , taux: "Taux" }
  setTauxTVA(id) {
    this.article.tauxTVA = this.tauxTVAs.filter((x) => x.id == id)[0].taux
    this.changePrixVHTFunction()
  }

  listAutoComplete = ['categorie', 'famille', 'sousFamille', 'marque', 'modele', 'unite1', 'unite2']

  getNumber(float) {
    return this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(float)
  }

  changePrixVenteTTC(){
    this.article.prixVenteHT  = Number(this.article.prixTTC) * 100 / (Number(this.article.tauxTVA) + 100) + this.article.redevance
    this.calculMantantTvaTTC()
  }

  changePrixVenteHT(){
    var rest = Number(this.article.prixVenteHT) - Number(this.article.prixAchat)
    this.calculMantantTvaTTC()
  }

  calculMantantTvaTTC(){
    var rest = Number(this.article.prixVenteHT) - Number(this.article.prixAchat)
    if(this.article.prixAchat != 0){
      var marge =  rest / this.article.prixRevient * 100
      this.article.marge = Number(this.getNumber(marge))
    }else{
      this.article.marge = Number(this.getNumber(0))
    }
  
    this.article.montantTVA = Number(this.getNumber(this.article.prixVenteHT * this.article.tauxTVA / 100))
    this.article.prixTTC = Number(this.getNumber(Number(this.article.montantTVA) + Number(this.article.prixVenteHT)))
    this.article.prixAchatTTC = Number(this.getNumber(Number(this.article.prixAchat) * this.article.tauxTVA / 100 + Number(this.article.prixAchat)) + this.article.redevance)
  }

  tabNumbers = ['prixVenteHT', 'tauxRemise', 'quantiteVente', 'tauxDC', 'redevance', 'prixTTC']

  fixedVerguleNumbers() {
    for (let j = 0; j < this.tabNumbers.length; j++) {
      this.article[this.tabNumbers[j]] = this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(this.article[this.tabNumbers[j]])
    }
  }

  showInput(event) {
    this.fonctionPartagesService.showInput(event)
    setTimeout(() => {
      this.fixedVerguleNumbers()
    }, 100)
  }

  //open modal ajout famille
  isOpenModalAjoutFamille = false
  idAjoutFamilleModal = ""

  closeModalAjoutFamille(){
    this.isOpenModalAjoutFamille = false
    this.getAllParametres.emit()
  }

  openModalAjoutFamille(){
     this.isOpenModalAjoutFamille = true
  }

  //open modal ajout sous famille
  isOpenModalAjoutSousFamille = false
  idAjoutSousFamilleModal = ""

  closeModalAjoutSousFamille(){
    this.isOpenModalAjoutSousFamille = false
    this.getAllParametres.emit()
  }

  openModalAjoutSousFamille(){
     this.isOpenModalAjoutSousFamille = true
  }

  //open modal ajout Element
  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  typeElement

  closeModalAjoutElement(){
    this.isOpenModalAjoutElement = false
    this.getAllParametres.emit()
  }

  getAllParametresFunction(){
    this.getAllParametres.emit()
  }

  openModalAjoutUniteMesure(){
     this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterUniteMesure
     this.isOpenModalAjoutElement = true
  }

  openModalAjoutCategorie(){
     this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterCategorie
     this.isOpenModalAjoutElement = true
  }

  openModalAjoutMarque(){
   this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterMarque
   this.isOpenModalAjoutElement = true
  }

  openModalAjoutModele(){
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterModele
    this.isOpenModalAjoutElement = true
  }

  openModalAjoutFournisseur(){
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterFournisseur
    this.isOpenModalAjoutElement = true
  }

  openModalAjoutTauxTVA(){
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterTauxTva
    this.isOpenModalAjoutElement = true
  }
  
  
  changePrixVHTFunction(){
    this.calculTotalFrais()
    this.changePrixVHT.emit()
  }

  calculTotalFrais(){
    var fraisTotal = 0
    for(let i = 0; i < this.listFrais.length; i++){
      fraisTotal += this.listFrais[i].montant
    }
    this.article.totalFrais = fraisTotal
    this.article.prixRevient = fraisTotal + this.article.prixAchat + this.article.redevance
    return fraisTotal
  }

  calculTotalFraisTTC(){
    var fraisTotalTTC = 0
    for(let i = 0; i < this.listFrais.length; i++){
      fraisTotalTTC += this.getMontantTTC(this.listFrais[i].frais, this.listFrais[i].montant) 
    }
    
    this.article.prixRevientTTC = fraisTotalTTC + this.article.prixAchatTTC + this.article.redevance

    return fraisTotalTTC
  }

  getMontantTTC(id, montant){
    for(let j = 0; j < this.frais.length; j++){
      if(this.frais[j].id == id){
        return montant + montant * this.frais[j].tauxTVA / 100
      }
    }
  }

  clickButtonOuiNon(valeur, key){
    this.article[key] = valeur
  }

  clickButtonOuiNon2(key){
    if(this.article[key] == "oui"){
      this.article[key] = "non"
    }else{
      this.article[key] = "oui"
    }
  }

  changePrixAchat(typeInput){
    if(this.checkPrixAchatCompatible()){
      return
    }
    this.article.prixFourn = this.article.prixAchat
    this.changePrixVHT.emit()
  }

  checkPrixAchatCompatible(){
    var prixAchat = Number(this.article.prixFourn) - Number(this.article.prixFourn) * Number(this.article.remiseF / 100)
    var prixDC = Number(this.getNumber(prixAchat * this.article.tauxDC / 100)) 
    var prixFodec = 0
    if(this.article.isFodec == "oui"){
      prixFodec = Number(this.getNumber(prixAchat * this.fonctionPartagesService.parametres.tauxFodec / 100)) 
    }else{
      prixFodec = Number(this.getNumber(0)) 
    }
      
    prixAchat = Number(this.getNumber( prixAchat + prixDC + prixFodec))

    if(Math.abs(prixAchat - this.article.prixAchat) < 0.001){
       return true
    }

    return false
  }

  setFournisseur(id){
    this.article.fournisseur = id
  }
 
}
