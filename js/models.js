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

    let newUser = new User(response.data.user);
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

    let returnUser = new User(response.data.user);
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

  static async logout() {
    let response = await axios({
      method: "post",
      url: `${BASE_URL}/api/users/logout`,
      withCredentials: true,
    });

    return response;
  }

  static async getPrefs(userId) {
    let response = await axios({
      method: "get",
      url: `${BASE_URL}/api/users/${userId}/prefs`,
      withCredentials: true,
    });

    return response.data.prefs.favTeam;
  }

  static async setPrefs(userId, favTeamId) {
    let response = await axios.post(
      `${BASE_URL}/api/users/${userId}/prefs`,
      {
        favTeamId,
      },
      { withCredentials: true }
    );

    return response.data.prefs.favTeam;
  }
}

let teamsObj;

class Team {
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }

  static async getTeams() {
    let response = await axios.get(`${BASE_URL}/api/teams`, {
      withCredentials: true,
    });

    return response.data.teams;
  }
}

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
  }

  static async getTeamStats(teamId) {
    let response = await axios.get(`${BASE_URL}/api/teams/${teamId}`, {
      withCredentials: true,
    });
    const stats = response.data.teams[0].teamStats[0].splits[0].stat;
    teamName = response.data.teams[0].name;
    const newStat = new Stat(stats);
    return newStat;
  }
}
