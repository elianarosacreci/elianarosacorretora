import firebase from 'firebase';

let app;

if (!firebase.apps.length) {
    app = firebase.initializeApp({
        apiKey: "AIzaSyB2ZdSarj7pzn0Qq1BL4naSCESqqAOMbtM",
        authDomain: "site-eliana-corretora.firebaseapp.com",
        databaseURL: "https://site-eliana-corretora-default-rtdb.firebaseio.com/",
    });
} else {
    app = firebase.app();
}

export default app;