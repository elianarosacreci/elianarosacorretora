const firebaseController = require('./fc')();

async function run() {
    let result = await firebaseController.getImmobileToStaticPath();
    console.log(result);
}
run();