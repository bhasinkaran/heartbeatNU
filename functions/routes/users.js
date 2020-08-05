const router = require('express').Router();
const configg=require('../configure.js')
const request = require('request')
let User = require('../models/user.model');
// let Spotify =require('spotify-web-api-node');
// var spotifyApi = new Spotify({
//     clientId:'75dfedc5f2d847e7bfad7f2da2f9c611',
//     clientSecret: process.env.NODE_ENV === 'production' ? process.env.SECRETKEY :configg,
//     redirectUri: process.env.NODE_ENV === 'production' ? `https://pure-harbor-26317.herokuapp.com/users/callback` : `http://localhost:8888/users/callback`
// });

// route to display all users.


router.route('/add').get((req,res)=>{
    
    //getting display name
    var options3 = {
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': 'Bearer ' + req.query.access_token },
        json: true
      };

      request.get(options3, function(error, response, body) {
        console.log("this is the display name")
        console.log(body.display_name);
        var displayname=body.display_name;
        var email=body.email;
        var id=body.id;
        var image;
        if(body.images[0]){
          image=body.images[0].url;
        }
        else{
          image="https://pngimg.com/uploads/music_notes/music_notes_PNG84.png"
        } 
        var externalurl=body.external_urls.spotify
        console.log(body);
        User.findOne({id:id}, function(err, user){
          console.log(err);
          console.log(user);
          if(err){
      // console.log(err);
          }
          else{
            console.log(user);

            if(user){
              console.log("came here")
              console.log(user)
              console.log(err)
            var url =  process.env.NODE_ENV === 'production' ? `https://pure-harbor-26317.herokuapp.com/home/${id}/${req.query.access_token}/${req.query.refresh_token}`: `http://localhost:3000/home/${id}/${req.query.access_token}/${req.query.refresh_token}`;
            res.redirect(url);
           
          }
        
        else{
          var options2 = {
            url: 'https://api.spotify.com/v1/me/top/artists',
            headers: { 'Authorization': 'Bearer ' + req.query.access_token },
            json: true
          };
          
          request.get(options2, function(error, response, body2) {
            console.log("this is not using the API")
             var ids = body2.items.map(item=>item.id)
             console.log(ids)
  
                        var songs = {
                            url: 'https://api.spotify.com/v1/me/top/tracks',
                            headers: { 'Authorization': 'Bearer ' + req.query.access_token },
                            json: true
                         };
  
                             request.get(songs, function( error, response, songsbody){
  
                              var topsongs=songsbody.items.map(id=>id.id);
                              console.log(topsongs);
  
  
                              const newUser=new User({"name": displayname,"favoriteartists": ids, "favoritesongs": topsongs, "id":id, "email":email, "image":image, "url": externalurl, "postsfollowing": [] });
                              newUser.save()
                              .then(()=>{
                                var url =  process.env.NODE_ENV === 'production' ? `https://pure-harbor-26317.herokuapp.com/home/${id}/${req.query.access_token}/${req.query.refresh_token}`: `http://localhost:3000/home/${id}/${req.query.access_token}/${req.query.refresh_token}`;
                                    return res.redirect(url);
           
                                // var url =  process.env.NODE_ENV == 'production' ? `https://pure-harbor-26317.herokuapp.com/signup/${id}/${req.query.access_token}`: `http://localhost:3000/signup/${id}/${req.query.access_token}`;
                                // res.status(200).redirect(url);
  
                              })
                              .catch(err=>{
                                   console.log(displayname)
                                   console.log(ids)
                                   res.status(400).json('Error: '+err)
                              }); 
  
            });
  
        });
  
        }
      }

      });

    });

});
router.route('/dating/add').get((req,res)=>{
    
  //getting display name
  var options3 = {
      url: 'https://api.spotify.com/v1/me',
      headers: { 'Authorization': 'Bearer ' + req.query.access_token },
      json: true
    };

    request.get(options3, function(error, response, body) {
      console.log("this is the display name")
      console.log(body.display_name);
      var displayname=body.display_name;
      var email=body.email;
      var id=body.id;
      var image;
      if(body.images[0]){
        image=body.images[0].url;
      }
      else{
        image="https://pngimg.com/uploads/music_notes/music_notes_PNG84.png"
      } 
      var externalurl=body.external_urls.spotify
      console.log(body);
      User.findOne({id:id}, function(err, user){
        console.log(err);
        console.log(user);
        if(err){
    // console.log(err);
        }
        else{
          console.log(user);

          if(user){
            console.log("came here")
            console.log(user)
            console.log(err)
          var url =  process.env.NODE_ENV === 'production' ? `https://pure-harbor-26317.herokuapp.com/dating/home/${id}/${req.query.access_token}/${req.query.refresh_token}`: `http://localhost:3000/dating/home/${id}/${req.query.access_token}/${req.query.refresh_token}`;
          res.redirect(url);
         
        }
      
      else{
        var options2 = {
          url: 'https://api.spotify.com/v1/me/top/artists',
          headers: { 'Authorization': 'Bearer ' + req.query.access_token },
          json: true
        };
        
        request.get(options2, function(error, response, body2) {
          console.log("this is not using the API")
           var ids = body2.items.map(item=>item.id)
           console.log(ids)

                      var songs = {
                          url: 'https://api.spotify.com/v1/me/top/tracks',
                          headers: { 'Authorization': 'Bearer ' + req.query.access_token },
                          json: true
                       };

                           request.get(songs, function( error, response, songsbody){

                            var topsongs=songsbody.items.map(id=>id.id);
                            console.log(topsongs);


                            const newUser=new User({"name": displayname,"favoriteartists": ids, "favoritesongs": topsongs, "id":id, "email":email, "image":image, "url": externalurl, "postsfollowing": [] });
                            newUser.save()
                            .then(()=>{
                              // var url =  process.env.NODE_ENV == 'production' ? `https://pure-harbor-26317.herokuapp.com/dating/home/${id}/${req.query.access_token}/${req.query.refresh_token}`: `http://localhost:3000/dating/home/${id}/${req.query.access_token}/${req.query.refresh_token}`;
                              //     res.redirect(url);
         
                              var url =  process.env.NODE_ENV === 'production' ? `https://pure-harbor-26317.herokuapp.com/signup/${id}/${req.query.access_token}/${req.query.refresh_token}`: `http://localhost:3000/signup/${id}/${req.query.access_token}/${req.query.refresh_token}`;
                              return res.status(200).redirect(url);

                            })
                            .catch(err=>{
                                 console.log(displayname)
                                 console.log(ids)
                                 res.status(400).json('Error: '+err)
                            }); 

          });

      });

      }
    }

    });

  });

});
router.route('/').get((req,res)=>{
  User.find()
  .then(user=>res.json(user))
  .catch(err=>res.status(400).json('Error: '+err));
});

