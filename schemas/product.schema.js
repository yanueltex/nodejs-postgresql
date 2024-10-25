const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(50);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(10);
const image = Joi.string().uri();
const categoryId = Joi.number().integer();

const price_min = Joi.number().integer();
const price_max = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  description: description,
  image: image,
  categoryId,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  // Éstos son parámetros de Filtros en forma de parametros de query
  limit,
  offset,
  price,
  price_min,
  /*Validamos que el parámetro price_max sea obligatorio si
  el ususario estableción un filtro de precio mínimo "price_min"*/
  price_max: price_max.when('price_min', {
    is: Joi.number().integer(),
    then: Joi.required(),
  }),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
};
