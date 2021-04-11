"use strict";

//variable to hold the currently-logged-in user
let currentUser;
let favTeam;

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

  $loginForm.trigger("reset");

  saveUserCredentialsInLocalStorage();
  updateUIOnUserLogin();
}

$loginForm.on("submit", login);

async function logout(evt) {
  evt.preventDefault();

  await User.logout();
  hidePageComponents();
  $goodbye.show();
  $loginBtn.show();
  $signupBtn.show();
}

$logoutBtn.on("click", logout);
//helper function to save the current user information in local storage
function saveUserCredentialsInLocalStorage() {
  if (currentUser) {
    localStorage.setItem("username", currentUser.username);
    localStorage.setItem("userId", currentUser.userId);
    localStorage.setItem("favTeam", favTeam);
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
    favTeam = await User.getPrefs(localStorage.userId);
    // console.log(favTeam.prefs.favTeam);
  } else {
    console.log("No user is logged in");
    $welcome.show();
    $loginBtn.show();
    $signupBtn.show();
  }
}
$userBtn.on("click", Profile);
