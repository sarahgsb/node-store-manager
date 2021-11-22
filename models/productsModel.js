const { ObjectId } = require('mongodb');
const connect = require('./connection');

// https://www.tabnine.com/code/javascript/functions/mongodb/InsertOneWriteOpResult/ops
const create = ({ name, quantity }) =>
  connect()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => result.ops[0]);

const findByName = async (name) => {
  const product = await connect().then((db) =>
    db.collection('products').findOne({ name }));

  if (!product) return null;

  return product;
};

const getAll = () =>
  connect().then((db) => db.collection('products').find({}).toArray());

const getById = (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connect().then((db) =>
    db.collection('products').findOne(new ObjectId(id)));
};

const update = (id, name, quantity) => {
  connect().then((db) =>
    db
      .collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));

  return { _id: id, name, quantity };
};

const deleteById = (id) => {
  connect().then((db) =>
    db.collection('products').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  create,
  findByName,
  getAll,
  getById,
  update,
  deleteById,
};
