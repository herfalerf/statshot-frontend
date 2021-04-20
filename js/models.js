//This file contains models for the User, Team and Stat classes as well as their associated class functions

"use strict";

const BASE_URL = "https://statshot-backend.herokuapp.com/";

// Setup User class and related functions
class User {
  constructor({ username, userId, favTeamId }) {
    this.username = username;
    this.userId = userId;
  }

  //function to make a POST request to the signup route in the statshot api
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

  //function to make a POST request to the login route in the statshot api
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

  //function to make a GET request to the statshot api to determine if a user is stored in the flask session.
  static async checkSession() {
    let response = await axios({
      method: "get",
      url: `${BASE_URL}/api/users/session`,
      withCredentials: true,
    });

    let sessUser = new User(response.data.user);
    return sessUser;
  }

  //function to make a POST request to the statshot api to logout a user.
  static async logout() {
    let response = await axios({
      method: "post",
      url: `${BASE_URL}/api/users/logout`,
      withCredentials: true,
    });

    return response;
  }

  //function to make a GET request to the statshot api to get user preferences.
  static async getPrefs(userId) {
    let response = await axios({
      method: "get",
      url: `${BASE_URL}/api/users/${userId}/prefs`,
      withCredentials: true,
    });

    return response.data.prefs.favTeam;
  }

  //function to make a POST request to the statshot api to change user preferences.
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

//variable to store the created team and team name outside of the function in which it is created.
let teamsObj;
let teamName;

//Setup Team class and related functions
class Team {
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }

  //function to make a GET request to the statshot API for the current list of NHL teams
  static async getTeams() {
    let response = await axios.get(`${BASE_URL}/api/teams`, {
      withCredentials: true,
    });

    return response.data.teams;
  }
}

//Setup Stat class and related functions
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

  //function to make GET request to statshot API for an individual teams statistics.
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
