const functions = require('firebase-functions');
const admin= require('firebase-admin')
const cors = require("cors");
const express = require("express");
const credentials=functions.config()
const expressapp = express();
expressapp.use(express.json());
expressapp.use(cors());
const mongoose = require('mongoose')
const request = require('request')
let User = require('./models/user.model');


const appOptions = JSON.parse(process.env.FIREBASE_CONFIG);
const app = admin.initializeApp(appOptions);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

