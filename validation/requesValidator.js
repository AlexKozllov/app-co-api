const Joi = require('joi');
const { HttpCode } = require('../helpers/constants');

const shemaGetTransactions = Joi.object({
  searchString: Joi.string().min(2).max(60).optional(),
  filterType: Joi.string().optional(),
  page: Joi.number().optional(),
  limit: Joi.number().optional(),
});

const validate = (shema, body, next) => {
  const { error } = shema.validate(body);

  if (error) {
    const [{ message }] = error.details;

    return next({
      status: HttpCode.BAD_REQUEST,
      message: `Filed: ${message.replace(/"/g, '')}`,
      data: 'Bad Request',
    });
  }
  next();
};

module.exports.validateGetTransactions = (req, res, next) => {
  return validate(shemaGetTransactions, req.body, next);
};
