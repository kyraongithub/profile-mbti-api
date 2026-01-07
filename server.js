'use strict';

const app = require('./app');
const { connectDB } = require('./db/mongo');

const port = process.env.PORT || 3000;

async function start() {
  await connectDB();

  app.listen(port, () => {
    console.log('Express started. Listening on %s', port);
  });
}

start();
