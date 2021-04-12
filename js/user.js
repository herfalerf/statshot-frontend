"use strict";

//variable to hold the currently-logged-in user, favorite team, and favorite team id
let currentUser;
let favTeam;
let favName;

$(document).ready(async function () {
  hidePageComponents();
  currentUser = await checkForUser();
  if (currentUser.userId !== undefined) {
    console.log(`User ${currentUser.username} is logged in`);
    favTeam = await User.getPrefs(currentUser.userId);
    updateUIOnUserLogin();
    saveUserCredentialsInLocalStorage();
  } else {
    console.log("No user is logged in");
    $welcome.show();
    $loginBtn.show();
    $signupBtn.show();
  }

  console.log(currentUser);
});

async function checkForUser() {
  let sessionUser = await User.checkSession();
  return sessionUser;
}

async function signup(evt) {
  evt.preventDefault();

  const username = $("#signup-username").val();
  console.log(username);
  const password = $("#signup-password").val();
  console.log(password);

  currentUser = await User.signup(username, password);
  console.log(currentUser);
  favTeam = await User.getPrefs(currentUser.userId);

  $signupForm.trigger("reset");

  saveUserCredentialsInLocalStorage();
  updateUIOnUserLogin();
}

$signupForm.on("submit", signup);

async function login(evt) {
  evt.preventDefault();

  const username = $("#login-username").val();
  console.log(username);
  const password = $("#login-password").val();
  console.log(password);

  currentUser = await User.login(username, password);
  console.log(currentUser);
  favTeam = await User.getPrefs(currentUser.userId);
  console.log(favTeam);

  $loginForm.trigger("reset");

  saveUserCredentialsInLocalStorage();
  updateUIOnUserLogin();
}

$loginForm.on("submit", login);

async function logout(evt) {
  evt.preventDefault();

  await User.logout();
  localStorage.clear();
  hidePageComponents();
  $goodbye.show();
  $loginBtn.show();
  $signupBtn.show();
}

$logoutBtn.on("click", logout);
//helper function to save the current user information in local storage
async function saveUserCredentialsInLocalStorage() {
  if (currentUser) {
    let teamsList = await Team.getTeams();
    console.log(teamsList);

    favName = teamsList.find(function (obj) {
      if (obj["id"] == favTeam) return obj;
    });
    console.log(favName);
    console.log(`this is favName from saveUserCredentials ${favName}`);
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
    console.log(localStorage.userId);
    hidePageComponents();
    $userProfile.show();
    $logoutBtn.show();
    $userBtn.show();
    console.log(localStorage.favTeam);

    if (localStorage.favTeamId == "None") {
      $favTeam.text("You have not selected a favorite team");
    } else {
      $favTeam.text(
        `Your currently selected favorite team is the ${localStorage.favTeamName}`
      );
    }

    // console.log(favTeam.prefs.favTeam);
  } else {
    console.log("No user is logged in");
    $welcome.show();
    $loginBtn.show();
    $signupBtn.show();
  }
}
$userBtn.on("click", Profile);

async function setFavoriteTeam(evt) {
  evt.preventDefault();
  let newFav;
  console.log("I am submitted");
  console.log(localStorage.userId);

  if (localStorage.userId == undefined) {
    hidePageComponents();
    $userProfile.show();
    $logoutBtn.show();
    $userBtn.show();
  } else {
    const teamId = $teamsUser.val();
    console.log(teamId);
    let teamsList = await Team.getTeams();
    console.log(teamsList);
    newFav = await User.setPrefs(localStorage.userId, teamId);
    console.log(newFav);
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
