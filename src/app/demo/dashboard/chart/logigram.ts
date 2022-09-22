export class Logigram {
  public static logigram = {
    series: [
      {
        name: "Net Profit",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 63, 60, 66]
      },
      {
        name: "Revenue",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 63, 60, 66]
      },
      {
        name: "Free Cash Flow",
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41, 63, 60, 66]
      }
    ],
    chart: {
      type: "bar",
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"]
    },
    xaxis: {
      categories: [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre",
      ]
    },
    yaxis: {
      title: {
        text: "$ (thousands)"
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function(val) {
          return "$ " + val + " thousands";
        }
      }
    }
  }
}
