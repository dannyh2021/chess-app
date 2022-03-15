import { Like } from '../models/Like.js';

export default (req, res) => {
    Like.find({}, function(err, likes) {
        if (err) {
            res.status(409).send(err);
        }
        res.status(200).send(likes);
     });
};