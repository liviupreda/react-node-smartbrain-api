const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host: 'postgresql-metric-68147',
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
});

const PORT = process.env.PORT;
const app = express();

app.use(bodyParser.json());
app.use(cors());

// ROUTES
app.get('/', (req, res) => {
  res.send('APP RUNNING');
});
app.post('/signin', (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});
app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});
app.get('/profile/:id', (req, res) => {
  profile.handleProfileGet(req, res, db);
});
app.put('/image', (req, res) => {
  image.handleImage(req, res, db);
});
app.post('/imageurl', (req, res) => {
  image.handleApiCall(req, res);
});

// LISTEN
app.listen(PORT || 3000, () => {
  console.log(`App running on port: ${PORT}`);
});
