const firebase = require('firebase')

const app = firebase.initializeApp({
    apiKey: "AIzaSyDYFJJtruhtzMyfIzH9kYL_cEGfehnxoGs",
    authDomain: "site-eliana-315001.firebaseapp.com",
    databaseURL: "https://site-eliana-315001-default-rtdb.firebaseio.com",
})

module.exports = app