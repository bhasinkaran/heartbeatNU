import firebase from 'firebase/app';
import 'firebase/database';
import apiKey from './api-Key';

const firebaseConfig = {
        apiKey: apiKey,
        authDomain: "nearify-f2a4a.firebaseapp.com",
        databaseURL: "https://nearify-f2a4a.firebaseio.com",
        projectId: "nearify-f2a4a",
        storageBucket: "nearify-f2a4a.appspot.com",
        messagingSenderId: "442855937718",
        appId: "1:442855937718:web:f1f6b7b42ca928efec3817",
        measurementId: "G-HV3MDELM9K"
};


firebase.initializeApp(firebaseConfig);
export const dbArtists = firebase.database().ref().child('artists');
export const dbSongs  = firebase.database().ref().child('songs');
export const dbPosts = firebase.database().ref().child('posts');
export const dbMessages = firebase.database().ref().child('messages');
export const dbReplies = firebase.database().ref().child('replies');
export const dbLikes = firebase.database().ref().child('likes');



