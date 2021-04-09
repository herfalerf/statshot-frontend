const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");
const $loginBtn = $("#login-button");
const $signupBtn = $("#signup-button");
const $graphs = $("#graphs");
const $welcome = $("#welcome");
const $logoutBtn = $("#logout-button");
const $userBtn = $("#user-button");
const $goodbye = $("#goodbye");

function hidePageComponents() {
  const components = [
    $loginForm,
    $signupForm,
    $loginBtn,
    $signupBtn,
    $graphs,
    $welcome,
    $logoutBtn,
    $userBtn,
    $goodbye,
  ];
  components.forEach((c) => c.hide());
}
