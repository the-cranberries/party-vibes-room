// import * as THREE from 'three'

var container,
  scene,
  camera,
  renderer,
  raycaster,
  objects = [];       //array of player cubes
var keyState = {};

var player, playerId, moveSpeed; //took out turnSpeed
//player is the rendered cube

var playerData; // this is the object data (from server)

// var otherPlayers = [],

//connects playerID to cubeID
const otherPlayersID = {};

var loadWorld = function () {
  init();
  animate();

  function init() {
    //Setup------------------------------------------
    container = document.getElementById('container');

    scene = new THREE.Scene();
    scene.position.x = 1;
    scene.position.y = -5;
    scene.position.z = 4;

    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.y = 3;
    camera.position.z = 20;
    camera.position.x = 0;
    camera.lookAt(scene.position);

    const loader = new THREE.TextureLoader();
    const bgTexture = loader.load('background.png');
    scene.background = bgTexture;

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    raycaster = new THREE.Raycaster();
    //Add Objects To the Scene HERE-------------------

    //Events------------------------------------------
    document.addEventListener('click', onMouseClick, false);
    // document.addEventListener('mousedown', onMouseDown, false);
    // document.addEventListener('mouseup', onMouseUp, false);
    // document.addEventListener('mousemove', onMouseMove, false);
    // document.addEventListener('mouseout', onMouseOut, false);
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
    window.addEventListener('resize', onWindowResize, false);

    //Final touches-----------------------------------
    container.appendChild(renderer.domElement);
    document.body.appendChild(container);
  }

  function animate() {
    requestAnimationFrame(animate);
    render();
  }
  function render() {
    if (player) {
      checkKeyStates();
    }
    //Render Scene---------------------------------------
    renderer.render(scene, camera);
  }

  function onMouseClick() {
    // intersects = calculateIntersects(event);

    // if (intersects.length > 0) {
    //   //If object is intersected by mouse pointer, do something
    //   if (intersects[0].object == sphere) {
    //     alert('This is a sphere!');
    //   }
    // }
  }
  
  function onKeyDown(event) {
    //event = event || window.event;

    keyState[event.keyCode || event.which] = true;
  }

  function onKeyUp(event) {
    //event = event || window.event;

    keyState[event.keyCode || event.which] = false;
  }
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  function calculateIntersects(event) {
    //Determine objects intersected by raycaster
    event.preventDefault();

    var vector = new THREE.Vector3();
    vector.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1,
      0.5
    );
    vector.unproject(camera);

    raycaster.ray.set(camera.position, vector.sub(camera.position).normalize());

    var intersects = raycaster.intersectObjects(objects);

    return intersects;
  }
};

var playerForId = function (id) {
  //get the right cubeID from otherPlayersID
  //go through objects array until we find the right cube
  //return that cube

  let cubeID = otherPlayersID[id];

  for (let i = 0; i < objects.length; i++) {
    if (objects[i].id === cubeID)
      return objects[i];
  }
};


var createPlayer = function (data) {
  //receiving data from the server
  playerData = data; 

  var cube_geometry = new THREE.BoxGeometry(
    data.sizeX * 2,
    data.sizeY * 4,
    data.sizeZ * 2
  );
  const iconLoader = new THREE.TextureLoader();
  const cube_material = [
    new THREE.MeshBasicMaterial({ color: 0x69bdd2 }),
    new THREE.MeshBasicMaterial({ color: 0x69bdd2 }),
    new THREE.MeshBasicMaterial({ color: 0x407294 }),
    new THREE.MeshBasicMaterial({ color: 0x69bdd2 }),
    new THREE.MeshBasicMaterial({ map: iconLoader.load('pietro.jpg') }), //front of object avatar
    new THREE.MeshBasicMaterial({ color: 0x407294 }),
  ];
  player = new THREE.Mesh(cube_geometry, cube_material);

  player.rotation.set(0, 0, 0);

  //matching cube position to data position
  player.position.x = data.x;
  player.position.y = data.y;
  player.position.z = data.z;

  playerId = data.playerId;
  moveSpeed = data.speed;
  // turnSpeed = data.turnSpeed;

  objects.push(player);
  scene.add(player);

  camera.lookAt(player.position);
};

