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

async function generateTeamStats(evt) {
  //   evt.preventDefault();
  const id = $teamsMain.val();
  const stat = await Stat.getTeamStats(id);
  console.log(stat);
}

$teamsMain.on("change", generateTeamStats);
