'use strict';

const io = require('socket.io-client');
const socket = io.connect('http://localhost:8000');

socket.on('message', (payload) => {
  console.log('I got:', payload);
});

socket.on('save', function(data) {
  let payload = JSON.parse(data);
  console.log(`You saved this file:', ${payload}`);
});

socket.on('error', function() {
  console.log('Yikes. Something isn\'t right!');
});