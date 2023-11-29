const MIN_SIZE = 50;
const MAX_SIZE = 150;

const CONTAINER_HEIGHT = 380;
const CONTAINER_WIDTH = 800;

let NUMBER_OF_FIGURES_IN_QUESTION = 18;

let currentFiguresArray = [];

// just

const FIGURES = [
  {
    CLIENT_NAME: "кругов",
    ID: 0,
  },
  {
    CLIENT_NAME: "квадратов",
    ID: 1,
  },
  {
    CLIENT_NAME: "треугольников",
    ID: 2,
  },
  //   {
  //     CLIENT_NAME: "звезд",
  //     ID: 3,
  //   },
  //   {
  //     CLIENT_NAME: "пятиугольников",
  //     ID: 4,
  //   },
  //   {
  //     CLIENT_NAME: "шестиугольников",
  //     ID: 5,
  //   },
];

const FIGURES_TYPE = {
  CIRCLE: 0,
  SQUARE: 1,
  TRIANGLE: 2,
  STAR: 3,
  PENTAGON: 4,
  HEXAGON: 5,
};

const COLORES = [
  {
    CLIENT_NAME: "красных",
    BACKGROUND: "rgba(255, 0, 0, 0.596)",
    BORDER: "rgb(182, 0, 0)",
    ID: 0,
  },
  {
    CLIENT_NAME: "синих",
    BACKGROUND: "rgba(0, 17, 255, 0.596)",
    BORDER: "rgb(3, 0, 182)",
    ID: 1,
  },
  {
    CLIENT_NAME: "зеленых",
    BACKGROUND: "rgba(0, 255, 106, 0.596)",
    BORDER: "rgb(0, 182, 106)",
    ID: 2,
  },
  {
    CLIENT_NAME: "голубых",
    BACKGROUND: "rgba(0, 255, 255, 0.596)",
    BORDER: "rgb(0, 176, 182)",
    ID: 3,
  },
  {
    CLIENT_NAME: "желтых",
    BACKGROUND: "rgba(255, 208, 0, 0.596)",
    BORDER: "rgb(182, 164, 0)",
    ID: 4,
  },
  {
    CLIENT_NAME: "фиолетовых",
    BACKGROUND: "rgba(162, 0, 255, 0.596)",
    BORDER: "rgb(115, 0, 182)",
    ID: 5,
  },
];

const COLOR_TYPES = {
  RED: 0,
  BLUE: 1,
  GREEN: 2,
  BLACK: 3,
  YELLOW: 4,
  PURPLE: 5,
};

let _id = 10;

function getUniqueId() {
  return `f-${_id++}`;
}

class Figure {
  constructor(colorType, id, size, top, left, type, rotation, draggable) {
    this.colorType = colorType;
    this.id = id;
    this.size = size;
    this.top = top;
    this.left = left;
    this.type = type;
    this.rotation = rotation;
    this.draggable = draggable;
    this.element = null;

    console.log("creating figure with top:", top, "left:", left);
  }

  removeFigure() {
    if (!this.element) {
      return;
    }

    this.element.remove();
    this.element = null;
  }

  getType() {
    return this.type;
  }

  _findElement() {
    this.element = document.querySelector(`#${this.id}`);
    return this.element;
  }

  getElement() {
    if (this.element) {
      this._findElement();
    }

    return this.element;
  }

  getColorType() {
    return this.colorType;
  }

  getHTMLElementAsString() {
    switch (this.type) {
      case FIGURES_TYPE.CIRCLE:
        console.log("CIRCLE GENERATE");
        return this._createCircle();

      case FIGURES_TYPE.SQUARE:
        console.log("SQUARE GENERATE");
        return this._createSquare();

      case FIGURES_TYPE.TRIANGLE:
        console.log("TRIANGLE GENERATE");
        return this._createTriangle();

      case FIGURES_TYPE.STAR:
        console.log("STAR GENERATE");
        return this._createStar();

      case FIGURES_TYPE.PENTAGON:
        console.log("PENTAGON GENERATE");
        return this._createPentagon();

      case FIGURES_TYPE.HEXAGON:
        console.log("HEXAGON GENERATE");
        return this._createHexagon();
    }
  }

