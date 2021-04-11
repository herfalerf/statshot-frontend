let teamChart1;

function generateChart(stat) {
  let data = stat;
  let colors2 = ["#49A9EA", "#36CAAB", "#34495E", "#B370CF"];

  let $myChart = $("#myChart")[0].getContext("2d");

  teamChart1 = new Chart($myChart, {
    type: "bar",
    data: {
      // labels: labels2,
      datasets: [
        {
          data: data,
          backgroundColor: "#49A9EA",
        },
        { data: undefined, backgroundColor: "#B370CF" },
      ],
    },
    options: {
      plugins: {
        title: {
          text: "Stats",
          display: true,
        },
        legend: {
          display: false,
        },
      },
    },
  });
}

function updateChartTeam1(chart, data) {
  chart.data.datasets[0].data = data;
  chart.update();
}

function updateChartTeam2(chart, data) {
  chart.data.datasets[1].data = data;
  chart.update();
}
