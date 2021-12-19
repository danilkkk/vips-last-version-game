let time;
let score = 0;
const scoreMessage = "SCORE:";

let currentQuestion;
let currentQuestionsArray;
let currentId;

let interval;

let wrongAnswIntId = null;
const wrongAnswTO = 2000;

function showWrongAnswerMessage() {
  console.log("showWrongAnswerMessage");
  if (wrongAnswIntId) {
    clearTimeout(wrongAnswIntId);
    wrongAnswIntId = null;
  }

  wrongAnswMsg.classList.add("visible");
  wrongAnswIntId = setTimeout(
    () => void wrongAnswMsg.classList.remove("visible"),
    wrongAnswTO
  );
}

function clearAnswerInput(answerInput) {
  answerInput.value = "";
  answerInput.focus();
}

function computeTimeForGame() {
  return 30 - 0 * GAME_DATA.gameMode;
}

function dercreaseTime() {
  if (time-- === 0) {
    finishGame();
    return;
  }

  setTime(time);
}

function setTime(value) {
  let minutes = `${Math.trunc(value / 60)}`;

  if (minutes.length === 1) {
    minutes = "0" + minutes;
  }

  let seconds = `${value % 60}`;

  if (seconds.length === 1) {
    seconds = "0" + seconds;
  }

  timer.innerHTML = `${minutes}:${seconds}`;
}

function finishGame() {
  clearInterval(interval);
  showCurrentScore();
  showGameOver();
  model.updateScore(score);
  model.incrementGames();
  model.incrementTime(computeTimeForGame());
  setScore();
  model.saveUserDataToLocalStorage();
  removeAllFigures();
  score = 0;
  time = 0;
}

function showCurrentScore() {
  currentScore.textContent = `${scoreMessage} ${score}`;
}

function showGameOver() {
  gameOverScreen.classList.add("visible");
  gameScreen.classList.remove("visible");
  easyGameSubscreen.classList.remove("visible");
  middleGameSubscreen.classList.remove("visible");
  hardGameSubscreen.classList.remove("visible");
}

/**
 * EASY MODE GAME
 */

let easySumbitHandlerAlreadyCreated = false;

function startEasyGame() {
  console.log("startEasyGame");
  clearAnswerInput(firstAnswerInput);

  easyGameSubscreen.classList.add("visible");
  NUMBER_OF_FIGURES_IN_QUESTION = 8;

  if (!easySumbitHandlerAlreadyCreated) {
    addListenerToForm(
      firstAnswerForm,
      firstAnswerInput,
      createEasyQuestion,
      checkEasyAnswer
    );
    easySumbitHandlerAlreadyCreated = true;
  }

  createEasyQuestion();
  interval = setInterval(dercreaseTime, 1000);
  time = computeTimeForGame();
  setTime(time);
}

const CURRENT_EASY_QUESTION = {
  question: "",
  answer: -1,

  setQuestion(figuresType) {
    this.question = `Сколько ${figuresType} на экране?`;
  },

  getQuestion() {
    return this.question;
  },

  setAnswer(answer) {
    this.answer = answer;
  },

  checkAnswer(userAnswer) {
    return this.answer === +userAnswer;
  },
};

function createEasyQuestion() {
  console.log("createEasyQuestion");
  removeAllFigures();
  generateAmountOfFigures(firstGameModeImgContainer);

  const typeIndex =
    currentFiguresArray[getRandom(0, currentFiguresArray.length - 1)].getType();
  CURRENT_EASY_QUESTION.setQuestion(FIGURES[typeIndex].CLIENT_NAME);

  let numberOfThisTypeFigures = 0;

  for (const figure of currentFiguresArray) {
    if (figure.getType() === typeIndex) {
      numberOfThisTypeFigures++;
    }
  }

  CURRENT_EASY_QUESTION.setAnswer(numberOfThisTypeFigures);
  pasteQuestionOnPage(qusetionFirst, CURRENT_EASY_QUESTION.getQuestion());
  firstAnswerInput.focus();
}

function checkEasyAnswer() {
  return CURRENT_EASY_QUESTION.checkAnswer(firstAnswerInput.value);
}

/**
 * MIDDLE MODE GAME
 */

let midleSumbitHandlerAlreadyCreated = false;

const CURRENT_MIDDLE_QUESTION = {
  question: "",
  answer: -1,

  setQuestion(figuresType, figureColor) {
    this.question = `Сколько ${figureColor} ${figuresType} на экране?`;
  },

  getQuestion() {
    return this.question;
  },

  setAnswer(answer) {
    this.answer = answer;
  },

  checkAnswer(userAnswer) {
    return this.answer === +userAnswer;
  },
};

function startMiddleGame() {
  middleGameSubscreen.classList.add("visible");
  NUMBER_OF_FIGURES_IN_QUESTION = 13;

  clearAnswerInput(secondAnswerInput);

  if (!midleSumbitHandlerAlreadyCreated) {
    addListenerToForm(
      secondAnswerForm,
      secondAnswerInput,
      createMiddleQuestion,
      checkMiddleAnswer
    );
    midleSumbitHandlerAlreadyCreated = true;
  }

  createMiddleQuestion();
  interval = setInterval(dercreaseTime, 1000);
  time = computeTimeForGame();
  setTime(time);
}

function createMiddleQuestion() {
  console.log("createEasyQuestion");
  removeAllFigures();
  generateAmountOfFigures(secondGameModeImgContainer);

  const randomIndex = getRandom(0, currentFiguresArray.length - 1);
  const typeIndex = currentFiguresArray[randomIndex].getType();
  const colorIndex = currentFiguresArray[randomIndex].getColorType();
  CURRENT_MIDDLE_QUESTION.setQuestion(
    FIGURES[typeIndex].CLIENT_NAME,
    COLORES[colorIndex].CLIENT_NAME
  );

  let numberOfThisTypeFigures = 0;

  for (const figure of currentFiguresArray) {
    if (
      figure.getType() === typeIndex &&
      figure.getColorType() === colorIndex
    ) {
      numberOfThisTypeFigures++;
    }
  }

  CURRENT_MIDDLE_QUESTION.setAnswer(numberOfThisTypeFigures);
  pasteQuestionOnPage(qusetionSecond, CURRENT_MIDDLE_QUESTION.getQuestion());
  firstAnswerInput.focus();
}

function checkMiddleAnswer() {
  return CURRENT_MIDDLE_QUESTION.checkAnswer(secondAnswerInput.value);
}

/**
 * HARD MODE GAME
 */

function startHardGame() {
  middleGameSubscreen.classList.add("visible");
  NUMBER_OF_FIGURES_IN_QUESTION = 20;

  clearAnswerInput(secondAnswerInput);

  if (!midleSumbitHandlerAlreadyCreated) {
    addListenerToForm(
      secondAnswerForm,
      secondAnswerInput,
      createMiddleQuestion,
      checkMiddleAnswer
    );
    midleSumbitHandlerAlreadyCreated = true;
  }

  createMiddleQuestion();
  interval = setInterval(dercreaseTime, 1000);
  time = computeTimeForGame();
  setTime(time);
}

function addListenerToForm(
  formElement,
  answerInput,
  createQuestion,
  checkAnswer
) {
  formElement.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!checkAnswer()) {
      showWrongAnswerMessage();
      clearAnswerInput(answerInput);
      answerInput.focus();
      return;
    }

    score += 5 + 1 * GAME_DATA.gameMode;
    clearAnswerInput(answerInput);
    createQuestion();
  });
}

function pasteQuestionOnPage(element, question) {
  element.textContent = question;
}
