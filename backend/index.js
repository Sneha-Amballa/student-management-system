require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const homeRoute = require('./routes/home');
require('dotenv').config();   // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend/views'));

// Middleware
app.use(express.static(path.join(__dirname, '../frontend/public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (err) => {
  console.log("Something went wrong connecting to database: ", err);
});
db.once('open', () => {
  console.log("DB connection has been made successfully");
});

// Routes
app.use('/', homeRoute);

// Server Listener
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
