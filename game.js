const words = require('./words');

const sessions = {};

const gameState = {};

function isValid(sid){
    if(sid && sessions[sid]){
        return true;
    }
    else{
        return false;
    }
};

function newGame(username){
     gameState[username]={
        word: generateSecretWord(words),
        turns: 1, 
        gamesPlayed: 0,
        gamesWon: '',
        guess: '',
        letters:0,
        validGuess:[],
        message:'false',
        isLastGuessValid:'false',
    }
};

function generateSecretWord(words){
    const word = words[Math.floor(Math.random() * words.length)];
    console.log(`The secret word for the game is ${word}`);
    return word;
};

function newGuess(username,guessedWord) { 
    game.gameState[username].guess = guessedWord;
};


function isValidGuess(username,guessedWord,words,word){

    guessedWord = guessedWord.toLowerCase(); 
    
    const matchedLetters = game.compare(word, guessedWord);
    gameState[username].letters = matchedLetters;
    
    const possibleWord = words.includes(guessedWord);
    const hasAlreadyGuessed = gameState[username].validGuess.map(check =>check.guessedWord).includes(guessedWord);

    if(possibleWord && !hasAlreadyGuessed){
        gameState[username].validGuess.push({guessedWord, matchedLetters});
        gameState[username].isLastGuessValid = true;
        if(guessedWord===word){
            game.correctGuess(username,word,guessedWord);
        }
        else{
            game.incorrectGuess(username,word,guessedWord);
        }
    }
    else if(possibleWord && hasAlreadyGuessed){
        gameState[username].isLastGuessValid = false;
        gameState[username].turns++;
    }
    else{
        gameState[username].isLastGuessValid = false;
        gameState[username].turns++;
    }
};


function correctGuess(username, word, guessedWord){
    
    guessedWord = guessedWord.toLowerCase(); 

    gameState[username].message = true;
};

function incorrectGuess(username,word, guessedWord){
    
    guessedWord = guessedWord.toLowerCase(); 
        gameState[username].message = false;
        gameState[username].turns++;
};

function playGame(username,word,guessedWord){
    game.newGuess(username,guessedWord);
    game.isValidGuess(username,guessedWord,words,word);
}

function compare(word, guessedWord ) {    
    word = word.toLowerCase(); 
    guessedWord = guessedWord.toLowerCase(); 

    const letterCounter = {};
    
    for(const alphabet of word){
      if(letterCounter[alphabet]){
        letterCounter[alphabet]++;
        }
      else{
        letterCounter[alphabet]=1;
        }
      }
    
    let letterMatch = 0;
    
    for(const letter of guessedWord){
      if(letterCounter[letter]){
        letterCounter[letter]--;
        letterMatch++;
        }
      }
      return letterMatch;
    };


const game = {
    sessions,
    gameState,
    isValid,
    newGame,
    generateSecretWord,
    isValidGuess,
    newGuess,
    correctGuess,
    incorrectGuess,
    playGame,
    compare,
  };

module.exports = game;
