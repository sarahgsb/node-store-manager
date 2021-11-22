const service = require('../services/salesService');

const quantityValidation = (request, response, next) => {
  const sale = request.body;

  const quantity = service.validateQuantity(sale);
  const number = service.validateQuantityNumber(sale);

  if (quantity.length !== 0 || number.length !== 0) {
    return response.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  next();
};

const create = (request, response) => {
  const sale = request.body;

  service.createSale(sale).then((result) => response.status(200).json(result));
};

const getAll = (_request, response) =>
  service
    .getAllSales()
    .then((result) => response.status(200).json({ sales: result }));

const getById = (request, response) => {
  const { id } = request.params;

  service.getSaleById(id).then((result) => {
    if (!result) {
      return response.status(404).json({
        err: {
          code: 'not_found',
          message: 'Sale not found',
        },
      });
    }
    return response.status(200).json(result);
  });
};

const updateSale = (request, response) => {
  const { id } = request.params;
  const sale = request.body;

  service.update(id, sale).then((result) => response.status(200).json(result));
};

const deleteSale = (request, response) => {
  const { id } = request.params;

  service
    .deleteSale(id)
    .then((result) => response.status(200).json(result))
    .catch(() =>
      response.status(422).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong sale ID format',
        },
      }));
};

module.exports = {
  quantityValidation,
  create,
  getAll,
  getById,
  updateSale,
  deleteSale,
};
