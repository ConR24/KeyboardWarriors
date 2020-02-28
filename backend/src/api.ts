// tslint:disable:no-console
import express from "express";
import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import fs from "fs";

const app = express();
const port = 8000;
const server = require('http').createServer(app);
const sio = require('socket.io')(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const insults = require('../../src/resources/insults.json');
let leaderboard = require('../../src/resources/leaderboard.json');

sio.on('connection', (client: SocketIO.Socket) => {
  client.on('joinRoom', (roomCode: string) => {
    if (!sio.nsps['/'].adapter.rooms[roomCode]) {
      client.join(roomCode);
    }
    if (sio.nsps['/'].adapter.rooms[roomCode] && sio.nsps['/'].adapter.rooms[roomCode].length < 2) {
      client.join(roomCode);
      if (sio.nsps['/'].adapter.rooms[roomCode].length === 2) {
        sio.sockets.in(roomCode).emit('connectToRoom', "You are connected to room " + roomCode);
      }
    }
  });

  client.on('sendInsult', (roomCode: string, insult: string) => {
    client.broadcast.to(roomCode).emit('incomingInsult', insult);
  });

  client.on('leaveRoom', (roomCode: string) => {
    client.leave(roomCode);
  });
});

function sortLeaderboard(){
  leaderboard.Player.sort(function(a: any, b: any){
    return a.time - b.time;
});
}

function resizeLeaderboard(){
  if(leaderboard.Player.length > 10){  // keep a max number of 10 scores
    leaderboard.Player.splice(10, leaderboard.Player.length - 1);
  }
}

app.get('/insults', (req: Request, res: Response) => {
  const shuffled = insults.Insults.sort(() => 0.5 - Math.random());
  return res.send(shuffled.slice(0, 5));
});

app.get('/leaderboard', (req: Request, res: Response) => {
  return res.send(leaderboard);
});

app.post('/player', (req: Request, res: Response) => {
  try{
    leaderboard = {...leaderboard, Player: [...leaderboard.Player, req.body]};  // add the new score
    sortLeaderboard();  // sort the leaderboard with the new score
    resizeLeaderboard();  // resize board if necessary
    fs.writeFileSync('../src/resources/leaderboard.json', JSON.stringify({...leaderboard}));  // overwrite

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
server.listen(port, () => console.log(`Example app listening on port ${port}!`))