import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import App from './app'
import history from './history'


import io from 'socket.io-client'
import { loadWorld, createPlayer, addOtherPlayer, updatePlayerPosition, removeOtherPlayer } from './client_world'

const socket = io();

socket.on('connect', function () {
    console.log('socket has connected', socket.id)
    loadWorld();
    socket.emit('requestOldPlayers', {});
});

socket.on('createPlayer', function (data) {
    createPlayer(data);
});

socket.on('addOtherPlayer', function (data) {
    addOtherPlayer(data);
});

socket.on('updatePlayerLocation', function (data) {
    updatePlayerPosition(data);
});

socket.on('removeOtherPlayer', function (data) {
    removeOtherPlayer(data);
});

ReactDOM.render(
    <Provider>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('app')
)