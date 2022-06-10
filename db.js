const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const mongoClient = mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => db.connection.getClient());

console.log('DB connected');

module.exports = mongoClient;
