const app = require('./fb')

const fc = function () {

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

    async function getImmobileBySlug(slug) {
        return new Promise(async (resolve, reject) => {
            try {
                await app.database().ref("immobiles").orderByChild('slug').equalTo(slug).on('value', (snapshot) => {
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
                    console.log('services - firebaseController.js - getImmobileBySlug - Erro: ', err);
                    reject({})
                })
            } catch (error) {
                console.log('services - firebaseController.js - getImmobileBySlug - Erro: ', error);
                reject({})
            }
        });
    };

    async function getImmobilePaths() {
        return new Promise(async (resolve, reject) => {
            try {
                await app.database().ref("immobiles").on('value', (snapshot) => {
                    let paths = [];
                    snapshot.forEach(function (childSnapshot) {
                        paths.push({ params: { id: childSnapshot.child('id').val() } })
                    });
                    resolve(paths)
                }, (err) => {
                    console.log('services - firebaseController.js - getImmobilePaths - Erro: ', err);
                    reject({})
                })
            } catch (error) {
                console.log('services - firebaseController.js - getImmobilePaths - Erro: ', error);
                reject({})
            }
        });
    };

    // async function removeImmobileById(id) {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             await app.database().ref("immobiles").orderByChild('id').equalTo(id).on('value', (snapshot) => {
    //                 idx = Object.keys(snapshot.val())[0]
    //                 var adaRef = await app.database().ref(`immobiles/${idx}`);
    //                 adaRef.remove()
    //                     .then(function () {
    //                         console.log("Remove succeeded.")
    //                     })
    //                     .catch(function (error) {
    //                         console.log("Remove failed: " + error.message)
    //                     });
    //                 resolve()
    //             }, (err) => {
    //                 console.log('services - firebaseController.js - getImmobileBySlug - Erro: ', err);
    //                 reject({})
    //             })
    //         } catch (error) {
    //             console.log('services - firebaseController.js - removeImmobileById - Erro: ', error);
    //             reject('')
    //         }
    //     });
    // };

    async function getImmobileToStaticPath() {
        return new Promise(async (resolve, reject) => {
            try {
                await app.database().ref("immobiles").on('value', (snapshot) => {
                    let idx = snapshot.val()[0].id
                    resolve(idx)
                }, (err) => {
                    console.log('services - firebaseController.js - getImmobileToStaticPath - Erro: ', err);
                    reject('')
                })
            } catch (error) {
                console.log('services - firebaseController.js - getImmobileToStaticPath - Erro: ', error);
                reject('')
            }
        });
    };

    return {
        getAttractivePrices,
        getJustArrived,
        getMostPopular,
        getImmobileBySlug,
        getImmobilePaths,
        // removeImmobileById,
        getImmobileToStaticPath
    }

}

module.exports = fc;