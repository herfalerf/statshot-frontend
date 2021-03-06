//functions related to DOM manipulation for login/signup.

"use strict";

//function which displays the login form when the login tab is clicked
function navLoginClick(evt) {
  hidePageComponents();
  $loginContainer.show();
  $welcome.show();
  $loginForm.show();
  $signupBtn.show();
  $loginBtn.show();
  $loginBtn.addClass("border-bottom border-start border-3 rounded");
  $signupBtn.removeClass("border-bottom border-start border-3 rounded");
}

$loginBtn.on("click", navLoginClick);

//function which displays the signup form when the signup tab is clicked.
function navSignupClick(evt) {
  hidePageComponents();
  $loginContainer.show();
  $welcome.show();
  $signupForm.show();
  $signupBtn.show();
  $loginBtn.show();
  $loginBtn.removeClass("border-bottom border-start border-3 rounded");
  $signupBtn.addClass("border-bottom border-start border-3 rounded");
}

$signupBtn.on("click", navSignupClick);

//function which hides all page components on successful login
function updateNavOnLogin() {
  hidePageComponents();
}
