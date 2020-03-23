import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

/**
 * Joins a room using a room code
 * @param roomCode The room code as a string
 * @param opponentJoined The callback when an opponent joins the room
 * @param cb The callback to be called when a room is joined
 * @param errCB The callback for an error
 */
function joinRoom(roomCode: string, opponentJoined: any, success: any, errCB: any) {
    socket.on('connectToRoom', (message: any) => opponentJoined(message));
    socket.on('roomIsFull', () => errCB("Room is full"));
    socket.on('roomDoesNotExist', () => errCB("Room does not exist"));
    socket.on('success', success);
    socket.emit('joinRoom', roomCode);
}

/**
 * Creates a room using a room code, fails if room already exists
 * @param roomCode The room code to be created as a string
 * @param opponentJoined The callback when an opponent joins the room
 * @param success The callback to be called when a room is joined
 * @param errCB The callback for an error when the room already exists
 */
function createRoom(roomCode: string, opponentJoined: any, success: any, errCB: any){
    socket.on('connectToRoom', (message: any) => opponentJoined(null, message));
    socket.on('roomExists', () => errCB('Room Already Exists!'));
    socket.on('success', success);
    socket.emit('createRoom', roomCode);
}

/**
 * Listen for completed insults from the opponent 
 * @param cb The callback for when the opponent completes an insult
 */
function listenForInsults(cb: any) {
    socket.on('incomingInsult', (incoming: string) => { cb(incoming); });
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
    socket.removeAllListeners();
}

export { 
    joinRoom,
    sendInsult,
    listenForInsults,
    leaveRoom,
    listenForPlayerLeft,
    createRoom
 };