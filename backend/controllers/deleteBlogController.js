import { BlogPost } from "../models/BlogPost.js";

export default (req, res) => {
    console.log('req.body: ', req.body);

    BlogPost.deleteOne({ _id: req.body._id }, function(error) {
        if (!error) {
            res.status(200).send({ msg: 'success' });
        }
        else {
                message.type = 'error';
            res.status(409).send(error);
        }
    });
};