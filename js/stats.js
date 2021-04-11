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
    // console.log(newTeam);
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
  //   evt.preventDefault();
  const id = $teamsMain.val();
  stat = await Stat.getTeamStats(id);
  teamColor = getTeamColor(id);

  if (teamChart1 == undefined) {
    console.log(stat);
    // $teamName.text(`${teamName}`);
    generateChart(stat, teamName, teamColor);
    console.log(teamChart1.data);
  } else {
    console.log(stat);
    // $teamName.text(`${teamName}`);
    updateChartTeam1(teamChart1, stat, teamName, teamColor);
    console.log(teamChart1.data);
  }
}

$teamsMain.on("change", generateTeamStats);

// let stat2;

async function generateSecondTeamStats(evt) {
  const id = $teamsSecond.val();
  teamColor = getTeamColor(id);
  stat = await Stat.getTeamStats(id);
  //   $secTeamName.text(`${teamName}`);
  updateChartTeam2(teamChart1, stat, teamName, teamColor);
}

$teamsSecond.on("change", generateSecondTeamStats);
