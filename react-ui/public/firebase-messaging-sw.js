importScripts('https://www.gstatic.com/firebasejs/3.4.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.4.0/firebase-messaging.js');
const configg =require('./configure.js')
const firebaseConfig = {
        apiKey: configg,
        authDomain: "nearify-f2a4a.firebaseapp.com",
        databaseURL: "https://nearify-f2a4a.firebaseio.com",
        projectId: "nearify-f2a4a",
        storageBucket: "nearify-f2a4a.appspot.com",
        messagingSenderId: "442855937718",
        appId: "1:442855937718:web:f1f6b7b42ca928efec3817",
        measurementId: "G-HV3MDELM9K"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload){
        const title='hello world';
        const options={
                body:payload.data.status
        }
        return self.registration.showNotification(title, options);
})
