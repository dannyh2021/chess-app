import bcrypt from 'bcrypt';
import { User } from '../models/User.js'

export default (req, res) => {
    const { username, password } = req.body;

    User.findOne({username: username}, (error, user) => {
        console.log('user: ', username);
        console.log('password: ', password);
        if (user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) {
                    req.session.userId = user._id;
                    res.status(200).send({ user_id: user._id });
                } else {
                    res.status(401).send({ msg: 'password doesn\'t match' });
                }
            });
        } else {
            res.status(401).send({ msg: 'username not found' });
        }
    });
};