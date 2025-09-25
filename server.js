'use strict';
const express     = require('express');
const bodyParser  = require('body-parser');
const fccTesting  = require('./freeCodeCamp/fcctesting.js');
const app         = express();

// Enable CORS for freeCodeCamp testing
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

fccTesting(app);
const saltRounds = 12;
const myPlaintextPassword = 'sUperpassw0rd!';
const someOtherPlaintextPassword = 'pass123';
const bcrypt = require('bcrypt');


//START_ASYNC -do not remove notes, place code between correct pair of notes.

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
  if (err) {
    console.error('Error hashing password:', err);
  } else {
    console.log('Async hash:', hash);
  }
});

//END_ASYNC

//START_SYNC

try {
  const hashSync = bcrypt.hashSync(someOtherPlaintextPassword, saltRounds);
  console.log('Sync hash:', hashSync);
} catch (err) {
  console.error('Error hashing password synchronously:', err);
}

//END_SYNC

// API endpoints for freeCodeCamp testing
app.get('/_api/package.json', (req, res) => {
  const fs = require('fs');
  res.json(JSON.parse(fs.readFileSync('./package.json', 'utf8')));
});

app.get('/_api/server.js', (req, res) => {
  const fs = require('fs');
  res.type('text/plain');
  res.send(fs.readFileSync('./server.js', 'utf8'));
});

// Basic route to handle GET requests to root path