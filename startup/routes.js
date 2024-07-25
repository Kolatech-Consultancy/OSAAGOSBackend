import { json } from 'express';
import { NotFoundError } from '../errors/index.js';




export const route = function (app) {
  app.use(json());

  app.use('*', (req) => {
    throw new NotFoundError('Resource not found');
  });
};
