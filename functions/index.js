const express = require('express');
const functions = require('firebase-functions');
const credentials=functions.config()
const path = require('path');
const configg =require('./configure.js')
var request= require ('request');
var cors =  require('cors');
var querystring = require('querystring');
var cookieParser=require('cookie-parser');
// const cluster = require('cluster');
// const numCPUs = require('os').cpus().length;
const mongoose = require('mongoose')
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

