const firebase = require('./firebase')

const firebaseController = function () {

    async function getAttractivePrices() {
        return new Promise(async (resolve, reject) => {
            try {
                await firebase.database().ref("immobiles").orderByChild('price').limitToFirst(3).on('value', (snapshot) => {
                    let result = [];
                    snapshot.forEach(function (childSnapshot) {
                        result.push({
                            id: childSnapshot.child('id').val(),
                            slug: childSnapshot.child('slug').val(),
                            price: childSnapshot.child('price').val().toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
                            footage: childSnapshot.child('footage').val(),
                            bedrooms: childSnapshot.child('bedrooms').val(),
                            bathrooms: childSnapshot.child('bathrooms').val(),
                            vacancies: childSnapshot.child('vacancies').val(),
                            descriptionTitle: childSnapshot.child('descriptionTitle').val(),
                            imageCard: childSnapshot.child('images/0').val(),
                        })
                    });
                    resolve({
                        ok: true,
                        message: 'ok',
                        content: result
                    })
                }, (err) => {
                    console.log('services - firebaseController.js - getAttractivePrices - Erro: ', err);
                    reject({
                        ok: false,
                        message: err,
                        content: ''
                    })
                })
            } catch (error) {
                console.log('services - firebaseController.js - getAttractivePrices - Erro: ', error);
                reject({
                    ok: false,
                    message: error,
                    content: ''
                })
            }
        });
    };

    async function getJustArrived() {
        return new Promise(async (resolve, reject) => {
            try {
                await firebase.database().ref("immobiles").orderByChild('createdAt').limitToLast(3).on('value', (snapshot) => {
                    let result = [];
                    snapshot.forEach(function (childSnapshot) {
                        result.push({
                            id: childSnapshot.child('id').val(),
                            slug: childSnapshot.child('slug').val(),
                            price: childSnapshot.child('price').val().toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
                            footage: childSnapshot.child('footage').val(),
                            bedrooms: childSnapshot.child('bedrooms').val(),
                            bathrooms: childSnapshot.child('bathrooms').val(),
                            vacancies: childSnapshot.child('vacancies').val(),
                            descriptionTitle: childSnapshot.child('descriptionTitle').val(),
                            imageCard: childSnapshot.child('images/0').val(),
                        })
                    });
                    resolve({
                        ok: true,
                        message: 'ok',
                        content: result
                    })
                }, (err) => {
                    console.log('services - firebaseController.js - getJustArrived - Erro: ', err);
                    reject({
                        ok: false,
                        message: err,
                        content: ''
                    })
                })
            } catch (error) {
                console.log('services - firebaseController.js - getJustArrived - Erro: ', error);
                reject({
                    ok: false,
                    message: error,
                    content: ''
                })
            }
        });
    };

    async function getMostPopular() {
        return new Promise(async (resolve, reject) => {
            try {
                await firebase.database().ref("immobiles").orderByChild('price').limitToLast(3).on('value', (snapshot) => {
                    let result = [];
                    snapshot.forEach(function (childSnapshot) {
                        result.push({
                            id: childSnapshot.child('id').val(),
                            slug: childSnapshot.child('slug').val(),
                            price: childSnapshot.child('price').val().toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
                            footage: childSnapshot.child('footage').val(),
                            bedrooms: childSnapshot.child('bedrooms').val(),
                            bathrooms: childSnapshot.child('bathrooms').val(),
                            vacancies: childSnapshot.child('vacancies').val(),
                            descriptionTitle: childSnapshot.child('descriptionTitle').val(),
                            imageCard: childSnapshot.child('images/0').val(),
                        })
                    });
                    resolve({
                        ok: true,
                        message: 'ok',
                        content: result
                    })
                }, (err) => {
                    console.log('services - firebaseController.js - getMostPopular - Erro: ', err);
                    reject({
                        ok: false,
                        message: err,
                        content: ''
                    })
                })
            } catch (error) {
                console.log('services - firebaseController.js - getMostPopular - Erro: ', error);
                reject({
                    ok: false,
                    message: error,
                    content: ''
                })
            }
        });
    };

    return {
        getAttractivePrices,
        getJustArrived,
        getMostPopular
    };
};

module.exports = firebaseController;