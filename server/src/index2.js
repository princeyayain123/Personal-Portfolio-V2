import express from 'express';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

const mockUsers = [
  {
    id: 1,
    text: 'Hey there! How it going?',
    sender: 'other',
    senderProfile: { name: 'Jane', avatar: 'https://i.pravatar.cc/40?img=1' },
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    reaction: null,
  },
  {
    id: 2,
    text: 'Edi wow',
    sender: 'other',
    senderProfile: { name: 'Jane', avatar: 'https://i.pravatar.cc/40?img=2' },
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    reaction: null,
  },
];

const contactUs = [{ id: 1, name: 'Julius', email: 'princeyayain123@gmail.com', message: 'Hello Ang gwapo ko' }];

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/users', (req, res) => {
  res.json(mockUsers);
});

app.post('/api/users', (req, res) => {
  const { body } = req;
  mockUsers.push(body);
  return res.send(mockUsers);
});

app.get('/api/contacts', (req, res) => {
  res.json(contactUs);
});

app.post('/api/contacts', (req, res) => {
  const { body } = req;
  contactUs.push({ id: contactUs.length + 1, ...body });
  return res.send(contactUs);
});

app.listen(PORT, () => {
  console.log(`Running on PORT http://localhost:${PORT}`);
});
