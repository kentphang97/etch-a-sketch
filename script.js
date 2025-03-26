const DEFAULT_MODE = "colour";
const DEFAULT_SIZE = 16;
const DEFAULT_COLOUR = "#333333";
const DEFAULT_BACKGROUND_COLOUR = "#F7F3F3";

//Initialization //
let currentColour = DEFAULT_COLOUR;
let currentBackgroundColour = DEFAULT_BACKGROUND_COLOUR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

//Function//
function setCurrentColour(newColour) {
  currentColour = newColour;
}

function setCurrentBackgroundColour(newBgColour) {
  currentBackgroundColour = newBgColour;
}

function setCurrentMode(newMode) {
  activateButton(newMode);
  currentMode = newMode;
}

function setCurrentSize(newSize) {
  currentSize = newSize;
}
function generateGridContainer(input) {
  const gridContainer = document.querySelector("#grid-container");

  gridContainer.innerHTML = ""; //Clear Everytime function is triggered//

  for (let c = 0; c < input; c++) {
    const row = document.createElement("div");
    row.classList.add("row");

    for (let b = 0; b < input; b++) {
      const cube = document.createElement("div");
      cube.classList.add("cube");
      cube.addEventListener("mousedown", changeColor);
      cube.addEventListener("mouseover", changeColor);
      row.appendChild(cube);
    }
    gridContainer.appendChild(row);
  }

  const containerSize = 750;
  const cubeSize = containerSize / input;

  const style = document.createElement("style");
  style.textContent = `
    .cube {
      width: ${cubeSize}px;
      height: ${cubeSize}px;
    }
  `;
  document.head.appendChild(style);
  cube = cubeRefresher();
}

function updateSizeText(value) {
  sketchpadText.textContent = `Sizing : ${value} x ${value}`;
}

function changeSize(value) {
  setCurrentSize(value);
  updateSizeText(value);
  generateGridContainer(value);
  changeBackgroundColor(currentBackgroundColour);
}

function activateButton(newMode) {
  if (currentMode === "rainbow") {
    rainbowBtn.classList.remove("active");
  } else if (currentMode === "colour") {
    colourBtn.classList.remove("active");
  } else if (currentMode === "eraser") {
    eraserBtn.classList.remove("active");
  }

  if (newMode === "rainbow") {
    rainbowBtn.classList.add("active");
  } else if (newMode === "colour") {
    colourBtn.classList.add("active");
  } else if (newMode === "eraser") {
    eraserBtn.classList.add("active");
  }
}

function changeColor(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  if (currentMode === "rainbow") {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
  } else if (currentMode === "colour") {
    e.target.style.backgroundColor = currentColour;
  } else if (currentMode === "eraser") {
    e.target.style.backgroundColor = "#fefefe";
  }
}

function changeBackgroundColor(value) {
  cube.forEach((item) => (item.style.backgroundColor = value));
  setCurrentBackgroundColour(value);
}

function cubeRefresher() {
  return document.querySelectorAll(".cube");
}

//HTML Selector//
const colorPlate = document.querySelector("#pen-colour");
const backgroundPlate = document.querySelector("#background-colour");
const colourBtn = document.querySelector("#colourBtn");
const rainbowBtn = document.querySelector("#rainbowBtn");
const eraserBtn = document.querySelector("#eraserBtn");
const clearBtn = document.querySelector("#clearBtn");
const sketchpadText = document.querySelector("#sketch-pad-size");
const sliderValue = document.querySelector("#sketch-pad");
let cube = document.querySelectorAll(".cube");

colorPlate.oninput = (e) => setCurrentColour(e.target.value); //To get Color Value Select By User//
backgroundPlate.oninput = (e) => changeBackgroundColor(e.target.value);
colourBtn.onclick = () => setCurrentMode("colour");
rainbowBtn.onclick = () => setCurrentMode("rainbow");
eraserBtn.onclick = () => setCurrentMode("eraser");
clearBtn.onclick = () => changeSize(DEFAULT_SIZE);
sliderValue.onmousemove = (e) => updateSizeText(e.target.value); //add Event to update grid text
sliderValue.onmousemove = (e) => changeSize(e.target.value);

let mouseDown = false;
document.body.onmousedown = () => {
  mouseDown = true;
};
document.body.onmouseup = () => {
  mouseDown = false;
};

window.onload = () => {
  generateGridContainer(DEFAULT_SIZE);
  activateButton(DEFAULT_MODE);
  updateSizeText(DEFAULT_SIZE);
};
