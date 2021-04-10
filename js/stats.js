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
    $teamsMain1.append(
      `<option value="${newTeam.id}">${newTeam.name}</option>`
    );
    $teamsMain2.append(
      `<option value="${newTeam.id}">${newTeam.name}</option>`
    );
  }
}

let stat1;
let stat2;

async function generateTeamStats1(evt) {
  //   evt.preventDefault();
  const id = $teamsMain1.val();
  stat1 = await Stat.getTeamStats(id);

  if (teamChart1 == undefined) {
    console.log(stat1);
    $teamName1.text(`${teamName}`);
    generateChart1(stat1);
    console.log(teamChart1.data);
  } else {
    console.log(stat1);
    $teamName1.text(`${teamName}`);
    updateChartTeam(teamChart1, stat1);
    console.log(teamChart1.data);
  }
}

$teamsMain1.on("change", generateTeamStats1);

async function generateTeamStats2(evt) {
  //   evt.preventDefault();
  const id = $teamsMain2.val();
  stat2 = await Stat.getTeamStats(id);

  if (teamChart2 == undefined) {
    console.log(stat2);
    $teamName2.text(`${teamName}`);
    generateChart1(stat2);
    console.log(teamChart2.data);
  } else {
    console.log(stat2);
    $teamName1.text(`${teamName}`);
    updateChartTeam(teamChart2, stat2);
    console.log(teamChart2.data);
  }
}

$teamsMain2.on("change", generateTeamStats1);
