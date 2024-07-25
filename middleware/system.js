import Joi from 'joi';
import serverConfig from '../config/serverConfig.js';

export function errorHandler() {
  return (error, req, res, next) => {
    const isProduction = serverConfig.NODE_ENV === 'production';
    const errorCode = error.code || 500;
    let errorMessage = {};

    if (res.headersSent) {
      next(error);
    }

    if (!isProduction) {
      serverConfig.DEBUG(error.stack);
      errorMessage = error;
    }

    if (error instanceof Joi.ValidationError) {
      res.status(400).json({
        message: 'Validation error.',
        error: error.details.map((detail) => {
          return detail.message;
        }),
      });
    }

    if (errorCode === 500 && isProduction) {
      res.status(500).json({
        message: 'An unexpected error occurred. Please try again later.',
      });
    }

    res.status(errorCode).json({
      message: error.message,
      error: {
        ...(error.errors && { error: error.errors }),
        ...(!isProduction && { trace: errorMessage }),
      },
    });
  };
}

export function validateRequestBody(validator) {
  return (req, res, next) => {
    const { error, value } = validator(req);

    if (error) throw error;
    req.body = value;

    next();
  };
}
