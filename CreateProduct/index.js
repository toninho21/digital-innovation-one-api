const createMongoClient = require('../shared/mongoClient');

module.exports = async function (context, req) {
    //Os dados do produto vão no body da requisição (req)
    const product = req.body;

    const {client: MongoClient, closeConnectionFn} = await createMongoClient();

    const products = MongoClient.collection('products');

    const res = await products.insert(product);

    closeConnectionFn();

    context.res = {
        //Aqui usar status 201 = created
        status: 201,
        body: res
    };
};