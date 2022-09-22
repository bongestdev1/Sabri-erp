import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-routes-transfert-documents',
  templateUrl: './routes-transfert-documents.component.html',
  styleUrls: ['./routes-transfert-documents.component.scss']
})
export class RoutesTransfertDocumentsComponent implements OnInit {

  @Input() id = ""

  @Input() titreDocument = ""

  @Input() modeTransfert = false

  constructor(
    public informationGenerale: InformationsService,
    private route: ActivatedRoute, 
    private router: Router, 
    public fonctionPartagesService:FonctionPartagesService) {

  }

  ngOnInit(): void {
  }
  
  //start devis
  transfertBonLivraison(){
    this.router.navigate(['/bonLivraisonDevisTransfert/'+this.id]);
  }

  transfertCommande(){
    this.router.navigate(['/commandeTransfert/'+this.id]);
  }
  //end devis

  //start commande
  transfertBonLivraisonCommande(){
    this.router.navigate(['/bonLivraisonCommandeTransfert/'+this.id]);
  }
  //end commande

  //start bon livraison
  transfertBonRetourClient(){
    this.router.navigate(['/bonRetourClientTransfert/'+this.id]);
  }
  //end bon livraison

  //start bon commande
  transfertBonAchat(){
    this.router.navigate(['/bonAchatTransfert/'+this.id]);
  }
  //end bon commande

  //start bon Achat
  transfertBonRetourFournisseur(){
    this.router.navigate(['/bonRetourFournisseurTransfert/'+this.id]);
  }
  //end bon Achat

  

}
