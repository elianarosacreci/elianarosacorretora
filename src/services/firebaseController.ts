import app from './firebase'

async function getAttractivePrices() {
    return new Promise(async (resolve, reject) => {
        try {
            await app.database().ref("immobiles").orderByChild('price').limitToFirst(3).on('value', (snapshot) => {
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
                resolve(result)
            }, (err) => {
                console.log('services - firebaseController.js - getAttractivePrices - Erro: ', err);
                reject('')
            })
        } catch (error) {
            console.log('services - firebaseController.js - getAttractivePrices - Erro: ', error);
            reject('')
        }
    });
};

async function getJustArrived() {
    return new Promise(async (resolve, reject) => {
        try {
            await app.database().ref("immobiles").orderByChild('createdAt').limitToLast(3).on('value', (snapshot) => {
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
                resolve(result)
            }, (err) => {
                console.log('services - firebaseController.js - getJustArrived - Erro: ', err);
                reject('')
            })
        } catch (error) {
            console.log('services - firebaseController.js - getJustArrived - Erro: ', error);
            reject('')
        }
    });
};

async function getMostPopular() {
    return new Promise(async (resolve, reject) => {
        try {
            await app.database().ref("immobiles").orderByChild('price').limitToLast(3).on('value', (snapshot) => {
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
                resolve(result)
            }, (err) => {
                console.log('services - firebaseController.js - getMostPopular - Erro: ', err);
                reject('')
            })
        } catch (error) {
            console.log('services - firebaseController.js - getMostPopular - Erro: ', error);
            reject('')
        }
    });
};

async function getImmobileById(id) {
    return new Promise(async (resolve, reject) => {
        try {
            await app.database().ref("immobiles").orderByChild('id').equalTo(id).on('value', (snapshot) => {
                let idx = Object.keys(snapshot.val())[0]
                resolve({
                    id: snapshot.val()[idx].id,
                    title: snapshot.val()[idx].title,
                    code: snapshot.val()[idx].code,
                    images: snapshot.val()[idx].images,
                    footage: snapshot.val()[idx].footage,
                    bedrooms: snapshot.val()[idx].bedrooms,
                    bathrooms: snapshot.val()[idx].bathrooms,
                    suites: snapshot.val()[idx].suites,
                    vacancies: snapshot.val()[idx].vacancies,
                    features: snapshot.val()[idx].features,
                    descriptionTitle: snapshot.val()[idx].descriptionTitle,
                    description: snapshot.val()[idx].description,
                    address: snapshot.val()[idx].address.fullAddress,
                    price: snapshot.val()[idx].price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
                    nearbyTrainsAndSubways: snapshot.val()[idx].nearbyTrainsAndSubways,
                    status: snapshot.val()[idx].status,
                })
            }, (err) => {
                console.log('services - firebaseController.js - getImmobileById - Erro: ', err);
                reject({})
            })
        } catch (error) {
            console.log('services - firebaseController.js - getImmobileById - Erro: ', error);
            reject({})
        }
    });
};

async function getAllImmobiles() {
    return new Promise(async (resolve, reject) => {
        try {
            await app.database().ref("immobiles").on('value', (snapshot) => {
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
                resolve(result)
            }, (err) => {
                console.log('services - firebaseController.js - getAllImmobiles - Erro: ', err);
                reject('')
            })
        } catch (error) {
            console.log('services - firebaseController.js - getAllImmobiles - Erro: ', error);
            reject('')
        }
    });
};

async function getImmobileIdx(id) {
    return new Promise(async (resolve, reject) => {
        try {
            await app.database().ref("immobiles").orderByChild('id').equalTo(id).on('value', (snapshot) => {
                let idx = Object.keys(snapshot.val())[0]
                resolve(idx)
            }, (err) => {
                console.log('services - firebaseController.js - getImmobileIdx - Erro: ', err);
                reject({})
            })
        } catch (error) {
            console.log('services - firebaseController.js - getImmobileIdx - Erro: ', error);
            reject({})
        }
    });
};

async function removeImmobileById(id) {
    return new Promise(async (resolve, reject) => {
        try {
            let idx = await getImmobileIdx(id);
            app.database().ref(`immobiles/${idx}`).remove()
                .then(function () {
                    console.log("Remove succeeded.")
                    resolve('ok')
                })
                .catch(function (error) {
                    console.log('services - firebaseController.js - removeImmobileById - Erro: ', error.message);
                    reject({})
                });
        } catch (error) {
            console.log('services - firebaseController.js - removeImmobileById - Erro: ', error);
            reject('')
        }
    });
};


export default {
    getAttractivePrices,
    getJustArrived,
    getMostPopular,
    getImmobileById,
    getAllImmobiles,
    removeImmobileById
};