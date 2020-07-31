const functions = require('firebase-functions');
const admin= require('firebase-admin')
const cors = require("cors");
const express = require("express");
const credentials=functions.config()
const expressapp = express();
expressapp.use(express.json());
expressapp.use(cors());
const mongoose = require('mongoose')

// var client_id = '75dfedc5f2d847e7bfad7f2da2f9c611'; // Your client id
// var client_secret =  functions.config().spotify.key;
// var redirect_uri = process.env.PORT ? `https://pure-harbor-26317.herokuapp.com/callback` : `http://localhost:8888/callback`; // Your redirect uri

// mongoose.connect('mongodb+srv://karan:gokaran@nearify-aezuo.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true }
// );
// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log("MongoDB database connection established successfully");
// }).catch(err=>console.log("THE ERROR IS"+err));


// var stateKey = 'spotify_auth_state';

// expressapp.get('/login', function(req, res) {

//         var state = generateRandomString(16);
//         res.cookie(stateKey, state);
      
//         // your application requests authorization
//         var scope = 'user-read-private user-read-email user-read-playback-state user-top-read user-library-read';
//         res.redirect('https://accounts.spotify.com/authorize?' +
//           querystring.stringify({
//             response_type: 'code',
//             client_id: client_id,
//             scope: scope,
//             redirect_uri: redirect_uri,
//             state: state
//           }));
//       });
//       expressapp.get('/login/dating', function(req, res) {
      
//         var state = generateRandomString(16);
//         res.cookie(stateKey, state);
      
//         // your application requests authorization
//         var scope = 'user-read-private user-read-email user-read-playback-state user-top-read user-library-read';
//         res.redirect('https://accounts.spotify.com/authorize?' +
//           querystring.stringify({
//             response_type: 'code',
//             client_id: client_id,
//             scope: scope,
//             redirect_uri: redirect_uri_dating,
//             state: state
//           }));
//       });
      
//       expressapp.get('/callback', function(req, res) {
      
//         // your application requests refresh and access tokens
//         // after checking the state parameter
      
//         var code = req.query.code || null;
//         var state = req.query.state || null;
//         var storedState = req.cookies ? req.cookies[stateKey] : null;
      
//         if (state === null || state !== storedState) {
//           res.redirect('/#' +
//             querystring.stringify({
//               error: 'state_mismatch'
//             }));
//         } else {
//           res.clearCookie(stateKey);
//           var authOptions = {
//             url: 'https://accounts.spotify.com/api/token',
//             form: {
//               code: code,
//               redirect_uri: redirect_uri,
//               grant_type: 'authorization_code'
//             },
//             headers: {
//               'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
//             },
//             json: true
//           };
      
//           request.post(authOptions, function(error, response, body) {
//             if (!error && response.statusCode === 200) {
      
//               var access_token = body.access_token,
//                   refresh_token = body.refresh_token;
      
//               var options = {
//                 url: 'https://api.spotify.com/v1/me',
//                 headers: { 'Authorization': 'Bearer ' + access_token },
//                 json: true
//               };
      
//               // use the access token to access the Spotify Web API
//               request.get(options, function(error, response, body) {
//                 console.log(body.id);
//               });
      
//               // we can also pass the token to the browser to make requests from there
//               var redirectable=process.env.PORT ? 'http://pure-harbor-26317.herokuapp.com/users/add/?': 'http://localhost:8888/users/add/?';
//               res.redirect(redirectable +
//               querystring.stringify({
//                 access_token: access_token,
//                 refresh_token: refresh_token,
      
//               }));
//           } else {
//             console.log(response.statusCode);
//             console.log(response)
//             res.redirect('/#' +
//               querystring.stringify({
//                 error: 'invalid_token'
//               }));
//           }
//         });
//       }
//       });
//       expressapp.get('/callback/dating', function(req, res) {
      
//         // your application requests refresh and access tokens
//         // after checking the state parameter
      
//         var code = req.query.code || null;
//         var state = req.query.state || null;
//         var storedState = req.cookies ? req.cookies[stateKey] : null;
      
