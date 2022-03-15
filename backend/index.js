import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import expressSession from 'express-session';
import http from 'http';

import mongoose from 'mongoose';

import newUserController from './controllers/newUser.js';
import loginUserController from './controllers/loginUser.js';
import saveGameController from './controllers/saveGame.js'
import getGamesController from './controllers/getgames.js'

import postBlogController from './controllers/postBlogController.js';
import getBlogController from './controllers/getBlogController.js';
// import updateBlogController from './controllers/updateBlogController.js';
import deleteBlogController from './controllers/deleteBlogController.js';

import likePostController from './controllers/likePostController.js';
import unlikePostController from './controllers/unlikePostController.js';

const __dirname = path.resolve();

// connect to MongoDB
mongoose.connect('mongodb://localhost/my_database');

// set middleware
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({
    secret: 'keyboard cat'
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // res.header('Access-Control-Allow-Headers', true);
    res.header('Access-Control-Allow-Credentials', true);
    // res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET", true);
    res.header("Access-Control-Allow-Headers","*");
    next();
});

// set port
let port = process.env.PORT;
if (port == null || port == '') {
    port = 3000;
}

// start server
app.listen(port, () => {
    console.log('App listening on port 3000');
});

// user login

app.post('/users/register', newUserController);

app.post('/users/login', loginUserController);

// game post

app.post('/games/save', saveGameController);

app.get('/games/get', getGamesController);

// blog CRUD

app.post('/blog/post', postBlogController);

app.get('/blog/get', getBlogController);

// app.post('/blog/update', updateBlogController)

app.post('/blog/delete', deleteBlogController);

// like and unlike post

app.post('blog/like', likePostController);

app.post('blog/unlike', unlikePostController);

// testing get
app.get('/dev/get', (req, res) => {
    console.log('sending test json');
    res.setHeader('Content', 'application/json');
    res.end(JSON.stringify({ username: "user", password: "password" }));
});

// send frontend
/*app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/frontend/index.html'));
});*/

app.get('/main.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/frontend/main.js'));
});

app.get('/polyfills.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/frontend/polyfills.js'));
});

app.get('/runtime.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/frontend/runtime.js'));
});

app.get('/styles.css', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/frontend/styles.css'));
});

app.get('*', (req, res) => {
    console.log(req.session);
    res.sendFile(path.resolve(__dirname, './public/frontend/index.html'));
});

// send not-found page
app.use((req, res) => res.sendFile(path.resolve(__dirname, './public/notfound.html')));