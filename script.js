"use strict";

const word = "apple";
const WORD_LENGTH = 5;

function pressKey(letter) {
  //   const activeTiles = getActiveTiles();
  //   if (activeTiles >= WORD_LENGTH) return;
  document.querySelector(".tile").innerHTML = letter.toUpperCase();
  document.querySelector(".tile").classList.add("active");
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

  //   if (e.key === "Backspace" || e.key === "Delete") {
  //     deleteKey();
  //     return;
  //   }
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
