const firebase = require('./firebase')

function run() {
    firebase.database().ref("a2382266-d262-4f8f-b56b-08dd5a5f0f53").child('addr').on('value', (snapshot) => {
        console.log('VALORES: ', snapshot.val());
    }, (err) => {
        console.log('ERRO: ', err);
    })
}

run()