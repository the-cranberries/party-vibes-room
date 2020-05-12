const express = require('express')
const app = express();
const path = require('path');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const world = require('./server/server_world');

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.use(express.static(path.join(__dirname, 'images')));

// Handle connection
io.on('connection', function (socket) {
  console.log(`user ${socket.id} connected`);

  //load ppl already at the party
  socket.on('requestOldPlayers', () => {
    for (var i = 0; i < world.allPlayers.length; i++) {
        socket.emit('addOtherPlayer', world.players[i]);
    }
  });

  //then create new player

  const id = socket.id;
  // world.addPlayer(id);

  const player = world.addPlayer(id);

  // socket.emit('createPlayer', player);
  // //sending new player to clients to render

  io.emit('createPlayer', player);
  //telling ALL client to render this player and add to local environment

  // socket.broadcast.emit('addOtherPlayer', player);
  // //telling all other clients to add this as another player

  socket.on('updatePosition', function (data) {
    console.log(data);
    var newData = world.updatePlayerData(data);
    socket.broadcast.emit('updatePlayerLocation', newData);
  });
  socket.on('disconnect', function () {
    console.log('user disconnected');
    io.emit('removeOtherPlayer', player);
    world.removePlayer(player);
  });
});

// Handle environment changes
var port = process.env.PORT || 8080;
var ip_address = process.env.IP || '0.0.0.0';

server.listen(port, ip_address, function () {
  console.log('Listening on ' + ip_address + ', server_port ' + port);
});

/*
http.listen(3000, function(){
   console.log('listening on *: 3000');
});
*/
