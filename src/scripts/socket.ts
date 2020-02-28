import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

function joinRoom(roomCode: string, cb: any, errCB: any) {
    socket.on('connectToRoom', (message: any) => cb(null, message));
    socket.on('roomIsFull', () => errCB(null));
    socket.emit('joinRoom', roomCode);
}

function listenForInsults(cb: any) {
    socket.on('incomingInsult', (incoming: string) => cb(null, incoming));
}

function listenForPlayerLeft(cb: any) {
    socket.on('playerLeftRoom', () => cb(null));
}

function sendInsult(roomCode: string, insult: string) {
    socket.emit('sendInsult', roomCode, insult);
}

function leaveRoom(roomCode: string) {
    socket.emit('leaveRoom', roomCode);
}

export { joinRoom,
    sendInsult,
    listenForInsults,
    leaveRoom,
    listenForPlayerLeft
 };