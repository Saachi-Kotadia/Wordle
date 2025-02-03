const { gameState } = require("./game");

const gameView = {
    loginPage: function() {
        return `
        <!doctype html>
        <html>
        <head>
            <title>Login</title>
            <link rel="stylesheet" href="login.css">
        </head>
        <body>
        <header class="header">
            <img class="logo" alt="Blue and white color logo image naming the game" src="/images/WordGameLogo.jpg"> 
            <h1 class="header-text">Guess the word game</h1>
        </header>
        <main class="main">
            <h2 class="sub-header"> Welcome </h2>
                <div class="text-content">
                    <p class="paragraphs"> Word games are super fun. They make you learn better in a fun and interactive way. Welcome to our word game page wherein we play fun word games daily.</p> 
                    <p class="paragraphs"> Please login to start playing.</p>
                </div>
                <div id="login-app"> 
                    <h3 class="sub-header-text"> User Login </h3>
                    <p class="invalid-format-message"> Please note that the username must contain only letters and numbers. The username "Dog" is invalid.</p>
                    <img class="login-logo" alt="An icon displaying a login option" src="/images/LoginLogo.jpg"> 
                    <form class="form" action="/login" method="POST">
                        <label> Username
                        <input class="name-input" name="username" placeholder="Username">
                        </label>
                        <button class="login-button" type="submit">Login</button>       
                </form>
                </div>
        </main>
        <footer class="footer">
            <p class="paragraphs">Keeping following our page to play more games.</p>
        </footer>
        </body>
        </html>
    `;
},

    gamePage: function(username,words,word,guessedWord) {
        return `
        <!doctype html>
        <html>
        <head>
            <title>Game</title>
            <link rel="stylesheet" href="login.css">
            <link rel="stylesheet" href="game.css">
        </head>
        <body>
        <header class="header"> 
            <img class="logo" alt="Blue and white color logo image naming the game" src="/images/WordGameLogo.jpg"> 
            <h1 class="header-text">Guess the word game</h1>
        </header>
        <main class="main">
            <h2 class="sub-header"> Game Page </h2>
                <div class=user-profile>
                    <h3 class="welcome-text"> Welcome Player: ${username}</h3>
                    <img class="logo" alt="A smiling girl sitting with some books" src="/images/GeneralUserLogo.jpg">
                        <div class="game-options-panel">
                            <form class="new-game-form" action="/new-game" method="POST">
                                <button class="new-game-button" type="submit">New Game</button>
                            </form>
                            <form class="logout-form" action="/logout" method="POST">
                                <button class="logout-button" type="submit">Logout</button>
                            </form>
                </div>
                </div>   
                <div class="game-layout">
                    <div class="game-form-playarea-layout">
                        <form class="guess-form" action="/guess" method="POST">
                            <h3 class="sub-header-text"> Guess a word </h3>
                            <label> Guess word
                            <input class="guess-word-input" name="guessedWord" type="text" placeholder="Guess Word"}>
                            </label>
                            <button class="update-button" type="submit">Guess</button>
                            <p class="paragraphs"> Hint: Secret word is made up of ${word.length} letters </p>
                            <span class="game-outcome-message"> ${ gameView.gameOutcomeMessage(gameState[username].message) } </span>
                        </form>
                     </div>
                    <div class="game-score-panel">
                    <h3 class="sub-header-text"> Game Details </h3>
                    <ul class="game-details-list>
                        <li class="game-details-item"> The below are the game details - </li>
                        <li class="game-details-item"> Total count of valid guesses: ${gameState[username].validGuess.length} </li>
                        <li class="game-details-item"> Current count of turns: ${gameState[username].turns} </li>
                        <li class="game-details-item"> Previously guessed word is: ${guessedWord} </li>
                        <li class="game-details-item"> The letters it matched with the secret word is: ${gameState[username].letters} </li>
                        <li class="game-details-item"> ${ gameView.stateMessage(gameState[username].isLastGuessValid) } </li>      
                        </ul>
                    </div>
                    </div>
                    <div class="valid-guess-layout">
                    <div class="valid-guess">
                        <span class="valid-guesses-list"> ${gameView.getValidGuesses(gameState[username].validGuess)} </span> 
                    </div>
                    <div class="words-layout">  
                        <p class="words-paragraphs"> The list of words that the secret word could be are as follows: ${words} </p>
                    </div>
                    </div>
                    </div>                             
                    </main>
        <footer class="footer">
            <p class="paragraphs">Keeping following our page to play more games.</p>
        </footer>
        </body>
        </html>
    `;
},

    getValidGuesses: function(validGuesses) {
        return `
        <ol class="valid-guesses">` +
            `<h3>Previously made valid guess list</h3>` +
                validGuesses.map(guess => `
                    <li class="validGuess-list">   
                        <div class="valid-guess-details">
                            <span class="valid-guess-word"> ${guess.guessedWord}</span>
                            <span class="valid-guess-letters-matched">${guess.matchedLetters}</span> 
                        </div>
                    </li>
            `).join('') +
       `</ol>`;
    },

    stateMessage: function (){
        return `
        <p> Your guessed word `+ Object.keys(gameState).map( username => `
            <span> ${gameState[username].isLastGuessValid ? ' is a valid ' : ' is an invalid' } guess
            </span>
        </p>    
        `).join('');
    },

    gameOutcomeMessage: function (){
        return `
        <p> Your guessed word `+ Object.keys(gameState).map( username => `
            <span> ${gameState[username].message === true ? ' is a correct ' : gameState[username].message === false? ' is an incorrect' : ''} guess
            </span>
        </p>
        `).join('');
    },

    errorIncorrectFormatPage: function(){
        return`
        <!doctype html>
        <html>
        <head>
            <title>Error</title>
            <link rel="stylesheet" href="login.css">
        </head>
        <body>
        <header class="header"> 
            <img class="logo" alt="Blue and white color logo image naming the game" src="/images/WordGameLogo.jpg"> 
            <h1 class="header-text">Guess the word game</h1>
        </header>
        <main class="main">
        <div id="login-app">
            <h2>Error 400</h2>   
            <h3 class="sub-header-text"> User Login </h3>
            <p class="paragraphs"> Incorrect username format, please login again. Only letters and numbers are allowed in the username.</p> 
            <img class="login-logo" alt="An icon displaying a login option" src="/images/LoginLogo.jpg"> 
            <form class="form" action="/login" method="POST">
                <label> Username
                <input class="name-input" name="username" placeholder="Username">
                </label>
                <button class="login-button" type="submit">Login</button>       
            </form>
        </div>
        </main>
        <footer class="footer">
            <p class="paragraphs">Keeping following our page to play more games.</p>
        </footer>
        </body>
        </html>
        `;
    },
     
    errorForbiddenInputPage: function(){
        return`
        <!doctype html>
        <html>
        <head>
            <title>Error</title>
            <link rel="stylesheet" href="login.css">
        </head>
        <body>
            <header class="header"> 
            <img class="logo" alt="Blue and white color logo image naming the game" src="/images/WordGameLogo.jpg"> 
            <h1 class="header-text">Guess the word game</h1>
        </header>
        <main class="main">
        <div id="login-app">   
            <h2>Error 400</h2>   
            <h3 class="sub-header-text"> User Login </h3>   
            <p class="paragraphs"> Dog is not granted access</p> 
            <img class="login-logo" alt="An icon displaying a login option" src="/images/LoginLogo.jpg">
            <form class="form" action="/login" method="POST">
                <label> Username
                <input class="name-input" name="username" placeholder="Username">
                </label>
                <button class="login-button" type="submit">Login</button>       
            </form>
        </div>
        </main>
        <footer class="footer">
            <p class="paragraphs">Keeping following our page to play more games.</p>
        </footer>
        </body>
        </html>
        `;
    }
};


module.exports = gameView;
                        
