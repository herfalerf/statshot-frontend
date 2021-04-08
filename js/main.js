const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");
const $loginBtn = $("#login-button");
const $signupBtn = $("#signup-button");
const $graphs = $("#graphs");
const $welcome = $("#welcome");
const $logout = $("#logout-button");
const $userBtn = $("#user-button");

function hidePageComponents() {
  const components = [
    $loginForm,
    $signupForm,
    $loginBtn,
    $signupBtn,
    $graphs,
    $welcome,
    $logout,
    $userBtn,
  ];
  components.forEach((c) => c.hide());
}
