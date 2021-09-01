import firebase from "firebase";

if (firebase.apps.length == 0) {
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    appId: process.env.REACT_APP_APP_ID,
  };

  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export { firebase };