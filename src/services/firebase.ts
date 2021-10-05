import firebase from "firebase";

let app;

if (!firebase.apps.length) {
  app = firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_DATABASEURL,
  });
} else {
  app = firebase.app();
}

export default app;