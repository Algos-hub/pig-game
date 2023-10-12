'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('#btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnName = document.querySelector('.btn--name');
function disableInput(field, bool) {
  document.getElementById(field).disabled = bool;
}
function disableButton(button, bool) {
  document.querySelector(button).disabled = bool;
}

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

let scores, currentScore, activePlayer, playing;

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 30) {
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

// Initializing or resetting the game
// Can be put anywhere as long as it is in the general scope
// The game will not start unless you click on .btn--new
// Usually best to be put at the beginning, but this case will be used as an example

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

btnNew.addEventListener('click', function () {
  init();
  disableInput('name--0', true);
  disableInput('name--1', true);
  disableButton('.btn--hold', false);
  disableButton('#btn--roll', false);
});

btnName.addEventListener('click', function () {
  disableInput('name--0', false);
  disableInput('name--1', false);
  init();
  disableButton('.btn--hold', true);
  disableButton('#btn--roll', true);
});
