const express = require('express');

const app = express();

app.get('/', (_, res) => {
  res.status(200).send('OPEN-FORUM-API ExpressJs is Online');
});

module.exports = app;
