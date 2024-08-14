'use strict';

// specify the element
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const currentscore0El = document.getElementById('current--0');
const currentscore1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// starting code
let scores, currentscore, activePlayer, playing;

const int = function () {
  scores = [0, 0];
  currentscore = 0;
  activePlayer = 0;
  playing = true;
  currentscore0El.textContent = 0;
  currentscore1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

int();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentscore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//adding event listener to the btn roll

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.rolling dice
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //2.display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3.move to the next we the score is 1
    if (dice !== 1) {
      //keep add the score
      currentscore = currentscore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentscore;
      // currentscore0El.textContent = currentscore; //change later
    } else {
      //move to the next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1..add the current score to the total score
    scores[activePlayer] = scores[activePlayer] + currentscore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      playing = false;
      //2.if we reach 100 point the should be exit
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      //3.we should switch
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', int);
//  { //set all score to 0 and set th player0 as first one
//   // currentscore0El.textContent = 0;
//   // currentscore1El.textContent = 0;
//   // score0El.textContent = 0;
//   // score1El.textContent = 0;
//   // player0El.classList.remove('player--winner');
//   // player1El.classList.remove('player--winner');
//   // player0El.classList.add('player--active');
//   // player1El.classList.remove('player--active');
// });
