const router = require('express').Router();
let User = require('../models/user.model');




router.route('/').get((req,res)=>{
    User.find()
    .then(user=>res.json(user))
    .catch(err=>res.status(400).json('Error: '+err));
});
router.route('/add').post((req,res)=>{
    console.log("THIS IS THE request")
    console.log(req)
    const username =req.body.username;
    const newUser=new User({username});
    newUser.save()
    .then(()=>res.json('User Added!'))
    .catch(err=>res.status(400).json('Error: '+err));

})

module.exports=router;