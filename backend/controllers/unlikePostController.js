import { Like } from '../models/Like.js'

export default (req, res) => {
    console.log('req.body: ', req.body);

    // delete like based on _id
    Like.deleteOne({ _id: req.body._id }, function(error) {
        if (!error) {
            res.status(200).send({ msg: 'success' });
        }
        else {
                message.type = 'error';
            res.status(409).send(error);
        }
    });
};