import * as targetArr from "./targetWords.js";
import * as dictArr from "./dictWords.js";

("use strict");

const word = "apple";
const WORD_LENGTH = 5;
let userInput = "";
let attempts = 1;

function getActiveTiles() {
  return document.querySelectorAll(".active");
}

function showEndScreen(message) {
  document.querySelector(".message").innerHTML = message;
  document.querySelector(".endscreen").classList.add("show");
}

function pressKey(letter) {
  const activeTile = getActiveTiles();
  if (activeTile.length >= WORD_LENGTH) return;
  const notActive = document.querySelector(".tile:not(.used)");
  notActive.innerHTML = letter.toUpperCase();
  notActive.classList.add("active");
  notActive.classList.add("used");
  userInput = userInput.concat(letter.toLowerCase());
  return;
}

// Function runs when user presses Enter
function submitGuess() {
  const activeTiles = getActiveTiles();
  if (activeTiles.length !== WORD_LENGTH) return;
  attempts++;
  // console.log(attempts);
  if (userInput === word) {
    // console.log("u win");
    for (let elements of activeTiles) {
      elements.classList.add("correct");
    }
    removeInteraction();
    showEndScreen("IMPRESSIVE");
    // printWinner();
    return;
  }
  console.log(userInput);
  for (let i = 0; i < userInput.length; i++) {
    if (word.includes(userInput[i])) {
      activeTiles[i].classList.add("present");
      if (word[i] === userInput[i]) {
        activeTiles[i].classList.add("correct");
      }
    } else {
      activeTiles[i].classList.add("absent");
    }
    activeTiles[i].classList.remove("active");
  }
  userInput = "";
  return;
}

function deleteKey() {
  const activeTiles = getActiveTiles();
  const lastActiveTile = activeTiles[activeTiles.length - 1];
  if (lastActiveTile == null) return;
  lastActiveTile.classList.remove("active");
  lastActiveTile.classList.remove("used");
  lastActiveTile.innerHTML = "";
  userInput = userInput.slice(0, -1);
  return;
}

function keyPress(e) {
  if (attempts > 6) {
    removeInteraction();
    showEndScreen("BETTER LUCK NEXT TIME");
    return;
  }
  console.log(e.key);
  if (e.key === "Enter") {
    submitGuess();
    return;
  } else if (e.key === "Backspace" || e.key === "Delete") {
    deleteKey();
    return;
  } else if (e.key.match(/^[a-z]$/)) {
    pressKey(e.key);
    return;
  }
}

function mouseClick(e) {
  if (attempts > 6) {
    removeInteraction();
    showEndScreen("BETTER LUCK NEXT TIME");
    return;
  }
  let keyValue = e.target.id.toUpperCase();
  console.log(keyValue);
  if (keyValue === "ENTER") {
    submitGuess();
    return;
  } else if (keyValue === "Backspace" || keyValue === "DELETE") {
    deleteKey();
    return;
  } else if (keyValue.match(/^[A-Z]$/)) {
    pressKey(keyValue);
    return;
  }
}

function startInteraction() {
  document.addEventListener("keydown", keyPress);
  document.addEventListener("click", mouseClick);
}

function removeInteraction() {
  //   document.removeEventListener("click", handleMouseClick);
  document.removeEventListener("keydown", keyPress);
  return;
}

startInteraction();

function init() {
  userInput = "";
  attempts = 1;
  document.querySelector(".endscreen").classList.remove("show");
  const tiles = document.querySelectorAll(".tile");
  for (let element of tiles) {
    element.classList.remove("used");
    element.classList.remove("present");
    element.classList.remove("active");
    element.classList.remove("absent");
    element.classList.remove("correct");
    element.innerHTML = "";
  }
  startInteraction();
}

document.querySelector(".try-again").addEventListener("click", init);
