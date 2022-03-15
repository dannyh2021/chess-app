import { User } from "../models/User.js";

export default (req, res) => {
    console.log('req.body: ', req.body);
    console.log()

    User.findOne({username: req.body.username}, (error, user) => {
        if (user) {
            res.status(409).send({ message: 'username already exists' });
        } else {
            User.findOne({email: req.body.email}, (error, user2) => {
                if (user2) {
                    res.status(409).send({ message: 'email already exists' });
                } else {
                    User.create(req.body, (error, user3) => {
                        console.log('error: ', error);
                        if (error) {
                            res.status(409).send( error );
                        } else {
                            res.status(200).send( { msg: 'success' });
                        }
                    });
                }
            });
        }
    });
};