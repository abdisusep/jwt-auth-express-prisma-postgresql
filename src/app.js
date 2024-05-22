require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app  = express();
const port = process.env.PORT || 3000;
const db   = require('./utils/db');

const routes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

db.$connect().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}).catch((err) => {
  console.error('Error connecting to database:', err);
});