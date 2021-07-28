const firebaseController = require('./fc')();

async function run() {
    let result = await firebaseController.removeImmobileById("a21ab00f-5c0b-455c-a59d-5f13e5c37ead");
    console.log(result);
}
run();