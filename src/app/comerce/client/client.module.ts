import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { AjouterClientComponent } from './ajouter-client/ajouter-client.component';
import { AutreAdresseComponent } from './autre-adresse/autre-adresse.component';
import { ClassementClientComponent } from './classement-client/classement-client.component';
import { ComplementsComponent } from './complements/complements.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DetailsClientComponent } from './details-client/details-client.component';
import { FactureComponent } from './facture/facture.component';
import { ListClientComponent } from './list-client/list-client.component';
import { LivraisonComponent } from './livraison/livraison.component';
import { ModifierClientComponent } from './modifier-client/modifier-client.component';
import { AjoutProjetComponent } from './projet/ajout-projet/ajout-projet.component';
import { ListProjetComponent } from './projet/list-projet/list-projet.component';
import { ModifierProjetComponent } from './projet/modifier-projet/modifier-projet.component';
import { SupprimerClientComponent } from './supprimer-client/supprimer-client.component';

import { SharedModule } from '../../theme/shared/shared.module';
import { SharedGlobalModule } from '../../shared-global/shared-global.module';
import {NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  imports: [
    CommonModule,
    ClientRoutingModule,
  ],
  declarations: [
  ],
  exports:[
    
  ]
})
export class ClientModule { }
