import bcrypt from 'bcrypt';
import { User } from '../models/User.js'

export default (req, res) => {
    const { username_email, password } = req.body;
    console.log('username or email: ', username_email);
    console.log('password: ', password);

    console.log(req.body);

    User.findOne({username: username_email}, (error, user) => {
        if (user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) {
                    res.status(200).send({ user_id: user._id, username: user.username });
                } else {
                    res.status(409).send({ msg: 'password doesn\'t match' });
                }
            });
        } else {
            console.log('test');
            User.findOne({email: username_email}, (error, user2) => {
                if (user2) {
                    bcrypt.compare(password, user2.password, (error, same2) => {
                        if (same2) {
                            res.status(200).send({ user_id: user2._id, username: user2.username });
                        } else {
                            res.status(409).send({ msg: 'password doesn\'t match' });
                        }
                    });
                } else {
                    res.status(409).send({ msg: 'username or email not found' });
                }
            })
        }
    });
};