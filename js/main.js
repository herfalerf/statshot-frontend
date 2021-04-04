const $body = $("body");
const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");
const $loginBtn = $("#login-button");
const $signupBtn = $("#signup-button");

function hidePageComponents() {
  const components = [$loginForm, $signupForm, $loginBtn, $signupBtn];
  components.forEach((c) => c.hide());
}
