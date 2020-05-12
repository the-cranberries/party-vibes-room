import io from 'socket.io-client'
import {loadWorld, createPlayer, addOtherPlayer, updatePlayerPosition, removeOtherPlayer} from './client_world'

const socket = io();

    socket.on('connect', function(){
        loadWorld();
        socket.emit('requestOldPlayers', {});
    });

    socket.on('createPlayer', function(data){
        createPlayer(data);
    });

    socket.on('addOtherPlayer', function(data){
        addOtherPlayer(data);
    });

    socket.on('updatePlayerLocation', function(data){
        updatePlayerPosition(data);
    });

    socket.on('removeOtherPlayer', function(data){
        removeOtherPlayer(data);
    });