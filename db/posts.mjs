import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    comments: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],

    }
},
{
    statics: {
        async createPost(title, content, author) {
            const newPost = new this({
                title,
                content,
                author
            })
            return await newPost.save();            
        }
    }
});

const Post = mongoose.model('Post', postSchema);

export default Post;