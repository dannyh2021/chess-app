import { mongoose } from 'mongoose';

const Schema = mongoose.Schema;

const GameSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    pgn: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const Game = mongoose.model('Game', GameSchema);

export { Game };