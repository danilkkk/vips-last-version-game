const menuToResult = document.querySelector(".js-menu-to-result");
const toLogin = document.querySelector(".js-logout");

startBtn.addEventListener("click", (e) => {
  console.log("changing screens: authorization is visible");

  // перейти к авторизации пользователя
  welcomeScreen.classList.remove("visible");
  authorizationScreen.classList.add("visible");
  nicnameInput.focus();
});

menuToResult.addEventListener("click", (e) => {
  menuScreen.classList.remove("visible");
  resultScreen.classList.add("visible");
  createTable();
});

toLogin.addEventListener("click", (e) => {
  menuScreen.classList.remove("visible");
  welcomeScreen.classList.add("visible");

  navFields[0].classList.remove("visible");
  navFields[1].classList.remove("visible");
});

resultToMenuBtn.addEventListener("click", (e) => {
  menuScreen.classList.add("visible");
  resultScreen.classList.remove("visible");
});

changeTheme.addEventListener("click", (e) => {
  model.toggleTheme();
  console.log(model.getTheme());
  _changeTheme(model.getTheme());
});

toMenuBtn.addEventListener("click", (e) => {
  const name = nicnameInput.value.trim();

  if (!model.validateName(name)) {
    alert("Имя не может быть пустым и не должно содержать символов : и ;");
    return;
  }

  // Проверка данных в хранилище и иницализация пользователя
  model.tryGetUserDataFromLocalStorage(name);
  model.saveUserDataToLocalStorage();

  // показать поля с именем и общим счетом пользователя
  navFields[0].classList.add("visible");
  navFields[1].classList.add("visible");

  // установить значения счета
  nicname.textContent = "@" + model.getNicName();
  setScore();

  // перейти в меню
  authorizationScreen.classList.remove("visible");
  menuScreen.classList.add("visible");
  console.log("changing screens: menu is visible");
});

gameoverToMenuBtn.addEventListener("click", (e) => {
  menuScreen.classList.add("visible");
  gameOverScreen.classList.remove("visible");
});

playBtnModeContainer.addEventListener("click", (e) => {
  // переход к игре и выбор режима
  if (e.target.classList.contains("js-easy-mode")) {
    console.log("starting easy-mode game");
    GAME_DATA.gameMode = GAME_MODES.EASY;
    setTimeout(startEasyGame);
  } else if (e.target.classList.contains("js-middle-mode")) {
    console.log("starting middle-mode game"); //
    GAME_DATA.gameMode = GAME_MODES.MIDDLE;
    setTimeout(startMiddleGame);
  } else if (e.target.classList.contains("js-hard-mode")) {
    console.log("starting hard-mode game");
    GAME_DATA.gameMode = GAME_MODES.HARD;
    setTimeout(startHardGame); //
  } else {
    return;
  }

  console.log("changing screens: game is visible");

  menuScreen.classList.remove("visible");
  gameScreen.classList.add("visible");

  // setTimeout(startGame());
});

function setScore() {
  totalScore.textContent = "TOTAL: " + model.getScore();
}

window.onstorage = (event) => {
  if (event.key === model.getNicName()) {
    model.setScore(event.newValue);
    setScore();
  }

  if (event.key === THEMES.THEME_KEY) {
    model.setTheme(event.newValue);
    _changeTheme(model.getTheme());
  }

  console.log("onstorage update");
};

function _changeTheme(key) {
  if (key === THEMES.LIGHT) {
    document.body.classList.remove("dark-blue");
    return;
  }

  if (key === THEMES.DARK) {
    document.body.classList.add("dark-blue");
    return;
  }
}

function initTheme() {
  model.tryGetThemeFromLocalStorage();
  _changeTheme(model.getTheme());
}

initTheme();

createTable();

function createTable() {
  const tds = [];
  let key;

  for (let i = 0; i < localStorage.length; i++) {
    key = localStorage.key(i);

    if (key === THEMES.THEME_KEY) {
      continue;
    }

    tds.push(createTr(parseData(key)));
  }

  table.innerHTML = "";

  table.append(...tds);
}

//[score, time, games]
function parseData(nicname) {
  let data = localStorage.getItem(nicname);

  console.log(data);

  if (data) {
    return [nicname, ...data.split(";")];
  }

  return [nicname, 0, 0, 0];
}

function createTr([nicname, score, time, games]) {
  const tr = document.createElement("tr");

  const tdName = document.createElement("td");
  tdName.textContent = nicname;
  tr.append(tdName);

  const tdGames = document.createElement("td");
  tdGames.textContent = games;
  tr.append(tdGames);

  const tdTime = document.createElement("td");
  tdTime.textContent = formattingTime(time);
  tr.append(tdTime);

  const tdScore = document.createElement("td");
  tdScore.textContent = score;
  tr.append(tdScore);

  return tr;
}

function formattingTime(timestamp) {
  const hours = Math.floor(timestamp / 60 / 60);
  const minutes = Math.floor(timestamp / 60) - hours * 60;
  const seconds = timestamp % 60;

  let result = "";

  if (hours > 0) {
    result += `${hours} ч. `;
  }

  if (minutes > 0 || (minutes === 0 && hours > 0)) {
    result += `${minutes} мин. `;
  }

  result += `${seconds} сек.`;

  return result;
}
