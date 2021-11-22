const { ObjectId } = require('mongodb');
const connect = require('./connection');

const create = (sale) =>
  connect()
    .then((db) => db.collection('sales').insertOne({ itensSold: sale }))
    .then((result) => result.ops[0]);

const getAll = () =>
  connect().then((db) => db.collection('sales').find({}).toArray());

const getById = (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connect().then((db) => db.collection('sales').findOne(ObjectId(id)));
};

const updateSale = (id, itensSold) => {
  connect().then((db) =>
    db
      .collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }));
  return { _id: id, itensSold };
};

const deleteSale = (id) =>
  connect().then((db) =>
    db.collection('sales').deleteOne({ _id: ObjectId(id) }));

module.exports = {
  create,
  getAll,
  getById,
  updateSale,
  deleteSale,
};
