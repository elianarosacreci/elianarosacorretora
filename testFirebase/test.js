const firebaseController = require('./fc')();

async function run() {
    let result = await firebaseController.getImmobileBySlug("reserva-jb");
    console.log(result);
}
run();