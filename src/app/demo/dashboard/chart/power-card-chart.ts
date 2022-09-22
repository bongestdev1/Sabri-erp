export class PowerCardChart {
  public static powerCardChartData1 = {
    chart: {
      type: 'line',
      height: 75,
      sparkline: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#ff5252'],
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    series: [{
      name: 'series1',
      data: [55, 35, 75, 50, 90, 50]
    }],
    yaxis: {
      min: 10,
      max: 100,
    },
    tooltip: {
      theme: 'dark',
      fixed: {
        enabled: false
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: (seriesName) => 'Power'
        }
      },
      marker: {
        show: false
      }
    }
  };

  public static powerCardChartData2 = {
    chart: {
      type: 'line',
      height: 75,
      sparkline: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#ffba57'],
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    series: [{
      name: 'series1',
      data: [55, 35, 75, 50, 90, 50]
    }],
    yaxis: {
      min: 10,
      max: 100,
    },
    tooltip: {
      theme: 'dark',
      fixed: {
        enabled: false
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: (seriesName) => 'Power'
        }
      },
      marker: {
        show: false
      }
    }
  };

  public static powerCardChartData3 = {
    chart: {
      type: 'line',
      height: 75,
      sparkline: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#1abc9c'],
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    series: [{
      name: 'series1',
      data: [55, 35, 75, 50, 90, 50]
    }],
    yaxis: {
      min: 10,
      max: 100,
    },
    tooltip: {
      theme: 'dark',
      fixed: {
        enabled: false
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: (seriesName) => 'Water'
        }
      },
      marker: {
        show: false
      }
    }
  };
}
