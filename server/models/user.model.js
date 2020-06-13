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
    email:{
        type: String,
        required:false
    },
    id:{
        type: String,
        required: true,
        unique: true
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
        type: Array,
    }

},
{
    timestamps: true,
});
const User = mongoose.model('User', userSchema);

module.exports=User;