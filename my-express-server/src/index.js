import express from 'express';

const app = express();
const PORT = process.env.PORT || '3000';
const mockUsers = [
  { id: 1, username: 'anson', displayName: 'Anson' },
  { id: 2, username: 'jack', displayName: 'Jack' },
  { id: 3, username: 'adam', displayName: 'Adam' },
];

// Get Request
app.get('/', (req, res) => {
  res.status(201).send({ msg: 'Hello, World' });
});

//Query Parameters
app.get('/api/users', (req, res) => {
  console.log(req.query);
  const {
    query: { filter, value },
  } = req;

  //when filter and value are undefined
  if (!filter && !value) return res.send(mockUsers);
  if (filter && value) return res.send(mockUsers.filter((user) => user[filter].includes(value)));
});

app.get('/api/products', (req, res) => {
  res.send([{ id: 123, name: 'chicken', price: 12.99 }]);
});

// Route Parameter
app.get('/api/users/:id', (req, res) => {
  console.log(req.params);

  const parseId = parseInt(req.params.id);
  console.log(parseId);
  if (isNaN(parseId)) return res.status(400).send({ msg: 'Bad Request. Invalid ID' });

  const findUser = mockUsers.find((user) => user.id === parseId);
  if (!findUser) return res.sendStatus(404);
  else return res.send(findUser);
});

app.get;

app.listen(PORT, () => {
  console.log(`Running on PORT http://localhost:${PORT}`);
});