  bind(container) {
    container.insertAdjacentHTML("beforeend", this.getHTMLElementAsString());
  }

  _createCircle() {
    return `<div class='figure' id=${this.id} style='width: ${this.size}px;
    height:  ${this.size}px;
    position: absolute;
    top: ${this.top}px;
    left: ${this.left}px;
    background: ${COLORES[this.colorType].BACKGROUND};
    border: 1px solid ${COLORES[this.colorType].BORDER};
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;'></div>`;
  }

  _createSquare() {
    return `<div class='figure' id=${this.id} style='width: ${this.size}px;
    height: ${this.size}px;
    position: absolute;
    top: ${this.top}px;
    left: ${this.left}px;
    transform: rotate(${this.rotation}deg);
    border: 1px solid ${COLORES[this.colorType].BORDER};
    background: ${COLORES[this.colorType].BACKGROUND};'>
    </div>`;
  }

  _createTriangle() {
    return `<div class='figure' id=${this.id} style='width: 0;
    height: 0;
    position: absolute;
    top: ${this.top}px;
    left: ${this.left}px;
    transform: rotate(${this.rotation}deg);
    border-left: ${this.size / 2}px solid transparent;
    border-right: ${this.size / 2}px solid transparent;
    border-bottom: ${this.size}px solid ${
      COLORES[this.colorType].BACKGROUND
    };'></div>`;
  }

  _createStar() {
    return `&#9733;`;
  }

  _createPentagon() {
    return `Пятиугольник;`;
  }

  _createHexagon() {
    return `Шестиугольник;`;
  }
}

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomSize() {
  return getRandom(MIN_SIZE, MAX_SIZE);
}

function getRandomColor() {
  return getRandom(0, COLORES.length - 1);
}

function getRandomRotation() {
  return getRandom(0, 360);
}

function getRandomFigureType() {
  return getRandom(0, FIGURES.length - 1);
}

function getRandomPosition(size) {
  const top = getRandom(0, CONTAINER_HEIGHT - size);
  const left = getRandom(0, CONTAINER_WIDTH - size);
  return {
    top,
    left,
  };
}

function createFigure(container) {
  const size = getRandomSize();
  const { top, left } = getRandomPosition(size);
  const figure = new Figure(
    getRandomColor(),
    getUniqueId(),
    size,
    top,
    left,
    getRandomFigureType(),
    getRandomRotation(),
    false
  );
  figure.bind(container);
  return figure;
}

function generateAmountOfFigures(container) {
  currentFiguresArray = [];
  console.log("generateAmountOfFigures");

  for (let i = 0; i < NUMBER_OF_FIGURES_IN_QUESTION; i++) {
    currentFiguresArray.push(createFigure(container));
    console.log(currentFiguresArray);
    console.log(currentFiguresArray[currentFiguresArray.length - 1]);
    currentFiguresArray[currentFiguresArray.length - 1]._findElement();
    console.log(
      currentFiguresArray[currentFiguresArray.length - 1].getElement()
    );

    makeDraggable(
      currentFiguresArray[currentFiguresArray.length - 1].getElement()
    );
  }
}

function makeDraggable(element) {
  element.onmousedown = function (e) {
    var coords = getCoords(element);
    var shiftX = e.pageX - coords.left;
    var shiftY = e.pageY - coords.top;

    element.style.position = "absolute";
    document.body.appendChild(element);
    moveAt(e);

    element.style.zIndex = 1000; // над другими элементами

    function moveAt(e) {
      element.style.left = e.pageX - shiftX + "px";
      element.style.top = e.pageY - shiftY + "px";
    }

    document.onmousemove = function (e) {
      moveAt(e);
    };

    element.onmouseup = function () {
      document.onmousemove = null;
      element.onmouseup = null;
    };
  };

  element.ondragstart = function () {
    return false;
  };

  function getCoords(elem) {
    // кроме IE8-
    var box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
    };
  }
}

function removeAllFigures() {
  for (const figure of currentFiguresArray) {
    figure.removeFigure();
  }
}
