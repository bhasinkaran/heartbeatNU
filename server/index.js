import  express  from 'express';
import path from 'path'
import configg from './configure.js';
import request from 'request';
import cors  from 'cors';
import querystring from 'querystring';
import cookieParser from 'cookie-parser';
// const cluster = require('cluster');
// const numCPUs = require('os').cpus().length;
import mongoose from 'mongoose';
// require('dotenv').config();
// const isDev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 8888;
const __dirname = path.resolve();
var client_id = '75dfedc5f2d847e7bfad7f2da2f9c611'; // Your client id
var client_secret =  process.env.NODE_ENV == 'production' ? process.env.SECRETKEY : configg;
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



  
const router = express.Router();
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

// import User  from './models/user.model';
// let Spotify =require('spotify-web-api-node');
// var spotifyApi = new Spotify({
//     clientId:'75dfedc5f2d847e7bfad7f2da2f9c611',
//     clientSecret: process.env.NODE_ENV == 'production' ? process.env.SECRETKEY :configg,
//     redirectUri: process.env.NODE_ENV == 'production' ? `https://pure-harbor-26317.herokuapp.com/users/callback` : `http://localhost:8888/users/callback`
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
            var url =  process.env.NODE_ENV == 'production' ? `https://pure-harbor-26317.herokuapp.com/home/${id}/${req.query.access_token}/${req.query.refresh_token}`: `http://localhost:3000/home/${id}/${req.query.access_token}/${req.query.refresh_token}`;
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
                                var url =  process.env.NODE_ENV == 'production' ? `https://pure-harbor-26317.herokuapp.com/home/${id}/${req.query.access_token}/${req.query.refresh_token}`: `http://localhost:3000/home/${id}/${req.query.access_token}/${req.query.refresh_token}`;
                                    res.redirect(url);
           
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
          var url =  process.env.NODE_ENV == 'production' ? `https://pure-harbor-26317.herokuapp.com/dating/home/${id}/${req.query.access_token}/${req.query.refresh_token}`: `http://localhost:3000/dating/home/${id}/${req.query.access_token}/${req.query.refresh_token}`;
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
         
                              var url =  process.env.NODE_ENV == 'production' ? `https://pure-harbor-26317.herokuapp.com/signup/${id}/${req.query.access_token}/${req.query.refresh_token}`: `http://localhost:3000/signup/${id}/${req.query.access_token}/${req.query.refresh_token}`;
                              res.status(200).redirect(url);

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
    doc.save();
  }).then(user=>console.log(json(user))).catch(err=>res.status(400).json("Error: "+err));
  ;
});
router.route('/signup/:id/2/').post((req,res)=>{
  User.findOne({ id: req.params.id }, function (err, doc){
     doc.datingimages=req.query.datingimages;
    doc.save();
  }).then(user=>console.log(json(user))).catch(err=>res.status(400).json("Error: "+err));
  ;
});
router.route('/addartist/:id/:artistid').post((req,res)=>{
  User.findOne({id:req.params.id}, function(err, doc){
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
    console.log('before');

    console.log(doc.postsfollowing);  
      console.log('after');

    var temp = doc.postsfollowing.addToSet(req.params.postid);
    
    doc.save();

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
    console.log('before');
    console.log(doc.postsfollowing);  
    console.log('after');
    doc.datingimages.addToSet(req.params.image_url);
    
    doc.save();

  } )
  .then(user=>res.status(200).json(user))
  .catch(err=>res.status(400).json('Error: '+err));
});


// import router from './/users';
// import chatRouter from './routes/chats';
// var bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({
//   extended: false
//   }))
// app.use(bodyParser.json())
app.use('/users', router);
// app.use('/chats',chatRouter);



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

