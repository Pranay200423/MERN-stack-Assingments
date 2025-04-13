
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/welcome', (req, res) => {
  res.json({ message: "Welcome to Express!" });
});

let users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', (req, res) => {
  const newUser = { id: Date.now(), ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  users = users.map(user => user.id == id ? { ...user, ...req.body } : user);
  res.json({ message: 'User updated' });
});

app.delete('/users/:id', (req, res) => {
  users = users.filter(user => user.id != req.params.id);
  res.json({ message: 'User deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
