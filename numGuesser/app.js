/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify the player of guesses
- Notify the player of the correct answer if lose
- Let player choose to play again
*/

// Game Values

let min = 1,
    max = 10,
    winningNum = getWinningNum(min, max),
    guessesLeft = 3;
console.log(winningNum);
//UI Element

const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// assign UI max and min

minNum.textContent = min;
maxNum.textContent = max;


//play again event listener 
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
})


//Listen for guess
guessBtn.addEventListener('click', ()=>{
  let guess = parseInt(guessInput.value);
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`please enter a number between ${min} and ${max}`, 'red');
  }
  if(guess === winningNum){
    //disable input
    gameOver(true, `${winningNum} is correct! YOU WIN!`);
  }else{
    guessesLeft -= 1;
    if(guessesLeft === 0){
      //game over !! Lost
      gameOver(false,`GAME OVER! you ran out of guesses. the correct number is ${winningNum}`);
    }else{
      //game continues - answer wrong
      setMessage(`guess is not correct. ${guessesLeft} guesses left`, 'red');
      guessInput.value = '';
    }
  }

});



function setMessage (msg, color){
  message.style.color = color;
  message.textContent = msg;
};

function gameOver (won,msg){
  guessInput.disabled = true;
  let color;
  won === true ? color = 'green' : color = 'red';
  guessInput.style.borderColor = color;
  setMessage(msg,color);

  //play again
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again'
}

function getWinningNum(min,max){
  return(Math.ceil(Math.random()*(max-min)));
}
