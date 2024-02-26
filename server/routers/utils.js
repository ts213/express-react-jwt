import { checkSchema, validationResult } from 'express-validator';
import ApiError from '../exceptions/api-error.js';

export function validateRequest(schema, validateIn = ['body']) {
  const validationChain = checkSchema(schema, validateIn);
  validationChain.push(checkValidationResult);
  return validationChain;

  function checkValidationResult (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
  }
}
