const io = require('socket.io')(3000, { cors: { origin: "*" } } ); //create server on port 3000

const games = {}; //hashmap of games
const users = {}; //hashmap of users

//WebSocket events for each client
io.on('connection', socket => {
    console.log("client connected");

    socket.on('new-user', username => {//runs on 'connection' event when client connects to server
        users[socket.id] = username //user chosen name added to array
        console.log(username + ' has joined with a socket id of ' + socket.id);
    })

    socket.on('create-new-game', () => { //when client sends request to create new game
        console.log("creating new game");
        const gameId = guid();  //create game with unique ID
        let clients = [];
        games[gameId] = clients;
        console.log("new game created with id " + gameId);
    })

    socket.on('join-game', gameIdToJoin => { //when client tries to join a game
        games[gameIdToJoin].push(socket.id);
        
        //let gameEval = JSON.stringify(games);//debug
        //console.log(gameEval);

        for(var g in games){
            //console.log(g + ' and ' + games[g]);// gets gameid, then array of all connected socketids
            //console.log(users[games[g]]);//GETS NAME
            console.log('Game ID: ' + g + '\nConnected Users: ');
            games[g].forEach(element => { //for each client in game object
                console.log(element); //prints socketid
                console.log(users[element]); //prints name
            });
        }
    })

    socket.on('disconnect', () => { //event when client disconnects
        console.log('User ' + users[socket.id] + ' with socketid ' + socket.id + ' disconnects');
        for(var g in games){//find client arrays in games
            const index = games[g].indexOf(socket.id); // get the index in the game objects array of clients which contains the disconnecting clients data
            if (index > -1) { // only splice array when item is found
                games[g].splice(index, 1); // 2nd parameter means remove one item only
              }
        }
        delete users[socket.id] //remove user entry from array
      })
})

//Generates unique ID (guid) for Game ID
function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}
// then to call it, plus stitch in '4' in the third group
const guid = () => (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
 