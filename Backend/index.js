
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const PlayerResult = require('./Models/PlayerResult.js');
const app = express();
const port = 8000;

app.use(cors());

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser : true});
const db_connection = mongoose.connection;

db_connection.on('error', console.error.bind(console, 'connection error to atlas'));
db_connection.once('open', () => {
  console.log('Connected to atlas');
});

app.post('/post-score', (req, res) => {
  console.log(req.query);
  const _hitPercentage = (req.query.player_score / req.query.targets_appeared);
  const playerReport = new PlayerResult({
    score : req.query.player_score,
    targetsAppeared : req.query.targets_appeared,
    hitPercentage : _hitPercentage
  });
  playerReport.save((err, playerReport) => {
    if (err){
      res.send('Something went wrong.');
      return console.error(err);
    }else{
      res.send('Succesfully posted.');
    }
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
