const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");
const $loginBtn = $("#login-button");
const $signupBtn = $("#signup-button");
const $graphs = $("#graphs");
const $welcome = $("#welcome");
const $logoutBtn = $("#logout-button");
const $userBtn = $("#user-button");
const $message = $("#message");
const $teamsMain = $("#teams-main");
const $teamsSecond = $("#teams-second");
const $teamsUser = $("#teams-user");
const $userProfile = $("#user-profile");
const $favTeam = $("#fav-team");
const $teamsUserForm = $("#fav-team-form");
const $favTeamBtn = $("#fav-team-button");
const $homeBtn = $("#home-button");

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
    $message,
    $userProfile,
  ];
  components.forEach((c) => c.hide());
}
