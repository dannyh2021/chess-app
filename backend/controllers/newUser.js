import { User } from "../models/User.js";

export default (req, res) => {
    console.log('req:', req);
    console.log('req.body: ', req.body);
    User.create(req.body, (error, user) => {
        console.log('error: ');
        console.log(error);
        res.redirect('/');
    });
};