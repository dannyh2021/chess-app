import { mongoose } from 'mongoose';

const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    pgn: String,
    text: {
        type: String,
        required: true
    }
});

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

export { BlogPost };