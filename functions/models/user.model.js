const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const userSchema=new Schema({
    name: {
        type: String,
        required:true,
    },
    favoriteartists:{
        type: Array,
        required:true,
    },
    favoritesongs:{
        type: Array,
        required:true,
    },
    postsfollowing:{
        type: Array,
    },
    email:{
        type: String,
        required:false
    },
    id:{
        type: String,
        required: true,
        unique: true,
        index: true
    },
    gender:{
        type: String,
    },
    type:{
        type: String,
    },
    phone:{
        type: Number,
    },
    location:{
        type: Array
    },
    chatgroups:{
        type:Array
    },
    image:{
        type: String
    },
    url:{
        type: String
    },
    datingimages: {
        type:Array
    },
    matchedpeople: {
        type:Array
    },
    liked: {
        type:Array
    },
    fname:{
        type:String,
    },
    lname:{
        type:String,
    },
    bio:{
        type:String
    },
    ans1:{
        type:String
    },
    ans2:{
        type:String
    },
    ans3:{
        type:String
    },
    q1: {
        type: Number
    },
    q2:{
        type: Number
    },
    q3:{
        type: Number
    }

},
{
    timestamps: true,
});
const User = mongoose.model('User', userSchema);

module.exports=User;