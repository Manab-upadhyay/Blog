

import {models} from 'mongoose';
import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    postid: Number,
    userid: String,
    name: String ,
    title: String,
   content: String,
   image:String
},);


const Posts =  mongoose.models?.Post || mongoose.model('Post', PostSchema);

export default Posts

