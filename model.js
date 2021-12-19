const THEMES = {
  LIGHT: "light",
  DARK: "dark",
  THEME_KEY: "theme",
};

const model = {
  _userData: {
    _nicName: "",
    _score: 0,
    _theme: THEMES.LIGHT,
    _time: 0,
    _games: 0,
  },

  toggleTheme() {
    if (this._theme === THEMES.LIGHT) {
      this._theme = THEMES.DARK;
      this.setThemeToLocalStorage();
      return;
    }

    this._theme = THEMES.LIGHT;
    this.setThemeToLocalStorage();
  },

  getTheme() {
    return this._theme;
  },

  setTheme(theme) {
    if (theme === THEMES.LIGHT || theme === THEMES.DARK) {
      this._theme = theme;
      this.setThemeToLocalStorage();
    }
  },

  setThemeToLocalStorage() {
    this.logger.log("The data is recorded in the local storage");
    localStorage.setItem(THEMES.THEME_KEY, this.getTheme());
  },

  tryGetThemeFromLocalStorage() {
    let theme = localStorage.getItem(THEMES.THEME_KEY);
    this.setTheme(theme);
  },

  saveUserDataToLocalStorage() {
    this.logger.log("The data is recorded in the local storage");
    const stringToSave = `${this.getScore()} ; ${this.getTime()} ; ${this.getGames()}`;
    localStorage.setItem(this.getNicName(), stringToSave);
  },

  tryGetUserDataFromLocalStorage(nicname) {
    this.logger.log("Try to Get User Data From LocalStorage");

    let data = localStorage.getItem(nicname);

    console.log(data);

    if (data) {
      this.logger.log("user data udpdated from LocalStorage");
      const [score, time, games] = data.split(";");
      this._initUser(nicname, score, time, games);
      return;
    }

    this.logger.log("init new user");
    this._initNewUser(nicname);
  },

  _initUser(nicname, score, time, games) {
    this.setNicName(nicname);
    this.setScore(score);
    this.setTime(time);
    this.setGames(games);
  },

  setTime(newTime) {
    this._userData._time = +newTime || 0;
  },

  incrementTime(gameTime) {
    this.setTime(+gameTime + this.getTime());
  },

  getTime() {
    return this._userData._time;
  },

  setGames(games) {
    this._userData._games = +games || 0;
  },

  getGames() {
    return this._userData._games;
  },

  incrementGames() {
    this._userData._games++;
  },

  _initNewUser(nicname) {
    this.setNicName(nicname);
    this.resetScore();
  },

  getNicName() {
    this.logger.log("Get nicname");
    return this._userData._nicName;
  },

  setNicName(newName) {
    if (this.validateName(newName)) {
      this._userData._nicName = newName;
      this.logger.log("Nickname successfully updated");
      return true;
    }

    this.logger.log("Invalid name");
    return false;
  },

  validateName(name) {
    if (name.length === 0 || name.includes(":") || name.includes(";")) {
      return false;
    }

    return true;
  },

  getScore() {
    this.logger.log("Get score");
    return this._userData._score;
  },

  updateScore(newScore) {
    this.logger.log("The game score has been updated");
    this._userData._score += +newScore;
    this.saveUserDataToLocalStorage();
  },

  resetScore() {
    this.logger.log("The game score has been reset");
    this._userData._score = 0;
  },

  setScore(newScore) {
    this.logger.log("The game score has been set");
    this._userData._score = +newScore;
  },

  getRatingFromLocalStorage() {},

  logger: {
    prefix: "Model: ",
    log(message) {
      console.log(`${this.prefix} ${message}`);
    },
  },
};
