//This file contains jquery selectors and functions related to basic dom manipulation

const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");
const $loginBtn = $("#login-button");
const $signupBtn = $("#signup-button");
const $graphs = $("#graphs");
const $welcome = $("#welcome");
const $hamburger = $("#hamburger-button");
const $links = $("#links");
const $logoutBtn = $("#logout-button");
const $userBtn = $("#user-button");
const $message = $("#message");
const $hint = $("#hint");
const $teamsMain = $("#teams-main");
const $teamsSecond = $("#teams-second");
const $teamsUser = $("#teams-user");
const $userProfile = $("#user-profile");
const $profileInfo = $("#profile-info");
const $favTeam = $("#fav-team");
const $teamsUserForm = $("#fav-team-form");
const $favTeamBtn = $("#fav-team-button");
const $homeBtn = $("#home-button");
const $loginContainer = $("#login-container");
const $loadContainer = $("#load-container");

//function which hides page components when it is called.
function hidePageComponents() {
  const components = [
    $loginForm,
    $signupForm,
    $loginBtn,
    $signupBtn,
    $graphs,
    $welcome,
    $links,
    $logoutBtn,
    $userBtn,
    $message,
    $hint,
    $userProfile,
    $loginContainer,
    $profileInfo,
    $loadContainer,
  ];
  components.forEach((c) => c.hide());
}
