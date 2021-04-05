"use strict";

//variable to hold the currently-logged-in user
let currentUser;

$(document).ready(function () {
  checkForUser();
});

async function checkForUser() {
  currentUser = await User.checkSession();
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

//helper function to save the current user information in local storage
function saveUserCredentialsInLocalStorage() {
  if (currentUser) {
    localStorage.setItem("username", currentUser.username);
    localStorage.setItem("userId", currentUser.userId);
  }
}

//helper function to update the UI on user singup/login
function updateUIOnUserLogin() {
  hidePageComponents();
  $graphs.show();
}
