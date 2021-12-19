const welcomeScreen = document.querySelector(".js-welcome-screen");
const authorizationScreen = document.querySelector(".js-authorization-screen");
const menuScreen = document.querySelector(".js-menu-screen");
const gameScreen = document.querySelector(".js-game-screen");
const gameOverScreen = document.querySelector(".js-game-over-screen");
const resultScreen = document.querySelector(".js-result-screen");

const startBtn = document.querySelector(".js-start-btn");
const toMenuBtn = document.querySelector(".js-tomenu-btn");
const gameoverToMenuBtn = document.querySelector(".js-gameover-to-menu-btn");
const resultToMenuBtn = document.querySelector(".js-result-to-menu-btn");
const wrongAnswMsg = document.querySelector(".js-wrong-answ");

const nicname = document.querySelector(".js-nicname");
const totalScore = document.querySelector(".js-total");
const currentScore = document.querySelector(".js-score");
const navFields = document.querySelectorAll(".field");

const playBtnModeContainer = document.querySelector(".js-mode-btn-container");

const nicnameInput = document.querySelector(".js-nic-input");

const firstGameModeImgContainer = document.querySelector(
  ".js-img-container-first"
);
const secondGameModeImgContainer = document.querySelector(
  ".js-img-container-second"
);
const thirdGameModeImgContainer = document.querySelector(
  ".js-img-container-third"
);

const easyGameSubscreen = document.querySelector(".js-game-sub-first-level");
const middleGameSubscreen = document.querySelector(".js-game-sub-second-level");
const hardGameSubscreen = document.querySelector(".js-game-sub-third-level");

const changeTheme = document.querySelector(".js-change-theme");

const table = document.querySelector(".js-tbody");

const GAME_MODES = {
  EASY: 0,
  MIDDLE: 0,
  HARD: 2,
};

const GAME_DATA = {
  gameMode: GAME_MODES.EASY,
};

const firstAnswerInput = document.querySelector(".js-answer-input-1");
const secondAnswerInput = document.querySelector(".js-answer-input-2");
const thirdAnswerInput = document.querySelector(".js-answer-input-3");

const firstAnswerForm = document.querySelector(".js-answer-form-1");
const secondAnswerForm = document.querySelector(".js-answer-form-2");
const thirdAnswerForm = document.querySelector(".js-answer-form-3");

const qusetionFirst = document.querySelector(".js-question-1");
const qusetionSecond = document.querySelector(".js-question-2");
const qusetionThird = document.querySelector(".js-question-3");

const timer = document.querySelector(".js-timer");
const image = document.querySelector(".js-image");
const gameOver = document.querySelector(".js-game-over");
