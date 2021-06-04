const firebase = require('./firebase')

function run() {

    // attractivePrices
    // firebase.database().ref("immobiles").orderByChild('price').limitToFirst(3).on('value', (snapshot) => {
    //     console.log('VALORES: ', snapshot.val());
    // }, (err) => {
    //     console.log('ERRO: ', err);
    // })

    // justArrived
    // firebase.database().ref("immobiles").orderByChild('createdAt').limitToLast(3).on('value', (snapshot) => {
    //     console.log('VALORES: ', snapshot.val());
    // }, (err) => {
    //     console.log('ERRO: ', err);
    // })

    // mostPopular
    // firebase.database().ref("immobiles").orderByChild('price').limitToLast(3).on('value', (snapshot) => {
    //     console.log('VALORES: ', snapshot.val());
    // }, (err) => {
    //     console.log('ERRO: ', err);
    // })
}

run()