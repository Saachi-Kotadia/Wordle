const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;

const game = require('./game'); 
const gameView = require('./game-view'); 
const words = require('./words');

const uuidv4 = require('crypto').randomUUID;

app.use(express.static('./public'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    const sid = req.cookies.sid;

    if(sid && game.isValid(sid)) {
        const username = game.sessions[sid].username;
        if(username){
            const word = game.gameState[username].word;    
            const guessedWord = game.gameState[username].guess;
            res.send(gameView.gamePage(username, words, word, guessedWord));
        }
    }
    else{
        res.send(gameView.loginPage());
    }   
});

app.post('/login', (req,res) => {
    const username = req.body.username.trim();
    const regexName = /^[a-zA-Z0-9]+$/;
    
        if(!username.match(regexName)){
            res.status(400).send(gameView.errorIncorrectFormatPage());
            return;   
        }
        else if (!username) { 
            res.status(400).send(gameView.errorIncorrectFormatPage());
            return;  
        } 
        else if (username === 'dog') { 
            res.status(403).send(gameView.errorForbiddenInputPage());
            return;
        }
    
        const sid = uuidv4(); 
        game.sessions[sid] = { username }; 

        if (!game.gameState[username]) {
            game.newGame(username);
        }
        
        res.cookie('sid', sid);
        res.redirect('/');
});

app.post('/new-game', (req,res) => {
    const sid = req.cookies.sid;
   
    if(sid && game.isValid(sid)) {
        const username = game.sessions[sid].username;

        if(username){
            game.newGame(username);
            const word = game.gameState[username].word;
            console.log(`Username is ${username} and secret word is ${word}`);
            res.redirect('/');
        }
        else{
            res.status(401).send(gameView.loginPage());
        }}
        else
        { 
        res.status(401).send(gameView.loginPage());; 
}});


app.post('/guess', (req, res) => {
    const sid = req.cookies.sid;
    
    if(sid && game.isValid(sid)) {
        const username = game.sessions[sid].username;
        const guessedWord = req.body.guessedWord || '';
        const word = game.gameState[username].word;
    
    if(username){
        console.log(`Username is ${username} and secret word is ${word}`);
           
        game.playGame(username,word,guessedWord);
    
        res.redirect('/');
    }else {
        res.send(gameView.loginPage());
    }}
    else
    { 
     res.status(401).send(gameView.loginPage());; 
    }
});
    
app.post('/logout',(req,res)=>{
    const sid = req.cookies.sid;

    if(sid && game.isValid(sid)) {
        res.clearCookie('sid');
        delete game.sessions[sid];
    }
    res.redirect('/'); 
});   

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));


