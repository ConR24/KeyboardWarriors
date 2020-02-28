import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

function joinRoom(roomCode: string, cb: any) {
    socket.on('connectToRoom', (message: any) => cb(null, message));
    socket.emit('joinRoom', roomCode);
}

function listenForInsults(cb: any) {
    socket.on('incomingInsult', (incoming: string) => cb(null, incoming));
}

function sendInsult(roomCode: string, insult: string) {
    socket.emit('sendInsult', roomCode, insult);
}

export { joinRoom, sendInsult, listenForInsults };