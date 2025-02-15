import mongoose from 'mongoose';

const { Schema } = mongoose;

const commentsSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Comment = mongoose.model('Comment',commentsSchema)

export default Comment;