import { Game } from "../models/Game.js";

export default (req, res) => {
    // const { username } = req.body;
    const username = req.get('username');
    if(username) {
        Game.find({ username }, (error, games) => {
            res.status(200).send({ msg: 'success', games })
        })
    }
    else {
        res.status(400).send({ msg: 'no username sent' });
    }
};