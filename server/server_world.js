
// store all players
var allPlayers = [];

function Player(){

    this.playerId = players.length;
    this.x = 1;
    this.y = 0;
    this.z = 5;
    this.r_x = 0;
    this.r_y = 0;
    this.r_z = 0;
    this.sizeX = 1;
    this.sizeY = 1;
    this.sizeZ = 1;
    this.speed = 0.3;
    this.turnSpeed = 0.03;

}

var addPlayer = function(id){       //id = socket ID

    var player = new Player();
    player.playerId = id;
    allPlayers.push( player );

    return player;
};

var removePlayer = function(player){

    var index = allPlayers.indexOf(player);

    if (index > -1) {
        allPlayers.splice(index, 1);
    }
};

var findPlayerById = function (id) {
  var player;
  for (var i = 0; i < allPlayers.length; i++) {
    if (allPlayers[i].playerId === id) {
      player = allPlayers[i];
        return player;
    }
  }

  return player;
};

var updatePlayerData = function(data){              //socket data
    var player = findPlayerById(data.playerId);
    player.x = data.x;
    player.y = data.y;
    player.z = data.z;
    player.r_x = data.r_x;
    player.r_y = data.r_y;
    player.r_z = data.r_z;

    return player;
};


module.exports = { allPlayers, addPlayer, removePlayer, updatePlayerData, findPlayerById };

