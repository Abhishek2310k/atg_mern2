import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    message: { type: String, required: true },
    comments: { type: Array, default: [] },
    creater: {type: String,required: true},
});

const postModel = mongoose.model("Post", postSchema);

export { postModel as Post };