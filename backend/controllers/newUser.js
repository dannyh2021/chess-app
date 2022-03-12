import { User } from "../models/User.js";

export default (req, res) => {
    console.log('req.body: ', req.body);
    console.log()
    User.create(req.body, (error, user) => {
        console.log('error: ', error);
        res.setHeader('Content', 'application/json');
        if (error) {
            res.status(409).send( error );
        } else {
            res.status(200).send( { msg: 'success' });
        }
    });
};