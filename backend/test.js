import { mongoose } from 'mongoose';
import { User } from './models/User.js';
import { Game } from './models/Game.js';

mongoose.connect('mongodb://localhost/my_database');

/*User.create({
    username: "username1",
    email: "testing@gmail.com",
    password: "testing_password"
}, (error, user) => {
    console.log(error, user);
});*/

Game.create({
    user_id: 'testing_id',
    pgn: 'testing_pgn',
    date: new Date()
}, (error, game) => {
    console.log(error, game);
});