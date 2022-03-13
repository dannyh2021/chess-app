import { mongoose } from 'mongoose';

const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: true
    },
    likes: {
        type: Number,
        required: true
    },
    img: String,
    pgn: String,
    text: {
        type: String,
        required: true
    }
});

const BlogPost = mongoose.model('BlogPost', GameSchema);

export { BlogPost };