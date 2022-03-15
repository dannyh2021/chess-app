import { BlogPost } from "../models/BlogPost.js";

export default (req, res) => {
    console.lo('req: ', req);
    console.log('req.body: ', req.body);

    res.status(200).send({ msg: 'success' });
};