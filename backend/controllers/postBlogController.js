import { BlogPost } from "../models/BlogPost.js";

export default (req, res) => {
    console.log('req: ', req);
    console.log('req.body: ', req.body);

    BlogPost.create(req.body, (error, post) => {
        console.log('error: ', error);
        if (error) {
            res.status(409).send( error );
        } else {
            res.status(200).send(post);
        }
    });
};