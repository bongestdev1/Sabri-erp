import { Societe } from "./../interface/Societe.interface";
import { StockService } from "./../../../services/servicesBD_Dashboard/stock.service";
import { Component, OnInit } from "@angular/core";
import { InformationsService } from "src/app/services/informations.service";

@Component({
  selector: "app-dash-stocks",
  templateUrl: "./dash-stocks.component.html",
  styleUrls: ["./dash-stocks.component.scss"],
})

export class DashStocksComponent implements OnInit {

  public societe: Societe;
  public article = [];
  public isLoading = false;

  constructor(
    private informationsService: InformationsService,
    private stockService: StockService
  ) {
    this.societe = {} as Societe;
  }



  getDataStock(): void {
    //console.log(this.societe);

    this.isLoading = true

    var societe = this.informationsService.idSocieteCurrent;

    this.societe.id = societe;
    console.log(this.societe);
    var tab = [];
    this.stockService.getDataStock(this.societe).subscribe(
      (res) => {
        this.isLoading = false
        console.log(res);
        res.result.forEach((element) => {
          //console.log(element);
          tab.push(element);
        });

        for (let index = 0; index < tab.length; index++) {
          tab[index].totalAchatsHT = numStr(Math.trunc(tab[index].totalAchatsHT));
          tab[index].totalAchatsTTC = numStr(Math.trunc(tab[index].totalAchatsTTC));
          tab[index].totalRevientHT = numStr(Math.trunc(
            tab[index].totalRevientHT
          ));
          tab[index].totalRevientTTC = numStr(Math.trunc(
            tab[index].totalRevientTTC
          ));
  
          tab[index].totalVenteHT = numStr(Math.trunc(tab[index].totalVenteHT));
          tab[index].totalVenteTTC =numStr( Math.trunc(tab[index].totalVenteTTC));
          this.article.push(tab[index]);
        }
  
        
      },
      (error) => {
        this.isLoading = false
        console.log(error);
      }
    );
  
  }

  ngOnInit(): void {
    this.getDataStock();
  }
}
function numStr(a : any, b? : any) {
  a = '' + a;
  b = b || ' ';
  var c = '',
      d = 0;
  while (a.match(/^0[0-9]/)) {
    a = a.substr(1);
  }
  for (var i = a.length-1; i >= 0; i--) {
    c = (d != 0 && d % 3 == 0) ? a[i] + b + c : a[i] + c;
    d++;
  }
  return c;
}

