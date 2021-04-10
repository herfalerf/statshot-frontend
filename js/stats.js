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
  }
}

let stat;

async function generateTeamStats(evt) {
  //   evt.preventDefault();
  const id = $teamsMain.val();
  stat = await Stat.getTeamStats(id);

  if (teamChart1 == undefined) {
    console.log(stat);
    $teamName.text(`${teamName}`);
    generateChart(stat);
    console.log(teamChart1.data);
  } else {
    console.log(stat);
    $teamName.text(`${teamName}`);
    updateChartTeam(teamChart1, stat);
    console.log(teamChart1.data);
  }
}

$teamsMain.on("change", generateTeamStats);
