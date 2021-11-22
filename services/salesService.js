const model = require('../models/salesModel');

const validateQuantity = (quantity) =>
  quantity.filter((sale) => sale.quantity <= 0);

const validateQuantityNumber = (sales) =>
  sales.filter((sale) => typeof sale.quantity !== 'number');

const createSale = async (sale) => model.create(sale);

const getAllSales = async () => model.getAll();

const getSaleById = async (id) => model.getById(id);

const update = async (id, sale) => model.updateSale(id, sale);

const deleteSale = async (id) => model.deleteSale(id);

module.exports = {
  validateQuantity,
  validateQuantityNumber,
  createSale,
  getAllSales,
  getSaleById,
  update,
  deleteSale,
};
