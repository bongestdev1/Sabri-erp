export class SupportChartData {
  public static supportChartData = {
    chart: {
      type: 'area',
      height: 65,
      sparkline: {
        enabled: true
      }
    },
    colors: ['#1abc9c'],
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    series: [{
      data: [0, 20, 10, 45, 30, 55, 20, 30, 0]
    }],
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter: (seriesName) => 'Ticket '
        }
      },
      marker: {
        show: false
      }
    }
  };
}
