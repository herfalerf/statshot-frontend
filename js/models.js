"use strict";

const BASE_URL = "http://localhost:5000";

// Setup User class and related functions
class User {
  constructor({ username, userId, favTeamId }) {
    this.username = username;
    this.userId = userId;
  }

  static async signup(username, password) {
    let response = await axios.post(
      `${BASE_URL}/api/users/register`,
      {
        username,
        password,
      },
      { withCredentials: true }
    );
    console.log(`this is the signup ${response.data.user}`);
    let newUser = new User(response.data.user);
    console.log(`this is a new user from signup`, newUser);
    return newUser;
  }

  static async login(username, password) {
    let response = await axios.post(
      `${BASE_URL}/api/users/login`,
      {
        username,
        password,
      },
      { withCredentials: true }
    );
    console.log(`this is the login ${response.data.user}`);
    let returnUser = new User(response.data.user);
    // console.log(`this is a new user from login`, returnUser);
    return returnUser;
  }

  static async checkSession() {
    let response = await axios({
      method: "get",
      url: `${BASE_URL}/api/users/session`,
      withCredentials: true,
    });

    let sessUser = new User(response.data.user);

    return sessUser;
  }

  static async testSession() {
    let response = await axios.get(`${BASE_URL}/api/users/session`, {
      withCredentials: true,
    });
    let testSess = response.data.user;
    return testSess;
  }

  static async logout() {
    let response = await axios({
      method: "post",
      url: `${BASE_URL}/api/users/logout`,
      withCredentials: true,
    });

    console.log(response.data);
    return response;
  }
}

// Setup Team class and related functions

let teamsObj;

class Team {
  constructor(
    name,
    id
    // wins,
    // losses,
    // ot,
    // pts,
    // gamesPlayed,
    // goalsPerGame,
    // goalsAgainstPerGame,
    // savePctg,
    // powerPlayGoals,
    // powerPlayGoalsAgainst,
    // powerPlayOpportunities
  ) {
    this.name = name;
    this.id = id;
    // this.wins = wins;
    // this.losses = losses;
    // this.ot = ot;
    // this.pts = pts;
    // this.gamesPlayed = gamesPlayed;
    // this.goalsPerGame = goalsPerGame;
    // this.goalsAgainstPerGame = goalsAgainstPerGame;
    // this.savePctg = savePctg;
    // this.powerPlayGoals = powerPlayGoals;
    // this.powerPlayGoalsAgainst = powerPlayGoalsAgainst;
    // this.powerPlayOpportunities = powerPlayOpportunities;
  }

  static async getTeams() {
    let response = await axios.get(`${BASE_URL}/api/teams`, {
      withCredentials: true,
    });
    // console.log(response.data.teams);

    return response.data.teams;
  }
  // static async getTeamStats(teamId) {
  //   let response = await axios.get(`${BASE_URL}/api/teams/${teamId}`, {
  //     withCredentials: true,
  //   });
  //   console.log(response.data.teams[0].teamStats[0].splits[0].stat);
  // }
}
// let newStat;

let teamName;

class Stat {
  constructor({
    wins,
    losses,
    ot,
    pts,
    gamesPlayed,
    goalsPerGame,
    goalsAgainstPerGame,
    savePctg,
    powerPlayGoals,
    powerPlayGoalsAgainst,
    // powerPlayOpportunities,
  }) {
    this.wins = wins;
    this.losses = losses;
    this.ot = ot;
    this.pts = pts;
    this.gamesPlayed = gamesPlayed;
    this.goalsPerGame = goalsPerGame;
    this.goalsAgainstPerGame = goalsAgainstPerGame;
    this.savePctg = savePctg;
    this.powerPlayGoals = powerPlayGoals;
    this.powerPlayGoalsAgainst = powerPlayGoalsAgainst;
    // this.powerPlayOpportunities = powerPlayOpportunities;
  }

  static async getTeamStats(teamId) {
    let response = await axios.get(`${BASE_URL}/api/teams/${teamId}`, {
      withCredentials: true,
    });
    const stats = response.data.teams[0].teamStats[0].splits[0].stat;
    console.log(response.data.teams[0].name);
    teamName = response.data.teams[0].name;
    const newStat = new Stat(stats);
    return newStat;
  }
}
