"use strict";

//variable to hold the currently-logged-in user, favorite team, and favorite team id
let currentUser;
let favTeam;
let favName;

$(document).ready(async function () {
  hidePageComponents();
  currentUser = await checkForUser();
  if (currentUser.userId !== undefined) {
    favTeam = await User.getPrefs(currentUser.userId);
    updateUIOnUserLogin();
    saveUserCredentialsInLocalStorage();
  } else {
    $loginContainer.show();
    $welcome.show();
    $loginBtn.show();
    $signupBtn.show();
    $loginForm.show();
    $loginBtn.addClass("border-bottom border-start border-3 rounded");
  }
});

async function home(evt) {
  evt.preventDefault();
  hidePageComponents();
  currentUser = await checkForUser();
  if (currentUser.userId !== undefined) {
    updateUIOnUserLogin();
  } else {
    $welcome.show();
    $loginBtn.show();
    $signupBtn.show();
  }
}

$homeBtn.on("click", home);

async function checkForUser() {
  let sessionUser = await User.checkSession();
  return sessionUser;
}

async function signup(evt) {
  evt.preventDefault();
  try {
    const username = $("#signup-username").val();
    const password = $("#signup-password").val();

    currentUser = await User.signup(username, password);
    favTeam = await User.getPrefs(currentUser.userId);

    $signupForm.trigger("reset");

    saveUserCredentialsInLocalStorage();
    updateUIOnUserLogin();
  } catch (err) {
    $message.show();
    $message.text("That username is already taken");
  }
}

$signupForm.on("submit", signup);

async function login(evt) {
  evt.preventDefault();

  try {
    const username = $("#login-username").val();
    const password = $("#login-password").val();

    currentUser = await User.login(username, password);
    favTeam = await User.getPrefs(currentUser.userId);

    $loginForm.trigger("reset");

    saveUserCredentialsInLocalStorage();
    updateUIOnUserLogin();
  } catch (err) {
    console.log("this is an error");
    $message.show();
    $message.text("Invalid username/password");
  }
}

$loginForm.on("submit", login);

async function logout(evt) {
  evt.preventDefault();

  await User.logout();
  localStorage.clear();
  hidePageComponents();
  $loginContainer.show();
  $message.show();
  $message.text("You have been logged out, Goodbye");
  $loginBtn.show();
  $signupBtn.show();
  $loginForm.show();
  $welcome.show();
}

$logoutBtn.on("click", logout);

//helper function to save the current user information in local storage
async function saveUserCredentialsInLocalStorage() {
  if (currentUser) {
    let teamsList = await Team.getTeams();

    favName = teamsList.find(function (obj) {
      if (obj["id"] == favTeam) return obj;
    });

    localStorage.setItem("username", currentUser.username);
    localStorage.setItem("userId", currentUser.userId);
    localStorage.setItem("favTeamId", favTeam);
    localStorage.setItem("favTeamName", favName.name);
  }
}

//helper function to update the UI on user singup/login
function updateUIOnUserLogin() {
  hidePageComponents();
  $graphs.show();
  $logoutBtn.show();
  $userBtn.text(`Profile (${currentUser.username})`);
  $userBtn.show();
  generateTeamsList();
}

async function Profile(evt) {
  evt.preventDefault();
  if (localStorage.userId !== undefined) {
    hidePageComponents();
    $userProfile.show();
    $logoutBtn.show();
    $userBtn.show();

    if (localStorage.favTeamId == "None") {
      $favTeam.text("You have not selected a favorite team");
    } else {
      $favTeam.text(
        `Your currently selected favorite team is the ${localStorage.favTeamName}`
      );
    }
  } else {
    $welcome.show();
    $loginBtn.show();
    $signupBtn.show();
  }
}
$userBtn.on("click", Profile);

async function setFavoriteTeam(evt) {
  evt.preventDefault();
  let newFav;

  if (localStorage.userId == undefined) {
    hidePageComponents();
    $userProfile.show();
    $logoutBtn.show();
    $userBtn.show();
  } else {
    const teamId = $teamsUser.val();
    let teamsList = await Team.getTeams();

    newFav = await User.setPrefs(localStorage.userId, teamId);

    favName = teamsList.find(function (obj) {
      if (obj["id"] == newFav) return obj;
    });

    localStorage.setItem("favTeam", newFav.id);
    localStorage.setItem("favTeamName", favName.name);
    $favTeam.text(
      `Your currently selected favorite team is the ${localStorage.favTeamName}`
    );
  }
}

$teamsUserForm.on("submit", setFavoriteTeam);
