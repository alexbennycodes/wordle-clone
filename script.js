"use strict";

const word = "apple";
const WORD_LENGTH = 5;

function getActiveTiles() {
  const containsActive = document.querySelectorAll(".active");
  return containsActive.length;
}

function pressKey(letter) {
  const activeTiles = getActiveTiles();
  if (activeTiles >= WORD_LENGTH) return;
  const notActive = document.querySelector(".tile:not(.active)");
  notActive.innerHTML = letter.toUpperCase();
  notActive.classList.add("active");
}

function deleteKey() {
  const activeTiles = getActiveTiles();
  if (activeTiles === 0) return;
  console.log(activeTiles);
  const notActive = document.querySelectorAll(".active");
  console.log(notActive[notActive.length - 1]);
  notActive[notActive.length - 1].innerHTML = "";
  notActive[notActive.length - 1].classList.remove("active");
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
  console.log(e);
  //   if (e.key === "Enter") {
  //     submitGuess();
  //     return;
  //   }

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
}

function removeInteraction() {
  document.removeEventListener("click", handleMouseClick);
  document.removeEventListener("keydown", handleKeyPress);
}

startInteraction();
