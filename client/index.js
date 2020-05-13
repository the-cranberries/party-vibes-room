import io from 'socket.io-client'
import {loadWorld, createPlayer, addOtherPlayer, updatePlayerPosition, removeOtherPlayer, registerSocket} from './client_world'

const socket = io();

registerSocket(socket);

    socket.on('connect', function(){
        console.log('socket has connected', socket.id)
        loadWorld();
        socket.emit('requestOldPlayers', {});
    });

    socket.on('createPlayer', function(data){
        createPlayer(data);
    });

    socket.on('addOtherPlayer', function(data){
        console.log('adding other play', data)
        addOtherPlayer(data);
    });

    socket.on('updatePlayerLocation', function(data){
        console.log('update player position', data)
        updatePlayerPosition(data);
    });

    socket.on('removeOtherPlayer', function(data){
        removeOtherPlayer(data);
    });