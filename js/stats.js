async function generateTeamsList() {
  teamsObj = await Team.getTeams();
  console.log(teamsObj);

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

      //   if (obj.hasOwnProperty(prop)) {
      //     console.log(prop + " = " + obj[prop]);
      //   }
    }
    // console.log(tId);
    // console.log(tName);
    let newTeam = new Team(tName, tId);
    console.log(newTeam);
  }
}
