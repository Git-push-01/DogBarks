import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';
import UserWithDb from './src/usingDB/controller/User';
import Auth from './src/usingDB/middleware/Auth';
// const bodyParser = require('body-parser');
dotenv.config();

const app = express()
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
var cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
  return res.status(200).send({'message': 'YAY! Congratulations! Your first endpoint is working'});
});


app.post('/api/v1/users/signup', UserWithDb.create);
app.post('/api/v1/users/login', UserWithDb.login);
app.delete('/api/v1/users/:id', Auth.verifyToken, UserWithDb.delete);

app.listen(3000)
console.log('app running on port ', 3000);
