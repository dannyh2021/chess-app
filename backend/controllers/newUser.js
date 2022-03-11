import { User } from "../models/User.js";

export default (req, res) => {
    console.log('req.body: ', req.body);
    
    User.create(req.body, (error, user) => {
        console.log('error: ', error);
        res.setHeader('Content', 'application/json');
        res.status(200).send({ registeredUser: req.body, note: 'success?'});
    });
};