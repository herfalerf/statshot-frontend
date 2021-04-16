"use strict";

function navLoginClick(evt) {
  hidePageComponents();
  $welcome.show();
  $loginForm.show();
  $signupBtn.show();
  $loginBtn.show();
  $loginBtn.addClass("border-bottom border-start border-3 rounded");
  $signupBtn.removeClass("border-bottom border-start border-3 rounded");
}

$loginBtn.on("click", navLoginClick);

function navSignupClick(evt) {
  hidePageComponents();
  $welcome.show();
  $signupForm.show();
  $signupBtn.show();
  $loginBtn.show();
  $loginBtn.removeClass("border-bottom border-start border-3 rounded");
  $signupBtn.addClass("border-bottom border-start border-3 rounded");
}

$signupBtn.on("click", navSignupClick);

function updateNavOnLogin() {
  hidePageComponents();
}
