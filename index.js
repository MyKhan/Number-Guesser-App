//Game values
let min = 1,
  max = 10,
  winningNum = getWinningNumber(max, min),
  guessesLeft = 3;

//Define UI Elements
const UIgameWrapper = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play Again Event Listener
UIgameWrapper.addEventListener("mousedown", function(e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

//Listen for guess
guessBtn.addEventListener("click", function() {
  //Reduce guesses left
  guessesLeft--;

  //Get guess and make integer
  let guess = parseInt(guessInput.value);

  //Check to see if guess is Winning number
  if (guess === winningNum) {
    gameOver(true, "Good on you mate");
  } else {
    //Validate
    if (isNaN(guess) || guess < min || guess > max) {
      //Raise flag if is NaN or less or more than limits
      guessAgain(
        true,
        `Please Enter a number between ${min} and ${max}, ${guessesLeft} tries left`
      );
    } else {
      //Check guesses left
      if (guessesLeft > 0) {
        guessAgain(false, `Wrong. You have ${guessesLeft} tries left mate`);
      } else {
        gameOver(false, "Bruv, you done lost it");
      }
    }
  }
});

//Guesses Still Left
function guessAgain(flag, msg) {
  //Check if Guesses left
  if (guessesLeft === 0) {
    gameOver(false, "You lost");
  } else if (flag === true) {
    guessInput.style.borderColor = "purple";
    message.style.color = "purple";
    setMessage(msg);
  } else {
    guessInput.style.borderColor = "orange";
    message.style.color = "orange";
    setMessage(msg);
  }
}

//Game Over
function gameOver(win, msg) {
  let color;
  win === true ? (color = "green") : (color = "red");

  //Disable input
  guessInput.disabled = true;

  //Change Border Color and thickness
  guessInput.style.borderColor = color;
  guessInput.style.borderWidth = "2px";

  //Change Text Color
  message.style.color = color;

  //set Message
  setMessage(msg);

  //Change value to play again
  guessBtn.value = "Play Again?";
  guessBtn.className += "play-again";
}

function setMessage(msg) {
  message.textContent = msg;
}

//Generate a winning number
function getWinningNumber(max, min) {
  let x = Math.floor(Math.random() * (max - min + 1) + min);
  console.log(x);
  return x;
}
