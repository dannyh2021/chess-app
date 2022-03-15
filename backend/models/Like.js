import { mongoose } from 'mongoose';

const Schema = mongoose.Schema;

const LikeSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    post_id: {
        type: String,
        required: true,
        unique: true
    }
});