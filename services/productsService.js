const model = require('../models/productsModel');

const lengthValidation = (name) => {
  if (name.length < 5) return false;
  return true;
};

const quantityValidation = (quantity) => {
  if (quantity <= 0) return false;
  return true;
};

const quantityStringValidation = (quantity) => {
  if (typeof quantity !== 'number') return true;
  return false;
};

const isProductExists = async (name) => {
  const exists = await model.findByName(name);
  if (exists) return true;
  return false;
};

const createProduct = async ({ name, quantity }) =>
  model.create({ name, quantity });

const getAllProducts = async () => model.getAll();

const getAllId = async (id) => model.getById(id);

const updateProduct = async (id, name, quantity) =>
  model.update(id, name, quantity);

const deleteProducts = async (id) => model.deleteById(id);

module.exports = {
  lengthValidation,
  quantityValidation,
  quantityStringValidation,
  isProductExists,
  createProduct,
  getAllProducts,
  getAllId,
  updateProduct,
  deleteProducts,
};
