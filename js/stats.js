//this page is for functions related to information received from the NHL API including the teams list and the individual team stats.

//function to generate teams list from the objected created by calling Team.getTeams();
async function generateTeamsList() {
  teamsObj = await Team.getTeams();

  //sorts the team names alphabetically
  teamsObj.sort(function (a, b) {
    let nameA = a.name.toLowerCase(),
      nameB = b.name.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    else return 0;
  });

  //empties the teams lists prior to adding the teams into them.
  $teamsMain.empty();
  $teamsSecond.empty();
  $teamsUser.empty();
  $teamsMain.append("<option disabled selected hidden>Choose a Team</option>");
  $teamsSecond.append(
    "<option disabled selected hidden>Choose a Team</option>"
  );
  $teamsUser.append("<option disabled selected hidden>Choose a Team</option>");

  //generates team id and team name from the teamsObj and appends them to the teams lists.
  for (let team in teamsObj) {
    let tId;
    let tName;
    let obj = teamsObj[team];
    for (let prop in obj) {
      if (prop == "name") {
        tName = obj[prop];
      }
      if (prop == "id") {
        tId = obj[prop];
      }
    }

    let newTeam = new Team(tName, tId);

    $teamsMain.append(`<option value="${newTeam.id}">${newTeam.name}</option>`);
    $teamsSecond.append(
      `<option value="${newTeam.id}">${newTeam.name}</option>`
    );
    $teamsUser.append(`<option value="${newTeam.id}">${newTeam.name}</option>`);
  }
}

//variables for storing stat and teamColor outside of their functions
let stat;
let teamColor;

//function which generates stats for a selected team and either generates or updates a chart
async function generateTeamStats(evt) {
  const id = $teamsMain.val();
  stat = await Stat.getTeamStats(id);
  teamColor = getTeamColor(id);

  if (teamChart1 == undefined) {
    generateChart(stat, teamName, teamColor);
  } else {
    updateChartTeam1(teamChart1, stat, teamName, teamColor);
  }
}

//chart generates/updates on team change, no submit required
$teamsMain.on("change", generateTeamStats);

//same as generateTeamStats, but affects the second team in the graph.  Only updates the chart, does not generate.
async function generateSecondTeamStats(evt) {
  const id = $teamsSecond.val();
  teamColor = getTeamColor(id);

  stat = await Stat.getTeamStats(id);

  updateChartTeam2(teamChart1, stat, teamName, teamColor);
}

$teamsSecond.on("change", generateSecondTeamStats);
