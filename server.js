const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require("./config/database");

app.get('/', (req, res) => {
  res.send('Bienvenue sur mon application Express.js !');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

