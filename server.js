const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const app = express();

app.use(bodyParser.json());

const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Sally',
      email: 'sally@gmail.com.com',
      password: 'bananas',
      entries: 0,
      joined: new Date()
    }
  ]
};

app.get('/', (req, res) => {
  res.send(database.users);
});

// SIGN IN
app.post('/signin', (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json('OK Login');
  } else {
    res.status(400).json('ERR Login');
  }
});

// CREATE new user
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  database.users.push({
    id: '125',
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  });
  res.json(database.users[database.users.length - 1]);
});

// GET user
app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(400).json('User not found');
  }
});

app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});

/*
/ --> res = Running ...
/signin --> POST = success/ fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/
