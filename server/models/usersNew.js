const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const userSchema=new Schema({
    name: {
        type: String,
        required:true,
    },
    nowplaying:{
        type: String,

    },
    favoriteartists:{
        type: Array,
        required:true,

    }
},
{
    timestamps: true,
});
const User = mongoose.model('UserNew', userSchema);

module.exports=User;