import firebase from 'firebase';

let app;

if (!firebase.apps.length) {
    app = firebase.initializeApp({
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
} else {
    app = firebase.app();
}

export default app;