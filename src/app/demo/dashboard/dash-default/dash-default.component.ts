
import { Societe } from 'src/app/demo/dashboard/interface/Societe.interface';
import * as ApexCharts from "apexcharts";
import { Dashboard } from "src/app/demo/dashboard/interface/dashboard.interface";
import { Client } from "../interface/Client.interface";

import { InformationsService } from "./../../../services/informations.service";
import { DashboardService } from "../../../services/servicesBD_Dashboard/dashboard.service";

import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Logigram } from "../chart/logigram";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexTitleSubtitle,
} from "ng-apexcharts";

@Component({
  selector: "app-dash-default",
  templateUrl: "./dash-default.component.html",
  styleUrls: ["./dash-default.component.scss"],
})
export class DashDefaultComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  @Input() series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  @Input() xaxis: ApexXAxis;
  @Input() colors: string[];
  @Input() states: ApexStates;
  @Input() title: ApexTitleSubtitle;
  @Input() tooltip: ApexTooltip;
  @Input() yaxis: ApexYAxis | ApexYAxis[];

  public logigram: any;
  public dashboard: Dashboard;
  public client: Client;
  public tabChiffreAffaireClient = [];
  public isLoadingMois = false;
  public isLoadingDlm = false;
  public isLoadingAns = false;
  public isLoadingTopClient = false;
  public societe: Societe;
  public dlmClient = [];
  public dlmMoy: number



  constructor(
    private informationsService: InformationsService,
    private DashboardService: DashboardService,
    public informationGenerale: InformationsService,
  ) {
    this.logigram = Logigram.logigram;
    this.dashboard = {} as Dashboard;
    this.client = {} as Client;
    this.societe = {} as Societe;
  }
  getChiffreAffaireParMois(): void {
    var societe = this.informationsService.idSocieteCurrent;
    this.dashboard.societe = societe;
    var dateStart = new Date(this.informationGenerale.idDateAujourdCurrent)
    var dateEnd = new Date(this.informationGenerale.idDateFinCurrent)

    this.dashboard.dateStart = dateStart//new Date("2019-01-17");
    this.dashboard.dateEnd = dateEnd//new Date("2022-12-18");

    try {
      this.DashboardService.getChiffreAffaireParMois(this.dashboard).subscribe(
        (data)=>{
          this.isLoadingMois = true;
          console.log(data);
          var chiffreAffaireFromServer = [];
          var dateFromServer = [];

          for (let i = 0; i < data.chiffreAffaireParMois.length; i++) {
            chiffreAffaireFromServer.push(
              Math.trunc(Math.round(data.chiffreAffaireParMois[i].chiffreAffaireParMois))
            );

          }

          console.log("chiffreAffaireFromServer = ", chiffreAffaireFromServer);

          for (let i = 0; i < data.chiffreAffaireParMois.length; i++) {
            dateFromServer.push(data.chiffreAffaireParMois[i]._id);
          }

          //console.log("dateFromServer = ", dateFromServer);

          const el = document.querySelector("#chartBarCaParMois");
          //console.log(el);

          var chartBarCaParMois = new ApexCharts(el, {
            chart: {
              type: "bar",
              id: "chartBarCaParMois",
              toolbar: {
                show: false,
              },
            },
            title: {
              text: "Chiffre Affaire Mensuel",
              align: "center",
              style: {
                fontSize: "25px",
                fontWeight: "bold",
                fontFamily: "Georgia",
                color: "#387C44",
              },
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: "50%",
                dataLabels: {
                  position: "center",
                  maxItems: 100,
                  hideOverflowingLabels: true,
                  orientation: "vertical",
                },
              },
            },
            series: [
              {
                name: "chiffre Affaire",
                data: chiffreAffaireFromServer,
              },
            ],
            xaxis: {
              type: "datetime",
              categories: dateFromServer,
              labels: {
                show: true,
                rotate: -45,
                rotateAlways: false,
                hideOverlappingLabels: false,
                showDuplicates: false,
                trim: false,
                minHeight: undefined,
                maxHeight: 120,
                style: {
                  fontSize: "8px",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: 400,
                  cssClass: "apexcharts-xaxis-label",
                },
                offsetX: 0,
                offsetY: 0,
                format: undefined,
                formatter: undefined,
                datetimeUTC: true,
                datetimeFormatter: {
                  month: "MM 'yy",
                },
              },
            },
          });

          this.isLoadingMois = false;
          chartBarCaParMois.render();

        },
        (err)=>{
          console.log(err);

        }
      )
    } catch (error) {
      console.log(error);

    }
  }

  getChiffreAffaireParAns(): void {
    var societe = this.informationsService.idSocieteCurrent;
    this.dashboard.societe = societe;
    var dateStart = new Date(this.informationGenerale.idDateAujourdCurrent)
    var dateEnd = new Date(this.informationGenerale.idDateFinCurrent)

    this.dashboard.dateStart = dateStart//new Date("2019-01-17");
    this.dashboard.dateEnd = dateEnd//new Date("2022-12-18");

    this.DashboardService.getChiffreAffaireParAns(this.dashboard).subscribe(
      (data)=>{
        this.isLoadingAns = true;
        console.log(data);
        var chiffreAffaireFromServer = [];
        var dateFromServer = [];
        var tab = [];

        data.chiffreAffaire.forEach((element) => {
          tab.push(element);
        });
        tab.sort(function compare(a, b) {
          if (a._id < b._id) {
            return -1;
          }
          if (a._id > b._id) {
            return 1;
          }
          return 0;
        });

        console.log("this is tab", tab);

        for (let i = 0; i < tab.length; i++) {
          chiffreAffaireFromServer.push(
            Math.trunc(Math.round(tab[i].chiffreAffaireParAns))
          );
        }
        for (let i = 0; i < tab.length; i++) {
          dateFromServer.push(tab[i]._id);
        }

        const el = document.querySelector("#chartBarCaParAns");
        //console.log(el);

        var chartBarCaParAns = new ApexCharts(el, {
          chart: {
            type: "bar",
            id: "chartBarCaParAns",
            toolbar: {
              show: false,
            },
          },
          title: {
            text: "Chiffre Affaire Annuel",
            align: "center",
            style: {
              fontSize: "25px",
              fontWeight: "bold",
              fontFamily: "Georgia",
              color: "#387C44",
            },
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "50%",
              dataLabels: {
                position: "center",
                maxItems: 100,
                hideOverflowingLabels: true,
                orientation: "vertical",
              },
            },
          },
          series: [
            {
              name: "chiffre Affaire",
              data: chiffreAffaireFromServer,
            },
          ],
          xaxis: {
            type: "category",
            categories: dateFromServer,
          },
        });
        chartBarCaParAns.render();

        this.isLoadingAns = false;
      },
      (err)=>{
        console.log(err);

      }
    )
  }
  getTopClient(): void {
    this.client.societe = this.informationsService.idSocieteCurrent;
    //console.log(this.client);
    var tab = [];
    this.DashboardService.getTopClient(this.client).subscribe(
      (response) => {
        //console.log(response);
        this.isLoadingTopClient = true;
        response.transactionsClient.map((e) => {
          //console.log(e);
          tab.push(e);
        });

        tab.sort(function compare(a, b) {
          if (a.chiffreAffaire > b.chiffreAffaire) {
            return -1;
          }
          if (a.chiffreAffaire < b.chiffreAffaire) {
            return 1;
          }
          return 0;
        });

        for (let index = 0; index < tab.length; index++) {
          tab[index].chiffreAffaire = numStr(Math.trunc(tab[index].chiffreAffaire));
          this.tabChiffreAffaireClient.push(tab[index]);
        }
  
        this.isLoadingTopClient = false;

      },
      (error) => {
        console.log(error);
      }
    );

   
  }

  fournisseursDlm = 0

  getDlmClient(): void {
    var societe = this.informationsService.idSocieteCurrent;
    this.societe.id = societe;
    console.log(this.societe);

    var tab = []
    this.DashboardService.getDLMsClients(this.societe).subscribe(
      (response) => {
        var response2:any = response
        this.isLoadingDlm = true

        this.fournisseursDlm = response2.fournisseursDlm

        console.log("response === ", response)

        //console.log(response);
        response.listGlobal.forEach(element => {
          //console.log(element);
          tab.push(element)
        });

        var dlmtab = []
      for (let index = 0; index < tab.length; index++) {
        //tab[index].dlm = Math.round(tab[index].dlm * 100)/100;
        dlmtab.push(tab[index].dlm)
        //this.dlmClient.push(tab[index])
      }



      //console.log(this.dlmClient);
      console.log(dlmtab);

      let x = numAverage(dlmtab)
      this.dlmMoy = Math.round(x * 100) / 100
      console.log(this.dlmMoy);

      this.isLoadingDlm = false


      }, (err) => {
        console.log(err);

      }
    )


  }


  ngOnInit() {
    this.getChiffreAffaireParAns();

    this.getChiffreAffaireParMois();

    this.getTopClient();
    this.getDlmClient()
    //this.test();
  }
  /*
   test() {
    var societe = this.informationsService.idSocieteCurrent;
    this.dashboard.societe = societe;
    this.dashboard.dateStart = new Date("2019-02-17");
    this.dashboard.dateEnd = new Date("2022-01-18");

    var tabAns = []

    this.DashboardService
      .getChiffreAffaireParAns(this.dashboard)
      .toPromise()
      .then((dataAns) => {
        console.log("11111111111111111111111111",dataAns);
        dataAns.chiffreAffaire.forEach(element => {
          tabAns.push(element._id)
        });
      })
      this.DashboardService
      .getChiffreAffaireParMois(this.dashboard)
      .toPromise()
      .then((dataMois) => {
        console.log("2222222222222222222222222",dataMois);

      })

      console.log("tabbbbb testtttt",tabAns);

    function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    }
    var arrayData = [
      {
        y: 400,
        quarters: [
          {
            x: "Q1",
            y: 120
          },
          {
            x: "Q2",
            y: 90
          },
          {
            x: "Q3",
            y: 100
          },
          {
            x: "Q4",
            y: 90
          }
        ]
      },
      {
        y: 430,
        quarters: [
          {
            x: "Q1",
            y: 120
          },
          {
            x: "Q2",
            y: 110
          },
          {
            x: "Q3",
            y: 90
          },
          {
            x: "Q4",
            y: 110
          }
        ]
      },
      {
        y: 448,
        quarters: [
          {
            x: "Q1",
            y: 70
          },
          {
            x: "Q2",
            y: 100
          },
          {
            x: "Q3",
            y: 140
          },
          {
            x: "Q4",
            y: 138
          }
        ]
      },
      {
        y: 470,
        quarters: [
          {
            x: "Q1",
            y: 150
          },
          {
            x: "Q2",
            y: 60
          },
          {
            x: "Q3",
            y: 190
          },
          {
            x: "Q4",
            y: 70
          }
        ]
      },
      {
        y: 540,
        quarters: [
          {
            x: "Q1",
            y: 120
          },
          {
            x: "Q2",
            y: 120
          },
          {
            x: "Q3",
            y: 130
          },
          {
            x: "Q4",
            y: 170
          }
        ]
      },
      {
        y: 580,
        quarters: [
          {
            x: "Q1",
            y: 170
          },
          {
            x: "Q2",
            y: 130
          },
          {
            x: "Q3",
            y: 120
          },
          {
            x: "Q4",
            y: 160
          }
        ]
      }
    ];

    function makeData() {
      var dataSet = shuffleArray(arrayData);

      var dataYearSeries = [

        {
          x: "2011",
          y: dataSet[0].y,
          color: colors[0],
          quarters: dataSet[0].quarters
        },
        {
          x: "2012",
          y: dataSet[1].y,
          color: colors[1],
          quarters: dataSet[1].quarters
        },
        {
          x: "2013",
          y: dataSet[2].y,
          color: colors[2],
          quarters: dataSet[2].quarters
        },
        {
          x: "2014",
          y: dataSet[3].y,
          color: colors[3],
          quarters: dataSet[3].quarters
        },
        {
          x: "2015",
          y: dataSet[4].y,
          color: colors[4],
          quarters: dataSet[4].quarters
        },
        {
          x: "2016",
          y: dataSet[5].y,
          color: colors[5],
          quarters: dataSet[5].quarters
        }
      ];

      return dataYearSeries;
    }

    var colors = [
      "#008FFB",
      "#00E396",
      "#FEB019",
      "#FF4560",
      "#775DD0",
      "#00D9E9",
      "#FF66C3",
    ];

    function updateQuarterChart(sourceChart, destChartIDToUpdate) {
      var series = [];
      var seriesIndex = 0;
      var colors = [];
      if (sourceChart.w.globals.selectedDataPoints[0]) {
        var selectedPoints = sourceChart.w.globals.selectedDataPoints;
        for (var i = 0; i < selectedPoints[seriesIndex].length; i++) {
          var selectedIndex = selectedPoints[seriesIndex][i];
          var yearSeries = sourceChart.w.config.series[seriesIndex];
          series.push({
            name: yearSeries.data[selectedIndex].x,
            data: yearSeries.data[selectedIndex].quarters,
          });
          colors.push(yearSeries.data[selectedIndex].color);
        }
        if (series.length === 0)
          series = [
            {
              data: [],
            },
          ];
        return ApexCharts.exec(destChartIDToUpdate, "updateOptions", {
          series: series,
          colors: colors,
          fill: {
            colors: colors,
          },
        });
      }
    }
    var options = {
      series: [
        {
          data: makeData(),
        },
      ],
      chart: {
        id: "barYear",
        height: 400,
        width: "100%",
        type: "bar",
        events: {
          dataPointSelection: function (e, chart, opts) {
            var quarterChartEl = document.querySelector("#chart-quarter");
            var yearChartEl = document.querySelector("#chart-year");

            if (opts.selectedDataPoints[0].length === 1) {
              if (quarterChartEl.classList.contains("active")) {
                updateQuarterChart(chart, "barQuarter");
              } else {
                yearChartEl.classList.add("chart-quarter-activated");
                quarterChartEl.classList.add("active");
                updateQuarterChart(chart, "barQuarter");
              }
            } else {
              updateQuarterChart(chart, "barQuarter");
            }

            if (opts.selectedDataPoints[0].length === 0) {
              yearChartEl.classList.remove("chart-quarter-activated");
              quarterChartEl.classList.remove("active");
            }
          },
          updated: function (chart) {
            updateQuarterChart(chart, "barQuarter");
          },
        },
      },
      plotOptions: {
        bar: {
          distributed: true,
          horizontal: true,
          barHeight: "75%",
          dataLabels: {
            position: "bottom",
          },
        },
      },
      dataLabels: {
        enabled: true,
        textAnchor: "start",
        style: {
          colors: ["#fff"],
        },
        formatter: function (val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex];
        },
        offsetX: 0,
        dropShadow: {
          enabled: true,
        },
      },

      colors: colors,

      states: {
        normal: {
          filter: {
            type: "desaturate",
          },
        },
        active: {
          allowMultipleDataPointsSelection: true,
          filter: {
            type: "darken",
            value: 1,
          },
        },
      },
      tooltip: {
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: function (val, opts) {
              return opts.w.globals.labels[opts.dataPointIndex];
            },
          },
        },
      },
      title: {
        text: "Yearly Results",
        offsetX: 15,
      },
      subtitle: {
        text: "(Click on bar to see details)",
        offsetX: 15,
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
    };

    var chart = new ApexCharts(document.querySelector("#chart-year"), options);
    chart.render();

    var optionsQuarter = {
      series: [
        {
          data: [],
        },
      ],
      chart: {
        id: "barQuarter",
        height: 400,
        width: "100%",
        type: "bar",
        stacked: true,
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
          horizontal: false,
        },
      },
      legend: {
        show: false,
      },
      grid: {
        yaxis: {
          lines: {
            show: false,
          },
        },
        xaxis: {
          lines: {
            show: true,
          },
        },
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
      title: {
        text: "Quarterly Results",
        offsetX: 10,
      },
      tooltip: {
        x: {
          formatter: function (val, opts) {
            return opts.w.globals.seriesNames[opts.seriesIndex];
          },
        },
        y: {
          title: {
            formatter: function (val, opts) {
              return opts.w.globals.labels[opts.dataPointIndex];
            },
          },
        },
      },
    };

    var chartQuarter = new ApexCharts(
      document.querySelector("#chart-quarter"),
      optionsQuarter
    );
    chartQuarter.render();


    document.querySelector("#model").addEventListener("updated", function (chart) {
      updateQuarterChart(chart, "barQuarter");
    });

    document.querySelector("#model").addEventListener("change", function (e) {
      chart.updateSeries([
        {
          data: makeData(),
        },
      ]);
    });

  }*/
}

function numStr(a: any, b?: any) {
  a = '' + a;
  b = b || ' ';
  var c = '',
    d = 0;
  while (a.match(/^0[0-9]/)) {
    a = a.substr(1);
  }
  for (var i = a.length - 1; i >= 0; i--) {
    c = (d != 0 && d % 3 == 0) ? a[i] + b + c : a[i] + c;
    d++;
  }
  return c;
}

function numAverage(a: any) {
  var b = a.length,
    c = 0, i;
  for (i = 0; i < b; i++) {
    c += Number(a[i]);
  }
  return c / b;
}
