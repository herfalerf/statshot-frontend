function navLoginClick(evt) {
  hidePageComponents();
  $loginForm.show();
  $signupBtn.show();
  $loginBtn.show();
}

$loginBtn.on("click", navLoginClick);

function navSignupClick(evt) {
  hidePageComponents();
  $signupForm.show();
  $signupBtn.show();
  $loginBtn.show();
}

$signupBtn.on("click", navSignupClick);
