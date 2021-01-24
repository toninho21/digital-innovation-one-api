const {ObjectID} = require('mongodb');

const createMongoClient = require('../shared/mongoClient');


module.exports = async function (context, req) {
    //Aqui vai o id do registro a ser excluído
    const {id} = req.params;

    const {client: MongoClient, closeConnectionFn} = await createMongoClient();

    const products = MongoClient.collection('products');

    const res = await products.findOneAndDelete({
        _id: ObjectID(id)
    });

    closeConnectionFn();

    context.res = {
        status: 200,
        body: res,
    }
}