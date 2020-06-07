const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const userSchema=new Schema({
    name: {
        type: String,
        required:true,
        unique:true
    },
    nowplaying:{
        type: String,
        required:true,
        unique:true

    },
    favoriteartists:{
        type: Array,
        required:true,
        unique:true

    }
},
{
    timestamps: true,
});
const User = mongoose.model('User', userSchema);

module.exports=User;