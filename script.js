'use strict';

// selecting elements 
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const diceBtn = document.querySelector('.btn--roll');
const newBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// starting conditions
const init = function () {

    diceEl.classList.add('hidden');

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.remove('winner');
    player1.classList.remove('winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');

};

init();

// player switching function
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;

    // switching the bg color
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
}

// implemneting functionality

// Roll dice button
diceBtn.addEventListener('click', function () {
    if (playing) {

        // 1. generate ramdom dice
        const randomDice = Math.trunc(Math.random() * 6) + 1;
        // 2. displaying the random dice
        diceEl.classList.remove('hidden');
        diceEl.src = `images/dice-${randomDice}.png`;

        //3. check if dice rolled a 1
        if (randomDice !== 1) {
            // add dice to currentScore
            currentScore += randomDice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else {
            // Switch to next player 
            switchPlayer();
        }
    }
});

holdBtn.addEventListener('click', function () {
    if (playing) {

        //1. add current score to the total score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        //2. check if the score is at least 100

        if (scores[activePlayer] >= 50) {

            //finish the game
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('winner');
            document.getElementById(`current--${activePlayer}`).textContent = 0;
        }
        else {
            // switch to the next player
            switchPlayer();
        }
    }
});

newBtn.addEventListener('click', init);
