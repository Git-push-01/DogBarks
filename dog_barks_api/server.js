import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';
import UserWithDb from './src/usingDB/controller/User';
import Auth from './src/usingDB/middleware/Auth';

dotenv.config();

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  return res.status(200).send({'message': 'YAY! Congratulations! Your first endpoint is working'});
});


app.post('/api/v1/users', UserWithDb.create);
app.post('/api/v1/users/login',UserWithDb.login);
app.delete('/api/v1/users/me', Auth.verifyToken, UserWithDb.delete);

app.listen(3000)
console.log('app running on port ', 3000);
