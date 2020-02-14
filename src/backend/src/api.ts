import express from "express";
import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import fs from "fs";

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const insults = require('../../resources/insults.json');
let leaderboard = require('../../resources/leaderboard.json');

app.get('/insults', (req: Request, res: Response) => {
  return res.send(insults);
});

app.get('/leaderboard', (req: Request, res: Response) => {
  return res.send(leaderboard);
});

app.post('/player', (req: Request, res: Response) => {
  // tslint:disable-next-line:no-console
  console.log(req.body);
  try{
    fs.writeFileSync('../resources/leaderboard.json', JSON.stringify({...leaderboard, Player: [...leaderboard.Player, req.body]}));

    leaderboard = {...leaderboard, Player: [...leaderboard.Player, req.body]};

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