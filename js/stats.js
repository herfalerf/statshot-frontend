async function generateTeamsList() {
  teamsObj = await Team.getTeams();

  for (let team in teamsObj) {
    let tId;
    let tName;
    let obj = teamsObj[team];
    for (let prop in obj) {
      if (prop == "teamName") {
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

let stat;
let teamColor;

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

$teamsMain.on("change", generateTeamStats);

async function generateSecondTeamStats(evt) {
  const id = $teamsSecond.val();
  teamColor = getTeamColor(id);

  stat = await Stat.getTeamStats(id);

  updateChartTeam2(teamChart1, stat, teamName, teamColor);
}

$teamsSecond.on("change", generateSecondTeamStats);
