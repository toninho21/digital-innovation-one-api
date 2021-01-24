const {ObjectID} = require('mongodb');

const createMongoClient = require('../shared/mongoClient');

module.exports = async function (context, req) {
    //Ver id do produto a ser lido
    const {id} = req.params;

    const {client: MongoClient, closeConnectionFn } = await createMongoClient();
    const products = MongoClient.collection('products');
    const res = await products.findOne({_id: ObjectID(id)});

    closeConnectionFn();

    context.res = {
        status: 200,
        body: res,
    }
};