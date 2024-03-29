'use strict';

const io = require('socket.io-client');
const socket = io.connect('http://localhost:8000');
const fs = require('fs');
const util = require('util');
const faker = require('faker');

setInterval( () => {
  socket.emit('speak', faker.hacker.phrase());
}, 1500);

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const loadFile = (file) => readFile(file);
const saveFile = (file, buffer) => writeFile(file, buffer);
const convertBuffer = buffer => Buffer.from(buffer.toString().trim().toUpperCase());

const alterFile = (file) => {
  return loadFile(file)
  .then(contents => convertBuffer(contents))
  .then(buffer => saveFile(file, buffer))
  .then( () => socket.emit('save', {event: 'save', data: file}))
  .catch( error => socket.emit(`${error}`));
};

let file = process.argv.slice(2).shift();
alterFile(file);