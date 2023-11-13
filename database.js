const mongoose = require('mongoose');
require('dotenv').config();

const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const database = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const URI = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`;

mongoose.connect(URI, {
    useNewUrlParser: true, useUnifiedTopology: true,
})
    .then(() => console.log('Database connected successfully.'))
    .catch(err => console.error(err))

module.exports = mongoose;