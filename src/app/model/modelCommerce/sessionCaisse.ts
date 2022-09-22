import { formatDate } from "@angular/common";

export class SessionCaisse {
    id = ""
    caisse = ""
    utilisateur = ""
    numero = ""
    dateOuverture = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    cloture = "oui"
    dateCloture = ""
    fondCaisseOuvrier = 0
    fondCaisseAdmin = 0
    totalCaisse = 0
    montantDifference = 0
    remarque = ""
    societe = ""
}
