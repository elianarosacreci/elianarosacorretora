const firebaseController = require('./firebaseController')();

async function run() {
    let result = await firebaseController.getImmobileBySlug("apartamento-com-2-quartos-e-2-banheiros-a-venda-55-m2-por-rdollar-590000");
    console.log(result);
}
run();