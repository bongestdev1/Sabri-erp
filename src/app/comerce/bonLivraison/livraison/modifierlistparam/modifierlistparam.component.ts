import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, NgZone } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { paramliv } from 'src/app/model/modelCommerce/paramliv';
import { InformationsService } from 'src/app/services/informations.service';
import { Paramliv } from 'src/app/services/serviceBD_Commerce/paramliv.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { ListparamlivraisonComponent } from '../listparamlivraison/listparamlivraison.component';

@Component({
  selector: 'app-modifierlistparam',
  templateUrl: './modifierlistparam.component.html',
  styleUrls: ['./modifierlistparam.component.scss']
})
export class ModifierlistparamComponent implements OnInit {

  paramlivFormGroup: FormGroup;

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
      this.getParamliv(this.id)
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
    private param: ListparamlivraisonComponent,
    public informationGenerale: InformationsService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationToast: ToastNotificationService,
    private paramlivser: Paramliv,) {
  }
  varverif = ''
  getParamliv(id) {
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


    this.getParamliv(this.id);

    // if (this.id.length > 1) {
    //   this.getTransporteur(this.id)
    // }
    
    this.paramliv = this.param.getPramliv()



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
      //console.log("this.paramlivraison.ordre == this.TabGener[i1].ordre", this.paramlivraison.ordre == this.TabGener[i1].ordre,this.paramlivraison.ordre , this.TabGener[i1].ordre)
      if (this.paramlivraison.ordre == this.TabGener[i1].ordre) {


        this.verif = false;
        this.paramlivraison.ordre = ''
        this.sum = 0
        //console.log("this.verif false", this.verif)
        return this.verif

      } else {
        this.verif = true
        //console.log("this.verif true", this.verif)
      }




    }

  }
  sum = 0
  verifierwidth() {

    this.TabGener = this.TabGener.filter((X) => X.champ != this.paramlivraison.champ)
    console.log("this.paramlivraison",this.paramlivraison)
    console.log("Tableau Filtrer ",this.TabGener)
    
    for (let i = 0; i < this.TabGener.length; i++) {

      if(this.TabGener[i].visibilite==="oui"){
      this.sum += this.TabGener[i].width}

      if(this.TabGener[i].visibilite==="non"){
        this.sum -= this.TabGener[i].width
      }

    



    }
    console.log("somme width", this.sum);
this.sum += this.paramlivraison.width

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
            this.param.getPramliv()

            this.closeModifierparamliv()
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
