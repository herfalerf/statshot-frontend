"use strict";

function navLoginClick(evt) {
  hidePageComponents();
  $welcome.show();
  $loginForm.show();
  $signupBtn.show();
  $loginBtn.show();
}

$loginBtn.on("click", navLoginClick);

function navSignupClick(evt) {
  hidePageComponents();
  $welcome.show();
  $signupForm.show();
  $signupBtn.show();
  $loginBtn.show();
}

$signupBtn.on("click", navSignupClick);

function updateNavOnLogin() {
  hidePageComponents();
}

function navUserProfile(evt) {
  hidePageComponents();
  $userProfile.show();
  $logoutBtn.show();
  $userBtn.show();
}

$userBtn.on("click", navUserProfile);
