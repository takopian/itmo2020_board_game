const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;


const players = [];
let cur_player = 0;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../my-app/build')));
//app.use(express(path.join(__dirname, '../my-app/build')));

app.use(session({ resave: false,
    saveUninitialized: false,
    secret: 'secret pass'}));


app.get('/api/players', (req, res) => {
  console.log('api/users called!')
  res.json(players);
});

app.post('/api/login', (req, res) => {
  const user = req.body.user;
  req.session.user = user.login;
  console.log('Adding user:::::', user.login);
  players.push(user.login);
  res.json("user added");
});

app.get('/api/random', (req, res) => {
    console.log("arndom")

    if(req.session.user){
        const position = players.indexOf(req.session.user);
        if (cur_player === position){
            const result = getRandomInt(6);
            res.body = {result}
        }
    }
});

app.get('/api/turn_info', (req, res) => {
    if (req.session.user){
        const position = players.indexOf(req.session.user);
        console.log("yay", position);
        res.body = {cur_player: cur_player, my_turn: cur_player === position};
        console.log("end");
        res.status(201)
    }
    else {
        console.log("yay2");
        res.body = {cur_player: cur_player, my_turn: false};
        console.log("info", res.body.cur_player, res.body.my_turn);
        res.status(201)
    }
});

app.post('/api/finish_turn', (req, res) => {
    console.log("finish")
    if(req.session.user){
        const position = players.indexOf(req.session.user);
        if (cur_player === position){
            cur_player = (cur_player + 1) % players.length;
        }
    }
    res.body = {cur_player};

});

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}