import { Component, OnInit ,NgZone} from '@angular/core';
import { ParamHeaderFooterPdf } from 'src/app/model/modelCommerce/ParamHeaderFooterPdf';
import { FormGroup,FormBuilder, FormControl } from "@angular/forms";
import { ParampdfService } from 'src/app/services/serviceBD_Commerce/parampdf.service';

import { Router, ActivatedRoute } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
@Component({
  selector: 'app-header-andfooter-pdf',
  templateUrl: './header-andfooter-pdf.component.html',
  styleUrls: ['./header-andfooter-pdf.component.scss']
})
export class HeaderANDfooterPDFComponent implements OnInit {
  form: FormGroup;
  getId: any;
  ParamHeaderFooterPdf1: ParamHeaderFooterPdf;
  imageData: string;
  constructor(
    public ParamHeaderFooterPdf: ParamHeaderFooterPdf,
    private ParamHeader : ParampdfService,
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private informationService:InformationsService,
    
    private activatedRoute: ActivatedRoute,
  ) {
     this.getId =this.informationService.idSocieteCurrent
 
     this.ParamHeader.get(this.getId).subscribe(res => {
       console.log("hhhhhhhhh",res)
       this.form.setValue({
         nom: res.resultat['nomsociale'],
         email: res.resultat['adresseEmail'],
         tel1: res.resultat['numTel1'],
         tel2: res.resultat['numTel2'],
         fax: res.resultat['numFax'],
         adresse: res.resultat['adresse'],
         matricule: res.resultat['matriculefisc'],
         rib: res.resultat['rib'],
         name: res.resultat['name'],
         image : res.resultat['imagePath']
       });
     });
 
     this.form = this.formBuilder.group({
       nom: [''],
       email: [''],
       tel1: [''],
       tel2: [''],
       fax: [''],
       adresse: [''],
       matricule: [''],
       rib: [''],
        name: [''],   
        image: ['']
     })
  }

  ngOnInit(): void {
    // this.form = new FormGroup({
    //   email1: new FormControl(null),
    //   email2: new FormControl(null),
    //   tel1: new FormControl(null),
    //   tel2: new FormControl(null),
    //   adresse: new FormControl(null),
    //   name: new FormControl(null),
    //   image: new FormControl(null),
    // });
   
  }
  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }


  onUpdate(): any {
    this.ParamHeader.updateProfile(this.getId, this.form.value.nom,this.form.value.email,this.form.value.tel1,this.form.value.tel2,this.form.value.fax,this.form.value.adresse,this.form.value.matricule,this.form.value.rib,this.form.value.name, this.form.value.image);
    this.form.reset();
    this.imageData = null;
   
  }
}
