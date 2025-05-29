const { validationResult } = require('express-validator');

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const error = new Error('Validation failed');
    error.type = 'validation';
    error.errors = errors.array();
    next(error);
  };
};

module.exports = validate; 