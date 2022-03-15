import { BlogPost } from "../models/BlogPost.js";

export default (req, res) => {
    BlogPost.find({}, function(err, posts) {
        if (err) {
            res.status(409).send(err);
        }
        res.status(200).send(posts);
     });
};