// TODO: Clean up form disappear class name
const loginFormBackground = document.querySelector(".js-form-background");
const loginForm = loginFormBackground.querySelector(
  ".js-form-background__log-in"
);
const loginInput = loginForm.querySelector(".js-log-in__input");

// TODO: Fix greeting flickering
function showGreeting(username) {
  setTimeout(() => {
    fadeOut(GREETING, false, false, () => {
      GREETING.innerText = `Hello, ${username}!`;
    });

    fadeIn(GREETING, true, false); // TODO: Fix timing
  }, TRANSITION_DURATION);
}

function handleLogInSubmit(event) {
  event.preventDefault(); // Stops browser from refreshing

  loginFormBackground.classList.add(SLOW_DISAPPEAR_CLASSNAME);
  loginForm.classList.add(SLOW_DISAPPEAR_CLASSNAME);

  setTimeout(() => {
    loginFormBackground.classList.add(HIDDEN_CLASSNAME);
    loginForm.classList.add(HIDDEN_CLASSNAME);
  }, TRANSITION_DURATION * 2 - 50);
  // fadeOut(loginFormBackground, false, true);
  // fadeOut(loginForm, false, true);

  const inputUsername = loginInput.value;

  localStorage.setItem(USERNAME_KEY, inputUsername);
  showGreeting(inputUsername);
}

function askForUsername() {
  const savedUsername = localStorage.getItem(USERNAME_KEY);

  if (savedUsername === null) {
    setTimeout(() => {
      loginFormBackground.classList.add(SLOW_APPEAR_CLASSNAME);
      loginFormBackground.classList.remove(HIDDEN_CLASSNAME);
      loginForm.classList.remove(SLOW_APPEAR_CLASSNAME);
      loginForm.classList.remove(HIDDEN_CLASSNAME);
    }, TRANSITION_DURATION * 2 - 100);
    // setTimeout(() => {
    //   fadeIn(loginFormBackground, false, true);
    //   fadeIn(loginForm, false, true);
    // }, TRANSITION_DURATION * 2 - 100);

    loginForm.addEventListener("submit", handleLogInSubmit);
  } else {
    GREETING.innerText = `Hello, ${savedUsername}!`;
  }
}

askForUsername();
