import { BlogPost } from "../models/BlogPost.js";

export default (req, res) => {
    console.lo('req: ', req);
    console.log('req.body: ', req.body);

    /*BlogPost.findOneAndUpdate(, req.newData, (err, post) => {
        if (err) return res.send(500, {error: err});
        return res.send('Succesfully saved.');
    });*/
};