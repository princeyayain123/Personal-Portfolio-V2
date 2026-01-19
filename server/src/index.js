import express from 'express';
import { re } from 'mathjs';

const app = express();

app.use(express.json());

const PORT = process.env.PORT || '3000';
const mockUsers = [
  { id: 1, username: 'anson', displayName: 'Anson' },
  { id: 2, username: 'jack', displayName: 'Jack' },
  { id: 3, username: 'adam', displayName: 'Adam' },
];

const loginUser = [
  {
    id: 1,
    username: 'julius',
    password: 'yayain',
  },
];

// Middleware, use this if the logic always repeated
const resolveIndexByUserId = (req, res, next) => {
  const {
    params: { id },
  } = req;

  const parseId = parseInt(id);
  if (isNaN(parseId)) return res.sendStatus(400);

  const findUserIndex = mockUsers.findIndex((user) => user.id === parseId);
  if (findUserIndex < 0) return res.sendStatus(404);
  req.findUserIndex = findUserIndex;
  next();
};

// Get Request
app.get('/', (req, res) => {
  res.status(201).send({ msg: 'Hello, World' });
});

app.get('/api/products', (req, res) => {
  res.send([{ id: 123, name: 'chicken', price: 12.99 }]);
});

// Route Parameter
app.get('/api/users/:id', (req, res) => {
  const parseId = parseInt(req.params.id);

  if (isNaN(parseId)) return res.status(400).send({ msg: 'Bad Request. Invalid ID' });

  const findUser = mockUsers.find((user) => user.id === parseId);
  if (!findUser) return res.sendStatus(404);
  else return res.send(findUser);
});

//Query Parameters
app.get('/api/users', (req, res) => {
  console.log(req.query);
  const {
    query: { filter, value },
  } = req;

  //when filter and value are defined
  if (filter && value) return res.send(mockUsers.filter((user) => user[filter].includes(value)));
  return res.send(mockUsers);
});

// Post Request
app.post('/api/users', (req, res) => {
  const { body } = req;
  const findUser = mockUsers.find((user) => user.username === body.username);

  if (!findUser) {
    const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
    mockUsers.push(newUser);
  }

  return res.send(mockUsers);
});

// Put Request used to update ENTIRE of the data
// Patch Request used to update PORTION of the data

// Put Request
app.put('/api/users/:id', resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;
  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
  return res.status(200).send(mockUsers);
});

// Patch Request

app.patch('/api/users/:id', resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;

  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };

  return res.status(200).send(mockUsers);
});

// Delete Request

app.delete('/api/users/:id', resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;

  mockUsers.splice(findUserIndex, 1);

  return res.status(200).send(mockUsers);
});

app.listen(PORT, () => {
  console.log(`Running on PORT http://localhost:${PORT}`);
});
