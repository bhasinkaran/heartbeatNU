// const router = require('express').Router();
// let Group = require('../models/chatgroup.model');
// const configg=require('../configure.js')
// const request = require('request')
// let Message = require('../models/chat.model');
// let Spotify =require('spotify-web-api-node');


// // route to display all users.


// router.route('/add').post((req,res)=>{
//         var time= Date.now;
//         const newGroup=new Group({"senderid":req.query.senderid, "recipientid":req.query.recipientid, "date": time});
//         newGroup.save().then(()=>{
//                 res.sendStatus(200);
//         }).catch(err=>{
//                 console.log(err);
//                 res.status(400).json('Error: '+err);
//         });
// });


// // router.route('/:id').get((req,res)=>{
// //   User.find({id:req.params.id})
// //   .then(user=>res.json(user))
// //   .catch(err=>res.status(400).json('Error: '+err));
// // });



// module.exports=router;