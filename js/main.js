const $body = $("body");
const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");
const $loginBtn = $("#login-button");
const $signupBtn = $("#signup-button");
const $graphs = $("#graphs");

function hidePageComponents() {
  const components = [$loginForm, $signupForm, $loginBtn, $signupBtn, $graphs];
  components.forEach((c) => c.hide());
}
