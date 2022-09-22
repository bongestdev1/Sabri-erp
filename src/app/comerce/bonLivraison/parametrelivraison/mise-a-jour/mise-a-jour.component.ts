import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, NgZone } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { paramliv } from 'src/app/model/modelCommerce/paramliv';
import { InformationsService } from 'src/app/services/informations.service';
import { Paramliv } from 'src/app/services/serviceBD_Commerce/paramliv.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { ModifierParamComponent } from '../modifier-param/modifier-param.component';
import { ValiderParamComponent } from '../valider-param/valider-param.component';
@Component({
  selector: 'app-mise-a-jour',
  templateUrl: './mise-a-jour.component.html',
  styleUrls: ['./mise-a-jour.component.scss']
})
export class MiseAJourComponent implements OnInit {
  paramlivFormGroup: FormGroup;
  @Input() idFormat = ""
  @Input() typeDoc = ""

  objectKeys = Object.keys;

  idT = this.paramlivser.currentID;

  @Output() closeModalModifierParamliv = new EventEmitter<string>();

  @Input() id = ""
  @Input() isOpenModalAjoutparamliv = false

  closeModifierparamliv() {
    this.closeModalModifierParamliv.emit();


  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.id.length > 1) {
      this.getParamlivraison(this.id)
    }


  }

  request = new paramliv()
  paramlivraison = new paramliv()
  erreurparamliv = {

    nom: "",
    ordre: "",
    width: ""
  }

  paramlivId;
  private routeSub: Subscription;

  constructor(
    private ngZone: NgZone,
    private param: ModifierParamComponent,
    public informationGenerale: InformationsService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationToast: ToastNotificationService,
    private paramlivser: Paramliv,
    
   
    private close : ModifierParamComponent) {
  }
  varverif = ''
  getParamlivraison(id) {
    this.isLoading = true
    this.paramlivser.get(this.id)
      .subscribe(
        res => {
          this.isLoading = false
          let response: any = res
          if (response.status) {
            this.request = response.resultat
            for (let key in this.paramlivraison) {
              this.paramlivraison[key] = this.request[key]

            }
          }



        },

        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }




  
  ngOnInit(): void {


    this.getParamlivraison(this.id);

    // if (this.id.length > 1) {
    //   this.getTransporteur(this.id)
    // }

    this.paramliv = this.param.getParamliv(this.idFormat, this.typeDoc)



    for (let i = 0; i < this.paramliv.length; i++) {
      if (this.paramliv[i].visibilite === "oui") {

        this.TabGener.push({ champ: this.paramliv[i].champ, libelle: this.paramliv[i].libelle, width: this.paramliv[i].width, ordre: this.paramliv[i].ordre, alignm: this.paramliv[i].alignement })

      }

    }

  }

  controleInputs() {
    for (let key in this.erreurparamliv) {
      this.erreurparamliv[key] = ""
      if (document.getElementById(key) != null) {
        document.getElementById(key).classList.remove("border-erreur")
      }
    }
    var isValid = true
    for (let key in this.erreurparamliv) {
      if (this.paramlivraison[key] == "") {
        if (document.getElementById(key) != null) {
          document.getElementById(key).classList.add("border-erreur")
        }
        this.erreurparamliv[key] = "Veuillez remplir ce champ"
        isValid = false
      }
    }


    if (this.verifierwidth() == false) {
      isValid = false
      this.erreurparamliv.width = "Attention vous risquez de passer le max (100)"
      if (document.getElementById('width') != null) {
        document.getElementById('width').classList.add("border-erreur")
      }
    }
    if (this.verifierordre() == false) {
      isValid = false
      this.erreurparamliv.ordre = "Votre ordre déja existe"
      if (document.getElementById('ordre') != null) {
        document.getElementById('ordre').classList.add("border-erreur")
      }
    }

    return isValid
  }

  isLoading = false

  paramliv: any = []
  TabGener: any = []


  verif

  verifwid
  verifierordre() {



    //this.TabGener = this.TabGener.filter((X) => X.ordre != this.paramlivraison.ordre)

    for (let i1 = 0; i1 < this.TabGener.length; i1++) {

      if (this.paramlivraison.ordre == this.TabGener[i1].ordre) {


        this.verif = false;
        this.paramlivraison.ordre = ''
        this.sum = 0
        return this.verif

      } else {
        this.verif = true
      }




    }

  }
  sum = 0
  verifierwidth() {

    this.TabGener = this.TabGener.filter((X) => X.champ != this.paramlivraison.champ)


    for (let i = 0; i < this.TabGener.length; i++) {

      this.sum += this.TabGener[i].width

    }
    this.sum += this.paramlivraison.width

    console.log("this.sum",this.sum)
    if (this.sum > 100) {


      this.verifwid = false;


      this.sum = 0
      return this.verifwid


    }

    else {
      this.verifwid = true


    }


  }





  modifierParamliv() {
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    if (this.isLoading) {
      return
    }
    this.isLoading = true



    this.paramlivser.update(this.id, this.paramlivraison, this.request)
      .subscribe(
         res => {

        this.isLoading = false
        let resultat: any = res
         if (resultat.status) {

           this.notificationToast.showSuccess("Votre Paramètre est bien modifiée !")
        this.param.getParamliv(this.idFormat,this.typeDoc)

         this.close.closePopupAngular()
        
         }

        },

      error => {
          this.isLoading = false
          alert("Désole, il y a un problème de connexion internet")
         });



  }

  reseteFormulaire() {
    for (let key in this.erreurparamliv) {
      this.paramlivraison[key] = ""
    }
  }
 
  
 
  
  
 
  

}
