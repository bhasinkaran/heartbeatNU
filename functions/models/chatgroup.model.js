const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const groupSchema=new Schema({
    senderid: {
        type: String,
        required:true,
    },
    receipientid:{
        type: String,
        required:true,
    },
    messages:{
            type: Array,
            required:false
    },
    date:{
            type: Date,
            default: Date.now
    }
},
{
    timestamps: true,
});
const Group = mongoose.model('Group', groupSchema);

module.exports=Group;