var updatePlayerPosition = function (data) {
  var somePlayer = playerForId(data.playerId);

  somePlayer.position.x = data.x;
  somePlayer.position.y = data.y;
  somePlayer.position.z = data.z;

  // somePlayer.rotation.x = data.r_x;
  // somePlayer.rotation.y = data.r_y;
  // somePlayer.rotation.z = data.r_z;
};

// var updatePlayerData = function () {
//   playerData.x = player.position.x;
//   playerData.y = player.position.y;
//   playerData.z = player.position.z;

//   playerData.r_x = player.rotation.x;
//   playerData.r_y = player.rotation.y;
//   playerData.r_z = player.rotation.z;
// };

//moves your player 
var checkKeyStates = function () {
  if ((keyState[38] || keyState[87]) && player.position.z > -23 ) {
    //up arrow or 'w' - move forward
    player.position.x -= moveSpeed * Math.sin(player.rotation.y);
    player.position.z -= moveSpeed * Math.cos(player.rotation.y);
    // updatePlayerData();
    // socket.emit('updatePosition', {playerId, x: player.position.x, y: player.position.y, z: player.position.z });
  }

  if ((keyState[40] || keyState[83]) && player.position.z < 5) {
    //down arrow or 's' - move backward
    player.position.x += moveSpeed * Math.sin(player.rotation.y);
    player.position.z += moveSpeed * Math.cos(player.rotation.y);
    // updatePlayerData();
    // socket.emit('updatePosition', {playerId, x: player.position.x, y: player.position.y, z: player.position.z });
  }

  if ((keyState[37] || keyState[65]) && player.position.x > -14) {
    // 'left arrow' or 'a' - move left
    player.position.x -= moveSpeed * Math.cos(player.rotation.y);
    player.position.z += moveSpeed * Math.sin(player.rotation.y);
    // updatePlayerData();
    // socket.emit('updatePosition', {playerId, x: player.position.x, y: player.position.y, z: player.position.z });
  }
  if ((keyState[39] || keyState[68]) && player.position.x < 17) {
    // 'right arrow' or 'd'- move right
    player.position.x += moveSpeed * Math.cos(player.rotation.y);
    player.position.z -= moveSpeed * Math.sin(player.rotation.y);
    // updatePlayerData();
    // socket.emit('updatePosition', {playerId, x: player.position.x, y: player.position.y, z: player.position.z });
  }
  // if (keyState[65]) {
  //   // a  - rotate left
  //   player.rotation.y += turnSpeed;
  //   updatePlayerData();
  //   socket.emit('updatePosition', playerData);
  // }
  // if (keyState[68]) {
  //   // d  - rotate right
  //   player.rotation.y -= turnSpeed;
  //   updatePlayerData();
  //   socket.emit('updatePosition', playerData);
  // }
};

var addOtherPlayer = function (data) {
  var cube_geometry = new THREE.BoxGeometry(
    data.sizeX * 2,
    data.sizeY * 4,
    data.sizeZ * 2
  );
  const iconLoader = new THREE.TextureLoader();
  const cube_material = [
    new THREE.MeshBasicMaterial({ color: 0x69bdd2 }),
    new THREE.MeshBasicMaterial({ color: 0x69bdd2 }),
    new THREE.MeshBasicMaterial({ color: 0x407294 }),
    new THREE.MeshBasicMaterial({ color: 0x69bdd2 }),
    new THREE.MeshBasicMaterial({ map: iconLoader.load('pietro.jpg') }), //front of object avatar

    new THREE.MeshBasicMaterial({ color: 0x407294 }),
  ];
  var otherPlayer = new THREE.Mesh(cube_geometry, cube_material);

  otherPlayer.position.x = data.x;
  otherPlayer.position.y = data.y;
  otherPlayer.position.z = data.z;

  // otherPlayersId.push(data.playerId);
  // otherPlayers.push(otherPlayer);

  otherPlayersID[data.id] = otherPlayer.id;
  console.log('otherPlayersID object: ', otherPlayersID);

  objects.push(otherPlayer);
  scene.add(otherPlayer);
};

var removeOtherPlayer = function (data) {
  scene.remove(playerForId(data.playerId));
};

export {loadWorld, createPlayer, addOtherPlayer, updatePlayerPosition, removeOtherPlayer}