//         if (state === null || state !== storedState) {
//           res.redirect('/#' +
//             querystring.stringify({
//               error: 'state_mismatch'
//             }));
//         } else {
//           res.clearCookie(stateKey);
//           var authOptions = {
//             url: 'https://accounts.spotify.com/api/token',
//             form: {
//               code: code,
//               redirect_uri: redirect_uri_dating,
//               grant_type: 'authorization_code'
//             },
//             headers: {
//               'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
//             },
//             json: true
//           };
      
//           request.post(authOptions, function(error, response, body) {
//             if (!error && response.statusCode === 200) {
      
//               var access_token = body.access_token,
//                   refresh_token = body.refresh_token;
      
//               var options = {
//                 url: 'https://api.spotify.com/v1/me',
//                 headers: { 'Authorization': 'Bearer ' + access_token },
//                 json: true
//               };
      
//               // use the access token to access the Spotify Web API
//               request.get(options, function(error, response, body) {
//                 console.log(body.id);
//               });
      
//               // we can also pass the token to the browser to make requests from there
//               var redirectable=process.env.PORT ? 'http://pure-harbor-26317.herokuapp.com/users/dating/add/?': 'http://localhost:8888/users/dating/add/?';
//               res.redirect(redirectable +
//               querystring.stringify({
//                 access_token: access_token,
//                 refresh_token: refresh_token,
//               }));
//           } else {
//             console.log(response.statusCode);
//             console.log(response)
//             res.redirect('/#' +
//               querystring.stringify({
//                 error: 'invalid_token'
//               }));
//           }
//         });
//       }
//       });
      
      
      
//       expressapp.get('/refresh_token', function(req, res) {
      
//         // requesting access token from refresh token
//         var refresh_token = req.query.refresh_token;
//         var authOptions = {
//           url: 'https://accounts.spotify.com/api/token',
//           headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
//           form: {
//             grant_type: 'refresh_token',
//             refresh_token: refresh_token
//           },
//           json: true
//         };
      
//         request.post(authOptions, function(error, response, body) {
//           if (!error && response.statusCode === 200) {
//             var access_token = body.access_token;
//             res.send({
//               'access_token': access_token
//             });
//           }
//         });
//       });
//         // Answer API requests.
//         expressapp.get('/api', function (req, res) {
//           res.set('Content-Type', 'application/json');
//           res.send('{"message":"Hello from the custom server!"}');
//         });
      
      
//         const userRouter=require('./routes/users');
//         // const chatRouter=require('./routes/chats');
//         // var bodyParser = require('body-parser')
//         // app.use(bodyParser.urlencoded({
//         //   extended: false
//         //   }))
//         // app.use(bodyParser.json())
//         expressapp.use('/users', userRouter);
//         // expressapp.use('/chats',chatRouter);
      

// exports.expressapp = functions.https.onRequest(expressapp);
// // admin.initializeApp(functions.config().firebase)

const appOptions = JSON.parse(process.env.FIREBASE_CONFIG);
const app = admin.initializeApp(appOptions);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.sendNotificatoins = functions.database.ref('/messages/{messageid}').onWrite((event)=>{
        // console.info(event.val());
        // console.log(event.val());
        var sendername;
        // app.database().ref('/users')
        const after = event.after;
        console.log(after);
        const NOTIFICATION_SNAPSHOT = after.val();
        console.log()
        const payload = {
                notification: {
                        title: `New Message from ${after.val().senderid}`,
                        body: `${after.val().content}`,
                        icon:"data:image/png;base64,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",
                        click_action: `https://pure-harbor-26317.herokuapp.com/`
                        
                }
        }
        return admin.database().ref('/users').once('value').then((data)=>{
                if(!data.val()) return;
                const snapshot = data.val();
                const tokens=[];
                for(let key in snapshot){
                        if(key===NOTIFICATION_SNAPSHOT.senderid){
                                tokens.push(snapshot[key].token);

                        }
                }
                console.log(tokens);
                return admin.messaging().sendToDevice(tokens,payload)
        })

})

  // if(event.data.previous.val()){
        //         return;
        // }
        // if(!event.data.exists()){
        //         return
        // }