import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

/**
 * Joins a room using a room code
 * @param roomCode The room code as a string
 * @param cb The callback to be called when a room is joined
 * @param errCB The callback for an error
 */
function joinRoom(roomCode: string, cb: any, errCB: any) {
    socket.on('connectToRoom', (message: any) => cb(null, message));
    socket.on('roomIsFull', () => errCB(null));
    socket.emit('joinRoom', roomCode);
}

/**
 * Listen for completed insults from the opponent 
 * @param cb The callback for when the opponent completes an insult
 */
function listenForInsults(cb: any) {
    socket.on('incomingInsult', (incoming: string) => cb(null, incoming));
}

/**
 * Listen for other player leaving
 * @param cb The callback for when another leaver leaves
 */
function listenForPlayerLeft(cb: any) {
    socket.on('playerLeftRoom', () => cb(null));
}

/**
 * Send a completed insult to the server
 * @param roomCode The room code to send the insult to
 * @param insult The insult as a string
 */
function sendInsult(roomCode: string, insult: string) {
    socket.emit('sendInsult', roomCode, insult);
}

/**
 * Leave the room with a room code
 * @param roomCode The room code that the front end is leaving
 */
function leaveRoom(roomCode: string) {
    socket.emit('leaveRoom', roomCode);
}

export { joinRoom,
    sendInsult,
    listenForInsults,
    leaveRoom,
    listenForPlayerLeft
 };