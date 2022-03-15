import { Like } from '../models/Like.js'

export default (req, res) => {
    console.log('req.body: ', req.body);

    // create like
    Like.create(req.body, (error, like) => {
        console.log('error: ', error);
        if (error) {
            res.status(409).send( error );
        } else {
            res.status(200).send( { msg: 'success' });
        }
    });
};