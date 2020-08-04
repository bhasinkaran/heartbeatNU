const express = require('express');
const functions = require('firebase-functions');
const credentials=functions.config()
const path = require('path');
const configg =require('./configure.js')
var request= require ('request');
var cors =  require('cors');
var querystring = require('querystring');
var cookieParser=require('cookie-parser');
const mongoose = require('mongoose')

// const cluster = require('cluster');
// const numCPUs = require('os').cpus().length;
require('dotenv').config();
// const isDev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 8888;

var client_id = '75dfedc5f2d847e7bfad7f2da2f9c611'; // Your client id
var client_secret =  process.env.NODE_ENV === 'production' ? process.env.SECRETKEY : configg;
var redirect_uri = process.env.PORT ? `https://pure-harbor-26317.herokuapp.com/callback` : `http://localhost:8888/callback`; // Your redirect uri

var redirect_uri_dating = process.env.PORT ? `https://pure-harbor-26317.herokuapp.com/callback/dating` : `http://localhost:8888/callback/dating`; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const uri = process.env.URIMONGO;
mongoose.connect('mongodb+srv://karan:gokaran@nearify-aezuo.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
}).catch(err=>console.log("THE ERROR IS"+err));


var stateKey = 'spotify_auth_state';

var app = express();

app.use(express.static(path.resolve(__dirname, '../react-ui/build')))
          .use(cors())
          .use(cookieParser());


app.get('/test', (req,res) =>{
  res.status('200').send(req.url);
});

app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email user-read-playback-state user-top-read user-library-read';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});
app.get('/login/dating', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email user-read-playback-state user-top-read user-library-read';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri_dating,
      state: state
    }));
});

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body.id);
        });

        // we can also pass the token to the browser to make requests from there
        var redirectable=process.env.PORT ? 'http://pure-harbor-26317.herokuapp.com/users/add/?': 'http://localhost:8888/users/add/?';
        res.redirect(redirectable +
        querystring.stringify({
          access_token: access_token,
          refresh_token: refresh_token,

        }));
    } else {
      console.log(response.statusCode);
      console.log(response)
      res.redirect('/#' +
        querystring.stringify({
          error: 'invalid_token'
        }));
    }
  });
}
});
app.get('/callback/dating', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri_dating,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body.id);
        });

        // we can also pass the token to the browser to make requests from there
        var redirectable=process.env.PORT ? 'http://pure-harbor-26317.herokuapp.com/users/dating/add/?': 'http://localhost:8888/users/dating/add/?';
        res.redirect(redirectable +
        querystring.stringify({
          access_token: access_token,
          refresh_token: refresh_token,
        }));
    } else {
      console.log(response.statusCode);
      console.log(response)
      res.redirect('/#' +
        querystring.stringify({
          error: 'invalid_token'
        }));
    }
  });
}
});



app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});
  // Answer API requests.
  app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
  });


//   const userRouter=require('./routes/users');
//   const chatRouter=require('./routes/chats');
  // var bodyParser = require('body-parser')
  // app.use(bodyParser.urlencoded({
  //   extended: false
  //   }))
  // app.use(bodyParser.json())
//   app.use('/users', userRouter);
//   app.use('/chats',chatRouter);

app.get('/users/add',(req,res)=>{
    
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
    app.get('/users/dating/add',(req,res)=>{
        
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
    app.get('/users',(req,res)=>{
      User.find()
      .then(user=>res.json(user))
      .catch(err=>res.status(400).json('Error: '+err));
    });
    
    app.get('/:id',(req,res)=>{
      User.find({id:req.params.id})
      .then(user=>res.json(user))
      .catch(err=>res.status(400).json('Error: '+err));
    });
    
    app.post('/signup/:id/',(req,res)=>{
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
    app.post('/users/signup/:id/2/',(req,res)=>{
      User.findOne({ id: req.params.id }, function (err, doc){
        if(err){
          console.log(err);
        }
         doc.datingimages=req.query.datingimages;
        doc.save()
      }).then(user=>console.log(json(user))).catch(err=>res.status(400).json("Error: "+err));
    });
    app.post('/users/addartist/:id/:artistid',(req,res)=>{
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
    app.post('/users/addsong/:id/:songid',(req,res)=>{
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
    app.post('/users/addpost/:id/:postid',(req,res)=>{
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
    app.post('/users/addpost/:id/:image_url',(req,res)=>{
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
    


  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });

  // app.use(express.static(path.resolve(__dirname, '../react-ui/build')))
  // .use(cors())
  // .use(cookieParser());

  app.listen(port, function () {
    console.error(`listening on port ${port}`);
  });  
exports.app = functions.https.onRequest(app);

// const appOptions = JSON.parse(process.env.FIREBASE_CONFIG);
// const appFirebase = admin.initializeApp(appOptions);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

