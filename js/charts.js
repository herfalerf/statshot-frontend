let labels2 = ["American", "Ryanair", "China Southern", "Lufthansa"];
let data2 = [199.6, 130.3, 126.2, 130];
let colors2 = ["#49A9EA", "#36CAAB", "#34495E", "#B370CF"];

let $myChart2 = $("#myChart")[0].getContext("2d");

let chart2 = new Chart($myChart2, {
  type: "bar",
  data: {
    labels: labels2,
    datasets: [
      {
        data: data2,
        backgroundColor: colors2,
      },
    ],
  },
  options: {
    plugins: {
      title: {
        text: "Amount of passengers in millions",
        display: true,
      },
      legend: {
        display: false,
      },
    },
  },
});
