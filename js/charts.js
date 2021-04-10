let teamChart1;
let teamChart2;

function generateChart1(stat) {
  let data = stat;
  let colors2 = ["#49A9EA", "#36CAAB", "#34495E", "#B370CF"];

  let $teamChart1 = $("#teamChart1")[0].getContext("2d");

  teamChart1 = new Chart($teamChart1, {
    type: "bar",
    data: {
      // labels: labels2,
      datasets: [
        {
          data: data,
          backgroundColor: "#49A9EA",
        },
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

function generateChart2(stat) {
  let data = stat;
  let colors2 = ["#49A9EA", "#36CAAB", "#34495E", "#B370CF"];

  let $teamChart2 = $("#teamChart2")[0].getContext("2d");

  teamChart2 = new Chart($teamChart2, {
    type: "bar",
    data: {
      // labels: labels2,
      datasets: [
        {
          data: data,
          backgroundColor: "#49A9EA",
        },
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

function updateChartTeam(chart, data) {
  chart.data.datasets[0].data = data;
  chart.update();
}
