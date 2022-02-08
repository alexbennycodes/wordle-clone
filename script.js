"use strict";

const word = "apple";
const WORD_LENGTH = 5;
let userInput = "";
const dictWords = ["apple", "mango"];
let attempts = 0;

function getActiveTiles() {
  const containsActive = document.querySelectorAll(".active");
  return containsActive.length;
}

function pressKey(letter) {
  const activeTiles = getActiveTiles();
  if (activeTiles >= WORD_LENGTH) return;
  const notActive = document.querySelector(".tile:not(.used)");
  notActive.innerHTML = letter.toUpperCase();
  notActive.classList.add("active");
  notActive.classList.add("used");
  userInput = userInput.concat(letter);
  return;
}

function deleteKey() {
  const activeTiles = getActiveTiles();
  if (activeTiles === 0) return;
  const notActive = document.querySelectorAll(".active");
  notActive[notActive.length - 1].innerHTML = "";
  notActive[notActive.length - 1].classList.remove("active");
  notActive[notActive.length - 1].classList.remove("used");
  userInput = userInput.slice(0, -1);
  return;
}

function submitGuess() {
  const activeTiles = getActiveTiles();
  if (activeTiles !== 5) return;
  attempts++;
  // console.log(attempts);
  const Active = document.querySelectorAll(".active");
  if (userInput === word) {
    // console.log("u win");
    for (let elements of Active) {
      elements.classList.add("correct");
    }
    // printWinner();
    removeInteraction();
    return;
  }
  // console.log(Active);
  console.log(userInput);
  for (let i = 0; i < userInput.length; i++) {
    if (word.includes(userInput[i])) {
      // console.log("try agian", i);
      // console.log(Active[i]);
      Active[i].classList.add("present");
    } else {
      Active[i].classList.add("absent");
    }
  }
  for (let i = 0; i < userInput.length; i++) {
    if (word[i] === userInput[i]) {
      // console.log("try agian", i);
      Active[i].classList.add("correct");
    }
  }
  for (let element of Active) {
    element.classList.remove("active");
  }
  userInput = "";
  return;
}

// function handleMouseClick(e) {
//   if (e.target.classList.contains("key")) {
//     presssKey(e.target.id);
//     return;
//   }
//   if (e.target.classList.contains("key-enter")) {
//     submitGuess();
//     return;
//   }
//   if (e.target.classList.contains("key-exit")) {
//     deleteKey();
//     return;
//   }
//   //   console.log(e.target.id, e.target.classList.contains("key"));
// }

function handleKeyPress(e) {
  // console.log(e);
  if (e.key === "Enter") {
    submitGuess();
    return;
  }

  if (e.key === "Backspace" || e.key === "Delete") {
    deleteKey();
    return;
  }
  if (e.key.match(/^[a-z]$/)) {
    pressKey(e.key);
    return;
  }
}

function startInteraction() {
  //   document.addEventListener("click", handleMouseClick);
  document.addEventListener("keydown", handleKeyPress);
  return;
}

function removeInteraction() {
  document.removeEventListener("click", handleMouseClick);
  document.removeEventListener("keydown", handleKeyPress);
}

function playGame() {
  if (attempts < 7) {
    startInteraction();
  } else {
    removeInteraction();
    console.log("you lost");
    return;
  }
}

playGame();
