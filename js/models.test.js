describe("User class function tests (with setup and tear-down)", function () {
  it("should log a user in", async function () {
    let response = await User.login("Testuser", "test");
    expect(response.username).toEqual("Testuser");
  });
  it("should check the session and return user if user is logged in", async function () {
    let response = await User.login("Testuser", "test");
    let sessResponse = await User.checkSession();
    expect(sessResponse.username).toEqual("Testuser");
  });
  it("should check the session and return no user if user is not logged in", async function () {
    let sessResponse = await User.checkSession();
    expect(sessResponse.username).toEqual(undefined);
  });
  it("should log a user out", async function () {
    let response = await User.login("Testuser", "test");
    let logout = await User.logout();
    expect(logout.data.logout).toEqual("You have been logged out");
  });
  it("should set user prefs", async function () {
    let response = await User.login("Testuser", "test");
    let respPrefs = await User.setPrefs(response.userId, 25);
    expect(respPrefs).toEqual("25");
  });
  it("should get user prefs", async function () {
    let response = await User.login("Testuser", "test");
    let respPrefs = await User.getPrefs(response.userId);
    expect(respPrefs).toEqual("25");
  });
  afterEach(async function () {
    let logout = await User.logout();
  });
});

describe("Team class function tests (with setup and teardown)", function () {
  it("should get teams list if user is logged in", async function () {
    let response = await User.login("Testuser", "test");
    teamsList = await Team.getTeams();
    expect(teamsList[0].teamName).toContain("Devils");
  });
  afterEach(async function () {
    let logout = await User.logout();
  });
});

describe("Stat class function tsts (with setup and teardown)", function () {
  it("should get a specified teams stats if a user is logged in", async function () {
    let response = await User.login("Testuser", "test");
    teamStat = await Stat.getTeamStats(25);
    expect("wins" in teamStat).toBeTrue();
  });
  it("should create an instance of the Stat class", async function () {
    let response = await User.login("Testuser", "test");
    teamStat = await Stat.getTeamStats(25);
    expect(teamStat).toBeInstanceOf(Stat);
  });
  afterEach(async function () {
    let logout = await User.logout();
  });
});
