import firebase from 'firebase';

let app;

if (!firebase.apps.length) {
    app = firebase.initializeApp({
        apiKey: "AIzaSyDYFJJtruhtzMyfIzH9kYL_cEGfehnxoGs",
        authDomain: "site-eliana-315001.firebaseapp.com",
        databaseURL: "https://site-eliana-315001-default-rtdb.firebaseio.com",
    });
} else {
    app = firebase.app();
}

export default app;