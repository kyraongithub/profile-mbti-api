'use strict';

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongo;

async function connectDB() {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
}

async function closeDB() {
  await mongoose.disconnect();
  await mongo.stop();
}

module.exports = {
  connectDB,
  closeDB,
};
