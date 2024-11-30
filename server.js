const express = require('express');
const phones = require('./phonesData'); 
const app = express();
const PORT = 3500; 

app.use(express.json());


app.get('/phones', (req, res) => {
  res.json(phones);
});


app.post('/phones', (req, res) => {
  const newPhone = { id: phones.length + 1, ...req.body };
  phones.push(newPhone);
  res.status(201).json(newPhone);
});


app.put('/phones/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = phones.findIndex((phone) => phone.id === id);
  if (index === -1) {
    return res.status(404).send(`Phone with ID ${id} not found`);
  }
  phones[index] = { ...phones[index], ...req.body };
  res.json(phones[index]);
});


app.delete('/phones/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = phones.findIndex((phone) => phone.id === id);
  if (index === -1) {
    return res.status(404).send(`Phone with ID ${id} not found`);
  }
  const removedPhone = phones.splice(index, 1);
  res.json(removedPhone[0]);
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
