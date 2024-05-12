
const mongoose= require('mongoose')

const UserSchema= new mongoose.Schema({
    Name:{type:String, require:true},
    
    Email: {type:String, require:true},
    Password: {type:String, require:true},
   

},{timestamps:true})
const User =  mongoose.models?.User || mongoose.model('User', UserSchema);

export default User;