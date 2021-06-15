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

    async function getImmobileBySlug(slug) {
        return new Promise(async (resolve, reject) => {
            try {
                await firebase.database().ref("immobiles").orderByChild('slug').equalTo(slug).on('value', (snapshot) => {
                    resolve({
                        ok: true,
                        message: 'ok',
                        content: {
                            id: snapshot.val()[0].id,
                            title: snapshot.val()[0].title,
                            code: snapshot.val()[0].code,
                            images: snapshot.val()[0].images,
                            footage: snapshot.val()[0].footage,
                            bedrooms: snapshot.val()[0].bedrooms,
                            bathrooms: snapshot.val()[0].bathrooms,
                            suites: snapshot.val()[0].suites,
                            vacancies: snapshot.val()[0].vacancies,
                            features: snapshot.val()[0].features,
                            descriptionTitle: snapshot.val()[0].descriptionTitle,
                            description: snapshot.val()[0].description,
                            address: snapshot.val()[0].address.fullAddress,
                            price: snapshot.val()[0].price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
                            nearbyTrainsAndSubways: snapshot.val()[0].nearbyTrainsAndSubways,
                            status: snapshot.val()[0].status,
                        }
                    })
                }, (err) => {
                    console.log('services - firebaseController.js - getImmobileBySlug - Erro: ', err);
                    reject({
                        ok: false,
                        message: err,
                        content: ''
                    })
                })
            } catch (error) {
                console.log('services - firebaseController.js - getImmobileBySlug - Erro: ', error);
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
        getMostPopular,
        getImmobileBySlug
    };
};

module.exports = firebaseController;