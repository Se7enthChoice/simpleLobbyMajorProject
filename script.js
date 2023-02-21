const socket = io('http://localhost:3000') //socket host location (server runs on port 3000)

const username = prompt('What is your name?')
socket.emit('new-user', username)

function createGame(){ //send request to create new game
    socket.emit('create-new-game');
}

function joinGame(){ //send request to join a game
    const gameIdToJoin = document.getElementById('game-id-input').value;
    socket.emit('join-game', gameIdToJoin);
}