import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import mongoose from 'mongoose';

import newUserController from './controllers/newUser.js';
import loginUserController from './controllers/loginUser.js';

// connect to MongoDB
mongoose.connect('mongodb://localhost/my_database');

// set middleware
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const __dirname = path.resolve();

// set port
let port = process.env.PORT;
if (port == null || port == '') {
    port = 3000;
}

// start server
app.listen(port, () => {
    console.log('App listening on port 3000');
});

app.post('/users/register', newUserController);

app.post('/users/login', loginUserController);

// send frontend index.html (in development)
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/frontend/index.html'));
});

app.get('/script.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/frontend/script.js'));
});

app.get('/polyfill.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/frontend/polyfill.js'));
});

app.get('/runtime.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/frontend/runtime.js'));
});

app.get('/styles.css', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/frontend/styles.css'));
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/frontend/index.html'));
});

// send not-found page
app.use((req, res) => res.sendFile(path.resolve(__dirname, './public/notfound.html')));