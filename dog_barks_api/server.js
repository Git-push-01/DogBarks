import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';
import UserWithDb from './src/usingDB/controller/Users';
import Auth from './src/usingDB/middleware/Auth';

dotenv.config();

const app = express()

app.use(express.json())
var cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {

  return res.status(200).send({'message': 'YAY! Congratulations! Your first endpoint is working'});
});


app.post('/api/v1/users/signup', UserWithDb.create);
app.post('/api/v1/users/login', UserWithDb.login);
app.delete('/api/v1/users/:id', UserWithDb.delete);
app.get('/api/v1/users/:id', Auth.verifyToken);

app.listen(3001)
console.log('app running on port ', 3001);
