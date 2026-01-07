const { connectDB, closeDB } = require('../db/mongo');

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await closeDB();
});
