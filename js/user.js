//This file stores all of the functions related to login/signup/logout as well as getting and setting user preferences.

"use strict";

//variable to hold the currently-logged-in user, favorite team, and favorite team id
let currentUser;
let favTeam;
let favName;

//function to display loading element and hide it once page has loaded.
document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
    $loadContainer.show();
  } else {
    $loadContainer.hide();
  }
};

//function which runs on document load.  Checks if a user is currently logged in and if the user has set a favorite team.  Shows the chart if user logged in, shows login/signup if no user.
$(document).ready(async function () {
  hidePageComponents();
  currentUser = await checkForUser();
  if (currentUser.userId !== undefined) {
    favTeam = await User.getPrefs(currentUser.userId);
    if (favTeam) {
      let favColor = getTeamColor(favTeam);
      $userProfile.css("border-color", `${favColor}`);
      $graphs.css("border-color", `${favColor}`);
      $profileInfo.css("border-color", `${favColor}`);
    }

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

//function which displays the charts page or the login/signup page when the StatShot logo is clicked depending on if a user is logged in or not.
async function home(evt) {
  evt.preventDefault();
  hidePageComponents();
  currentUser = await checkForUser();
  if (currentUser.userId !== undefined) {
    updateUIOnUserLogin();
  } else {
    $loginContainer.show();
    $welcome.show();
    $loginBtn.show();
    $loginForm.show();
    $signupBtn.show();
    $loginBtn.addClass("border-bottom border-start border-3 rounded");
  }
}

$homeBtn.on("click", home);

//function to call the checkSession request.
async function checkForUser() {
  let sessionUser = await User.checkSession();
  return sessionUser;
}

//function to handle the signup event.  Will signup a user or display a message if the username is unavailable.
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
    console.log(err.response.data.message);
    if (err.response.data.message == "taken") {
      $message.show();
      $message.text("That username is already taken");
    } else {
      $message.show();
      $hint.show();
      $message.text("That username/password is invalid.");
    }
  }
}

$signupForm.on("submit", signup);

//function to handle the login event.  Will login a user or display a message if the username/password is invalid
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

//function to handle the logout event.  Will hide all of the graph content, clear local storage and display the login/signup page along with a logout message.
async function logout(evt) {
  evt.preventDefault();

  await User.logout();
  localStorage.clear();
  sessionStorage.clear();
  if (teamChart1 !== undefined) {
    teamChart1.destroy();
  }
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

    //catches error when function is called prior to user setting a favorite team
    try {
      localStorage.setItem("favTeamName", favName.name);
    } catch (err) {
      console.log("no favorite team selected");
    }
  }
}

//helper function to update the UI on user singup/login
function updateUIOnUserLogin() {
  hidePageComponents();
  $graphs.show();
  $links.show();
  $logoutBtn.show();
  $userBtn.text(`Profile (${currentUser.username})`);
  $userBtn.show();
  generateTeamsList();
}

//function to handle the user profile event.  Will display the user profile when that navigation option is selected.
async function Profile(evt) {
  evt.preventDefault();
  if (localStorage.userId !== undefined) {
    hidePageComponents();
    $profileInfo.show();
    $userProfile.show();
    $links.show();
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

//function to handle the favorite team selection.
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

    // makes request to getTeams so that the team name can be found and stored.
    let teamsList = await Team.getTeams();

    newFav = await User.setPrefs(localStorage.userId, teamId);

    favName = teamsList.find(function (obj) {
      if (obj["id"] == newFav) return obj;
    });

    localStorage.setItem("favTeamId", newFav);
    localStorage.setItem("favTeamName", favName.name);
    $favTeam.text(
      `Your currently selected favorite team is the ${localStorage.favTeamName}`
    );
    //sets the borders to favorite color immediately so that the user does not have to reload page.
    let favColor = getTeamColor(localStorage.favTeamId);
    $userProfile.css("border-color", `${favColor}`);
    $graphs.css("border-color", `${favColor}`);
    $profileInfo.css("border-color", `${favColor}`);
  }
}

$teamsUserForm.on("submit", setFavoriteTeam);
