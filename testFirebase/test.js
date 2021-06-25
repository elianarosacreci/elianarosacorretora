const firebaseController = require('./fc')();

async function run() {
    let result = await firebaseController.getImmobilePaths();
    console.log(result);
}
run();