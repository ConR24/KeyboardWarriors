import express from "express";
import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import fs from "fs";

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const insults = require('../../src/resources/insults.json');
let leaderboard = require('../../src/resources/leaderboard.json');


function sortLeaderboard(){
  leaderboard.Player.sort(function(a, b){
    return a.time - b.time;
});
}

function resizeLeaderboard(){
  if(leaderboard.Player.length > 10){  // keep a max number of 10 scores
    leaderboard.Player.splice(10, leaderboard.Player.length - 1);
  }
}

app.get('/insults', (req: Request, res: Response) => {
  return res.send(insults);
});

app.get('/leaderboard', (req: Request, res: Response) => {
  return res.send(leaderboard);
});

app.post('/player', (req: Request, res: Response) => {
  try{
    leaderboard = {...leaderboard, Player: [...leaderboard.Player, req.body]};  // add the new score
    sortLeaderboard();  // sort the leaderboard with the new score
    resizeLeaderboard();  // resize board if necessary
    fs.writeFileSync('../resources/leaderboard.json', JSON.stringify({...leaderboard}));  // overwrite

    return res.status(200).json({
      status: 200,
      message: 'Successfully updated file',
      data: req.body
    });
  }
  catch(e){
    res.status(400).json({
      status: 400,
      error: e.message
    });
  }
});

// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Example app listening on port ${port}!`))