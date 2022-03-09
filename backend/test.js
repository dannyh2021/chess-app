import { mongoose } from 'mongoose';
import { User } from './models/User.js';

mongoose.connect('mongodb://localhost/my_database');

User.create({
    username: "username1",
    email: "testing@gmail.com",
    password: "testing_password"
}, (error, user) => {
    console.log(error, user);
});