router.route('/:id').get((req,res)=>{
  User.find({id:req.params.id})
  .then(user=>res.json(user))
  .catch(err=>res.status(400).json('Error: '+err));
});

router.route('/signup/:id/').post((req,res)=>{
  User.findOne({ id: req.params.id }, function (err, doc){
    if(err){
      console.log(err);
    }
    doc.gender = req.query.gender;
    // doc.type = req.query.type;
    doc.phone=req.query.phone;
    doc.location=req.query.location;
    doc.fname=req.query.fname;
    doc.lname=req.query.lname;
    doc.bio=req.query.bio;
    doc.ans1=req.query.ans1;
    doc.ans2=req.query.ans2;
    doc.ans3=req.query.ans3;
    console.log("This is the query");
    console.log(req.query.q1);
    doc.q1=req.query.q1;
    doc.q2=req.query.q2;
    doc.q3=req.query.q3;

    console.log(req.query.lname);
    console.log(req.query.fname);

     console.log(req.query.location)
    //  var temp = [];
    //  temp.push(req.query.image1);
    //  temp.push(req.query.image2);
    //  temp.push(req.query.image3);
    //  doc.datingimages=req.query.datingimages;
    doc.save()
  }).then(user=>console.log(json(user))).catch(err=>res.status(400).json("Error: "+err));
});
router.route('/signup/:id/2/').post((req,res)=>{
  User.findOne({ id: req.params.id }, function (err, doc){
    if(err){
      console.log(err);
    }
     doc.datingimages=req.query.datingimages;
    doc.save()
  }).then(user=>console.log(json(user))).catch(err=>res.status(400).json("Error: "+err));
});
router.route('/addartist/:id/:artistid').post((req,res)=>{
  User.findOne({id:req.params.id}, function(err, doc){
    if(err){
      console.log(err);
    }
    var temp = doc.favoriteartists;
    temp.push(req.params.artistid);
    doc.favoriteartists=temp;
    doc.save();
  })
  .then(user=>res.json(user))
  .catch(err=>res.status(400).json('Error: '+err));
});
router.route('/addsong/:id/:songid').post((req,res)=>{
  User.findOne({id:req.params.id}, function(err, doc){
    if(err){
      console.log(err);
    }
    var temp = doc.favoritesongs;
    temp.push(req.params.songid);
    doc.favoritesongs=temp;
    doc.save();
  } )
  .then(user=>res.json(user))
  .catch(err=>res.status(400).json('Error: '+err));
});
router.route('/addpost/:id/:postid').post((req,res)=>{
  User.findOne({id:req.params.id}, function(err, doc){
    if(err){
      console.log(err);
    }
    console.log('before');

    console.log(doc.postsfollowing);  
      console.log('after');

    var temp = doc.postsfollowing.addToSet(req.params.postid);
    
    doc.save()

    // if(!(temp.length==0)){
      //   temp=[req.params.postid];
      //   console.log("BAD To be inside here.")
      // }
      // else{
      //   temp.push(req.params.postid);
      //   console.log("Good To be inside here.")
      // }
      
      // doc.postsfolowing=temp;
      // console.log(temp);
  } )
  .then(user=>res.status(200).json(user))
  .catch(err=>res.status(400).json('Error: '+err));
});
router.route('/addpost/:id/:image_url').post((req,res)=>{
  User.findOne({id:req.params.id}, function(err, doc){
    if(err){
      console.log(err);
    }
    console.log('before');
    console.log(doc.postsfollowing);  
    console.log('after');
    doc.datingimages.addToSet(req.params.image_url);
    
    doc.save();

  } )
  .then(user=>res.status(200).json(user))
  .catch(err=>res.status(400).json('Error: '+err));
});



module.exports=router;