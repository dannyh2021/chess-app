import bcrypt from 'bcrypt';
import { User } from '../models/User.js'

export default (req, res) => {
    const { username, password } = req.body;

    bcrypt.compare(password, user.password, (error, same) => {
        if (same) {
            // store user session
            res.redirect('/');
        } else {
            res.redirect('/login');
        }
    });
};