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
bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
  console.log(hash);
  bcrypt.compare(myPlaintextPassword, hash, (err, res) => {
    console.log(res); //true
  });
});

//END_ASYNC

//START_SYNC
const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
let result = bcrypt.compareSync(myPlaintextPassword, hash);
console.log(result);


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
app.get('/', (req, res) => {
  res.send('<h1>BCrypt Example</h1><p>Check the console to see the bcrypt hashes being generated!</p>');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Listening on port:", PORT)
});
