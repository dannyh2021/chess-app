import { Game } from "../models/Game.js";

export default (req, res) => {
    console.log('req.body: ', req.body);

    Game.create(req.body, (error, game) => {
        console.log('error: ', error);
        res.setHeader('Content', 'application/json');
        if (error) {
            res.status(409).send( error );
        } else {
            res.status(200).send( { msg: 'success' });
        }
    });
};