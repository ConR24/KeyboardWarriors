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

const insults = require('../src/resources/insults.json');
let leaderboard = require('../src/resources/leaderboard.json');

// Define Socket.IO functions
sio.on('connection', (client: SocketIO.Socket) => {
  /**
   * Join a room with a room code. Can only join room with less than 2 people.
   */
  client.on('joinRoom', (roomCode: string) => {
    const room = sio.nsps['/'].adapter.rooms[roomCode];
    if (!room) {
      client.emit('roomDoesNotExist');
    } else if (room && room.length < 2) {
      client.join(roomCode);
      client.emit("success");
      if (room.length === 2) {
        sio.to(roomCode).emit('connectToRoom', "You are connected to room " + roomCode);
      }
    } else {
      client.emit('roomIsFull');
    }
  });

  /**
   * Join a room with a room code. Only joins if that room does not exist.
   */
  client.on('createRoom', (roomCode: string) => {
    const room = sio.nsps['/'].adapter.rooms[roomCode];
    if (!room) {
      client.join(roomCode);
      client.emit("success");
    } else {
      client.emit('roomExists');
    }
  })

  /**
   * Send an insult to everyone else in  the room
   */
  client.on('sendInsult', (roomCode: string, insult: string) => {
    sio.to(roomCode).emit('incomingInsult', insult);
  });

  /**
   * Send a message to everyone else in the room to leave and have the client leave the room
   */
  client.on('leaveRoom', (roomCode: string) => {
    sio.to(roomCode).emit('playerLeftRoom');
    client.leave(roomCode);
  });

  /**
   * Make player broadcast they are leaving from every room they are in when disconnecting
   */
  client.on('disconnect', (reason: string) => {
    Object.keys(client.rooms).forEach(roomCode => {
      sio.to(roomCode).emit('playerLeftRoom');
      client.leave(roomCode);
    });
  })
});

/**
 * Sort the leaderboard in ascending order
 */
function sortLeaderboard(){
  leaderboard.Player.sort(function(a: any, b: any){
    return b.speed - a.speed;
});
}

/**
 * Restrict the size of the leaderboard to top 10 players
 */
function resizeLeaderboard(){
  if(leaderboard.Player.length > 10){  // keep a max number of 10 scores
    leaderboard.Player.splice(10, leaderboard.Player.length - 1);
  }
}

/**
 * Send 5 random insults to player
 */
app.get('/insults', (req: Request, res: Response) => {
  const shuffled = insults.Insults.sort(() => 0.5 - Math.random());
  return res.send(shuffled.slice(0, 5));
});

/**
 * Send leaderboard to front end
 */
app.get('/leaderboard', (req: Request, res: Response) => {
  return res.send(leaderboard);
});

/**
 * Write player 'score' to leaderboard and resize.
 */
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
